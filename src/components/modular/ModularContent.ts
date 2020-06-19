import { Input } from '../../elements/input/Input';

type TableElements = {
  [key: string]: Input
}

export abstract class ModularContent{
  public body: HTMLElement | null = null;
  public buttons: HTMLElement | null = null;
  public elements: TableElements = {};
  public id: string | number = '';

  constructor() {
    this.createBody();
    this.createButtons();
  }

  protected abstract createBody(): void;
  protected abstract createButtons(): void;
  public abstract applyData(data: any, id?: number | string): void;
  public abstract applyNew(): void;
}