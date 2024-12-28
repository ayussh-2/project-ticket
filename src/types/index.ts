import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    teamName: z.string().min(2, "Team name must be at least 2 characters"),
});

export type FormData = z.infer<typeof formSchema>;

export interface RegisteredHacker {
    id: string;
    name: string;
    email: string;
    teamName: string;
    ticketUrl: string;
}
