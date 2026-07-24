export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CompetitionCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PromoBannerProps {
  onIkutiLombaClick?: () => void;
}

export interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTeam: (teamName: string) => void;
}

export interface ActiveTeamDashboardProps {
  teamName: string;
  role: "leader" | "member";
  onLeaveTeam: () => void;
}

export interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
}

export interface LeaveTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  teamName: string;
}
