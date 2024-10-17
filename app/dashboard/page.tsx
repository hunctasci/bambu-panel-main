import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="pt-3">
      <div className="flex flex-col gap-y-2 lg:flex lg:flex-row lg:gap-x-2">
        <Card className="w-full flex-grow">
          <CardHeader>
            <CardTitle>Personeller</CardTitle>
          </CardHeader>
          <CardFooter className="flex flex-col gap-y-3">
            <Button
              asChild
              variant="outline"
              className="w-full bg-lime-500 text-white"
            >
              <Link href="/dashboard/employees/add">Personel Ekle</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full bg-sky-500 text-white"
            >
              <Link href="/dashboard/employees">Personel Kayıtlarına Git</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full flex-grow">
          <CardHeader>
            <CardTitle>Müşteriler</CardTitle>
          </CardHeader>
          <CardFooter className="flex flex-col gap-y-3">
            <Button
              asChild
              variant="outline"
              className="w-full bg-lime-500 text-white"
            >
              <Link href="/dashboard/employers/add">Müşteri Ekle</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full bg-sky-500 text-white"
            >
              <Link href="/dashboard/employers">Müşteri Kayıtlarına Git</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
