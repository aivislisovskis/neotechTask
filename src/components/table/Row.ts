import { RowData, RowOptions } from './table.types';
import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import styles from './table.css';

export class Row {
  body: HTMLElement | null = null;

  constructor(public options: RowOptions) {
    this.body = create(Elements.div, { className: options.header ? styles.headerRow : styles.row, content: this.createElements(options.data) })
  }

  onEditRow = () => {

  }

  private createElements(data: RowData): Array<HTMLElement> {
      const elements = data.map((text: string): HTMLElement => {
        return create(Elements.div, { content: text, className: styles.cell })
      })

    console.info(elements);

    return elements;
  }
}