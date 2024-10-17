"use client";

import { Button } from "@/components/ui/button";
import { EmployeeType } from "@/lib/types";
import { deleteEmployee } from "@/lib/actions";
import Link from "next/link";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // Import the fonts for utf-8 support

pdfMake.vfs = pdfFonts.pdfMake.vfs;

type EmployeeActionsProps = {
  employee: EmployeeType;
  competencyOptions: { value: string; label: string }[];
  deleteEmployee: (formData: FormData) => Promise<never>;
};

export default function EmployeeActions({
  employee,
  competencyOptions,
}: EmployeeActionsProps) {
  const getCompetencyLabel = (value: string): string => {
    const option = competencyOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const convertImageToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  const generatePdf = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docDefinition: any = {
      content: [
        {
          columns: [
            {
              width: "*",
              stack: [
                {
                  text: `${employee.firstName} ${employee.lastName}`,
                  style: "header",
                },
                { text: "Çalışan Detayları", style: "subheader" },
              ],
            },
            {
              width: "auto",
              image: employee.photo
                ? await convertImageToBase64(employee.photo)
                : undefined,
              fit: [100, 100],
              alignment: "right",
            },
          ],
        },
        { text: "\n" },
        {
          style: "table",
          table: {
            widths: ["30%", "70%"],
            body: [
              [{ text: "Ad", style: "tableHeader" }, employee.firstName],
              [{ text: "Soyad", style: "tableHeader" }, employee.lastName],
              [
                { text: "Doğum Tarihi", style: "tableHeader" },
                new Date(employee.birthDate).toLocaleDateString("tr-TR"),
              ],
              [{ text: "Adres", style: "tableHeader" }, employee.address],
              [
                { text: "Telefon Numarası", style: "tableHeader" },
                employee.phoneNumber,
              ],
              [
                { text: "Medeni Durum", style: "tableHeader" },
                employee.maritalStatus,
              ],
              [
                { text: "Yeterlilikler", style: "tableHeader" },
                employee.competencies.map(getCompetencyLabel).join(", "),
              ],
              [
                { text: "Evcil Hayvanla Çalışır", style: "tableHeader" },
                employee.worksWithPets ? "Evet" : "Hayır",
              ],
              [{ text: "Uyruk", style: "tableHeader" }, employee.nationality],
              [
                { text: "Oturum İzni", style: "tableHeader" },
                employee.residencyPermit ? "Var" : "Yok",
              ],
              [
                { text: "Seyahat Kısıtlaması", style: "tableHeader" },
                employee.travelRestriction ? "Var" : "Yok",
              ],
              [
                { text: "Çocuk Sahibi", style: "tableHeader" },
                employee.hasChildren ? "Evet" : "Hayır",
              ],
            ],
          },
        },
        { text: "\n" },
        { text: "Önceki İşverenler", style: "subheader" },
        { text: employee.previousEmployers, style: "paragraph" },
        { text: "\n" },
        { text: "Referanslar", style: "subheader" },
        { text: employee.references, style: "paragraph" },
        { text: "\n" },
        { text: "Notlar", style: "subheader" },
        { text: employee.notes, style: "paragraph" },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          color: "#2c3e50",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          color: "#34495e",
          margin: [0, 10, 0, 5],
        },
        table: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          color: "#3498db",
        },
        paragraph: {
          margin: [0, 5, 0, 10],
        },
      },
      defaultStyle: {
        fontSize: 10,
        color: "#333",
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`${employee.firstName}_${employee.lastName}_detaylar.pdf`);
  };

  const handleDeleteEmployee = async () => {
    if (!employee._id) {
      console.error("Employer ID is undefined");
      return; // Exit if employer ID is not available
    }

    const formData = new FormData();
    formData.append("employeeId", employee._id); // Assuming employer._id is the ID field
    await deleteEmployee(formData);
  };

  return (
    <div className="mt-10 flex flex-col space-y-5">
      <Button variant="outline" onClick={generatePdf}>
        PDF Oluştur
      </Button>
      <Button asChild>
        <Link href={`/dashboard/employees/${employee._id}/edit`}>
          Personeli Düzenle
        </Link>
      </Button>
      <Button variant="destructive" onClick={handleDeleteEmployee}>
        Personeli Sil
      </Button>
    </div>
  );
}
