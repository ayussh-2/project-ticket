import { BatchRegistrationForm } from "@/components/registeration/BatchRegistrationForm";
import { HackersTable } from "@/components/registeration/HackersTable";
import { SingleRegistrationForm } from "@/components/registeration/SingleRegistrationForm";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    Dialog,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormData } from "@/types";

export function Registration() {
    const { form, loading, registeredHackers, registerHacker } =
        useRegistrationForm();
    const [showModal, setShowModal] = useState(false);

    const handleSingleRegistration = async (data: FormData) => {
        const success = await registerHacker(data);
        if (success) setShowModal(true);
    };

    const handleBatchRegistration = async (hackers: Partial<FormData>[]) => {
        const results = [];
        for (const hacker of hackers) {
            if (hacker.name && hacker.email && hacker.teamName) {
                const success = await registerHacker(hacker as FormData);
                if (success) results.push(success);
            }
        }
        if (results.length > 0) {
            setShowModal(true);
            toast.success(`Successfully registered ${results.length} hackers!`);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Register Hackers</h1>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <SingleRegistrationForm
                        form={form}
                        loading={loading}
                        onSubmit={handleSingleRegistration}
                    />
                    <BatchRegistrationForm
                        loading={loading}
                        onUpload={handleBatchRegistration}
                    />
                </div>

                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogContent className="max-w-3xl max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle>Registration Successful!</DialogTitle>
                        </DialogHeader>
                        <div className="overflow-hidden">
                            <HackersTable data={registeredHackers} />
                        </div>
                        <DialogFooter className="mt-4">
                            <Button onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
