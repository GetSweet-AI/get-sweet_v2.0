"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Rocket, Plus, Mail, Globe, Search, BadgeCheck, PauseCircle, Clock } from "lucide-react";

import LeftSidebar from "@/components/chat/LeftSideBar";
import ChatHeader from "@/components/chat/ui/HeaderChat";
import { useAuth } from "@/context/useContext";

// Optional icons (make sure you have these installed: react-icons)
import {
  SiGoogleads,
  SiTiktok,
  SiFacebook,
  SiYoutube,
  SiLinkedin,
} from "react-icons/si";

/* -----------------------------
   Small UI helpers
------------------------------ */

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 px-4 rounded-full border text-sm font-semibold transition ${
        active
          ? "bg-gray-900 text-white border-gray-900"
          : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

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

function Card({ title, subtitle, metaLeft, metaRight, onClick, badge, icon }) {
  const Icon = icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-full rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {Icon ? (
              <span className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-gray-700" />
              </span>
            ) : null}
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {title}
              </div>
              {subtitle ? (
                <div className="text-xs text-gray-600 mt-0.5 truncate">
                  {subtitle}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {badge ? <div className="shrink-0">{badge}</div> : null}
      </div>

      {(metaLeft || metaRight) && (
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <div className="truncate">{metaLeft}</div>
          <div className="shrink-0">{metaRight}</div>
        </div>
      )}
    </button>
  );
}

function CircleCTA({ label, sub, Icon, iconNode, onClick, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={`group flex flex-col items-center gap-2 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      title={disabled ? "Coming soon" : ""}
    >
      <div
        className={`w-14 h-14 rounded-full border shadow-sm flex items-center justify-center ${
          disabled
            ? "bg-gray-100 border-gray-200"
            : "bg-white border-gray-200 group-hover:bg-gray-50"
        }`}
      >
        {iconNode ? (
          <span className="text-[22px] leading-none">{iconNode}</span>
        ) : Icon ? (
          <Icon className="w-6 h-6 text-gray-800" />
        ) : null}
      </div>

      <div className="text-xs font-semibold text-gray-900 text-center">{label}</div>

      {sub ? (
        <div className="text-[11px] text-gray-500 text-center max-w-[110px] leading-tight">
          {sub}
        </div>
      ) : null}
    </button>
  );
}

/* -----------------------------
   Data
------------------------------ */

const TEMPLATES = [
  {
    id: "leadgen-local-services",
    title: "Lead Gen — Local Services",
    subtitle: "Google Ads Search • calls + form fills",
    tag: "High intent",
    icon: Rocket,
  },
  {
    id: "ecom-sales-search",
    title: "Ecommerce Sales — Search",
    subtitle: "Google Ads Search • ROAS focused",
    tag: "Best seller",
    icon: Rocket,
  },
  {
    id: "email-welcome-flow",
    title: "Email — Welcome Flow",
    subtitle: "Lifecycle • onboarding + upsell",
    tag: "Quick win",
    icon: Mail,
  },
  {
    id: "landing-page-offer",
    title: "Landing Page — Offer Page",
    subtitle: "Website • conversion page outline",
    tag: "Starter",
    icon: Globe,
  },
];

const LAUNCH_OPTIONS = [
  {
    id: "google_search",
    label: "Google Ads: Search",
    sub: "High-intent leads",
    iconNode: <SiGoogleads />,
    params: { channel: "google", type: "search" },
    enabled: true, // ✅ only enabled option
  },
  {
    id: "tiktok_ads",
    label: "TikTok Ads",
    sub: "Short-form scale",
    iconNode: <SiTiktok />,
    enabled: false,
  },
  {
    id: "meta_ads",
    label: "Meta Ads",
    sub: "FB + IG ads",
    iconNode: <SiFacebook />,
    enabled: false,
  },
  {
    id: "youtube_ads",
    label: "YouTube Ads",
    sub: "Video awareness",
    iconNode: <SiYoutube />,
    enabled: false,
  },
  {
    id: "linkedin_ads",
    label: "LinkedIn Ads",
    sub: "B2B leads",
    iconNode: <SiLinkedin />,
    enabled: false,
  },
  {
    id: "email_marketing",
    label: "Email Marketing",
    sub: "Welcome + upsell",
    Icon: Mail,
    enabled: false,
  },
  {
    id: "seo_content",
    label: "SEO / Content",
    sub: "Rank + traffic",
    Icon: Search,
    enabled: false,
  },
  {
    id: "landing_page",
    label: "Landing Page",
    sub: "Better conversion",
    Icon: Globe,
    enabled: false,
  },
];

/* -----------------------------
   Page
------------------------------ */

export default function CampaignsClient() {
  const router = useRouter();
  const { token } = useAuth();

  const [isLeftOpen, setIsLeftOpen] = useState(false);

  // View filter
  const [view, setView] = useState("campaigns"); // "campaigns" | "templates"

  // Data
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setError("");
      setLoading(true);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("No campaigns endpoint yet");

        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data || data?.campaigns || [];

        if (!cancelled) setCampaigns(list);
      } catch (e) {
        if (cancelled) return;

        // Demo fallback
        setCampaigns([
          {
            _id: "demo_1",
            name: "Emergency Plumbing — Leads",
            channel: "google",
            objective: "leads",
            status: "draft",
            updatedAt: new Date().toISOString(),
          },
          {
            _id: "demo_2",
            name: "Holiday Promo — Search",
            channel: "google",
            objective: "sales",
            status: "active",
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
          },
          {
            _id: "demo_3",
            name: "Welcome Email Flow",
            channel: "email",
            objective: "retention",
            status: "paused",
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          },
        ]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const headerTitle = useMemo(() => "Campaigns Home", []);

  const recentCampaigns = useMemo(() => {
    const list = [...(campaigns || [])];
    list.sort((a, b) => {
      const ta = a?.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const tb = b?.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return tb - ta;
    });
    return list.slice(0, 9);
  }, [campaigns]);

  function formatTime(d) {
    if (!d) return "";
    try {
      return new Date(d).toLocaleString();
    } catch {
      return "";
    }
  }

  function goNewCampaign(params = {}) {
    const qs = new URLSearchParams(params).toString();
    router.push(qs ? `/chat/campaign/new?${qs}` : "/chat/campaign/new");
  }

  function handleRequest() {
    // Update this to whatever you want:
    // - route to a form page
    // - open modal
    // - prefill querystring
    router.push("/chat/request");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <LeftSidebar
        isOpen={isLeftOpen}
        setIsOpen={setIsLeftOpen}
        activeContext={"general"}
        setActiveContext={() => {}}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-white">
        <ChatHeader
          headerTitle={headerTitle}
          activeContext={"general"}
          onOpenLeft={() => setIsLeftOpen(true)}
          onOpenRight={() => {}}
        />

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-10">
            {/* A) Title */}
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                What will you launch today?
              </h1>

              {/* B) Circle buttons */}
              <div className="mt-8">
                <div className="flex items-start justify-center gap-6 flex-wrap">
                  {LAUNCH_OPTIONS.map((o) => (
                    <CircleCTA
                      key={o.id}
                      label={o.label}
                      sub={o.sub}
                      Icon={o.Icon || Rocket}
                      iconNode={o.iconNode}
                      disabled={!o.enabled}
                      onClick={() => {
                        if (!o.enabled) return;
                        goNewCampaign(o.params || {});
                      }}
                    />
                  ))}

                  {/* ✅ Replace New with Request (enabled) */}
                  <CircleCTA
                    label="Request"
                    sub="Ask for new features"
                    Icon={Plus}
                    disabled={false}
                    onClick={handleRequest}
                  />
                </div>
              </div>

              {/* C) Filter buttons */}
              <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                <Pill active={view === "campaigns"} onClick={() => setView("campaigns")}>
                  Your campaigns
                </Pill>
                <Pill active={view === "templates"} onClick={() => setView("templates")}>
                  Templates
                </Pill>
              </div>
            </div>

            {/* CONTENT */}
            <div className="mt-10">
              {error ? (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl p-4">
                  {error}
                </div>
              ) : null}

              {/* Recent Cards */}
              {view === "campaigns" ? (
                <section>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Recents</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Open an existing campaign or start a new one.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => goNewCampaign({ channel: "google", type: "search" })}
                      className="h-10 px-4 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Create campaign
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {loading ? (
                      Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-gray-200 bg-white p-4 animate-pulse"
                        >
                          <div className="h-4 bg-gray-100 rounded w-2/3" />
                          <div className="mt-2 h-3 bg-gray-100 rounded w-1/2" />
                          <div className="mt-4 h-8 bg-gray-100 rounded w-full" />
                        </div>
                      ))
                    ) : recentCampaigns.length ? (
                      recentCampaigns.map((c) => (
                        <Card
                          key={c._id || c.id}
                          title={c.name || "Untitled campaign"}
                          subtitle={`${(c.channel || "google").toUpperCase()} • ${c.objective || "leads"}`}
                          metaLeft={c.updatedAt ? `Updated ${formatTime(c.updatedAt)}` : "Updated recently"}
                          metaRight={c._id?.startsWith("demo_") ? "Demo" : ""}
                          badge={<StatusPill status={c.status || "draft"} />}
                          icon={Rocket}
                          onClick={() => {
                            const cid = c._id || c.id;
                            if (!cid) return;
                            router.push(`/chat/campaign/${cid}`);
                          }}
                        />
                      ))
                    ) : (
                      <div className="text-sm text-gray-600">
                        No campaigns yet. Launch your first Google Search campaign above.
                      </div>
                    )}
                  </div>
                </section>
              ) : null}

              {/* Templates */}
              {view === "templates" ? (
                <section>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Templates</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Start from a proven structure — Sweet Manager will customize it to your brand.
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {TEMPLATES.map((t) => (
                      <Card
                        key={t.id}
                        title={t.title}
                        subtitle={t.subtitle}
                        metaLeft={t.tag}
                        metaRight="Template"
                        icon={t.icon}
                        badge={
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-[11px] font-bold">
                            Use
                          </span>
                        }
                        onClick={() => goNewCampaign({ template: t.id })}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
