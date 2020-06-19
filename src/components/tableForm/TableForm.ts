import { ModularContent } from '../modular/ModularContent';
import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import styles from './tableForm.css';
import { Button } from '../../elements/button/Button';
import { ColumnDefinition } from '../table/table.types';
import { Input } from '../../elements/input/Input';
import { columns } from '../../dataConfig';



export class TableForm extends ModularContent {
   protected createBody() {
    this.body = create(Elements.div, {
      className: styles.body,
      content: [
        this.createRow('', columns[0]),
        this.createRow('', columns[1]),
        this.createRow('', columns[2]),
        this.createRow('', columns[3]),
        this.createRow('', columns[4]),
        ]
    });
  }

  private createRow(data: string, type: ColumnDefinition) {
    this.elements[type.header] = new Input(data, type.header, type.type);

    return create(Elements.div, { content: [
        this.elements[type.header].body
      ]})
  }

  public onSave = () => {
    console.info('SAVE!');
  }

  protected createButtons() {
    this.buttons = create(Elements.div, {
      content: [
        new Button(this.onSave, 'Save').body
      ]
    })
  }

  public applyData(data: any, id?: number): void {
    console.info(this.elements);
    this.elements.name.value = data[0];
    this.elements.surname.value = data[1];
    this.elements.age.value = data[2];
    this.elements.email.value = data[3];
    this.elements.company.value = data[4];
    id && (this.id = id);
  }

  public applyNew(): void {

    console.info('CREATING NEW');

  }
}