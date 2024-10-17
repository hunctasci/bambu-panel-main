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
import { EmployerType } from "@/lib/types";

export const columns: ColumnDef<EmployerType>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const employerId = row.original._id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-5">
            <Link href={`/dashboard/employers/${employerId}`} passHref>
              <DropdownMenuItem asChild>
                <a>Görüntüle</a>
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/employers/${employerId}/edit`} passHref>
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
    accessorKey: "address",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Adres
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div>Telefon Numarası</div>,
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "placeType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Yer Tipi
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
  {
    accessorKey: "hasPets",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Evcil Hayvan
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<boolean>() ? "Evet" : "Hayır"}</div>,
  },
  {
    accessorKey: "healthCondition",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sağlık Durumu
      </Button>
    ),
    cell: ({ getValue }) => {
      const condition = getValue<string | undefined>();
      return <div>{condition ? condition : "Sağlık durumu yok"}</div>;
    },
  },
  {
    accessorKey: "children",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Çocuklar
      </Button>
    ),
    cell: ({ getValue }) => {
      const children = getValue<string>();
      return <div>{children ? children : "Çocuk yok"}</div>;
    },
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Kilo (kg)
      </Button>
    ),
    cell: ({ getValue }) => <div>{getValue<number>()}</div>,
  },
  {
    accessorKey: "notes",
    header: () => <div>Notlar</div>,
    cell: ({ getValue }) => <div>{getValue<string>()}</div>,
  },
];
