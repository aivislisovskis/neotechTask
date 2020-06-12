import styles from './css.css';
import { Table } from './components/table/Table';
console.info('JS is RUN!');

const rootElement: HTMLElement | null = document.getElementById('codeBase');

if (rootElement) {
    rootElement.className = styles.someClass;
}

const table = new Table({ data: [], headers: ['name', 'surname', 'email', 'age', 'company']});

console.info(table);

if (table.body && rootElement) {
    rootElement.appendChild(table.body);

    table.add([
        ['Janis', 'Berzins', 'mail@mail.lv', '111', 'Beerzinji'],
        ['Janis', 'Berzins', 'mail@mail.lv', '111', 'Beerzinji'],
        ['Janis', 'Berzins', 'mail@mail.lv', '111', 'Beerzinji'],
        ['Janis', 'Berzins', 'mail@mail.lv', '111', 'Beerzinji'],
        ['Janis', 'Berzins', 'mail@mail.lv', '111', 'Beerzinji'],
        ['Janis', 'Berzins', 'mail@mail.lv', '111', 'Beerzinji'],
        ['Janis', 'Berzins', 'mail@mail.lv', '111', 'Beerzinji'],
        ['Janis', 'Berzins', 'mail@mail.lv', '111', 'Beerzinji'],
    ]);
}