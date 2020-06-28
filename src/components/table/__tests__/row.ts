import { Row } from '../Row';
import { RowData, RowOptions } from '../table.types';
import { tableData } from '../__mocks__/tableData';

describe('Table > Row', () => {
  const onEditHandler = jest.fn();
  const onDeleteHandler = jest.fn();

  const rowData: RowOptions = {
    header: false,
    data: tableData[0],
    onEdit: onEditHandler,
    onDelete: onDeleteHandler,
  };

  const mouseEvent = new MouseEvent('click', {
    button: 0,
    buttons: 1,
  });

  it('Simple render', () => {
    const row = new Row(rowData);

    expect(row.cells[0].innerHTML).toBe(rowData.data.data[0]);
    expect(row.cells[1].innerHTML).toBe(rowData.data.data[1]);
    expect(row.cells[2].innerHTML).toBe(rowData.data.data[2]);
    expect(row.cells[3].innerHTML).toBe(rowData.data.data[3]);
    expect(row.cells[4].innerHTML).toBe(rowData.data.data[4]);
  });

  it('*Snapshot', () => {
    const row = new Row(rowData);

    expect(row.body).toMatchSnapshot();
  });

  it('Check Event Handlers', () => {
    const row = new Row(rowData);

    const buttonContainer: ChildNode | undefined = row.body?.childNodes[5];

    if (buttonContainer) {
      buttonContainer.firstChild?.dispatchEvent(mouseEvent)
    }

    expect(onEditHandler).toBeCalled();

    if (buttonContainer) {
      buttonContainer.firstChild?.nextSibling?.dispatchEvent(mouseEvent)
    }

    expect(onDeleteHandler).toBeCalled();
  });

  it('Update cells', () => {
    const row = new Row(rowData);

    const updateData: RowData = {
      data: ['Juris', 'Kalnins', '100', 'some@some.ml', 'Other company'],
      id: 'someId',
    };

    row.updateCells(updateData);

    expect(row.cells[0].innerHTML).toBe(updateData.data[0]);
    expect(row.cells[1].innerHTML).toBe(updateData.data[1]);
    expect(row.cells[2].innerHTML).toBe(updateData.data[2]);
    expect(row.cells[3].innerHTML).toBe(updateData.data[3]);
    expect(row.cells[4].innerHTML).toBe(updateData.data[4]);

    expect(row.body).toMatchSnapshot();
  });

  it('Header row', () => {
    const headerRow = { ...rowData, header: true };
    const row = new Row(headerRow);

    expect(row.body?.childNodes[5]).not.toBeInstanceOf(HTMLElement);
  })
});