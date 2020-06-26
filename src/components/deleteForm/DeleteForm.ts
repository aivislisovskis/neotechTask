import { ModularContent } from '../modular/ModularContent';
import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import styles from './deleteForm.css';
import { Button } from '../../elements/button/Button';
import { api } from '../../api/api';
import { Table } from '../table/Table';
import { RowData } from '../table/table.types';

export class DeleteForm extends ModularContent {
  constructor(public props: { table: Table } ) {
    super(props);
  }

   protected createBody() {
     this.body = create(Elements.div, {
      className: styles.body,
      content: [
        this.guiElements.deleteQuestion = create(Elements.div, { className: styles.deleteMessage, content: '' }),
        ]
    });
  }

  public onTriggerClose() {
    this.onClose && this.onClose(null, false);
  }

  protected createButtons() {
    this.buttons = create(Elements.div, {
      content: [
        new Button(this.onDelete.bind(this), 'Delete').body,
        new Button(this.onTriggerClose.bind(this), 'Close').body,
      ]
    })
  }

  private async onDelete() {
    if (this.id) {
      if (await api.deleteItem(this.id)) {
        this.props.table?.deleteCallback(this.id);
      }
    }

    this.onClose && this.onClose(null, false);
  }

  public applyData(row: RowData) {
    this.id = row.id;
    this.guiElements.deleteQuestion.innerHTML = `Do You really want to delete data of <span>${row.data[0]} ${row.data[1]}</span>?`
  }

  public applyNew() {

  }

}