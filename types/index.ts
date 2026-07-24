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
