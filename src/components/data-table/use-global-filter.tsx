import { Row } from "@tanstack/react-table";

export function globalFilterFn<TData>(
  row: Row<TData>,
  columnIds: string[],
  filterValue: string,
): boolean {
  const searchValue = filterValue.toLowerCase();
  return columnIds.some((columnId) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (row.getValue(columnId) as any)?.toString().toLowerCase();
    return value?.includes(searchValue);
  });
}
