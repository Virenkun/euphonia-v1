"use client";

import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnDef,
  FilterFn,
  ColumnFilter,
} from "@tanstack/react-table";

import { formatDuration, fuzzyMatch } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Session } from "@/types/types";
import { format } from "date-fns";

const columnHelper = createColumnHelper<Session>();

const fuzzyFilter: FilterFn<Session> = (row, columnId, value) => {
  const itemValue = row.getValue(columnId);
  return fuzzyMatch(String(itemValue), value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<Session, any>[] = [
  columnHelper.accessor("session_id", {
    cell: (info) => info.getValue(),
    header: "Session ID",
  }),
  columnHelper.accessor("min_created_at", {
    cell: (info) =>
      info.getValue() && format(info.getValue(), "MMMM d, yyyy h:mm a"),
    header: "Created At",
  }),
  columnHelper.accessor("user_word_count", {
    cell: (info) => `${info.getValue()} words`,
    header: "User Avg Word Count",
  }),
  columnHelper.accessor("assistant_word_count", {
    cell: (info) => `${info.getValue()} words`,
    header: "Assistant Avg Word Count",
  }),
  columnHelper.accessor("duration_seconds", {
    cell: (info) => formatDuration(info.getValue()),
    header: "Duration",
  }),
];

interface SessionTableProps {
  data: Session[];
}

export const SessionTable: React.FC<SessionTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters] = useState<ColumnFilter[]>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-0">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  <tr>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-3 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-semibold text-sm text-white">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={header.column.getToggleSortingHandler()}
                            className="ml-2 text-white hover:bg-blue-500"
                          >
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ArrowUpDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                  <tr className="bg-blue-50">
                    {/* {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-2">
                        <div className="relative">
                          {/* <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /> */}
                    {/* <Input
                            placeholder={`Search...`}
                            value={columnFilters[header.column.id] || ""}
                            onChange={(e) =>
                              handleFilterChange(
                                header.column.id,
                                e.target.value
                              )
                            }
                            className="w-full max-w-[150px] pl-8 text-sm bg-white"
                          /> */}
                    {/* </div>
                      </th> */}
                    {/* ))} */}
                  </tr>
                </React.Fragment>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors duration-150`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 text-sm text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
