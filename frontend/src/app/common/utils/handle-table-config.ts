import { Column } from '../types/table.types';

export function handleTableConfig(columns: Column[]) {
  const displayedColumns = columns.map((col) => col.name);

  return {
    columns,
    displayedColumns,
  };
}
