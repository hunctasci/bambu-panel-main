import EditEmployerForm from "@/components/Employer/EmployerEditForm";
import { fetchEmployerById } from "@/lib/data";

export default async function EditEmployerPage({
  params,
}: {
  params: { id: string };
}) {
  const employer = await fetchEmployerById(params.id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Müşteriyi Düzenle</h1>
      <EditEmployerForm employer={employer} />
    </div>
  );
}
