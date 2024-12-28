import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Clipboard } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    teamName: z.string().min(2, "Team name must be at least 2 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function Registration() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            teamName: "",
        },
    });

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            const lines = text.split("\n");

            const data = {
                name: lines[0] || form.getValues("name"),
                email:
                    lines.find((line) => line.includes("@")) ||
                    form.getValues("email"),
                teamName: lines[lines.length - 1] || form.getValues("teamName"),
            };

            form.reset(data);
        } catch (error: unknown) {
            console.error("Error pasting from clipboard:", error);
            toast.error("Failed to paste from clipboard");
        }
    };

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);

            const { data: profile, error } = await supabase
                .from("profiles")
                .select("id")
                .eq("id", user?.id)
                .single();

            if (!profile) {
                const { error: createProfileError } = await supabase
                    .from("profiles")
                    .insert({
                        id: user?.id,
                        email: user?.email,
                        full_name: user?.user_metadata.full_name,
                        avatar_url: user?.user_metadata.avatar_url,
                    });

                if (createProfileError) throw createProfileError;
            }

            const { data: team } = await supabase
                .from("teams")
                .select("id")
                .eq("name", data.teamName)
                .single();

            let teamId;
            if (!team) {
                const { data: newTeam, error: createTeamError } = await supabase
                    .from("teams")
                    .insert({ name: data.teamName, created_by: user?.id })
                    .select("id")
                    .single();

                if (createTeamError) throw createTeamError;
                teamId = newTeam.id;
            } else {
                teamId = team.id;
            }

            const { error: hackerError } = await supabase
                .from("hackers")
                .insert({
                    name: data.name,
                    email: data.email,
                    team_id: teamId,
                    created_by: user?.id,
                });

            if (hackerError) throw hackerError;
            if (error) throw error;
            toast.success("Registration successful!");
        } catch (error) {
            toast.error("Failed to register hacker");
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Register New Hacker</h1>
                    <Button variant="outline" onClick={handlePaste}>
                        <Clipboard className="mr-2 h-4 w-4" />
                        Paste
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Form */}
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                {...form.register("name")}
                                placeholder="John Doe"
                            />
                            {form.formState.errors.name && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...form.register("email")}
                                placeholder="john@example.com"
                            />
                            {form.formState.errors.email && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="teamName">Team Name</Label>
                            <Input
                                id="teamName"
                                {...form.register("teamName")}
                                placeholder="Awesome Team"
                            />
                            {form.formState.errors.teamName && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.teamName.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </form>

                    {/* Preview */}
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Preview</h2>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Name
                                </dt>
                                <dd className="mt-1">
                                    {form.watch("name") || "Not specified"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Email
                                </dt>
                                <dd className="mt-1">
                                    {form.watch("email") || "Not specified"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Team
                                </dt>
                                <dd className="mt-1">
                                    {form.watch("teamName") || "Not specified"}
                                </dd>
                            </div>
                        </dl>
                    </Card>
                </div>
            </div>
        </div>
    );
}
