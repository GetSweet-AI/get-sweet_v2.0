"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);

        // Evitar setState directo en el efecto
        queueMicrotask(() => {
          setAuthState({
            user: parsedUser,
            token: storedToken,
            isAuthenticated: true,
            loading: false,
          });
        });

        return;
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    // También mover este
    queueMicrotask(() => {
      setAuthState((prev) => ({ ...prev, loading: false }));
    });
  }, []);

  // -------------------------
  // LOGIN
  // -------------------------
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setAuthState({
      user: userData,
      token,
      isAuthenticated: true,
      loading: false,
    });
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  // -------------------------
  // REGISTER
  // -------------------------
  const register = async ({ fullName, email, password }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    login(data.user, data.token);
  };

  // -------------------------
  // UPDATE ONBOARDING
  // -------------------------
  const updateOnboarding = (onboardingData) => {
    setAuthState((prev) => {
      const updatedUser = {
        ...prev.user,
        ...onboardingData,
        onboardingCompleted: true,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return {
        ...prev,
        user: updatedUser,
      };
    });
  };

  const { user, token, isAuthenticated, loading } = authState;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
        updateOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
