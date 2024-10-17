// components/EmployeeDetails.tsx

import { competencyOptions } from "@/models/Employee";
import { EmployeeType } from "@/lib/types"; // Adjust the import path as needed
import Image from "next/image";
import { ReactNode } from "react";

interface EmployeeDetailsProps {
  employee: EmployeeType;
}
interface InfoItemProps {
  label: string;
  value: ReactNode;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div>
    <span className="font-semibold">{label}:</span> {value}
  </div>
);

const EmployeeDetails = ({ employee }: EmployeeDetailsProps) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      <div className="md:flex">
        {/* Image Section */}
        <div className="p-4 md:w-1/3">
          <Image
            src={
              employee.photo
                ? `data:image/jpeg;base64,${employee.photo}`
                : "/no-image.jpeg"
            }
            alt="Employee"
            className="h-auto w-full rounded-md object-cover"
            width={300}
            height={300}
            // Use priority to improve loading for important images
            priority={true} // Optional, use this if the image is crucial
          />
        </div>

        {/* Details Section */}
        <div className="p-6 md:w-2/3">
          <h2 className="mb-4 text-2xl font-bold">{`${employee.firstName} ${employee.lastName}`}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem
              label="Doğum Tarihi"
              value={new Date(employee.birthDate).toLocaleDateString("tr-TR")}
            />
            <InfoItem label="Adres" value={employee.address} />
            <InfoItem label="Telefon Numarası" value={employee.phoneNumber} />
            <InfoItem label="Medeni Durum" value={employee.maritalStatus} />
            <InfoItem
              label="Yeterlilikler"
              value={
                Array.isArray(employee.competencies) &&
                employee.competencies.length > 0
                  ? employee.competencies
                      .map((value) => {
                        const option = competencyOptions.find(
                          (opt) => opt.value === value,
                        );
                        return option ? option.label : value;
                      })
                      .join(", ")
                  : "Yeterlilik yok"
              }
            />
            <InfoItem
              label="Evcil Hayvanla Çalışır"
              value={employee.worksWithPets ? "Evet" : "Hayır"}
            />
            <InfoItem label="Uyruk" value={employee.nationality} />
            <InfoItem
              label="Oturum İzni"
              value={employee.residencyPermit ? "Var" : "Yok"}
            />
            <InfoItem
              label="Seyahat Kısıtlaması"
              value={employee.travelRestriction ? "Var" : "Yok"}
            />
            <InfoItem
              label="Çocuk Sahibi"
              value={employee.hasChildren ? "Evet" : "Hayır"}
            />
          </div>
          <div className="mt-6 space-y-4">
            <InfoItem
              label="Önceki İşverenler"
              value={employee.previousEmployers}
            />
            <InfoItem label="Referanslar" value={employee.references} />
            <InfoItem label="Notlar" value={employee.notes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
