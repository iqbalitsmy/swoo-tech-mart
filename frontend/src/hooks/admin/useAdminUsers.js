import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getAdminUsers, updateAdminUserStatus } from "@/api/adminApi/users";

// Base key: invalidating this refreshes every admin users list (all pages/searches)
export const ADMIN_USERS_QUERY_KEY = ["admin", "users"];

const PAGE_SIZE = 15;

// Paginated users list. Key includes page + term, so changing either triggers a refetch
export function useAdminUsersQuery({ page, term }) {
  return useQuery({
    queryKey: [...ADMIN_USERS_QUERY_KEY, page, term],
    queryFn: () =>
      getAdminUsers({
        page,
        size: PAGE_SIZE,
        search: term || undefined, // empty string -> omit param
      }),
  });
}

// Enable/disable a user, then refresh the users list
export function useUpdateAdminUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, enabled }) => updateAdminUserStatus(id, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_QUERY_KEY });
      toast.success("User status updated");
    },
    onError: () => toast.error("Could not update user status"),
  });
}
