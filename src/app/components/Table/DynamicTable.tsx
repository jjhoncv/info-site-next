"use client";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { FC, ReactNode } from "react";

// Tipos para las opciones
export type ActionOption = "edit" | "delete";

export interface TableColumn {
  key: string;
  label: ReactNode | string;
  width?: string;
  render?: (value: any) => ReactNode;
}

export interface TableActions {
  edit?: boolean;
  delete?: boolean;
  // Puedes añadir más acciones aquí
}

export interface DynamicTableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  actions?: TableActions;
  baseUrl: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const DynamicTable: FC<DynamicTableProps> = ({
  columns,
  data,
  actions = { edit: true, delete: true },
  baseUrl,
  onDelete,
  onEdit,
}) => {
  // Función para renderizar el valor de una celda
  const renderCell = (item: Record<string, any>, column: TableColumn) => {
    if (column.render) {
      return column.render(item[column.key]);
    }
    return item[column.key];
  };

  // Función para renderizar las acciones
  const renderActions = (itemId: string) => {
    return (
      <td className="py-3 flex gap-2 items-center">
        {actions.edit && (
          <Link
            href={`${baseUrl}/${itemId}`}
            className="hover:text-blue-600 transition-colors"
            onClick={(e) => {
              if (onEdit) {
                e.preventDefault();
                onEdit(itemId);
              }
            }}
          >
            <PencilIcon size={16} />
          </Link>
        )}
        {actions.delete && (
          <button
            onClick={() => onDelete?.(itemId)}
            className="hover:text-red-600 transition-colors"
          >
            <TrashIcon size={16} />
          </button>
        )}
      </td>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="flex flex-row">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`text-left pb-3 ${column.width || "flex-1"}`}
              >
                {column.label}
              </th>
            ))}
            {(actions.edit || actions.delete) && (
              <th className="text-left pb-3">Opciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="flex flex-row border-t hover:bg-gray-50"
            >
              {columns.map((column) => (
                <td
                  key={`${item.id}-${column.key}`}
                  className={`py-3 ${column.width || "flex-1"}`}
                >
                  {renderCell(item, column)}
                </td>
              ))}
              {(actions.edit || actions.delete) && renderActions(item.id)}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay datos para mostrar
        </div>
      )}
    </div>
  );
};
