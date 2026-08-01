import { useQuery } from "@tanstack/react-query";
import { getMyTeam } from "../api/get-my-team";

export function useMyTeam(enabled: boolean = true) {
  return useQuery({
    queryKey: ["my-team-detail"],
    queryFn: getMyTeam,
    enabled, // Hanya fetch jika user terdeteksi memiliki tim
  });
}
