// app/chat/campaign/[id]/page.jsx
"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import LeftSidebar from "@/components/chat/LeftSideBar";
import RightSidebar from "@/components/chat/RightSideBar";
import ChatHeader from "@/components/chat/ui/HeaderChat";

function CampaignWorkspacePlaceholder({ campaignId }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl">
          <div className="text-sm text-gray-500">Campaign:</div>
          <div className="text-lg font-semibold text-gray-900">{campaignId}</div>

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <div className="font-semibold text-gray-800">Campaign workspace</div>
            <p className="text-sm text-gray-600 mt-1">
              Put chat history, generated assets, and tasks here.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <div className="max-w-2xl flex gap-2">
          <input
            className="flex-1 h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Ask Sweet Manager about this campaign…"
          />
          <button className="h-11 px-4 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CampaignPage() {
  const { id } = useParams();
  const router = useRouter();

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(true);

  const activeContext = String(id);

  const headerTitle = useMemo(() => "Campaign", []);

  return (
    <div className="flex h-screen bg-gray-50">
      <LeftSidebar
        isOpen={isLeftOpen}
        setIsOpen={setIsLeftOpen}
        activeContext={activeContext}
        setActiveContext={(ctx) => {
          if (ctx === "general") router.push("/chat");
          else router.push(`/chat/campaign/${ctx}`);
        }}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-white">
        <ChatHeader
          headerTitle={headerTitle}
          activeContext={activeContext}
          onOpenLeft={() => setIsLeftOpen(true)}
          onOpenRight={() => setIsRightOpen(true)}
        />

        <div className="flex-1 min-h-0">
          <CampaignWorkspacePlaceholder campaignId={activeContext} />
        </div>
      </div>

      <RightSidebar
        isOpen={isRightOpen}
        setIsOpen={setIsRightOpen}
        activeContext={activeContext}
        mode="campaign"
        campaignId={activeContext}
      />
    </div>
  );
}
