export interface MediaPartner {
  id: number;
  name: string;
  image: string;
  createdAt: string;
}

export interface GetMediaPartnersResponse {
  success: boolean;
  message: string;
  data: {
    mediaPartners: MediaPartner[];
  };
}
