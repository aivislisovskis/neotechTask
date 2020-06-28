import { ColumnDefinition, TableData } from '../table.types';
import { ColumnType } from '../../../elements/input/input.types';

export const tableData: TableData = [
  {
    data: ['Janis', 'Berzins', '10', 'mail@mail.ll', 'Some company'],
    id: 'someId',
  },
  {
    data: ['Peteris', 'Klavins', '20', 'rail@mail.ll', 'One company'],
    id: 'someId2',
  },
  {
    data: ['Zane', 'Kocina', '25', 'nail@mail.ll', 'Second company'],
    id: 'someId3',
  },
];

export const tableColumns: ColumnDefinition[] = [
  {
    header: 'name',
    type: ColumnType.string,
  },
  {
    header: 'surname',
    type: ColumnType.string,
  },
  {
    header: 'age',
    type: ColumnType.number,
  },
  {
    header: 'email',
    type: ColumnType.string,
  },
  {
    header: 'company',
    type: ColumnType.string,
  },
  {
    header: 'actions',
    type: ColumnType.button,
  }
];