"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  ChevronUp,
  Ellipsis,
  GripVertical,
} from "lucide-react";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

import {
  DragDropContext,
  Draggable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";
import { CardContent } from "../CardContent/CardContent";
import { Input } from "../Form/Input/Input";
import { Select } from "../Form/Input/Select";
import { StrictModeDroppable } from "../StrictModeDroppable";
import { PopupTableMenuAction } from "./PopupTableMenuAction";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  imageField?: boolean;
}

export interface TableActions {
  edit?: boolean;
  delete?: boolean;
}

export interface DynamicTableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  actions?: TableActions;
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
  renderActions?: (id: string) => React.ReactNode;
}

export const DynamicTable: FC<DynamicTableProps> = ({
  columns,
  data,
  actions = { edit: true, delete: true },
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
  renderActions: renderActionsProps,
}) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({ key: "", direction: null });
  const [filteredData, setFilteredData] = useState(data);
  const [term, setTerm] = useState<string>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRefSearch = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const q = params.get("q");
    if (q) {
      setTerm(q);
      setTimeout(() => {
        if (inputRefSearch.current) {
          inputRefSearch.current.focus();
          inputRefSearch.current.selectionStart = q.length;
          inputRefSearch.current.selectionEnd = q.length;
        }
      }, 500);
    } else {
      params.delete("q");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, []);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

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
    return (
      <span
        className={`${
          column.imageField
            ? ``
            : `text-nowrap block overflow-hidden overflow-ellipsis max-w-[300px]`
        }`}
      >
        {item[column.key]}
      </span>
    );
  };

  const highPriorityColumns = columns.filter(
    (col) => col.priority === "high" || !col.priority
  );
  const otherColumns = columns.filter(
    (col) => col.priority !== "high" && col.priority
  );

  return (
    <div className={`w-full ${containerClassName} mt-8`}>
      {/* Búsqueda y controles */}
      {enableSearch && (
        <div className="flex  flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="w-full sm:w-48">
            <form>
              <Input
                ref={inputRefSearch}
                placeholder="Buscar..."
                name="q"
                className="bg-white"
                type="search"
                defaultValue={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}

      <PopupTableMenuAction />

      <CardContent
        className={"!p-2 !my-3 !overflow-x-hidden !overflow-y-visible"}
      >
        {/* Vista Desktop */}
        <div className="hidden lg:block over">
          <DragDropContext onDragEnd={handleDragEnd}>
            <StrictModeDroppable droppableId="table">
              {(provided: DroppableProvided) => (
                <table
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`w-full ${tableClassName}`}
                >
                  <thead className="">
                    <tr className=" ">
                      {enableReorder && <th className="w-8" />}
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          className={`px-4 text-left text-xs uppercase py-2 font-medium text-gray-600 ${
                            column.width || "flex-1"
                          } ${headerClassName}`}
                        >
                          <div className="flex items-center py-1 gap-2">
                            {column.label}
                            {enableSort && column.sortable && (
                              <button
                                className="h-8 w-8 p-0"
                                onClick={() => handleSort(column.key)}
                              >
                                <ChevronUp
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
                        <th className="text-left p-4 pt-0 font-medium text-gray-600" />
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
                            className={`border-t  ${
                              snapshot.isDragging
                                ? "bg-blue-50 *:opacity-0"
                                : "opacity-100"
                            } ${rowClassName}`}
                          >
                            {enableReorder && (
                              <td
                                className="w-8 px-3"
                                {...provided.dragHandleProps}
                              >
                                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                              </td>
                            )}
                            {columns.map((column) => (
                              <td
                                key={`${item.id}-${column.key}`}
                                className={`px-3 py-4 text-sm text-slate-250 font-light   ${
                                  column.width || "flex-1"
                                } ${cellClassName}`}
                              >
                                {renderCell(item, column)}
                              </td>
                            ))}
                            <td className="p-2 px-3 py-4 relative flex justify-center">
                              <button
                                onClick={(e) => {
                                  document.dispatchEvent(
                                    new CustomEvent("sendPopupEvent", {
                                      detail: {
                                        item,
                                        target: e.currentTarget,
                                        render: renderActionsProps,
                                      },
                                    })
                                  );
                                }}
                                className="hover:bg-gray-100 cursor-pointer px-2 rounded py-2 flex justify-center items-center"
                              >
                                <Ellipsis size={18} strokeWidth={1} />
                              </button>
                            </td>
                            {/* {renderActionsProps && (
                              <td className="p-2  px-3 py-4">
                                {renderActionsProps(item.id)}
                              </td>
                            )} */}
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
                            snapshot.isDragging
                              ? "border-blue-500 shadow-lg"
                              : ""
                          } ${rowClassName}`}
                        >
                          {/* Fila principal con columnas de alta prioridad */}
                          <div className="flex items-center p-4">
                            {enableReorder && (
                              <div
                                {...provided.dragHandleProps}
                                className="mr-3"
                              >
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
                              {renderActionsProps &&
                                renderActionsProps(item.id)}
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
      </CardContent>
      {/* Paginación */}
      {enablePagination && filteredData.length > 0 && (
        <div className="flex justify-between items-center ">
          <div className="flex gap-2 items-center">
            <Select
              name=""
              id=""
              value={pageSize.toString()}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white"
            >
              {pageSizeOptions.map((size, key) => (
                <option key={key} value={size.toString()}>
                  {size}
                </option>
              ))}
            </Select>
            <div>por página</div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              <div
                className={`flex gap-1 items-center ${
                  currentPage === 1 ? `text-gray-400` : `hover:underline`
                }`}
              >
                <ChevronLeft size={16} />
              </div>
            </button>
            <div className="p-2 bg-slate-100 border border-gray-200 rounded">
              {currentPage}
            </div>
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
                <ChevronRight size={16} />
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
