import { Table } from '../Table';
import { tableColumns, tableData } from '../__mocks__/tableData';

describe('Table > Table', () => {
  const onNewHandler = jest.fn();

  const tableOptions = {
    data: tableData,
    headers: tableColumns,
    onNew: onNewHandler,
  };

  const mouseEvent = new MouseEvent('click', {
    button: 0,
    buttons: 1,
  });

  it('*Snapshot, simple render', () => {
    const table = new Table(tableOptions);

    expect(table.body?.childNodes.length).toBe(5);
    expect(table.body).toMatchSnapshot();
  });

  it('*Snapshot, simple render, no initial data', () => {
    const tableOptionsBlank = { ...tableOptions };
    delete(tableOptionsBlank.data);

    const table = new Table(tableOptionsBlank);

    expect(table.body?.childNodes.length).toBe(2);
    expect(table.body).toMatchSnapshot();
  });

  it('Trigger new row action' , () => {
    const table = new Table(tableOptions);

    table.body?.firstChild?.firstChild?.dispatchEvent(mouseEvent);
    expect(onNewHandler).toBeCalled();
  });

  it('*Check callback for delete row', () => {
    const table = new Table(tableOptions);

    tableOptions.data[0].id && table.deleteCallback(tableOptions.data[0].id);

    expect(table.body?.childNodes.length).toBe(4);
    expect(table.body).toMatchSnapshot();
  });

  it('*Check callback for delete row, incorrect id', () => {
    const table = new Table(tableOptions);

    tableOptions.data[0].id && table.deleteCallback('incorrectId');

    expect(table.body?.childNodes.length).toBe(5);
    expect(table.body).toMatchSnapshot();
  });

  it('*Check callback for add new', () => {
    const table = new Table(tableOptions);

    table.newCallback(tableOptions.data[0]);

    expect(table.body?.childNodes.length).toBe(6);
    expect(table.body).toMatchSnapshot();
  });

  it('*Check callback for update data', () => {
    const table = new Table(tableOptions);

    const updatedData = {
      data: ['New name', 'New surname', '33', 'new@mail.co', 'New company'],
      id: 'someId'
    };

    tableOptions.data[0].id && table.updateItem(updatedData);

    expect(table.body).toMatchSnapshot();
  });

  it('*Check callback for update data, incorrect id', () => {
    const table = new Table(tableOptions);

    const updatedData = {
      data: ['New name', 'New surname', '33', 'new@mail.co', 'New company'],
      id: 'incorrectId'
    };

    tableOptions.data[0].id && table.updateItem(updatedData);

    expect(table.body).toMatchSnapshot();
  });

  it('*Check callback for add list of new data', () => {
    const table = new Table(tableOptions);

    tableOptions.data[0].id && table.add(tableOptions.data);

    expect(table.body?.childNodes.length).toBe(8);
    expect(table.body).toMatchSnapshot();
  });
});