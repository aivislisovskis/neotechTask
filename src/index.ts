import styles from './css.css';
import { Table } from './components/table/Table';
import { Button } from './elements/button/Button';
import { generateList } from './createList';
import { api } from './api/api';
import { ApiDataRow, ApiDataRowToRowData } from './types';
import { Modular } from './components/modular/Modular';
import { TableForm } from './components/tableForm/TableForm';
import { columns } from './dataConfig';
import { RowData } from './components/table/table.types';
import { HistoryHandler } from './helpers/history';
import { DeleteForm } from './components/deleteForm/DeleteForm';

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

    this.history = new HistoryHandler([
      {
        match: 'http:\/\/localhost:3000\/row\/(\\w+)$',
        onMatch: this.onMatchRow,
      },
      {
        match: 'http:\/\/localhost:3000\/row\/$',
        onMatch: this.onMatchNewRow,
      },
      {
        match: 'http:\/\/localhost:3000\/row$',
        onMatch: this.onMatchNewRow,
      },
    ]);

    this.applyStyle();
    await this.requestTableData();
    this.createModulars();
    this.history.parseCurrent(document.location.href);
  }

  onMatchRow = async (props: string[] | null) => {
    if (props) {
        const data: ApiDataRow | null = await api.getItem(props[1]);
        if (data && this.table) {
          const formatedData: RowData = ApiDataRowToRowData([data])[0];
          if (formatedData.id !== null && this.modularEdit) {
            this.modularEdit.setTitle('Edit');
            this.modularEdit.applyData(formatedData.data, formatedData.id);            
          }
        }
    }
  };

  onMatchNewRow = () => {
    if (this.modularEdit) {
      this.modularEdit.setTitle('New');
      this.modularEdit.applyData();
    }
  };

  onClick = (e: Event) => {
    generateList();
  };

  onEdit = (row: RowData) => {
    this.history?.pushState(`/row/${row.id}`);
  };

  onNew = () => {
    this.history?.pushState('/row');
  };

  onDelete = (row: RowData) => {
    this.modularConfirmDelete?.applyData(row, row.id);
  };

  onEditClose = () => {
    this.history?.pushState('/');
  }

  private createModulars() {
    if (this.body && this.table) {
      this.modularEdit = new Modular(this.body, new TableForm({ table: this.table, history: this.history } ), 'Edit', this.onEditClose);
      this.modularConfirmDelete = new Modular(this.body, new DeleteForm({ table: this.table }), 'Delete?');
    }
  }

  private applyStyle() {
    if (this.body) {
      this.body.className = styles.someClass;
    }
  }

  private async requestTableData() {
    const tableData: ApiDataRow[] = await api.getList();

    if (this.body) {
      this.addCreateData();

      this.table = new Table({
        data: tableData.length > 0 ? ApiDataRowToRowData(tableData) : [],
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
    const createList = new Button(this.onClick, 'Add 10 Items');
    createList.body && this.body && this.body.appendChild(createList.body);
  }
}


new Base();