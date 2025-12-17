"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  });

  // =========================
  // 1. ESPERAR NEXTAUTH
  // =========================
  useEffect(() => {
    if (status === "loading") return;

    // Usuario NO autenticado
    if (status === "unauthenticated") {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
      return;
    }

    // Usuario autenticado -> tenemos session.user
    if (status === "authenticated" && session?.user?.accessToken) {
      const token = session.user.accessToken;

      setAuthState((prev) => ({
        ...prev,
        token,
        isAuthenticated: true,
        loading: true, // seguimos cargando hasta pedir datos reales al backend
      }));
    }
  }, [status, session]);

  // =========================
  // 2. TRAER DATOS REALES DEL BACKEND SI HAY TOKEN
  // =========================
  useEffect(() => {
    if (!authState.token) return;

    const fetchUser = async () => {
      try {
        // 🔄 CAMBIO 1: URL actualizada a la nueva ruta de usuario fusionado
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`,
          {
            headers: { Authorization: `Bearer ${authState.token}` },
          }
        );

        const data = await res.json(); // Tu backend devuelve el objeto 'fullProfile' directamente
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        setAuthState({
          user: data, // 🔄 CAMBIO 2: Asignamos 'data' directo (ya no data.user)
          token: authState.token,
          isAuthenticated: true,
          loading: false,
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
        // Si falla el token o el usuario no existe, cerramos sesión local
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    };

    fetchUser();
  }, [authState.token]);

  // =========================
  // 3. ROUTE GUARDS SIMPLES
  // =========================
  useEffect(() => {
    if (authState.loading) return;

    const protectedRoutes = ["/chat", "/settings", "/dashboard"]; // Agrega tus rutas
    const authPages = ["/sign-in", "/sign-up"];

    // a) No autenticado -> bloquea rutas protegidas
    if (!authState.isAuthenticated && protectedRoutes.includes(pathname)) {
      router.replace("/sign-in");
      return;
    }

    // b) Autenticado pero sin onboarding -> forzar onboarding
    // (Esto funciona porque el backend inyecta 'onboardingCompleted' en el objeto user)
    if (
      authState.isAuthenticated &&
      authState.user &&
      !authState.user.onboardingCompleted
    ) {
      if (pathname !== "/onboarding") router.replace("/onboarding");
      return;
    }

    // c) Autenticado y completo -> alejar de login/register
    if (
      authState.isAuthenticated &&
      authState.user?.onboardingCompleted &&
      authPages.includes(pathname)
    ) {
      router.replace("/chat");
    }
  }, [authState, pathname]);

  // =========================
  // 4. MÉTODOS
  // =========================

  const loginWithGoogle = () => signIn("google");

  const logout = async () => {
    localStorage.clear();
    await signOut({ redirect: false });
    router.push("/");
  };

  const updateOnboarding = async (data) => {
    // 🔄 CAMBIO 3: URL y Método para Onboarding
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/onboarding`,
      {
        method: "POST", // Ahora es POST porque creamos la CompanyData
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data), // { businessName, industry, phone }
      }
    );

    const response = await res.json();
    if (!res.ok) throw new Error(response.message || "Onboarding failed");

    // Actualizamos el estado global inmediatamente con la respuesta fusionada
    setAuthState((prev) => ({
      ...prev,
      user: response.user, // El controlador de onboarding devuelve { user: ... }
    }));

    // router.push("/chat");
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, loginWithGoogle, logout, updateOnboarding }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
