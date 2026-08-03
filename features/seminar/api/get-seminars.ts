// features/seminar/api/get-seminars.ts
import axios from "axios";

export interface SeminarItem {
  id: number;
  title: string;
  description: string | null;
  speaker: string;
  dateTime: string;
  startDate: string;
  endDate: string;
  location: string;
  registrationLink: string;
  posterUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface GetSeminarsResponse {
  success: boolean;
  message: string;
  data: {
    seminars: SeminarItem[];
  };
}

export const getSeminars = async (): Promise<GetSeminarsResponse> => {
  const { data } = await axios.get<GetSeminarsResponse>("/api/seminars");
  return data;
};
