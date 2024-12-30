import { ColumnDef } from "@tanstack/react-table";
import { Hacker } from "@/types";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Check, Trash, Pencil } from "lucide-react";
import { useState } from "react";
import { ConfirmationDialogue } from "../confirmation-dialogue/confirmation-dialogue";
import { UpdateHackerDialog } from "../upate-dialogue/updateDialogue";

const TicketElement = ({ ticketLink }: { ticketLink: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ticketLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(ticketLink, "_blank")}
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        View Ticket
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="h-8 w-8"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

const ManageHacker = ({ rowDetails }: { rowDetails: Hacker }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <div className="flex items-center justify-start ">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpenUpdate(true)}
          className="h-8 w-8"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpenDelete(true)}
          className="h-8 w-8 hover:text-red-500"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <ConfirmationDialogue
        isOpen={openDelete}
        onCancel={() => setOpenDelete(false)}
        hackerName={rowDetails.name}
        hackerId={rowDetails.id}
      />
      <UpdateHackerDialog
        open={openUpdate}
        setOpen={setOpenUpdate}
        initialData={{
          hackerId: rowDetails.id,
          name: rowDetails.name,
          email: rowDetails.email,
          teamName: rowDetails.teamName,
        }}
      />
    </>
  );
};

export const useColumns = () => {
  const columns: ColumnDef<Hacker>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
      enableColumnFilter: true,
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return <p>{email}</p>;
      },
    },
    {
      accessorKey: "ticketLink",
      header: "Ticket",
      enableSorting: true,
      cell: ({ row }) => {
        const ticketLink = row.getValue("ticketLink") as string;
        return <TicketElement ticketLink={ticketLink} />;
      },
    },
    {
      accessorKey: "teamName",
      header: "Team Name",
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "manage",
      header: "Manage",
      enableSorting: false,
      cell: ({ row }) => {
        return <ManageHacker rowDetails={row.original} />;
      },
    },
  ];

  return columns;
};
