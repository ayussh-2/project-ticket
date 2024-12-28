import { Loader2, Upload, Clipboard } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { FormData } from "@/types";

export function BatchRegistrationForm({
    loading,
    onUpload,
}: {
    loading: boolean;
    onUpload: (hackers: Partial<FormData>[]) => Promise<void>;
}) {
    const [batchText, setBatchText] = useState("");

    const parseBatchText = (text: string): Array<Partial<FormData>> => {
        const lines = text.split("\n").filter((line) => line.trim());
        return lines.reduce((acc: Array<Partial<FormData>>, line: string) => {
            const parts = line.split(",").map((part) => part.trim());
            if (parts.length >= 2) {
                acc.push({
                    name: parts[0],
                    email: parts[1],
                    teamName: parts[2],
                });
            }
            return acc;
        }, []);
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setBatchText(text);
        } catch (error) {
            console.error("Error pasting from clipboard:", error);
            toast.error("Failed to paste from clipboard");
        }
    };

    const handleUpload = () => {
        const hackers = parseBatchText(batchText);
        if (!hackers.length) {
            toast.error("No valid data found");
            return;
        }
        onUpload(hackers);
        setBatchText("");
    };

    return (
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Batch Registration</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="batchUpload">
                        Paste data (format: name, email, team)
                    </Label>
                    <div className="flex gap-2 mb-2">
                        <Button variant="outline" onClick={handlePaste}>
                            <Clipboard className="mr-2 h-4 w-4" />
                            Paste
                        </Button>
                    </div>
                    <Textarea
                        id="batchUpload"
                        value={batchText}
                        onChange={(e) => setBatchText(e.target.value)}
                        placeholder="John Doe, john@example.com, Team A&#13;Jane Smith, jane@example.com, Team B"
                        className="min-h-[200px]"
                    />
                </div>

                <Button
                    onClick={handleUpload}
                    disabled={loading || !batchText.trim()}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Batch
                        </>
                    )}
                </Button>
            </div>
        </Card>
    );
}
