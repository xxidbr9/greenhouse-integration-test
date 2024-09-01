"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CandidateType,
  EmailAddress,
} from "@/features/candidate/types/candidate";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Clipboard, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export const columns: ColumnDef<CandidateType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email_addresses",
    cell: ({ row }) => {
      const candidate = row.original;
      const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Email copied", {
          description: text,
          position: "bottom-center",
        });
      };

      return (
        <div className="flex flex-col gap-y-2">
          {candidate.email_addresses.map((email) => (
            <div className="flex justify-between" key={email.value}>
              <span className="p-1 px-2 rounded-lg text-xs bg-gray-200 self-start">
                {email.value}
                {email.type ? `:"${email.type}"` : ""}
              </span>
              <Button
                variant={"secondary"}
                size={"icon"}
                className="h-6 w-6"
                onClick={() => handleCopy(email.value)}
              >
                <Clipboard className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          ))}
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const emails = row.getValue(columnId) as EmailAddress[];
      return emails.some((email) =>
        email.value.toLowerCase().includes(filterValue.toLowerCase()),
      );
    },
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: (info) => (info.getValue() ? info.getValue() : "N/A"),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "is_private",
    header: "Private",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const candidate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(candidate.id.toString())
              }
            >
              Copy candidate ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View candidate</DropdownMenuItem>
            <DropdownMenuItem>View applied jobs</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
