// components/EmployerDetails.tsx
import { EmployerType } from "@/lib/types";

interface EmployerDetailsProps {
  employer: EmployerType;
}

const EmployerDetails = ({ employer }: EmployerDetailsProps) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <strong>Ad:</strong> {employer.firstName}
    </div>
    <div>
      <strong>Soyad:</strong> {employer.lastName}
    </div>
    <div>
      <strong>Doğum Tarihi:</strong>{" "}
      {new Date(employer.birthDate).toLocaleDateString("tr-TR")}
    </div>
    <div>
      <strong>Adres:</strong> {employer.address}
    </div>
    <div>
      <strong>Telefon Numarası:</strong> {employer.phoneNumber}
    </div>
    <div>
      <strong>Yer Tipi:</strong> {employer.placeType}
    </div>
    <div>
      <strong>Evcil Hayvan:</strong> {employer.hasPets ? "Evet" : "Hayır"}
    </div>
    <div>
      <strong>Sağlık Durumu:</strong> {employer.healthCondition}
    </div>
    <div>
      <strong>Çocuklar:</strong> {employer.children}
    </div>
    <div>
      <strong>Kilo:</strong> {employer.weight} kg
    </div>
    <div>
      <strong>Notlar:</strong> {employer.notes}
    </div>
  </div>
);

export default EmployerDetails;
