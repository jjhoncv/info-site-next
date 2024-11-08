"use client";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  GripVertical,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { FC, ReactNode, useEffect, useState } from "react";

import debounce from "lodash/debounce";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import { StrictModeDroppable } from "../StrictModeDroppable";
import { Input } from "../Form/Input/Input";
import { Select } from "../Form/Input/Select";

export type ActionOption = "edit" | "delete";
export type Priority = "high" | "medium" | "low";
export type SortDirection = "asc" | "desc" | null;

export interface TableColumn {
  key: string;
  label: ReactNode | string;
  width?: string;
  render?: (value: any) => ReactNode | string;
  priority?: Priority;
  sortable?: boolean;
  searchable?: boolean;
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
  onReorder?: (reorderedItems: Record<string, any>[]) => void;
  containerClassName?: string;
  tableClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  headerClassName?: string;
  rowMobileClassName?: string;
  enableSearch?: boolean;
  enablePagination?: boolean;
  enableSort?: boolean;
  enableReorder?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
}

export const DynamicTable: FC<DynamicTableProps> = ({
  columns,
  data,
  actions = { edit: true, delete: true },
  baseUrl,
  onDelete,
  onEdit,
  onReorder,
  containerClassName = "",
  tableClassName = "",
  rowClassName = "",
  cellClassName = "",
  headerClassName = "",
  rowMobileClassName = "",
  enableSearch = true,
  enablePagination = true,
  enableSort = true,
  enableReorder = true,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({ key: "", direction: null });
  const [filteredData, setFilteredData] = useState(data);
  const [items, setItems] = useState(data);

  useEffect(() => {
    setFilteredData(data);
    setItems(data);
  }, [data]);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Búsqueda
  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);

    const filtered = data.filter((item) =>
      columns.some((column) => {
        if (!column.searchable) return false;
        const value = item[column.key];
        if (!value) return false;
        return value.toString().toLowerCase().includes(term.toLowerCase());
      })
    );

    setFilteredData(filtered);
  }, 300);

  // Ordenamiento
  const handleSort = (key: string) => {
    let direction: SortDirection = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = null;
      else direction = "asc";
    }

    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      if (direction === null) return 0;
      if (!a[key] || !b[key]) return 0;

      const aValue = a[key].toString().toLowerCase();
      const bValue = b[key].toString().toLowerCase();

      if (direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredData(sorted);
  };

  // Reordenamiento
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Usar filteredData en lugar de items para mantener consistencia con búsqueda y filtros
    const updatedData = Array.from(filteredData);
    const [movedItem] = updatedData.splice(sourceIndex, 1);
    updatedData.splice(destinationIndex, 0, movedItem);

    setFilteredData(updatedData);
    onReorder?.(updatedData);
  };

  // Paginación
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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

  const highPriorityColumns = columns.filter(
    (col) => col.priority === "high" || !col.priority
  );
  const otherColumns = columns.filter(
    (col) => col.priority !== "high" && col.priority
  );

  return (
    <div className={`w-full space-y-4 ${containerClassName}`}>
      {/* Búsqueda y controles */}
      {enableSearch && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Buscar..."
              onChange={(e) => handleSearch(e.target.value)}
              className="h-9"
              type="search"
            />
          </div>
          {enablePagination && (
            <Select
              name=""
              id=""
              value={pageSize.toString()}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {pageSizeOptions.map((size) => (
                <option value={size.toString()}>{size} por página</option>
              ))}
            </Select>
          )}
        </div>
      )}

      {/* Vista Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <StrictModeDroppable droppableId="table">
            {(provided: DroppableProvided) => (
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`w-full min-w-[640px] ${tableClassName}`}
              >
                <thead>
                  <tr className="border-b border-gray-200">
                    {enableReorder && <th className="w-8" />}
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className={`text-left p-4 md:pt-0 font-medium text-gray-600 ${
                          column.width || "flex-1"
                        } ${headerClassName}`}
                      >
                        <div className="flex items-center gap-2">
                          {column.label}
                          {enableSort && column.sortable && (
                            <button
                              className="h-8 w-8 p-0"
                              onClick={() => handleSort(column.key)}
                            >
                              <ArrowUpDown
                                className={`h-4 w-4 ${
                                  sortConfig.key === column.key
                                    ? sortConfig.direction === "asc"
                                      ? "text-blue-600"
                                      : sortConfig.direction === "desc"
                                      ? "text-blue-600 rotate-180"
                                      : ""
                                    : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </th>
                    ))}
                    {(actions.edit || actions.delete) && (
                      <th className="text-left p-4 pt-0 font-medium text-gray-600">
                        Acciones
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                      isDragDisabled={!enableReorder}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`border-b last:border-b-0 border-gray-200 hover:bg-gray-50/50 transition-colors ${
                            snapshot.isDragging
                              ? "bg-blue-50 grid grid-cols-5"
                              : ""
                          } ${rowClassName}`}
                        >
                          {enableReorder && (
                            <td
                              className="w-8 px-2"
                              {...provided.dragHandleProps}
                            >
                              <GripVertical className="h-4 w-4 text-gray-400" />
                            </td>
                          )}
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>

      {/* Vista Mobile y Tablet */}
      <div className="lg:hidden">
        <DragDropContext onDragEnd={handleDragEnd}>
          <StrictModeDroppable droppableId="mobile-table">
            {(provided: DroppableProvided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {paginatedData.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                    isDragDisabled={!enableReorder}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border rounded-lg bg-white ${
                          snapshot.isDragging ? "border-blue-500 shadow-lg" : ""
                        } ${rowClassName}`}
                      >
                        {/* Fila principal con columnas de alta prioridad */}
                        <div className="flex items-center p-4">
                          {enableReorder && (
                            <div {...provided.dragHandleProps} className="mr-3">
                              <GripVertical className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                          <div
                            className="flex-1"
                            onClick={() => toggleRow(item.id)}
                          >
                            <div className="space-y-2">
                              {highPriorityColumns.map((column) => (
                                <div
                                  key={`${item.id}-${column.key}`}
                                  className="flex items-center"
                                >
                                  <span className="text-sm font-medium text-gray-600 mr-2">
                                    {column.label}:
                                  </span>
                                  <span className="text-sm">
                                    {renderCell(item, column)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {(actions.edit || actions.delete) &&
                              renderActions(item.id)}
                            <button
                              onClick={() => toggleRow(item.id)}
                              className="p-1"
                            >
                              <ChevronRightIcon
                                size={20}
                                className={`transition-transform ${
                                  expandedRows.includes(item.id)
                                    ? "rotate-90"
                                    : ""
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Contenido expandible con columnas de menor prioridad */}
                        {expandedRows.includes(item.id) &&
                          otherColumns.length > 0 && (
                            <div className="px-4 pb-4 pt-2 border-t bg-gray-50">
                              <div className="space-y-2">
                                {otherColumns.map((column) => (
                                  <div
                                    key={`${item.id}-${column.key}-expanded`}
                                    className={`flex items-center ${rowMobileClassName}`}
                                  >
                                    <span className="text-sm font-medium text-gray-600 mr-2">
                                      {column.label}:
                                    </span>
                                    <span className="text-sm">
                                      {renderCell(item, column)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>

        {/* Paginación móvil */}
        {enablePagination && filteredData.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center justify-between px-4">
            <select
              value={pageSize.toString()}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size.toString()}>
                  {size} por página
                </option>
              ))}
            </select>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                <div
                  className={`flex gap-1 items-center ${
                    currentPage === 1 ? `text-gray-400` : `hover:underline`
                  }`}
                >
                  <ChevronLeft size={20} />
                  Anterior
                </div>
              </button>
              <span className="text-sm text-gray-600">
                {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
              >
                <div
                  className={`flex gap-1 items-center ${
                    currentPage === totalPages
                      ? `text-gray-400`
                      : `hover:underline`
                  } `}
                >
                  Siguiente
                  <ChevronRight size={20} />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Paginación */}
      {enablePagination && filteredData.length > 0 && (
        <div className="flex justify-between items-center px-4 py-2 border-t">
          <p className="text-sm text-gray-500">
            Mostrando {(currentPage - 1) * pageSize + 1} a{" "}
            {Math.min(currentPage * pageSize, filteredData.length)} de{" "}
            {filteredData.length} resultados
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              <div
                className={`flex gap-1 items-center ${
                  currentPage === 1 ? `text-gray-400` : `hover:underline`
                }`}
              >
                <ChevronLeft size={20} />
                Anterior
              </div>
            </button>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              <div
                className={`flex gap-1 items-center ${
                  currentPage === totalPages
                    ? `text-gray-400`
                    : `hover:underline`
                } `}
              >
                Siguiente
                <ChevronRight size={20} />
              </div>
            </button>
          </div>
        </div>
      )}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay datos para mostrar
        </div>
      )}
    </div>
  );
};
