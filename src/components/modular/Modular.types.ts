import { Input } from '../../elements/input/Input';

export interface ModularElements {
  body?: HTMLElement,
  overlay?: HTMLElement,
  title?: HTMLElement,
  container?: HTMLElement,
  buttons?: HTMLElement,
}

export type OnClose = (e: MouseEvent | null, visible?: boolean) => void;

export type TableElements = {
  [key: string]: Input
}

export type GuiElements = {
  [key: string]: HTMLElement
}