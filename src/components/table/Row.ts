import { RowData, RowOptions } from './table.types';
import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import styles from './table.css';

export class Row {
  body: HTMLElement | null = null;

  constructor(public options: RowOptions) {
    this.body = create(Elements.div, { className: options.header ? styles.headerRow : styles.row, content: this.createElements(options.data) });
    !options.header && this.addActions();
  }

  onEdit = (e: MouseEvent) => {
    console.info(this.options.data.id);
  };

  private addActions() {
    if (this.body) {
      this.body.appendChild(create(Elements.div, {
        content: [
          create(Elements.button, { className: styles.cell, content: 'Edit', actions: { click: this.onEdit }})
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