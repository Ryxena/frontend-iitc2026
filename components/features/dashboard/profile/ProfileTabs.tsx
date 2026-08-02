// components/features/dashboard/profile/ProfileTabs.tsx
"use client";

const TABS = [{ id: "profil", label: "Profil" }];

interface ProfileTabsProps {
  activeTab?: string;
}

export default function ProfileTabs({
  activeTab = "profil",
}: ProfileTabsProps) {
  return (
    <div className="border-b border-slate-200">
      <nav className="flex gap-6">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              className={`relative pb-3 text-sm font-semibold transition-colors cursor-default ${
                isActive
                  ? "text-[#2F2FE4]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute left-0 -bottom-px h-0.5 w-full bg-[#2F2FE4] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
