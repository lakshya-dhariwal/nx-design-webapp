import * as React from "react";
import { tv } from "tailwind-variants";

const tableClassName = tv({
  slots: {
    table: "w-full caption-bottom text-sm",
    tableHead:
      "first:rounded-tl-lg last:rounded-tr-lg h-10 px-4 py-2 text-left align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    tableHeader: "font-bold text-white text-sm bg-primary-500",
    footer: "bg-secondary font-medium",
    row: "first:[&>td]:last:rounded-bl-lg last:[&>td]:last:rounded-br-lg h-12 transition-colors hover:odd:bg-opacity-5 hover:even:bg-opacity-15",
    cell: "px-4 py-2 text-sm text-white bg-white bg-opacity-10 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    caption: "mt-4 text-sm text-text-primary",
  },
});

const { table, tableHead, tableHeader, footer, row, cell, caption } =
  tableClassName();

export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-lg">
    <table ref={ref} className={table({ className })} {...props} />
  </div>
));
Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={tableHeader({ className })} {...props} />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <tbody ref={ref} {...props} />);
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={footer({ className })} {...props} />
));
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={row({ className })} {...props} />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={tableHead({ className })} {...props} />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cell({ className })} {...props} />
));
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={caption({ className })} {...props} />
));
TableCaption.displayName = "TableCaption";

export const TableComponent = ({
  tableHeader,
  tableBody,
}: {
  tableHeader: React.ReactNode[];
  tableBody: React.ReactNode[][];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeader.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableBody.map((row, index) => (
          <TableRow key={index}>
            {row.map((cell, index) => (
              <TableCell key={index}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
