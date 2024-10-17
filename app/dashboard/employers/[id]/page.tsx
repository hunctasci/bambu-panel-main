import EmployerActions from "@/components/Employer/EmployerActions";
import EmployerDetails from "@/components/Employer/EmployerDetails"; // Import EmployerDetails
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteEmployer } from "@/lib/actions";
import { fetchEmployerById } from "@/lib/data";
import { EmployerType } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Params = {
  params: {
    id: string;
  };
};

const SingleEmployerView = async ({ params }: Params) => {
  const employer: EmployerType = await fetchEmployerById(params.id);

  return (
    <div className="space-y-5">
      <Link
        href="/dashboard/employers"
        className={buttonVariants({ variant: "outline" })}
      >
        <ArrowLeft />
        Geri don
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>{`${employer.firstName} ${employer.lastName}`}</CardTitle>
          <CardDescription>Details for {employer.firstName}</CardDescription>
        </CardHeader>
        <CardContent>
          <EmployerDetails employer={employer} />
          <EmployerActions
            employer={employer}
            deleteEmployer={deleteEmployer}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleEmployerView;
