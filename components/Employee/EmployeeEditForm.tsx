"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isValid, parse } from "date-fns";
import { competencyOptions } from "@/models/Employee";
import { updateEmployee } from "@/lib/actions";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const employeeFormSchema = z.object({
  firstName: z.string().min(2, { message: "Ad en az 2 karakter olmalı." }),
  lastName: z.string().min(2, { message: "Soyad en az 2 karakter olmalı." }),
  birthDate: z.string().refine(
    (val) => {
      const parsed = parse(val, "dd.MM.yyyy", new Date());
      return isValid(parsed);
    },
    { message: "Geçerli bir tarih giriniz (GG.AA.YYYY)" },
  ),
  competencies: z
    .array(
      z.enum(competencyOptions.map((c) => c.value) as [string, ...string[]]),
    )
    .min(1, { message: "En az bir yeterlilik seçmelisiniz." }),
  address: z.string().min(5, { message: "Adres en az 5 karakter olmalı." }),
  phoneNumber: z.string().min(10, { message: "Telefon numarası geçersiz." }),
  maritalStatus: z.enum(["Evli", "Bekar"]),
  hasChildren: z.boolean(),
  previousEmployers: z.string().optional(),
  references: z.string().optional(),
  worksWithPets: z.boolean(),
  nationality: z.string().min(2, { message: "Uyruk gerekli." }),
  residencyPermit: z.boolean(),
  travelRestriction: z.boolean(),
  notes: z.string().optional(),
  photo: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      `Maksimum dosya boyutu 5MB.`,
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Sadece .jpg, .jpeg, .png ve .webp formatları kabul edilir.",
    ),
});

type EmployeeFormData = z.infer<typeof employeeFormSchema>;

interface EmployeeEditFormProps {
  employee: Partial<EmployeeFormData> & { _id: string };
}

export default function EmployeeEditForm({ employee }: EmployeeEditFormProps) {
  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      firstName: employee.firstName || "",
      lastName: employee.lastName || "",
      birthDate: employee.birthDate
        ? new Date(employee.birthDate).toLocaleDateString("tr-TR")
        : "",
      competencies: employee.competencies || [],
      address: employee.address || "",
      phoneNumber: employee.phoneNumber || "",
      maritalStatus: employee.maritalStatus || "Bekar",
      hasChildren: employee.hasChildren || false,
      previousEmployers: employee.previousEmployers || "",
      references: employee.references || "",
      worksWithPets: employee.worksWithPets || false,
      nationality: employee.nationality || "",
      residencyPermit: employee.residencyPermit || false,
      travelRestriction: employee.travelRestriction || false,
      notes: employee.notes || "",
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    const formData = new FormData();
    console.log(data);

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "birthDate" && typeof value === "string") {
          const [day, month, year] = value.split(".");
          formData.append(key, `${year}-${month}-${day}`);
        } else if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else if (key === "photo" && value instanceof FileList) {
          // Log file details
          const file = value[0];

          // Append file to FormData
          formData.append(key, file);
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    formData.append("id", employee._id);

    try {
      console.log("Updating employee data:", Object.fromEntries(formData));
      await updateEmployee(formData);
      console.log("Employee updated successfully");
    } catch (error) {
      console.error("Employee update error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad</FormLabel>
                <FormControl>
                  <Input placeholder="Adınızı girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soyad</FormLabel>
                <FormControl>
                  <Input placeholder="Soyadınızı girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doğum Tarihi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="GG.AA.YYYY"
                    {...field}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 2 && value.length <= 4) {
                        value = `${value.slice(0, 2)}.${value.slice(2)}`;
                      } else if (value.length > 4) {
                        value = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4, 8)}`;
                      }
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon Numarası</FormLabel>
                <FormControl>
                  <Input placeholder="Telefon numaranızı girin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medeni Durum</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Medeni Durum Seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Evli">Evli</SelectItem>
                    <SelectItem value="Bekar">Bekar</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasChildren"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Çocuk Sahibi mi?</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="competencies"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Yeterlilik</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {competencyOptions.map((item) => (
                  <FormField
                    key={item.value}
                    control={form.control}
                    name="competencies"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.value])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.value,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres</FormLabel>
              <FormControl>
                <Input placeholder="Adresinizi girin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="previousEmployers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Önceki İşverenler</FormLabel>
              <FormControl>
                <Input placeholder="Önceki işverenlerinizi girin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="references"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referanslar</FormLabel>
              <FormControl>
                <Input placeholder="Referanslarınızı girin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="worksWithPets"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Evcil Hayvan ile Çalışır Mı?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uyruk</FormLabel>
              <FormControl>
                <Input placeholder="Uyruk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="residencyPermit"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Oturum İzni Var mı?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="travelRestriction"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Seyahat Kısıtlaması Var mı?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notlar</FormLabel>
              <FormControl>
                <Input placeholder="Ek notlar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo" // Ensure this matches your API expectation
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fotoğraf (Opsiyonel)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file ? e.target.files : undefined); // Handle optional field
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">
          Güncelle
        </Button>
      </form>
    </Form>
  );
}
