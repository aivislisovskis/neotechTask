import { TableData } from './components/table/table.types';

export interface ApiDataRow {
  _id?: string,
  name: string,
  surname: string,
  age: number,
  email?: string,
  company: string,
}

export function ApiDataRowToRowData(data: ApiDataRow[]): TableData {
  return data.reduce((table: TableData, row: ApiDataRow): TableData => {
      return [...table, {
        id: row._id || '',
        data: [
          row.name,
          row.surname,
          String(row.age),
          row.email || '',
          row.company
        ]
      }];
  }, [])
}