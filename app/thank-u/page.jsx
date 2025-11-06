"use client"
import { CheckCircle, Zap } from 'lucide-react';

export default function ThankYou() {

    const handleGoHome = () => {
        // Redirige al usuario a la página principal después de ver el mensaje
        window.location.href = '/'; 
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4"
             style={{ background: 'linear-gradient(135deg, #f0e6ff 0%, #d8b4fe 100%)' }}>
            
            <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-lg text-center transform transition-all duration-300 hover:shadow-xl">
                
               
                <div className="mb-6 flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500 bg-green-50 rounded-full p-1 shadow-lg" />
                </div>

               
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    ¡Thank You!
                </h1>
                
               
                <p className="text-xl text-gray-600 mb-8 font-light">
                     for choosing Get Sweet AI
                </p>

                
                <p className="text-md text-gray-700 mb-8 leading-relaxed">
                    Your action has been successfully completed. We are delighted to have you.
                    <br/>
                    Now let&apos;s create amazing things!
                </p>

                {/* Botón de Acción */}
                <button
                    onClick={handleGoHome}
                    className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-purple-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg 
                                 hover:from-purple-700 hover:to-fuchsia-700 transform hover:scale-105 transition duration-300 flex items-center justify-center mx-auto"
                >
                    <Zap className="h-5 w-5 mr-2" />
                    Go to home
                </button>

            </div>

            <p className="mt-8 text-xs text-purple-900/50">
                Your AI platform favorite:)
            </p>
        </div>
    );
}