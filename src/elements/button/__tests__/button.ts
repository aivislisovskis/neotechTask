import { Button } from '../Button';

describe('Button', () => {
  const onClickHandler = jest.fn();
  const mouseEvent = new MouseEvent('click', {
    button: 0,
    buttons: 1,
  });

  const buttonTitle = 'title';

  it('Generate button', () => {
    const myButton = new Button(onClickHandler, buttonTitle);

    expect(myButton).toBeInstanceOf(Button);
    expect(myButton.body).toBeInstanceOf(HTMLButtonElement);
    expect(myButton.body?.innerHTML).toBe(buttonTitle);

    myButton.body?.click && myButton.body.click();

    expect(onClickHandler).toBeCalled();
  });
});