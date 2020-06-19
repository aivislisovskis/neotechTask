import { Row } from './Row';
import { ColumnType } from '../../elements/input/input.types';

export type TableData = RowData[];
export interface TableOptions {
    data?: TableData,
    headers: ColumnDefinition[],
    onDelete?: OnDelete,
    onEdit?: OnEdit,
    onNew?: OnNew,
}

export interface RowData {
    id: string | number | null,
    data: string[]
};

export interface RowOptions {
    data: RowData,
    header?: boolean,
    onEdit?: OnEdit,
    onDelete?: OnDelete,
}

export function isTableData(data: any): data is TableData {
    return Array.isArray(data) && data.length > 0 && isRowData(data[0]);
}

export function isRowData(data: any): data is RowData {
    return Array.isArray(data) && data.length > 0 && (typeof(data[0]) === 'string');
}

export interface ColumnDefinition {
    header: string,
    type: ColumnType,
}

export type NewCallback = (data: RowData) => void;

export type OnNew = (callback: NewCallback) => void;

export type UpdateCallback = (data: RowData) => void;

export type OnEdit = (data: RowData, callback: UpdateCallback) => void;

export type DeleteCallback = (isDeleted: boolean) => void;

export type OnDelete = (data: RowData, callback: DeleteCallback) => void;