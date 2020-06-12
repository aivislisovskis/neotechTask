import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import { TableOptions, RowData, TableData } from './table.types';
import styles from './table.css';
import { Row } from './Row';

export class Table {
  body: HTMLElement | null = null;

  constructor(public options: TableOptions) {
    this.body = create(Elements.div, {className: styles.body, content: this.createHeader(options.headers)});
  }

  private createHeader(data: RowData): HTMLElement | null {
      const row = new Row({ data, id: null, header: true });
      return row.body;
  }

  add(data: TableData) {
      data.forEach((row: RowData, id: number) => {
          const rowElement = new Row({data: row, id});
          rowElement.body && this.body && this.body.appendChild(rowElement.body);
      })
  }
}
