import { ElementBlueprint, Elements } from '../../helpers/create.types';
import { create } from '../../helpers/create';

type onClickHandler = (e: Event) => void;

export class Button {
  body: HTMLElement | null = null;

  constructor(public onClick: onClickHandler, public content: ElementBlueprint | string) {
     this.create();
  }

  private create() {
    this.body = create(Elements.button, { content: this.content });
    this.body.addEventListener('click', this.onClick);
  }
}