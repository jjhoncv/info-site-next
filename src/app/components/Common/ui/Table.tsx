// src/app/components/ui/Table.tsx
import React from "react";

export const Table = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => (
  <table
    className={`min-w-full divide-y divide-gray-200 ${className}`}
    {...props}
  >
    {children}
  </table>
);

export const TableHeader = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={`bg-gray-50 ${className}`} {...props}>
    {children}
  </thead>
);

export const TableBody = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody
    className={`bg-white divide-y divide-gray-200 ${className}`}
    {...props}
  >
    {children}
  </tbody>
);

export const TableRow = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={`${className}`} {...props}>
    {children}
  </tr>
);

export const TableHead = ({
  children,
  className = "",
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    {...props}
  >
    {children}
  </th>
);

export const TableCell = ({
  children,
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
    {children}
  </td>
);
