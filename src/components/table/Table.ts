import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import { ColumnDefinition, RowData, TableData, TableOptions } from './table.types';
import styles from './table.css';
import { Row } from './Row';
import { Button } from '../../elements/button/Button';

export class Table {
  body: HTMLElement | null = null;

  constructor(public options: TableOptions) {
    this.body = create(Elements.div, {className: styles.body, content: [this.createNew(), this.createHeader(options.headers), ...this.prepareInitData()]});
  }

  private createHeader(rowData: ColumnDefinition[]): HTMLElement | null {
    if (this.options) {
      const row = new Row({ data: { id: null, data: rowData.map((rowInfo: ColumnDefinition) => rowInfo.header) }, header: true });
      return row.body;
    }

    return null;
  }

  private createNew(): HTMLElement | null {
    return create(Elements.div, {
      className: styles.addNewRow,
      content: new Button(this.addNew, 'Add New Row').body,
    })
  }

  newCallback = (data: RowData) => {
    console.info(data, 'NEW');
  };

  public addNew = () => {
    this.options?.onNew && this.options.onNew(this.newCallback);
  };

  private prepareInitData(): (HTMLElement | null)[] {
    if (this.options?.data) {
      return this.options.data.map((row: RowData): HTMLElement | null => {
        return this.createRow(row);
      });
    }

    return [];
  }

  public updateItem(row: RowData) {
    console.info('New Data!');
  }

  private createRow(row: RowData) {
    const rowElement = new Row({data: row, onEdit: this.options.onEdit, onDelete: this.options.onDelete});
    return rowElement.body || null;
  }

  public add(data: TableData) {
      data.forEach((row: RowData) => {
        const rowElement = this.createRow(row);
        rowElement && this.body && this.body.appendChild(rowElement);
      })
  }
}
