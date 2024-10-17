"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { addEmployer } from "@/lib/actions";
import { z } from "zod";
import { parse, isValid } from "date-fns";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Ad en az 2 karakter olmalı." }),
  lastName: z.string().min(2, { message: "Soyad en az 2 karakter olmalı." }),
  birthDate: z.string().refine(
    (val) => {
      const parsed = parse(val, "dd.MM.yyyy", new Date());
      return isValid(parsed);
    },
    { message: "Geçerli bir tarih giriniz (GG.AA.YYYY)" },
  ),
  address: z.string().min(5, { message: "Adres en az 5 karakter olmalı." }),
  phoneNumber: z.string().min(10, { message: "Telefon numarası geçersiz." }),
  placeType: z.enum(["Müstakil", "Dublex", "Normal Daire"], {
    required_error: "Yer tipi seçiniz.",
  }),
  hasPets: z.boolean().default(false),
  healthCondition: z.string().optional(),
  children: z.string().optional(),
  weight: z.number().optional(),
  notes: z.string().optional(),
});

type EmployerFormData = z.infer<typeof formSchema>;

export default function EmployerForm() {
  const form = useForm<EmployerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      address: "",
      phoneNumber: "",
      placeType: undefined,
      hasPets: false,
      healthCondition: "",
      children: "",
      weight: 0,
      notes: "",
    },
  });

  const transformFormData = (data: EmployerFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Check for null
        if (key === "birthDate" && typeof value === "string") {
          // Ensure value is a string
          const [day, month, year] = value.split("."); // Using / as specified
          formData.append(key, `${year}-${month}-${day}`); // Adjust format here if needed
        } else if (key === "weight" && value !== null) {
          formData.append(key, parseFloat(value.toString()).toString()); // Ensure it's a number
        } else {
          formData.append(key, value.toString()); // Append other values as string
        }
      }
    });
    return formData;
  };

  const onSubmit = async (data: EmployerFormData) => {
    const formData = transformFormData(data);
    try {
      await addEmployer(formData);
    } catch (error) {
      console.error("Form submission error:", error);
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
            name="placeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yer Tipi</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Yer Tipi Seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Müstakil">Müstakil</SelectItem>
                    <SelectItem value="Dublex">Dublex</SelectItem>
                    <SelectItem value="Normal Daire">Normal Daire</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasPets"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Evcil Hayvan Var mı?</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="healthCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sağlık Durumu</FormLabel>
              <FormControl>
                <Input placeholder="Sağlık durumunu girin" {...field} />
              </FormControl>
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
          name="children"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Çocuklar</FormLabel>
              <FormControl>
                <Input placeholder="Çocuklar hakkında bilgi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kilo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Kilonuzu girin"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
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

        <Button type="submit" className="w-full md:w-auto">
          Gönder
        </Button>
      </form>
    </Form>
  );
}
