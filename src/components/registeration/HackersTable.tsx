import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    createColumnHelper,
    flexRender,
} from "@tanstack/react-table";
import { Copy, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "../ui/table";
import { RegisteredHacker } from "@/types";

const columnHelper = createColumnHelper<RegisteredHacker>();

const columns = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("teamName", {
        header: "Team",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("ticketUrl", {
        header: "Ticket Link",
        cell: (info) => (
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => {
                    navigator.clipboard.writeText(info.getValue());
                    toast.success("Ticket URL copied!");
                }}
            >
                <Copy className="h-4 w-4" />
            </Button>
        ),
    }),
];

export function HackersTable({ data }: { data: RegisteredHacker[] }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead
                                key={header.id}
                                className="cursor-pointer"
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                <div className="flex items-center">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {header.column.getIsSorted() ? (
                                        header.column.getIsSorted() ===
                                        "asc" ? (
                                            <ChevronUp className="ml-2 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        )
                                    ) : (
                                        <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                                    )}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
