"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { EmployeeType } from "@/lib/types";
import { competencyOptions } from "@/models/Employee";

const getCompetencyLabel = (value: string): string => {
  const option = competencyOptions.find((opt) => opt.value === value);

  return option ? option.label : value;
};

export const columns: ColumnDef<EmployeeType>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const employeeId = row.original._id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-5">
            <Link href={`/dashboard/employees/${employeeId}`} passHref>
              <DropdownMenuItem asChild>
                <a>Görüntüle</a>
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/employees/${employeeId}/edit`} passHref>
              <DropdownMenuItem asChild>
                <a>Düzenle</a>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ad
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Soyad
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "birthDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Doğum Tarihi
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue<string | Date>();
      const date = value instanceof Date ? value : new Date(value);

      return (
        <div>
          {!isNaN(date.getTime())
            ? date.toLocaleDateString("tr-TR")
            : "Geçersiz Tarih"}
        </div>
      );
    },
  },
  {
    accessorKey: "competencies",
    accessorFn: (row) =>
      Array.isArray(row.competencies)
        ? row.competencies.map(getCompetencyLabel).join(", ")
        : "", // Return an empty string if competencies is undefined or not an array
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Yeterlilik
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },

  {
    accessorKey: "phoneNumber",
    header: () => <div>Telefon</div>,
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "maritalStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Medeni Durum
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "hasChildren",
    accessorFn: (row) => (row.hasChildren ? "Evet" : "Hayır"),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Çocuk Sahibi
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "worksWithPets",
    accessorFn: (row) => (row.worksWithPets ? "Evet" : "Hayır"),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Evcil Hayvan
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "nationality",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Uyruk
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "residencyPermit",
    accessorFn: (row) => (row.residencyPermit ? "Var" : "Yok"),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Oturum İzni
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "travelRestriction",
    accessorFn: (row) => (row.travelRestriction ? "Var" : "Yok"),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Seyahat Kısıtlaması
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
];
