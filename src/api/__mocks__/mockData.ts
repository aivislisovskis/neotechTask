import { ApiDataRow } from '../../types';

export const listItems: ApiDataRow[] = [
  {
    _id: 'idofentry1',
    name: 'Andris',
    surname: 'Berzins',
    age: 20,
    email: 'some@email.com',
    company: 'Name Of Company',
  },
  {
    _id: 'idofentry2',
    name: 'Janis',
    surname: 'Berzins',
    age: 20,
    email: 'some@email.com',
    company: 'Name Of Company',
  },
  {
    _id: 'idofentry3',
    name: 'Valis',
    surname: 'Berzins',
    age: 20,
    email: 'some@email.com',
    company: 'Name Of Company',
  },
  {
    _id: 'idofentry4',
    name: 'Zanis',
    surname: 'Berzins',
    age: 20,
    email: 'some@email.com',
    company: 'Name Of Company',
  }
];

export const singleNewItem: ApiDataRow = {
  name: 'Janis',
  surname: 'Berzins',
  age: 44,
  email: 'some@email.com',
  company: 'Name Of Company',
};