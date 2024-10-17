"use client";

import { Button } from "@/components/ui/button";
import { EmployerType } from "@/lib/types";
import Link from "next/link";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // Import the fonts for utf-8 support

pdfMake.vfs = pdfFonts.pdfMake.vfs;

type EmployerActionsProps = {
  employer: EmployerType;
  deleteEmployer: (formData: FormData) => Promise<void>;
};

export default function EmployerActions({
  employer,
  deleteEmployer,
}: EmployerActionsProps) {
  // Function to generate the PDF using pdfMake
  const generatePdf = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docDefinition: any = {
      content: [
        {
          text: `${employer.firstName} ${employer.lastName} - Detaylar`,
          style: "header",
        },
        {
          style: "tableExample",
          table: {
            widths: ["30%", "70%"],
            body: [
              [{ text: "Ad", style: "tableHeader" }, employer.firstName],
              [{ text: "Soyad", style: "tableHeader" }, employer.lastName],
              [
                { text: "Doğum Tarihi", style: "tableHeader" },
                new Date(employer.birthDate).toLocaleDateString("tr-TR"),
              ],
              [{ text: "Adres", style: "tableHeader" }, employer.address],
              [
                { text: "Telefon Numarası", style: "tableHeader" },
                employer.phoneNumber,
              ],
              [{ text: "Yer Tipi", style: "tableHeader" }, employer.placeType],
              [
                { text: "Evcil Hayvan", style: "tableHeader" },
                employer.hasPets ? "Evet" : "Hayır",
              ],
              [
                { text: "Sağlık Durumu", style: "tableHeader" },
                employer.healthCondition,
              ],
              [{ text: "Çocuklar", style: "tableHeader" }, employer.children],
              [{ text: "Kilo", style: "tableHeader" }, `${employer.weight} kg`],
            ],
          },
        },
        { text: "Notlar", style: "subheader" },
        { text: employer.notes, style: "notes" },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          color: "#2c3e50",
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
          color: "#34495e",
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          color: "#3498db",
        },
        notes: {
          italic: true,
          margin: [0, 0, 0, 10],
        },
      },
      defaultStyle: {
        fontSize: 10,
        color: "#333",
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`${employer.firstName}_${employer.lastName}_detaylar.pdf`);
  };

  // Function to handle form submission and delete the employer
  const handleDeleteEmployer = async () => {
    if (!employer._id) {
      console.error("Employer ID is undefined");
      return; // Exit if employer ID is not available
    }

    const formData = new FormData();
    formData.append("employerId", employer._id); // Assuming employer._id is the ID field
    await deleteEmployer(formData);
  };

  return (
    <div className="mt-10 flex flex-col space-y-5">
      <Button variant="outline" onClick={generatePdf}>
        PDF Oluştur
      </Button>
      <Button asChild>
        <Link href={`/dashboard/employers/${employer._id}/edit`}>
          Müşteriyi Düzenle
        </Link>
      </Button>
      <Button variant="destructive" onClick={handleDeleteEmployer}>
        Müşteriyi Sil
      </Button>
    </div>
  );
}
