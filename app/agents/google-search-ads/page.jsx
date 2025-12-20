"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Clock, BadgeCheck, PauseCircle, Sparkles, Plus, ArrowRight } from "lucide-react";
import { SiGoogleads } from "react-icons/si";

/* -----------------------------
   Colors (Google-ish)
------------------------------ */
const GOOGLE_BLUE = "#4285F4";

/* -----------------------------
   UI bits
------------------------------ */

function StatusPill({ status }) {
  const map = {
    draft: {
      label: "Draft",
      cls: "bg-amber-50 text-amber-800 border-amber-200",
      Icon: Clock,
    },
    active: {
      label: "Active",
      cls: "bg-green-50 text-green-700 border-green-200",
      Icon: BadgeCheck,
    },
    paused: {
      label: "Paused",
      cls: "bg-gray-50 text-gray-700 border-gray-200",
      Icon: PauseCircle,
    },
  };
  const cfg = map[status] || map.draft;
  const Icon = cfg.Icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-1 rounded-full border ${cfg.cls}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {cfg.label}
    </span>
  );
}

/** Big Google-style orb icon */
function GoogleOrb({ size = "lg" }) {
  const map = {
    sm: "w-11 h-11",
    md: "w-14 h-14",
    lg: "w-[76px] h-[76px]",
  };

  return (
    <div
      className={`relative ${map[size]} shrink-0 rounded-full flex items-center justify-center`}
      style={{
        background:
          "radial-gradient(120% 120% at 30% 20%, rgba(66,133,244,.22) 0%, rgba(66,133,244,.08) 45%, rgba(255,255,255,1) 80%)",
        border: "1px solid rgba(66,133,244,.25)",
        boxShadow: "0 10px 30px rgba(66,133,244,.12)",
      }}
    >
      <span className="absolute inset-0 rounded-full ring-1 ring-black/5" />
      <SiGoogleads className="relative" style={{ color: GOOGLE_BLUE, fontSize: 28 }} />
    </div>
  );
}

function PrimaryButton({ children, onClick, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 px-5 rounded-2xl text-sm font-semibold text-white inline-flex items-center gap-2 transition"
      style={{
        background: `linear-gradient(135deg, ${GOOGLE_BLUE} 0%, rgba(66,133,244,.85) 100%)`,
        boxShadow: "0 10px 26px rgba(66,133,244,.25)",
      }}
    >
      {Icon ? <Icon className="w-4 h-4" /> : null}
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 px-5 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-gray-900 hover:bg-gray-50 inline-flex items-center gap-2 transition"
    >
      {Icon ? <Icon className="w-4 h-4" /> : null}
      {children}
    </button>
  );
}

function Card({ title, subtitle, metaLeft, metaRight, badge, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-full rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span
              className="relative w-9 h-9 shrink-0 rounded-full flex items-center justify-center shadow-sm"
              style={{
                background: "rgba(66,133,244,.10)",
                border: "1px solid rgba(66,133,244,.25)",
              }}
            >
              <span className="absolute inset-0 rounded-full ring-1 ring-black/5" />
              <SiGoogleads className="relative" style={{ color: GOOGLE_BLUE, fontSize: 18 }} />
            </span>

            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">{title}</div>
              {subtitle ? (
                <div className="text-xs text-gray-600 mt-0.5 truncate">{subtitle}</div>
              ) : null}
            </div>
          </div>
        </div>

        {badge ? <div className="shrink-0">{badge}</div> : null}
      </div>

      {(metaLeft || metaRight) ? (
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <div className="truncate">{metaLeft}</div>
          <div className="shrink-0">{metaRight}</div>
        </div>
      ) : null}
    </button>
  );
}

/* -----------------------------
   External Marketing Page
------------------------------ */

