import {
  CheckCircle2,
  BarChart3,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function CampaignHelpCard({ googleResourceId }) {
  // Extraemos el ID limpio de Google para el link (opcional)
  // resources/customers/123/campaigns/456 -> 456
  const campaignId = googleResourceId?.split("/").pop();

  return (
    <div className="w-full bg-emerald-50 border border-emerald-100 rounded-3xl p-8 text-center animate-in fade-in zoom-in duration-300">
      {/* Icono de Éxito */}
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Campaign Successfully Published!
      </h2>

      <p className="text-gray-600 max-w-lg mx-auto mb-8 text-lg">
        Your campaign structure has been sent to Google Ads correctly. It is
        currently in <strong>PAUSED</strong> mode for safety.
      </p>

      {/* Grid de Pasos Siguientes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-8">
        <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm">
          <div className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md">
              1
            </span>
            Review in Google
          </div>
          <p className="text-sm text-gray-500">
            Go to your Google Ads account to enable the campaign when you are
            ready to spend budget.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm">
          <div className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md">
              2
            </span>
            Track Performance
          </div>
          <p className="text-sm text-gray-500">
            Visit the Analytics tab in this app to see how your ads perform in
            real-time.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm">
          <div className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md">
              3
            </span>
            Optimize
          </div>
          <p className="text-sm text-gray-500">
            Use the AI Agent later to tweak keywords or ads based on actual
            data.
          </p>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/chat/campaign"
          className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <button
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center gap-2 transform hover:scale-105"
          onClick={() => window.open("https://ads.google.com", "_blank")}
        >
          <ExternalLink className="w-4 h-4" />
          Open Google Ads
        </button>
      </div>
    </div>
  );
}
