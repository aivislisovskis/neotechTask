export type TableData = RowData[];
export interface TableOptions {
    data?: TableData,
    headers: Array<string>,
}

export type RowData = string[];

export interface RowOptions {
    data: RowData,
    id: number | null,
    header?: boolean,
}