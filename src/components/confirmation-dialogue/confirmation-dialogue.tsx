import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useFirebaseOperation } from "@/hooks/use-firebaseOps";

export function ConfirmationDialogue({
  onCancel,
  isOpen,
  hackerName,
  hackerId,
}: {
  onCancel: () => void;
  isOpen: boolean;
  hackerName: string;
  hackerId: string;
}) {
  const { execute } = useFirebaseOperation("deleteHacker");

  const onConfirm = async () => {
    const response = await execute(hackerId);
    if (!response) return;
    onCancel();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="font-geistSans">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {hackerName}&apos; entry. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 text-white hover:bg-red-700"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
