type OnMatch = (props: string[] | null) => void;

export interface Action {
  match: string,
  onMatch: OnMatch,
}

export class HistoryHandler{
  history: History = window.history;
  title: string = '';

  constructor(private actions: Action[] ) {
    this.parseCurrent(document.location.href);
  }

  parseCurrent(path: string) {
    let props: RegExpMatchArray | null = null;

    const onMatchAction: OnMatch | null  = this.actions.reduce((doAction: null | OnMatch, compare: Action) => {
      if (!doAction) {
        const reg = new RegExp (compare.match);
        if (reg.test(path)) {
          props = path.match(reg);
          return compare.onMatch;
        }
      }

      return doAction;
    }, null);

    const sendProps: string[] = [];

    if (props) {
      // Have no idea how to fix this. If removed - complains about "never" on map method
      //@ts-ignore
      sendProps = props.map((prop: string) => prop)
    }

    onMatchAction && onMatchAction(sendProps);
  }

  pushState(path: string, title?: string) {
    console.info(this.history.pushState({}, title || this.title, path));
  }
}
