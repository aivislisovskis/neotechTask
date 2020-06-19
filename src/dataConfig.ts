import { ColumnDefinition } from './components/table/table.types';
import { ColumnType } from './elements/input/input.types';

export const columns: ColumnDefinition[] = [
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
];
