import { Input } from '../Input';
import { ColumnType } from '../input.types';

describe('Input', () => {
  const onEnterHandler = jest.fn();
  const onChangeHandler = jest.fn(() => true);
  const onFailChangeHandler = jest.fn(() => false);

  const simpleKeyPress = new KeyboardEvent('keyup', {
    key: "a",
    bubbles: true,
  });

  const enterKeyPress = new KeyboardEvent('keyup', {
    key: "Enter",
    bubbles: true,
  });

  const initialValue = 'value';
  const labalValue = 'label';

  it('Generate button', () => {
    const myInput = new Input(initialValue, labalValue, ColumnType.string);

    expect(myInput).toBeInstanceOf(Input);
    expect(myInput.body).toBeInstanceOf(HTMLDivElement);
    expect(myInput.input).toBeInstanceOf(HTMLInputElement);
    expect((myInput.input as HTMLInputElement).type).toBe('text');
    expect(myInput.body?.firstChild).toBeInstanceOf(HTMLLabelElement);
    expect(myInput.body?.firstChild?.nextSibling).toBeInstanceOf(HTMLInputElement);
  });

  it('Generate and check event handling', () => {
    onChangeHandler.mockClear();
    const myInput = new Input(initialValue, labalValue, ColumnType.string, onChangeHandler, onEnterHandler);

    myInput.input?.dispatchEvent(simpleKeyPress);

    expect(onChangeHandler).toBeCalled();

    myInput.input?.dispatchEvent(enterKeyPress);

    expect(onEnterHandler).toBeCalled();
    expect(onChangeHandler).toBeCalledTimes(1);
  });

  it('Generate and check value handling', () => {
    const input = new Input(initialValue, labalValue, ColumnType.string);

    const inputElement = (input.input as HTMLInputElement);

    expect(inputElement.value).toBe(initialValue);

    const newValue = 'new value';

    input.value = newValue;

    expect(inputElement.value).toBe(newValue);
  });

  it('Generate and check incorrect input', () => {
    const myInput = new Input(initialValue, labalValue, ColumnType.string, onFailChangeHandler);
    myInput.input?.dispatchEvent(simpleKeyPress);

    expect(myInput.value).toBe(initialValue);
  });
});