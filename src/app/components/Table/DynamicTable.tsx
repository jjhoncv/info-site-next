"use client";
import { PencilIcon, TrashIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { FC, ReactNode, useState } from "react";

export type ActionOption = "edit" | "delete";

export type Priority = "high" | "medium" | "low";

export enum PriorityEnum {
  high = "high",
  medium = "medium",
  low = "low",
}

export interface TableColumn {
  key: string;
  label: ReactNode | string;
  width?: string;
  render?: (value: any) => ReactNode | string;
  priority?: Priority; // Para control responsive
}

export interface TableActions {
  edit?: boolean;
  delete?: boolean;
}

export interface DynamicTableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  actions?: TableActions;
  baseUrl: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  containerClassName?: string;
  tableClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  headerClassName?: string;
}

export const DynamicTable: FC<DynamicTableProps> = ({
  columns,
  data,
  actions = { edit: true, delete: true },
  baseUrl,
  onDelete,
  onEdit,
  containerClassName = "",
  tableClassName = "",
  rowClassName = "",
  cellClassName = "",
  headerClassName = "",
}) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const renderCell = (item: Record<string, any>, column: TableColumn) => {
    if (column.render) {
      return column.render(item[column.key]);
    }
    return item[column.key];
  };

  const renderActions = (itemId: string) => {
    return (
      <div className="flex gap-2 items-center">
        {actions.edit && (
          <Link
            href={`${baseUrl}/${itemId}`}
            className="hover:text-blue-600 transition-colors hover:bg-slate-300/50 p-2 rounded-full"
            onClick={(e) => {
              if (onEdit) {
                e.preventDefault();
                onEdit(itemId);
              }
            }}
          >
            <PencilIcon size={18} />
          </Link>
        )}
        {actions.delete && (
          <button
            onClick={() => onDelete?.(itemId)}
            className="hover:text-red-600 transition-colors hover:bg-slate-300/50 p-2 rounded-full"
          >
            <TrashIcon size={18} />
          </button>
        )}
      </div>
    );
  };

  // Filtrar columnas por prioridad para vista móvil
  const highPriorityColumns = columns.filter(
    (col) => col.priority === "high" || !col.priority
  );
  const otherColumns = columns.filter(
    (col) => col.priority !== "high" && col.priority
  );

  return (
    <div className={`w-full ${containerClassName}`}>
      {/* Vista Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className={`w-full min-w-[640px] ${tableClassName}`}>
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left p-4 md:pt-0 font-medium text-gray-600 ${
                    column.width || "flex-1"
                  } ${headerClassName}`}
                >
                  {column.label}
                </th>
              ))}
              {(actions.edit || actions.delete) && (
                <th className="text-left p-4  pt-0 font-medium text-gray-600">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className={`border-b border-gray-200 hover:bg-gray-50/50 transition-colors ${rowClassName}`}
              >
                {columns.map((column) => (
                  <td
                    key={`${item.id}-${column.key}`}
                    className={`p-4 ${
                      column.width || "flex-1"
                    } ${cellClassName}`}
                  >
                    {renderCell(item, column)}
                  </td>
                ))}
                {(actions.edit || actions.delete) && (
                  <td className="p-4">{renderActions(item.id)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista Mobile y Tablet */}
      <div className="lg:hidden">
        {data.map((item) => (
          <div
            key={item.id}
            className={`border-b border-gray-200 last:border-none hover:bg-gray-50/50 transition-colors ${rowClassName}`}
          >
            {/* Fila principal con columnas de alta prioridad */}
            <div
              className="flex items-center justify-between py-2 cursor-pointer"
              onClick={() => toggleRow(item.id)}
            >
              <div className="flex-1 space-y-1">
                {highPriorityColumns.map((column) => (
                  <div
                    key={`${item.id}-${column.key}`}
                    className="flex items-center"
                  >
                    <span className="text-sm font-medium text-gray-600 mr-2">
                      {column.label}:
                    </span>
                    <span className="text-sm">{renderCell(item, column)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {(actions.edit || actions.delete) && renderActions(item.id)}
                <ChevronRightIcon
                  size={20}
                  className={`transition-transform ${
                    expandedRows.includes(item.id) ? "rotate-90" : ""
                  }`}
                />
              </div>
            </div>

            {/* Contenido expandible con columnas de menor prioridad */}
            {expandedRows.includes(item.id) && otherColumns.length > 0 && (
              <div className="pb-4 space-y-2 bg-gray-50/50">
                {otherColumns.map((column) => (
                  <div key={`${item.id}-${column.key}-expanded`}>
                    <span className="text-sm font-medium text-gray-600 mr-2">
                      {column.label}:
                    </span>
                    <span className="text-sm">{renderCell(item, column)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay datos para mostrar
        </div>
      )}
    </div>
  );
};
