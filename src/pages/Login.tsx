import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function Login() {
    const { signInWithGoogle } = useAuth();

    return (
        <div className="min-h-screen w-screen grid place-items-center bg-background">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to access the dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" onClick={signInWithGoogle}>
                        Continue with Google
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
