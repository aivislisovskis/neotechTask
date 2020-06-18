import { RowData, RowOptions } from './table.types';
import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import styles from './table.css';
import { Button } from '../../elements/button/Button';

export class Row {
  body: HTMLElement | null = null;

  constructor(public options: RowOptions) {
    this.body = create(Elements.div, { className: options.header ? styles.headerRow : styles.row, content: this.createElements(options.data) });
    !options.header && this.addActions();
  }

  onEdit = (e: MouseEvent) => {
    this.options.onEdit && this.options.onEdit(this.options.data, this.editCallback);
  };

  editCallback = (data: RowData) => {
    console.info(data);
  };

  onDelete = (e: MouseEvent) => {
    this.options.onDelete && this.options.onDelete(this.options.data, this.deleteCallback);
  };

  deleteCallback = (isDeleted: boolean) => {
    console.info(isDeleted, 'isDeleted');
  };

  private addActions() {
    if (this.body) {
      this.body.appendChild(create(Elements.div, {
        content: [
          new Button(this.onEdit, 'Edit').body,
          new Button(this.onDelete, 'Delete').body,
        ]
      }))
    }
  }

  private createElements(data: RowData): Array<HTMLElement> {
      const elements = data.data.map((text: string): HTMLElement => {
        return create(Elements.div, { content: text, className: styles.cell })
      })

    return elements;
  }
}