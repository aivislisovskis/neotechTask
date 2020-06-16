import { ModularContent } from '../modular/ModularContent';
import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import styles from './tableForm.css';

export class TableForm extends ModularContent {
  protected createBody() {
    this.body = create(Elements.div, {
      className: styles.body,
    });
  }

  protected createButtons() {

  }

  public applyData(data: any, id?: number): void {
    console.info(data, id);
  }
}
