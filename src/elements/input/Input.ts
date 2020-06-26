import { Elements } from '../../helpers/create.types';
import { create } from '../../helpers/create';
import { ColumnType } from './input.types';
import styles from './input.css';

type OnKeyUp = (newContent: string) => boolean;
type OnEnter = () => void;

export class Input {
  body: HTMLElement | null = null;
  currentValue: string;
  input: HTMLElement | null = null;

  constructor(private initialValue: string, public label: string, public type: ColumnType, public onKeyUp?: OnKeyUp | null, public onEnter?: OnEnter) {
    this.currentValue = initialValue;
    this.create();
  }

  set value(newValue: string) {
    // Here Would apply validation if was required in some case
    this.currentValue = newValue;

    if (this.input instanceof HTMLInputElement) {
      this.input.value = this.currentValue;
    }
  }

  get value(): string {
    return this.currentValue;
  }

  onKeyPressHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (this.onEnter) {
        this.onEnter();
      }

      return;
    }
    let isOk = true;
    const target = e.target as HTMLInputElement;

    if (this.onKeyUp) {
      isOk = this.onKeyUp(target.value);
    }

    if (isOk) {
      this.currentValue = target.value;
      return;
    }

    if (this.input instanceof HTMLInputElement) {
      this.input.value = this.currentValue;
    }
  }

  private create() {
    this.body = create(Elements.div, { className: styles.body, content: [
      create(Elements.label, { className: styles.label, content: this.label, props: { title: this.label, htmlFor: `form-id-${this.label}`  } }),
      this.input = create(Elements.input, { className: styles.input, props: { value: this.value, id: `form-id-${this.label}`, type: (this.type === ColumnType.number ? 'number' : 'text') }, actions: { keyup: this.onKeyPressHandler } })
      ] });
  }
}