import { ModularContent } from '../modular/ModularContent';
import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import styles from './tableForm.css';
import { Button } from '../../elements/button/Button';
import { ColumnDefinition } from '../table/table.types';
import { Input } from '../../elements/input/Input';
import { columns } from '../../dataConfig';
import { api } from '../../api/api';
import { Table } from '../table/Table';
import { HistoryHandler } from '../../helpers/history';

export class TableForm extends ModularContent {
  constructor(public props: { table: Table, history: HistoryHandler | null } ) {
    super(props);
  }

   protected createBody() {
     this.body = create(Elements.div, {
      className: styles.body,
      content: [
        this.guiElements.idGroup = create(Elements.div, { content: [
          create(Elements.div, { className: styles.label, content: 'ID:'} ),
          this.guiElements.id = create(Elements.div, { className: styles.id, content: ''} ),
          ] }),
        this.createRow('', columns[0]),
        this.createRow('', columns[1]),
        this.createRow('', columns[2]),
        this.createRow('', columns[3]),
        this.createRow('', columns[4]),
        this.guiElements.savingMessage = create(Elements.div, { className: `${styles.saving} ${styles.hide}`, content: 'Saving!' }),
        ]
    });
  }

  private createRow(data: string, type: ColumnDefinition) {
    this.elements[type.header] = new Input(data, type.header, type.type);

    return create(Elements.div, { content: [
        this.elements[type.header].body
      ]})
  }

  private savingShow() {
    this.guiElements.savingMessage.className = styles.saving;
  }

  private savingHide() {
    this.guiElements.savingMessage.className = `${styles.saving} ${styles.hide}`;
  }

  private idShow() {
    this.guiElements.idGroup.className = '';
  }

  private idHide() {
    this.guiElements.idGroup.className = styles.idHide;
  }

  public async onSave() {
    this.savingShow();

    if (this.id !== null) {
      const saveResponse = await api.updateItem({
        name: this.elements.name.value,
        surname: this.elements.surname.value,
        age: parseInt(this.elements.age.value),
        email: this.elements.email.value,
        company: this.elements.company.value,
      }, String(this.id));

      if (saveResponse?._id) {
        this.props.table.updateItem({
          id: this.id, data: [
            this.elements.name.value,
            this.elements.surname.value,
            this.elements.age.value,
            this.elements.email.value,
            this.elements.company.value,
          ]
        })
      }
    } else {
      const saveResponse = await api.addItem({
        name: this.elements.name.value,
        surname: this.elements.surname.value,
        age: parseInt(this.elements.age.value),
        email: this.elements.email.value,
        company: this.elements.company.value,
      });

      if (saveResponse?._id) {
        this.id = saveResponse._id;

        this.props.table.newCallback({
          id: saveResponse._id, data: [
            this.elements.name.value,
            this.elements.surname.value,
            this.elements.age.value,
            this.elements.email.value,
            this.elements.company.value,
          ]
        });

        this.props.history?.pushState(`/row/${saveResponse._id}`);
      }
    }

    this.savingHide();
  }

  public onTriggerClose() {
      this.onClose && this.onClose(null, false);
  }

  protected createButtons() {
    this.buttons = create(Elements.div, {
      content: [
        new Button(this.onSave.bind(this), 'Save').body,
        new Button(this.onTriggerClose.bind(this), 'Close').body,
      ]
    })
  }

  public applyData(data: any, id?: number): void {
    this.idShow();
    this.elements.name.value = data[0];
    this.elements.surname.value = data[1];
    this.elements.age.value = data[2];
    this.elements.email.value = data[3];
    this.elements.company.value = data[4];
    id && (this.id = id);
    if (this.id !== null) {
      this.guiElements.id.innerHTML = String(this.id);
    }
  }

  public applyNew(): void {
    this.idHide();
    this.elements.name.value = '';
    this.elements.surname.value = '';
    this.elements.age.value = '';
    this.elements.email.value = '';
    this.elements.company.value = '';
    this.id = null;
  }
}