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
    loading: true, // Empieza cargando para no redirigir antes de tiempo
  });

  // =========================
  // 0. HIDRATACIÓN (RECUPERAR SESIÓN MANUAL) ⚡️ ESTO FALTABA
  // =========================
  useEffect(() => {
    // Intentar recuperar token manual del storage
    const storedToken = localStorage.getItem("sweetToken");

    if (storedToken) {
      // Si hay token guardado, lo restauramos y dejamos loading en true
      // para que el siguiente useEffect busque el perfil
      setAuthState((prev) => ({
        ...prev,
        token: storedToken,
        isAuthenticated: true,
        loading: true,
      }));
    } else {
      // Si no hay token manual, esperamos a ver qué dice NextAuth
      if (status === "unauthenticated") {
        setAuthState((prev) => ({ ...prev, loading: false }));
      }
    }
  }, []); // Se ejecuta solo una vez al montar

  // =========================
  // 1. SINCRONIZAR CON NEXTAUTH (GOOGLE)
  // =========================
  useEffect(() => {
    if (status === "loading") return;

    // Si NextAuth nos da sesión y NO tenemos token manual aun
    if (
      status === "authenticated" &&
      session?.user?.accessToken &&
      !authState.token
    ) {
      setAuthState((prev) => ({
        ...prev,
        token: session.user.accessToken,
        isAuthenticated: true,
        loading: true,
      }));
    }

    // Si NextAuth terminó y no hay sesión, y tampoco token manual
    if (status === "unauthenticated" && !localStorage.getItem("sweetToken")) {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, [status, session]);

  // =========================
  // 2. TRAER DATOS REALES (SI HAY TOKEN)
  // =========================
  useEffect(() => {
    if (!authState.token) return;

    // Si ya tenemos usuario (ej. acabamos de loguear), paramos carga
    if (authState.user && authState.loading) {
      setAuthState((prev) => ({ ...prev, loading: false }));
      // return; // Comentado: A veces queremos refrescar datos igual
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`,
          {
            headers: { Authorization: `Bearer ${authState.token}` },
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch profile");

        // Estructura segura: backend a veces devuelve data o data.user
        const userData = data.user || data.data || data;

        setAuthState({
          user: userData,
          token: authState.token,
          isAuthenticated: true,
          loading: false, // ¡Listo! Ya podemos mostrar la app
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        // Si el token no sirve, limpiar todo
        localStorage.removeItem("sweetToken");
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
  // 3. ROUTE GUARDS (PROTECCIÓN)
  // =========================
  useEffect(() => {
    // No redirigir mientras estamos verificando tokens
    if (authState.loading) return;

    const protectedRoutes = [
      "/chat",
      "/settings",
      "/dashboard",
      "/campaign",
      "/thank-u",
    ];
    const authPages = ["/sign-in", "/sign-up"];

    // a) No autenticado -> fuera de rutas privadas
    if (
      !authState.isAuthenticated &&
      protectedRoutes.some((r) => pathname.startsWith(r))
    ) {
      console.log("🔒 Acceso denegado. Redirigiendo a login.");
      router.replace("/sign-in");
      return;
    }

    // b) Autenticado -> fuera de login
    if (authState.isAuthenticated && authPages.includes(pathname)) {
      router.replace("/chat");
    }

    // c) Check Onboarding (Opcional)
    if (
      authState.isAuthenticated &&
      authState.user &&
      !authState.user.onboardingCompleted
    ) {
      if (pathname !== "/onboarding" && !pathname.startsWith("/api")) {
        // router.replace("/onboarding"); // Descomentar si usas onboarding forzoso
      }
    }
  }, [authState.loading, authState.isAuthenticated, pathname, router]);

  // =========================
  // 4. MÉTODOS PÚBLICOS
  // =========================
  const loginWithGoogle = () => signIn("google");

  const login = (userData, token) => {
    localStorage.setItem("sweetToken", token); // 💾 GUARDAR TOKEN
    setAuthState({
      user: userData,
      token: token,
      isAuthenticated: true,
      loading: false,
    });
    // La redirección la hace el componente o el route guard
  };

  const logout = async () => {
    localStorage.removeItem("sweetToken"); // 🗑️ BORRAR TOKEN
    await signOut({ redirect: false });
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
    router.push("/sign-in");
  };

  const updateOnboarding = async (data) => {
    // ... (tu lógica de onboarding igual que antes)
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, loginWithGoogle, login, logout, updateOnboarding }}
    >
      {/* Si está cargando la sesión inicial, mostramos pantalla blanca o spinner para evitar parpadeos */}
      {authState.loading ? (
        <div className="min-h-screen flex items-center justify-center bg-white">
          {/* Opcional: poner tu logo o spinner aquí */}
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
