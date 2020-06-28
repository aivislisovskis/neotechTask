import { Elements } from '../create.types';
import { create } from '../create';

describe('DOM creation', () => {
  it('Simple DIV', () => {
    expect(create(Elements.div)).toBeInstanceOf(HTMLDivElement);
  });

  it('Simple SPAN', () => {
    expect(create(Elements.span)).toBeInstanceOf(HTMLSpanElement);
  });

  it('Simple DIV with text', () => {
    const content = 'My text';
    const div = create(Elements.div, { content });
    expect(div.innerHTML).toBe(content);
  });

  it('DIV with empty', () => {
    const content = null;
    const div = create(Elements.div, { content });
    expect(div.innerHTML).toBe('');
  });

  it('DIV with Class', () => {
    const className = 'sampleClass';
    const div = create(Elements.div, { className });
    expect(div.className).toBe(className);
  });

  it('DIV with Class array', () => {
    const className = ['sampleClass', 'sampleClass2'];
    const div = create(Elements.div, { className });
    expect(div.className).toBe(`${className[0]} ${className[1]}` );
  });

  it('DIV with Class array with repetition', () => {
    const className = ['sampleClass', 'sampleClass2', 'sampleClass'];
    const div = create(Elements.div, { className });
    expect(div.className).toBe(`${className[0]} ${className[1]}` );
  });

  it('DIV with props (example - id)', () => {
    const id = 'id'
    const div = create(Elements.div, { props: { id } });
    expect(div.id).toBe(id );
  });

  it('DIV with action (example - onclick)', () => {
    const mockOnClick = jest.fn();
    const div = create(Elements.div, {  actions: { click: mockOnClick } });
    const simulatedEvent = new MouseEvent("click", {
      button: 0,
      buttons: 1,
    });

    div.dispatchEvent(simulatedEvent);

    expect(mockOnClick).toBeCalled();
  });

  it('DIV with element blueprint for props', () => {
    const div = create(Elements.div, { content: { elementTag: Elements.div }});
    expect(div.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('DIV with child element', () => {
    const div = create(Elements.div, { content: create(Elements.div) });
    expect(div.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('DIV with array of elements', () => {
    const div = create(Elements.div, { content: [create(Elements.div)] });
    expect(div.firstChild).toBeInstanceOf(HTMLDivElement);
  });
});