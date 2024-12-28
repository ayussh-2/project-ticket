import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { FormData } from "@/types";

export function SingleRegistrationForm({
    form,
    loading,
    onSubmit,
}: {
    form: UseFormReturn<FormData>;
    loading: boolean;
    onSubmit: (data: FormData) => Promise<void>;
}) {
    return (
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Single Registration</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registering...
                        </>
                    ) : (
                        "Register"
                    )}
                </Button>
            </form>
        </Card>
    );
}
