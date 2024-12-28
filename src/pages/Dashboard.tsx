import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Hacker } from "@/lib/supabase";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const [hackers, setHackers] = useState<Hacker[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHackers = async () => {
            const { data, error } = await supabase.from("hackers").select(`
          *,
          team:teams(name),
          creator:profiles(full_name)
        `);

            if (error) {
                console.error("Error fetching hackers:", error);
                return;
            }

            setHackers(data);
            setLoading(false);
        };

        fetchHackers();

        const channel = supabase
            .channel("hackers_changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "hackers",
                },
                () => {
                    fetchHackers();
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, []);

    return (
        <div className="container mx-auto py-10 px-10">
            <div className="flex justify-between items-center mb-8 w-full">
                <h1 className="text-3xl font-bold">Hackers Dashboard</h1>
                <Button onClick={() => navigate("/registration")}>
                    Add New Hacker
                </Button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64 w-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                </div>
            ) : (
                <DataTable columns={columns} data={hackers} />
            )}
        </div>
    );
}
