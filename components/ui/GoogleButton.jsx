"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useAuth } from "@/context/useContext";

export default function GoogleButton({
  redirectUrl = "/thank-u",
  label = "Continue with Google",
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    setError("");

    // 🔹 Debug completo
    console.log("Credential response from Google:", credentialResponse);

    // Validar que exista el token
    const idToken = credentialResponse?.credential;
    if (!idToken) {
      setError("No ID token received from Google");
      setLoading(false);
      return;
    }

    // Mostrar token en consola para pruebas
    console.log("Google ID Token:", idToken);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }), // Debe coincidir con lo que espera el backend
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login with Google failed");

      // Guardar en contexto y localStorage
      login(
        {
          id: data.user._id,
          name: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
        },
        data.token
      );

      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Error login Google:", err);
      setError(err.message || "Login with Google failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mb-4">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={(err) => {
          console.error("Google login error:", err);
          setError("Login with Google failed. Please try again.");
        }}
        useOneTap
      />
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
