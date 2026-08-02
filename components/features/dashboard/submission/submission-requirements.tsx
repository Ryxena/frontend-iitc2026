import type { LucideIcon } from "lucide-react";
import {
  FileText,
  CheckCircle2,
  PlusCircle,
  Sparkles,
  LayoutGrid,
  FolderOpen,
} from "lucide-react";

interface RequirementItem {
  label: string;
  // "required" pakai CheckCircle2 (biru), "optional" pakai PlusCircle (abu),
  // "link" pakai FolderOpen (abu, untuk item berupa link/file eksternal)
  variant: "required" | "optional" | "link";
}

interface RequirementGroup {
  match: (slug: string) => boolean;
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  items: RequirementItem[];
}

const ITEM_ICON: Record<RequirementItem["variant"], LucideIcon> = {
  required: CheckCircle2,
  optional: PlusCircle,
  link: FolderOpen,
};

const ITEM_ICON_CLASS: Record<RequirementItem["variant"], string> = {
  required: "text-blue-600",
  optional: "text-slate-400",
  link: "text-slate-400",
};

// Urutan penting: dicek dari atas ke bawah, grup pertama yang match dipakai.
// Grup terakhir (match selalu true) jadi fallback/default.
export const REQUIREMENT_GROUPS: RequirementGroup[] = [
  {
    match: (slug) => slug.includes("ui-ux"),
    icon: LayoutGrid,
    iconClassName: "text-indigo-600",
    title: "Persyaratan File UI/UX Design",
    items: [
      { label: "Proposal Karya", variant: "required" },
      {
        label: "Surat Pernyataan Orisinalitas (format PDF)",
        variant: "required",
      },
      { label: "Prototype Figma/Lainnya (format LINK)", variant: "link" },
      { label: "Video Showcase (format MP4).", variant: "link" },
    ],
  },
  {
    match: (slug) => slug.includes("web"),
    icon: FileText,
    iconClassName: "text-[#2F2FE4]",
    title: "Persyaratan File Web Design & Development",
    items: [
      { label: "Proposal Karya", variant: "required" },
      { label: "Video Showcase", variant: "link" },
      {
        label: "Surat Pernyataan Orisinalitas (Format PDF)",
        variant: "required",
      },
      { label: "Dokumentasi Teknis (Opsional)", variant: "optional" },
      {
        label: "File besar/aset khusus (Jika tidak bisa di GitHub)",
        variant: "link",
      },
    ],
  },
  {
    match: () => true, // fallback: GenAI / kategori lain
    icon: Sparkles,
    iconClassName: "text-purple-600",
    title: "Persyaratan File GenAI",
    items: [
      { label: "Video", variant: "required" },
      { label: "Proposal Karya", variant: "required" },
      {
        label: "Surat Pernyataan Orisinalitas (format PDF)",
        variant: "required",
      },
      { label: "Dokumentasi Teknis (opsional).", variant: "optional" },
      { label: "Video Showcase (format MP4).", variant: "link" },
    ],
  },
];

export function getRequirementGroup(slug: string): RequirementGroup {
  return REQUIREMENT_GROUPS.find((group) => group.match(slug))!;
}

export function RequirementList({ items }: { items: RequirementItem[] }) {
  return (
    <div className="space-y-2.5 pt-1 text-sm text-slate-700">
      {items.map((item) => {
        const Icon = ITEM_ICON[item.variant];
        return (
          <div key={item.label} className="flex items-center gap-3">
            <Icon
              className={`w-4 h-4 shrink-0 ${ITEM_ICON_CLASS[item.variant]}`}
            />
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
