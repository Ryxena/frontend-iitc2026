// features/media-partner/api/get-media-partners.ts
import axios from "axios";
import type { GetMediaPartnersResponse } from "@/types/media-partner-type";

export const getMediaPartners = async (): Promise<GetMediaPartnersResponse> => {
  // Memanggil endpoint Next.js BFF kita
  const { data } = await axios.get<GetMediaPartnersResponse>(
    "/api/media-partners",
  );
  return data;
};
