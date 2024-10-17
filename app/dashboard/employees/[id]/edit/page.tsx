import EmployeeEditForm from "@/components/Employee/EmployeeEditForm";
import { fetchEmployeeById } from "@/lib/data";

export default async function EditEmployeePage({
  params,
}: {
  params: { id: string };
}) {
  const employee = await fetchEmployeeById(params.id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Çalışan Düzenle</h1>
      <EmployeeEditForm employee={employee} />
    </div>
  );
}
