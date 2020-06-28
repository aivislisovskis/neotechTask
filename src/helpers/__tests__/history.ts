// @ts-ignore
import { HistoryHandler } from '../history';

describe('History', () => {
  const mockFn = jest.fn();
  const mockWithPropsFn = jest.fn();

  const history = new HistoryHandler([
    {
      onMatch: mockFn,
      match: 'http:\/\/localhost\/row$'
    },
    {
      onMatch: mockWithPropsFn,
      match: 'http:\/\/localhost\/row\/(\\w+)$'
    }
  ]);

  it('Add state to history', () => {
    history.pushState('/newState');
    expect(window.history.length).toBe(2);
  });

  it('Parse state and call match', () => {
    mockFn.mockClear();
    history.parseCurrent('http://localhost/row');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Parse state with incorect path and skip call', () => {
    mockFn.mockClear();
    history.parseCurrent('http://localhost/rows');
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('Add state to history and that should have called match', () => {
    mockFn.mockClear();
    history.pushState('/row');
    expect(mockFn).toHaveBeenCalled();
  });

  it('Add state to history and that should have called match with passed props', () => {
    mockWithPropsFn.mockClear();
    history.pushState('/row/1');
    expect(mockWithPropsFn).toHaveBeenCalledWith(['http://localhost/row/1', '1']);
  });
});