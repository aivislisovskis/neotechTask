import { Elements } from '../../helpers/create.types';
import { create } from '../../helpers/create';
import { ColumnType } from './input.types';

type OnChange = (newContent: string, isEnter: boolean) => boolean;

export class Input {
  body: HTMLElement | null = null;
  currentValue: string;
  input: HTMLElement | null = null;

  constructor(private initialValue: string, public label: string, public type: ColumnType, public onChange?: OnChange) {
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

  onChangeHandler = (e: KeyboardEvent) => {
    console.info(e);
    let isOk = true;

    if (this.onChange) {
      isOk = this.onChange('someVal', false);
    }

    if (isOk) {
      this.currentValue = 'someVal';
      return;
    }

    if (this.input instanceof HTMLInputElement) {
      this.input.value = this.currentValue;
    }
  }

  private create() {
    this.body = create(Elements.div, { content: [
      create(Elements.label, { content: this.label }),
      this.input = create(Elements.input, { props: { value: this.value }, actions: { onChange: this.onChangeHandler } })
      ] });
  }
}