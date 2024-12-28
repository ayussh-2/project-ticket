import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { formSchema, RegisteredHacker, FormData } from "@/types";

export function useRegistrationForm() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [registeredHackers, setRegisteredHackers] = useState<
        RegisteredHacker[]
    >([]);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            teamName: "",
        },
    });

    const registerHacker = async (data: FormData) => {
        setLoading(true);
        try {
            const { data: profile } = await supabase
                .from("profiles")
                .select("id")
                .eq("email", user?.email)
                .single();

            if (!profile) {
                await supabase.from("profiles").insert({
                    id: user?.id,
                    email: user?.email,
                    full_name: user?.user_metadata.full_name,
                    avatar_url: user?.user_metadata.avatar_url,
                });
            }

            const { data: team } = await supabase
                .from("teams")
                .select("id")
                .eq("name", data.teamName)
                .single();

            let teamId;
            if (!team) {
                const { data: newTeam } = await supabase
                    .from("teams")
                    .insert({ name: data.teamName, created_by: user?.id })
                    .select("id")
                    .single();
                teamId = newTeam?.id;
            } else {
                teamId = team.id;
            }

            const { data: hackerInfo } = await supabase
                .from("hackers")
                .insert({
                    name: data.name,
                    email: data.email,
                    team_id: teamId,
                    created_by: user?.id,
                })
                .select("id")
                .single();

            if (hackerInfo) {
                const newHacker = {
                    id: hackerInfo.id,
                    name: data.name,
                    email: data.email,
                    teamName: data.teamName,
                    ticketUrl: `http://localhost:5173/ticket/${hackerInfo.id}`,
                };
                setRegisteredHackers((prev) => [...prev, newHacker]);
            }

            form.reset();
            toast.success("Registration successful!");
            return true;
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Failed to register hacker");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        loading,
        registeredHackers,
        registerHacker,
        setRegisteredHackers,
    };
}
