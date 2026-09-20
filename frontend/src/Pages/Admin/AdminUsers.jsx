import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
    getAdminUsers,
    updateAdminUserStatus,
} from "@/api/adminApi";
import { Feedback, PageHeader, Pager, date } from "./adminUi";
import {
    userSearchSchema,
    userStatusSchema,
} from "@/validators/adminValidator";

export default function AdminUsers() {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [term, setTerm] = useState("");
    const client = useQueryClient();

    const query = useQuery({
        queryKey: ["admin", "users", page, term],
        queryFn: () =>
            getAdminUsers({
                page,
                size: 15,
                search: term || undefined,
            }),
    });

    const status = useMutation({
        mutationFn: ({ id, enabled }) =>
            updateAdminUserStatus(id, enabled),
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: ["admin", "users"],
            });

            toast.success("User status updated");
        },
        onError: () => toast.error("Could not update user status"),
    });

    const submit = (e) => {
        e.preventDefault();

        const result = userSearchSchema.safeParse({ search });

        if (!result.success) {
            return toast.error(result.error.issues[0].message);
        }

        setPage(0);
        setTerm(result.data.search);
    };

    return (
        <div>
            <PageHeader
                title="Users"
                description="Search accounts and enable or disable customer access."
                action={
                    <form onSubmit={submit} className="flex">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search user…"
                            className="w-44 rounded-l-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
                        />

                        <button
                            className="rounded-r-md bg-primary px-3 text-white"
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4" />
                        </button>
                    </form>
                }
            />

            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                <Feedback
                    loading={query.isLoading}
                    error={query.error}
                    empty={!query.data?.content?.length}
                >
                    <table className="w-full min-w-[700px] text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Provider</th>
                                <th className="p-4">Roles</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4">Access</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {query.data?.content?.map((user) => (
                                <tr key={user.id}>
                                    <td className="p-4">
                                        <p className="font-semibold text-gray-800">
                                            {user.fullName}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {user.email}
                                        </p>
                                    </td>

                                    <td className="p-4 text-gray-500">
                                        {user.provider}
                                    </td>

                                    <td className="p-4 text-gray-500">
                                        {[...(user.roles ?? [])].join(", ") ||
                                            "USER"}
                                    </td>

                                    <td className="p-4 text-gray-500">
                                        {date(user.createdAt)}
                                    </td>

                                    <td className="p-4">
                                        <button
                                            disabled={status.isPending}
                                            onClick={() => {
                                                const result =
                                                    userStatusSchema.safeParse({
                                                        id: user.id,
                                                        enabled: !user.enabled,
                                                    });

                                                if (!result.success) {
                                                    return toast.error(
                                                        result.error.issues[0]
                                                            .message
                                                    );
                                                }

                                                status.mutate(result.data);
                                            }}
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                user.enabled
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-600"
                                            }`}
                                        >
                                            {user.enabled
                                                ? "Enabled"
                                                : "Disabled"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Feedback>
            </div>

            <Pager
                page={page}
                totalPages={query.data?.totalPages ?? 0}
                onChange={setPage}
            />
        </div>
    );
}