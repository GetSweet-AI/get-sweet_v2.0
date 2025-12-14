"use client";

import { useState } from "react";
import {
  Layout,
  Target,
  X,
  BarChart3,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Pencil,
} from "lucide-react";

export default function RightSidebar({ isOpen, setIsOpen, activeContext }) {
  // Expand / collapse state (Brand Context)
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);
  const [isColorsOpen, setIsColorsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isTrustOpen, setIsTrustOpen] = useState(false);

  // Expand / collapse state (Campaign)
  const [isObjectiveOpen, setIsObjectiveOpen] = useState(false);
  const [isAssetsOpen, setIsAssetsOpen] = useState(false);

  return (
    <>
      <div
        className={`
          fixed inset-y-0 right-0 z-40 w-80 bg-gray-50 border-l border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-5 bg-white shrink-0">
          <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
            {activeContext === "general" ? (
              <>
                <Layout className="w-4 h-4" /> Brand Details
              </>
            ) : (
              <>
                <Target className="w-4 h-4" /> Campaign Details
              </>
            )}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6 overflow-y-auto flex-1">
          {activeContext === "general" ? (
            <>
              {/* Brand SECTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Info
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                      onClick={() => {
                        // later: router.push("/brand/settings")
                      }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>

                    <button
                      className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      onClick={() => setIsBrandOpen((v) => !v)}
                      aria-label={isBrandOpen ? "Collapse brand" : "Expand brand"}
                    >
                      {isBrandOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 leading-tight">
                        County Consumer Plumbing Service and Repair Group
                      </div>
                      <div className="text-[11px] text-gray-500">
                        AKA: County Consumer Plumbing Group
                      </div>
                      <div className="text-[11px] text-gray-500">
                        Home Services → Plumbing & HVAC
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span className="text-[10px] font-semibold text-yellow-700 bg-yellow-100 rounded px-1.5 py-0.5">
                        Draft
                      </span>

                      {/* Verified option:
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      */}
                    </div>
                  </div>

                  {isBrandOpen && (
                    <div className="pt-2 text-xs text-gray-600 space-y-1">
                      <div>
                        <span className="text-gray-500">Website:</span>{" "}
                        https://www.plumbingservice.com/
                      </div>
                      <div>
                        <span className="text-gray-500">Service Area:</span>{" "}
                        Mid-Peninsula & Bay Area
                      </div>
                      <div>
                        <span className="text-gray-500">Availability:</span> 24/7
                        Emergency Service
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mission SECTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Mission
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                      onClick={() => {
                        // later: router.push("/brand/settings?tab=mission")
                      }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>

                    <button
                      className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      onClick={() => setIsMissionOpen((v) => !v)}
                      aria-label={
                        isMissionOpen ? "Collapse mission" : "Expand mission"
                      }
                    >
                      {isMissionOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-gray-200 rounded-lg">
                  <div
                    className={`text-sm text-gray-600 leading-snug overflow-hidden ${
                      isMissionOpen ? "" : "max-h-10"
                    }`}
                  >
                    Protect the health and safety of the community while
                    delivering professional-grade plumbing services with a
                    strong commitment to environmental responsibility and water
                    conservation.
                  </div>
                </div>
              </div>

              {/* Services SECTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Services
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                      onClick={() => {
                        // later: router.push("/brand/settings?tab=services")
                      }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>

                    <button
                      className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      onClick={() => setIsServicesOpen((v) => !v)}
                      aria-label={
                        isServicesOpen ? "Collapse services" : "Expand services"
                      }
                    >
                      {isServicesOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Emergency Plumbing",
                      "Water Heaters",
                      "Drain & Sewer",
                      "Leak Detection",
                    ].map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-full px-2 py-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {isServicesOpen && (
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Fixture repair & replacement (toilets, faucets)</div>
                      <div>Hydro-jetting / drain cleaning</div>
                      <div>Sewer inspection & repair</div>
                      <div>Gas line plumbing (if applicable)</div>
                      <div>HVAC service (if applicable)</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Differentiators SECTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Differentiators
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                      onClick={() => {
                        // later: router.push("/brand/settings?tab=differentiators")
                      }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>

                    <button
                      className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      onClick={() => setIsDiffOpen((v) => !v)}
                      aria-label={
                        isDiffOpen
                          ? "Collapse differentiators"
                          : "Expand differentiators"
                      }
                    >
                      {isDiffOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-2">
                  <div className="text-sm font-semibold text-gray-900">
                    Why customers choose us
                  </div>

                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    <li>Union-trained, experienced technicians</li>
                    <li>Safety-first, professional work standards</li>
                    <li>Fast response and reliable service</li>
                  </ul>

                  {isDiffOpen && (
                    <ul className="text-xs text-gray-600 space-y-1 list-disc pl-5">
                      <li>Transparent explanations and clear next steps</li>
                      <li>Strong emphasis on water conservation</li>
                      <li>Trusted local service in the Bay Area</li>
                    </ul>
                  )}
                </div>
              </div>

              {/* Brand Voice SECTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Brand Voice
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                      onClick={() => {
                        // later: router.push("/brand/settings?tab=voice")
                      }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>

                    <button
                      className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      onClick={() => setIsVoiceOpen((v) => !v)}
                      aria-label={
                        isVoiceOpen ? "Collapse voice" : "Expand voice"
                      }
                    >
                      {isVoiceOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {["Professional", "Trustworthy", "Reassuring", "Safety-first"].map(
                      (t) => (
                        <span
                          key={t}
                          className="text-[11px] font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-full px-2 py-1"
                        >
                          {t}
                        </span>
                      )
                    )}
                  </div>

                  {isVoiceOpen && (
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>
                        <span className="text-gray-500">Avoid:</span> slang, jokes,
                        exaggeration
                      </div>
                      <div>
                        <span className="text-gray-500">Emphasize:</span> safety,
                        reliability, clear next steps
                      </div>
                      <div>
                        <span className="text-gray-500">Formality:</span> medium–high
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Signals SECTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Trust Signals
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                      onClick={() => {
                        // later: router.push("/brand/settings?tab=trust")
                      }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>

                    <button
                      className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      onClick={() => setIsTrustOpen((v) => !v)}
                      aria-label={
                        isTrustOpen
                          ? "Collapse trust signals"
                          : "Expand trust signals"
                      }
                    >
                      {isTrustOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-2">
                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    <li>Licensed & insured (confirm)</li>
                    <li>Union-trained technicians</li>
                    <li>Emergency service availability</li>
                  </ul>

                  {isTrustOpen && (
                    <div className="text-xs text-gray-600 space-y-2">
                      <div>
                        <span className="text-gray-500">Reviews:</span> Google / Yelp
                        (connect later)
                      </div>
                      <div>
                        <span className="text-gray-500">Guarantee:</span> workmanship
                        warranty (add details)
                      </div>
                      <div>
                        <span className="text-gray-500">Certifications:</span> (add any)
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Colors SECTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Colors (Detected)
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                      onClick={() => {
                        // later: router.push("/brand/settings?tab=colors")
                      }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>

                    <button
                      className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      onClick={() => setIsColorsOpen((v) => !v)}
                      aria-label={
                        isColorsOpen ? "Collapse colors" : "Expand colors"
                      }
                    >
                      {isColorsOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-md border border-gray-200"
                      style={{ backgroundColor: "#1E4E8C" }}
                      title="Primary Blue: #1E4E8C"
                    />
                    <div
                      className="w-5 h-5 rounded-md border border-gray-200"
                      style={{ backgroundColor: "#C62828" }}
                      title="Accent Red: #C62828"
                    />
                    <div
                      className="w-5 h-5 rounded-md border border-gray-200"
                      style={{ backgroundColor: "#FFFFFF" }}
                      title="Neutral White: #FFFFFF"
                    />
                    <div
                      className="w-5 h-5 rounded-md border border-gray-200"
                      style={{ backgroundColor: "#2E2E2E" }}
                      title="Charcoal: #2E2E2E"
                    />
                  </div>

                  {isColorsOpen && (
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Primary Blue</span>
                        <span className="font-mono">#1E4E8C</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Accent Red</span>
                        <span className="font-mono">#C62828</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Neutral White</span>
                        <span className="font-mono">#FFFFFF</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Charcoal</span>
                        <span className="font-mono">#2E2E2E</span>
                      </div>

                      <div className="pt-2 text-[11px] text-gray-500">
                        Approximate; confirm with brand kit or CSS tokens.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Suggestions (info-only) */}
              <div className="space-y-2">

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <h4 className="text-xs font-bold text-blue-800 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Sweet suggestions
                  </h4>

                  <p className="text-xs text-blue-600 leading-snug">
                    Verify your brand profile, then create a campaign brief. Start
                    with one service focus (Emergency Plumbing, Water Heaters, Leak
                    Detection) and keep messaging safety-first, local, and trust-driven.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Objective SECTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Objective
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                      onClick={() => {
                        // later: full campaign editor
                      }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>

                    <button
                      className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      onClick={() => setIsObjectiveOpen((v) => !v)}
                      aria-label={
                        isObjectiveOpen
                          ? "Collapse objective"
                          : "Expand objective"
                      }
                    >
                      {isObjectiveOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-gray-200 rounded-lg">
                  <div
                    className={`text-sm text-gray-600 flex items-start gap-2 overflow-hidden ${
                      isObjectiveOpen ? "" : "max-h-10"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    Increase sales by 20% by driving more calls and quote requests
                    from local homeowners.
                  </div>
                </div>
              </div>

              {/* Assets SECTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Assets
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
                      onClick={() => {
                        // later: asset manager
                      }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>

                    <button
                      className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      onClick={() => setIsAssetsOpen((v) => !v)}
                      aria-label={
                        isAssetsOpen ? "Collapse assets" : "Expand assets"
                      }
                    >
                      {isAssetsOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">Status</span>
                    <span className="text-[10px] bg-gray-200 px-1.5 rounded text-gray-600">
                      3 ready
                    </span>
                  </div>

                  <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-purple-300 transition cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-700 font-medium">
                        Instagram Post
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500" />
                  </div>

                  {isAssetsOpen && (
                    <>
                      <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-purple-300 transition cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-sm text-gray-700 font-medium">
                            Facebook Feed Ad
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500" />
                      </div>

                      <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-purple-300 transition cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          <span className="text-sm text-gray-700 font-medium">
                            Short Video (15s)
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button className="w-full py-2.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 mt-4">
                <CheckCircle2 className="w-4 h-4" />
                Approve & Publish
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
