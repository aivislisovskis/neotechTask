import { api } from './api/api';
import { ApiDataRow } from './types';

const names: Array<string> = [
  'Jānis',
  'Pēteris',
  'Juris',
  'Līga',
  'Dace',
  'Zane',
  'Karīna',
  'Andris',
  'Edgars',
  'Andrejs',
  'Lāsma',
  'Anete',
  'Gundars',
  'Gundega',
];

const surnames: Array<string> = [
  'Bērziņš',
  'Kalniņš',
  'Liepiņš',
  'Prieciņš',
  'Zaķis',
  'Lācis',
  'Ābele',
  'Ķirsis',
  'Briedis',
  'Lūsis',
  ];

const emails: Array<string> = [
  'gmail.com',
  'inbox.lv',
  'mail.ru',
  'yahoo.com',
  'somemail.so',
  'epasts.lv',
];

const companies: Array<string> = [
  'Accenture',
  'Lattelecom',
  'Bite',
  'LMT',
  'Inbox.lv',
  'Rimi',
  'Lido',
  'Tvnet',
]

function randomAge(): number {
  return Math.round(20 + (Math.random() * 40));
}

function randomize(list: Array<string>): string {
  return list[Math.floor(Math.random() * list.length)];
}

function email(name: string, surname: string): string {
  const random = Math.round(Math.random()*1000);
  const randomMail = randomize(emails);
  return `${name}.${surname}.${random}@${randomMail}`;
}

const itemCount = 10;

export async function generateList() {
  for (let a = 0; a < itemCount; a++) {
    const item: ApiDataRow = {
      name: randomize(names),
      surname: randomize(surnames),
      age: randomAge(),
      company: randomize(companies),
    };

    item.email = email(item.name, item.surname);

    const response = await api.addItem(item);
  }
}
