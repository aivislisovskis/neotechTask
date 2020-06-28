// @ts-ignore
import fetch from 'jest-fetch-mock';
import { api } from '../api';
import { listItems, singleNewItem } from '../__mocks__/mockData';

'../api';

beforeEach(() => {
  fetch.resetMocks();
});

const error = new Error('This Error');

describe('API, List', () => {
it('Return Empty', async () => {
  fetch.mockResponseOnce(JSON.stringify([]));

  expect(await api.getList()).toEqual([]);
});

it('Return Fail', async () => {
  fetch.mockResponseOnce('', { status: 404 });

  expect(await api.getList()).toEqual([]);
});

it('Request Failed', async () => {
  fetch.mockAbortOnce();

  expect(await api.getList()).toEqual([]);
});

it('Return List', async () => {
  fetch.mockResponseOnce(JSON.stringify(listItems));

  expect(await api.getList()).toEqual(listItems);
});
});

describe('API, Item', () => {
  it('Return Fail', async () => {
    fetch.mockResponseOnce('', { status: 404 });

    expect(await api.getItem('someId1')).toEqual(null);
  });

  it('Request Failed', async () => {
    fetch.mockAbort();

    expect(await api.getItem('someId1')).toEqual(null);
  });

  it('Return Success', async () => {
    fetch.mockResponseOnce(JSON.stringify(listItems[0]));

    expect(await api.getItem('idofentry4')).toEqual(listItems[0]);
  });
});

describe('API, Update', () => {
  it('Return Fail', async () => {
    fetch.mockResponseOnce('', { status: 404 });

    expect(await api.updateItem(listItems[0], 'id')).toEqual(null);
  });

  it('Request Failed', async () => {
    fetch.mockAbort();

    expect(await api.updateItem(listItems[0],'someId1')).toEqual(null);
  });

  it('Return Success', async () => {
    fetch.mockResponseOnce(JSON.stringify(listItems[0]));

    expect(await api.updateItem(singleNewItem, 'id')).toEqual(listItems[0]);
  });
});

describe('API, Delete', () => {
  it('Return Fail', async () => {
    fetch.mockResponseOnce('', { status: 404 });

    expect(await api.deleteItem('someId1')).toEqual(false);
  });

  it('Request Failed', async () => {
    fetch.mockAbort();

    expect(await api.deleteItem('someId1')).toEqual(false);
  });

  it('Return Success', async () => {
    fetch.mockResponseOnce(JSON.stringify(''));

    expect(await api.deleteItem('someId1')).toEqual(true);
  });
});

describe('API, Add Item', () => {
  it('Return Fail', async () => {
    fetch.mockResponseOnce('', { status: 404 });

    expect(await api.addItem(singleNewItem)).toEqual(null);
  });

  it('Request Failed', async () => {
    fetch.mockAbort();

    expect(await api.addItem(singleNewItem)).toEqual(null);
  });

  it('Return Success', async () => {
    fetch.mockResponseOnce(JSON.stringify(singleNewItem));

    expect(await api.addItem(singleNewItem)).toEqual(singleNewItem);
  });
});