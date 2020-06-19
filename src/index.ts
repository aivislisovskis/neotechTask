import styles from './css.css';
import { Table } from './components/table/Table';
import { Button } from './elements/button/Button';
import { generateList } from './createList';
import { api } from './api/api';
import { ApiDataRow, ApiDataRowToRowData } from './types';
import { Modular } from './components/modular/Modular';
import { TableForm } from './components/tableForm/TableForm';
import { columns } from './dataConfig';
import { DeleteCallback, NewCallback, RowData, UpdateCallback } from './components/table/table.types';
import { HistoryHandler, Action } from './helpers/history';

class Base {
  body: HTMLElement | null = null;
  modularEdit: Modular | null = null;
  modularConfirmDelete: Modular | null = null;
  table: Table | null = null;
  history: HistoryHandler | null = null;

  constructor () {
    this.init();
  }

  async init () {
    this.body = document.getElementById('codeBase');

    this.applyStyle();
    this.createModulars();
    await this.requestTableData();

    this.history = new HistoryHandler([
      {
        match: 'http:\/\/localhost:3000\/row\/(\\w+)',
        onMatch: this.onMatchRow,
      },
      {
        match: 'http:\/\/localhost:3000\/row\/',
        onMatch: this.onMatchNewRow,
      },
      {
        match: 'http:\/\/localhost:3000\/row',
        onMatch: this.onMatchNewRow,
      },
    ]);
  }

  onMatchRow = async (props: string[] | null) => {
    if (props) {
        const data: ApiDataRow | null = await api.getItem(props[1]);
        if (data && this.table) {
          const formatedData: RowData = ApiDataRowToRowData([data])[0];
          this.onEdit(formatedData, this.table.updateItem);
        }
    }
  };

  onMatchNewRow = () => {
    this.table && this.onNew(this.table.newCallback);
  };

  onClick = (e: Event) => {
    generateList();
  };

  onEdit = (row: RowData, callback: UpdateCallback) => {
    this.history?.pushState(`/row/${row.id}`);

    if (this.modularEdit) {
      this.modularEdit.setTitle('Edit');
      if (row.id !== null) {
        this.modularEdit.applyData(row.data, row.id);
      } else {
        this.modularEdit.applyData(row.data);
      }
    }
  };

  onNew = (callback: NewCallback) => {
    this.history?.pushState(`/row`);

    if (this.modularEdit) {
      this.modularEdit.setTitle('New');
      this.modularEdit.applyData();
    }
    console.info('new');
  };

  onDelete = (row: RowData, callback: DeleteCallback) => {
    console.info(row, 'delete');
  };

  private createModulars() {
    if (this.body) {
      this.modularEdit = new Modular(this.body, new TableForm(), 'Edit');
      this.modularConfirmDelete = new Modular(this.body, new TableForm(), 'Delete?');
    }
  }

  private applyStyle() {
    if (this.body) {
      this.body.className = styles.someClass;
    }
  }

  private async requestTableData() {
    const tableData: ApiDataRow[] | boolean = await api.getList();

    if (this.body && typeof (tableData) !== 'boolean') {
      this.addCreateData();
      this.table = new Table({
        data: ApiDataRowToRowData(tableData),
        headers: columns,
        onEdit: this.onEdit,
        onDelete: this.onDelete,
        onNew: this.onNew,
      });

      if (this.table.body) {
        this.body.appendChild(this.table.body);
      }
    }
  }

  private async addCreateData() {
    const createList = new Button(this.onClick, 'Create List');
    createList.body && this.body && this.body.appendChild(createList.body);
  }
}


new Base();