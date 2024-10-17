import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { fetchEmployeeById } from "@/lib/data"; // Assuming you've defined this
import { deleteEmployee } from "@/lib/actions"; // Import the delete action
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EmployeeActions from "@/components/Employee/EmployeeActions"; // Import the client component
import EmployeeDetails from "@/components/Employee/EmployeeDetails";
import { competencyOptions } from "@/models/Employee";

type Params = {
  params: {
    id: string;
  };
};

const SingleEmployeeView = async ({ params }: Params) => {
  const employee = await fetchEmployeeById(params.id);

  return (
    <div className="space-y-5">
      <Link
        href="/dashboard/employees"
        className={buttonVariants({ variant: "outline" })}
      >
        <ArrowLeft />
        Geri don
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>{`${employee.firstName} ${employee.lastName}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeeDetails employee={employee} />
          <EmployeeActions
            employee={employee}
            competencyOptions={competencyOptions}
            deleteEmployee={deleteEmployee}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleEmployeeView;
