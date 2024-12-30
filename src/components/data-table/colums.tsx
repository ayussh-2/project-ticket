import { ColumnDef } from "@tanstack/react-table";
import { Hacker } from "@/types";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

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
      accessorKey: "registeredBy",
      header: "Registered By",
      enableSorting: true,
    },
  ];

  return columns;
};
