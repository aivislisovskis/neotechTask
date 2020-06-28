import { RowData, RowOptions } from './table.types';
import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import styles from './table.css';
import { Button } from '../../elements/button/Button';

export class Row {
  body: HTMLElement | null = null;
  cells: HTMLElement[] = [];

  constructor(public options: RowOptions) {
    this.body = create(Elements.div, { className: options.header ? styles.headerRow : styles.row, content: this.createCells(options.data) });
    !options.header && this.addActions();
  }

  onEdit = (e: MouseEvent) => {
    this.options.onEdit && this.options.onEdit(this.options.data);
  };

  onDelete = (e: MouseEvent) => {
    this.options.onDelete && this.options.onDelete(this.options.data);
  };

  private addActions() {
    if (this.body) {
      this.body.appendChild(create(Elements.div, {
        className: [
          styles.cell,
          styles.buttonBox
          ],
        content: [
          new Button(this.onEdit, 'Edit').body,
          new Button(this.onDelete, 'Delete').body,
        ]
      }))
    }
  }

  public updateCells(data: RowData) {
    data.data.forEach((text: string, index: number) => {
      this.cells[index].innerHTML = text;
    });
}

  private createCells(data: RowData): Array<HTMLElement> {
      const elements = data.data.map((text: string): HTMLElement => {
        const cell = create(Elements.div, { content: text, className: styles.cell });
        this.cells.push(cell);
        return cell;
      });

    return elements;
  }
}