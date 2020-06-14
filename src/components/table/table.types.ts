export type TableData = RowData[];
export interface TableOptions {
    data?: TableData,
    headers: string[],
}

export interface RowData {
    id: string | number | null,
    data: string[]
};

export interface RowOptions {
    data: RowData,
    header?: boolean,
}

export function isTableData(data: any): data is TableData {
    return Array.isArray(data) && data.length > 0 && isRowData(data[0]);
}

export function isRowData(data: any): data is RowData {
    return Array.isArray(data) && data.length > 0 && (typeof(data[0]) === 'string');
}