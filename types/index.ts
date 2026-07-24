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
