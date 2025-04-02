import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Atoms/Data_Display/Table";
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  FilterFn,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { DataGridProps } from "@/types";
import GlobalInput from "./searchBox";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { tv } from "tailwind-variants";
import { Dropdowns } from "@/components";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

function DataGrid<T extends object>({
  data,
  columns,
  enableGlobalFilter = true,
  enableSorting = true,
  enablePagination = true,
  enableItemNumber = true,
  pageSize = 10,
}: DataGridProps<T>) {
  /**
   * State to manage global filter, sorting, and pagination.
   *
   */
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const pageItemsList = [
    {
      label: "10",
      key: "10",
    },
    {
      label: "20",
      key: "20",
    },
    {
      label: "30",
      key: "30",
    },
    {
      label: "40",
      key: "40",
    },
    {
      label: "50",
      key: "50",
    },
  ];

  /**
   * useReactTable Hook helps in creating a table with sorting, filtering, and pagination.
   */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
    enableGlobalFilter: enableGlobalFilter,
    enableSorting: enableSorting,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  const [pageButtons, setPageButtons] = useState<number[]>([1, 2, 3]);

  const pageClassName = tv({
    base: "p-2 rounded-md text-center text-sm",
    variants: {
      active: {
        true: "bg-primary-400",
        false: "bg-white bg-opacity-10 backdrop-blur-2xl",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
  });

  return (
    <>
      {enableGlobalFilter && (
        <GlobalInput
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {enableSorting && header.column.getCanSort() ? (
                    <div
                      {...{
                        className: "cursor-pointer select-none",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex items-center">
        {enablePagination && (
          <div className="w-fit grid grid-cols-5 gap-1 mx-auto mt-4">
            <button
              className="p-2 rounded-md bg-white bg-opacity-10 backdrop-blur-2xl text-white"
              onClick={() =>
                setPageButtons((prev) => [
                  prev[0] - 3,
                  prev[1] - 3,
                  prev[2] - 3,
                ])
              }
              disabled={pageButtons[0] === 1}
            >
              <MdKeyboardArrowLeft />
            </button>
            {pageButtons.map((pageNumber) => {
              return (
                <button
                  disabled={
                    table.getState().pagination.pageIndex + 1 === pageNumber ||
                    pageNumber > table.getPageCount()
                  }
                  key={pageNumber}
                  className={pageClassName({
                    active:
                      table.getState().pagination.pageIndex + 1 === pageNumber,
                    disabled: pageNumber > table.getPageCount(),
                  })}
                  onClick={() => table.setPageIndex(pageNumber - 1)}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              className="p-2 rounded-md bg-white bg-opacity-10 backdrop-blur-2xl text-white"
              disabled={pageButtons.includes(table.getPageCount())}
              onClick={() =>
                setPageButtons((prev) => [
                  prev[0] + 3,
                  prev[1] + 3,
                  prev[2] + 3,
                ])
              }
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        )}
        {enableItemNumber && (
          <Dropdowns
            size="sm"
            menuList={pageItemsList}
            onChange={(item) => {
              table.setPageSize(Number(item.key));
            }}
          >
            Show {table.getState().pagination.pageSize}
          </Dropdowns>
        )}
      </div>
    </>
  );
}

export default DataGrid;
