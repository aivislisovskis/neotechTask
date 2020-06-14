import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import { RowData, TableData, TableOptions } from './table.types';
import styles from './table.css';
import { Row } from './Row';

export class Table {
  body: HTMLElement | null = null;

  constructor(public options: TableOptions) {
    this.body = create(Elements.div, {className: styles.body, content: [this.createHeader({ data: options.headers, id: null }), ...this.prepareInitData()]});
  }

  private createHeader(rowData: RowData): HTMLElement | null {
    if (this.options) {
      const row = new Row({ data: rowData, header: true});
      return row.body;
    }

    return null;
  }

  private prepareInitData(): (HTMLElement | null)[] {
    if (this.options?.data) {
      return this.options.data.map((row: RowData): HTMLElement | null => {
        return this.createRow(row);
      });
    }

    return [];
  }

  private createRow(row: RowData) {
    const rowElement = new Row({ data: row });
    return rowElement.body || null;
  }

  public add(data: TableData) {
      data.forEach((row: RowData) => {
        const rowElement = this.createRow(row);
        rowElement && this.body && this.body.appendChild(rowElement);
      })
  }
}
