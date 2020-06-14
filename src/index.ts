import styles from './css.css';
import { Table } from './components/table/Table';
import { Button } from './elements/button/Button';
import { generateList } from './createList';
import { api } from './api/api';
import { TableData } from './components/table/table.types';
import { ApiDataRow, ApiDataRowToRowData } from './types';

class Base {
    body: HTMLElement | null = null;

    constructor() {
        this.body = document.getElementById('codeBase');

        this.applyStyle();
        this.requestTableData();
    }

    onClick = (e: Event) => {
        generateList();
    };

    private applyStyle() {
        if (this.body) {
            this.body.className = styles.someClass;
        }
    }

    private async requestTableData() {
        const tableData: ApiDataRow[] | boolean = await api.getList();

        if (this.body && typeof(tableData) !== 'boolean') {
            this.addCreateData();
            const table = new Table({ data: ApiDataRowToRowData(tableData), headers: ['name', 'surname', 'age', 'email', 'company', ''] });

            if (table.body) {
                this.body.appendChild(table.body);
            }
        }
    }

    private async addCreateData() {
        const createList = new Button(this.onClick, 'Create List');
        createList.body && this.body && this.body.appendChild(createList.body);
    }
}


new Base();