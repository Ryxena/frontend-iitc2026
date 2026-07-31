export interface Team {
  id: number;
  code: string;
  name: string;
}

export interface JoinCompetitionResponse {
  status: number;
  message: string;
  data: { team: Team };
}

export interface MyTeamSummary {
  teamId: number;
  competitionName: string;
  cSlug: string;
  teamName: string;
  avatar: string;
  isSubmit: boolean;
  maxMembers: number;
  currentMembers: number;
  isActive: boolean | null;
}

export interface GetMyCompetitionsResponse {
  status: number;
  message: string;
  data: { teams: MyTeamSummary[] };
}

export interface JoinTeamAsMemberResponse {
  success: boolean;
  message: string;
}

export interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTeam: (team: Team) => void;
  competitionSlug?: string | null;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>; // format error validasi khas Laravel
}
