import styles from './css.css';
import { Table } from './components/table/Table';
import { Button } from './elements/button/Button';
import { generateList } from './createList';
import { api } from './api/api';
import { ApiDataRow, ApiDataRowToRowData } from './types';
import { Modular } from './components/modular/Modular';
import { TableForm } from './components/tableForm/TableForm';
import { columns } from './dataConfig';
import { DeleteCallback, RowData, UpdateCallback } from './components/table/table.types';

class Base {
    body: HTMLElement | null = null;
    modularEdit: Modular | null = null;
    modularConfirmDelete: Modular | null = null;
    table: Table | null = null;

    constructor() {
        this.body = document.getElementById('codeBase');

        this.applyStyle();
        this.createModulars();
        this.requestTableData();
    }

    onClick = (e: Event) => {
        generateList();
    };

    onEdit = (row: RowData, callback: UpdateCallback) => {
        if (this.modularEdit) {
            if (row.id !== null) {
                this.modularEdit.applyData(row.data, row.id);
            } else {
                this.modularEdit.applyData(row.data);
            }
        }
        console.info(row, 'edit');
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

        if (this.body && typeof(tableData) !== 'boolean') {
            this.addCreateData();
            this.table = new Table({ data: ApiDataRowToRowData(tableData), headers: columns, onEdit: this.onEdit, onDelete: this.onDelete });

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