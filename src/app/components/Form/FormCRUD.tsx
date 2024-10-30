import { FetchCustomBody } from "@/lib/FetchCustomBody";
import { ToastFail, ToastSuccess } from "@/lib/splash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { FormItem } from "./FormItem";
import { Button } from "./Input/Button";
import { CheckboxGroup } from "./Input/CheckboxGroup";
import { Input } from "./Input/Input";
import { Alert } from "../Alert/Alert";
import { DynamicTable, TableColumn } from "../Table/DynamicTable";
import { Select } from "./Input/Select";

interface Field {
  type: "text" | "checkboxGroup" | "dropdown" | "email" | "password";
  register: string;
  label: string;
  items?: { id: string; name: string }[];
}

interface FormCRUDProps {
  schema?: any;
  defaultValues?: any;
  fields?: Field[];
  apiURL: string;
  redirect: string;
  type: "create" | "edit" | "list";
  id?: string;
  columnsTable?: TableColumn[];
  dataTable?: Record<string, any>[];
}

export const FormCRUD: FC<FormCRUDProps> = ({
  columnsTable,
  dataTable,
  schema,
  defaultValues,
  fields,
  apiURL,
  redirect,
  type,
  id,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const message = await FetchCustomBody({
        data: { ...data, id },
        method: type === "create" ? "PUT" : "PATCH",
        url: apiURL,
      });

      ToastSuccess(message);
      router.push(redirect);
      router.refresh();
    } catch (error: any) {
      ToastFail(error.message);
    }
  };

  if (type === "list") {
    const handleRemoveRole = async (id: string | null) => {
      if (!id) return;
      try {
        const message = await FetchCustomBody({
          data: { role_id: id },
          method: "DELETE",
          url: apiURL,
        });

        ToastSuccess(message);
        router.push(redirect);
        router.refresh();
      } catch (error: any) {
        ToastFail(error.message);
      }
    };
    return (
      <>
        {columnsTable && dataTable && (
          <>
            <Alert
              message="¿Estás seguro de eliminar?"
              onSuccess={() => {
                const urlParams = new URLSearchParams(window.location.search);
                const id = urlParams.get("id");
                handleRemoveRole(id);
              }}
              onCancel={() => {
                router.replace(redirect);
              }}
            />
            <DynamicTable
              columns={columnsTable}
              data={dataTable}
              baseUrl={redirect}
              actions={{
                edit: true,
                delete: true,
              }}
              onDelete={(id: string) => {
                router.replace(`${redirect}?action=alert&id=${id}`);
              }}
            />
          </>
        )}
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex justify-between w-full gap-5">
        <div className="w-1/2 flex flex-col">
          {fields?.map((field, key) => {
            if (
              field.type === "text" ||
              field.type === "email" ||
              field.type === "password"
            ) {
              return (
                <FormItem key={key}>
                  <Input
                    {...register(field.register)}
                    error={errors[field.register] as any}
                    label={field.label}
                    type={field.type}
                    onKeyDown={handleKeyDown}
                  />
                </FormItem>
              );
            }
            if (field.type === "checkboxGroup") {
              return (
                <FormItem key={key}>
                  {field.items && (
                    <CheckboxGroup
                      control={control}
                      items={field.items}
                      label={field.label}
                      name={field.register}
                      error={errors[field.register] as any}
                    />
                  )}
                </FormItem>
              );
            }
            if (field.type === "dropdown") {
              return (
                <FormItem key={key}>
                  <Select
                    error={errors[field.register] as any}
                    label={field.label}
                    {...register(field.register)}
                  >
                    <option value="">Seleccione una opcion</option>
                    {field?.items?.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormItem>
              );
            }
          })}
        </div>
      </div>

      <div className="flex gap-3 mb-4 justify-end mt-8">
        <Button type="cancel" href={redirect}>
          Cancelar
        </Button>
        <Button type="submit">
          {type === "create" ? "Añadir" : "Actualizar"}
        </Button>
      </div>
    </form>
  );
};