export default function GoogleSearchAdsLandingPage() {
  const router = useRouter();
  const headerTitle = useMemo(() => "Agent – Google Ads: Search", []);

  // Public CTAs (change these routes to your real ones)
  function goSignup() {
    router.push("/sign-up");
  }

  function goPricing() {
    router.push("/pricing");
  }

  function requestFeature() {
    router.push("/feature-request"); // create a simple public page or form
  }

  function goDemo() {
    // could be /demo, /product, or a video page
    router.push("/demo");
  }

  const demoCampaigns = [
    {
      id: "demo_1",
      name: "Google Ads: Search",
      objective: "High-intent leads",
      status: "draft",
      updatedAt: "Updated recently",
    },
    {
      id: "demo_2",
      name: "Emergency Plumbing — Search",
      objective: "Calls + bookings",
      status: "active",
      updatedAt: "Updated yesterday",
    },
    {
      id: "demo_3",
      name: "Brand Protection — Search",
      objective: "Low CPC, high CTR",
      status: "paused",
      updatedAt: "Updated last week",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
            aria-label="Go home"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-white overflow-hidden"
            >
              <img
                src="/icons/logogetsweet.png"
                alt="GetSweet logo"
                width={24}
                height={24}
                className="object-contain"
                draggable={false}
              />
            </div>

            <div className="text-sm font-extrabold tracking-tight text-gray-900">
              Sweet AI - You AI Ad Manager
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPricing}
              className="h-10 px-4 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={goDemo}
              className="h-10 px-4 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Demo
            </button>
            <PrimaryButton onClick={goSignup} icon={ArrowRight}>
              Get started
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Page */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden">
          <div
            className="px-6 py-8 md:px-10 md:py-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(66,133,244,.10) 0%, rgba(66,133,244,.04) 35%, #ffffff 100%)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-5 min-w-0">
                <GoogleOrb size="lg" />
                <div className="min-w-0">
                  <div className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                    {headerTitle}
                  </div>

                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-1">
                    Create a Google Search campaign in minutes
                  </h1>

                  <p className="text-sm md:text-base text-gray-600 mt-2 max-w-2xl">
                    Sweet Manager helps you pick keywords, structure ad groups, draft RSAs,
                    and publish faster — without the usual setup pain.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center h-7 px-3 rounded-full text-[11px] font-extrabold"
                      style={{
                        background: "rgba(66,133,244,.10)",
                        border: "1px solid rgba(66,133,244,.25)",
                        color: GOOGLE_BLUE,
                      }}
                    >
                      Google Search Ads
                    </span>
                    <span className="inline-flex items-center h-7 px-3 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-700">
                      High-intent leads
                    </span>
                    <span className="inline-flex items-center h-7 px-3 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-700">
                      Guided setup
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <PrimaryButton onClick={goSignup} icon={Sparkles}>
                      Start free
                    </PrimaryButton>
                    <SecondaryButton onClick={requestFeature} icon={Plus}>
                      Request a channel
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3-step strip */}
          <div className="px-6 md:px-10 py-5 border-t border-gray-100 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                ["1. Define your goal", "Leads, calls, bookings, or sales."],
                ["2. Generate structure", "Keywords → ad groups → RSAs."],
                ["3. Launch confidently", "Review + publish when ready."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm font-semibold text-gray-900">{t}</div>
                  <div className="text-xs text-gray-600 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* “Preview” section (marketing proof / expectation setting) */}
        <div className="mt-10">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">What it looks like</h2>
              <p className="text-sm text-gray-600 mt-1">
                A simple, focused workflow for Google Search campaigns.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {demoCampaigns.map((c) => (
              <Card
                key={c.id}
                title={c.name}
                subtitle={`High-intent • ${c.objective}`}
                metaLeft={c.updatedAt}
                metaRight="GOOGLE SEARCH"
                badge={<StatusPill status={c.status} />}
                onClick={goDemo}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="min-w-0">
              <div className="text-lg font-semibold text-gray-900">
                Ready to launch your first Search campaign?
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Start free, generate a draft, and connect accounts when you’re ready.
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <PrimaryButton onClick={goSignup} icon={ArrowRight}>
                Get started
              </PrimaryButton>
              <SecondaryButton onClick={goPricing}>
                View pricing
              </SecondaryButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-xs text-gray-500">
          © {new Date().getFullYear()} Sweet Manager • Not affiliated with Google.
        </div>
      </div>
    </div>
  );
}
