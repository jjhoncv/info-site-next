// app/components/DataTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/Common/ui/Table";
import React from "react";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={`${item.id}-${column.key}`}>
                {column.render
                  ? column.render(item)
                  : getNestedValue(item, column.key)}
              </TableCell>
            ))}
            {/* <TableCell>
              <Button onClick={() => onEdit(item)}>Editar</Button>
              <Button variant="danger" onClick={() => onDelete(item)}>
                Eliminar
              </Button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}
