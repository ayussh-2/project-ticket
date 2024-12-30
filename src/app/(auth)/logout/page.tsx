"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { LogOut, CheckCircle2 } from "lucide-react";
import React, { useEffect } from "react";

export default function Page() {
  const { logout } = useAuth();
  useEffect(() => {
    async function signOut() {
      await logout();
      window.location.href = "/login";
    }

    signOut();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[380px] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <LogOut className="h-6 w-6" />
            Signing Out
          </CardTitle>
          <CardDescription>
            You have been successfully signed out
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center pb-6">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </CardContent>

        <CardFooter className="text-center text-sm text-muted-foreground w-full">
          Redirecting you to login page...
        </CardFooter>
      </Card>
    </div>
  );
}
