"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, CheckCircle2 } from "lucide-react";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.cookie = "auth=; path=/";
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
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
