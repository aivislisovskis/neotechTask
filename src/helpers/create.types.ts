export interface ElementOptions {
    className?: string | Array<string>,
    content?: string | ElementBlueprint | Array<(ElementBlueprint | HTMLElement | null)> | HTMLElement | null,
    actions?: ElementActions,
    props?: ElementProps,
}

export interface ElementBlueprint {
    elementTag: Elements,
    options?: ElementOptions,
    props?: ElementProps,
}

export type MouseEventHandler = (e: MouseEvent) => void;

export interface ElementActions {
    click?: MouseEventHandler,
}

export interface ElementProps {
}

export enum Elements {
    div = 'div',
    span = 'span',
    input = 'input',
    button = 'button',
    article = 'article',
    section = 'section',
    header = 'header',
    footer = 'footer',
    nav = 'nav',
}

export function isElementBlueprint(content: any): content is ElementBlueprint {
    return (content as ElementBlueprint).elementTag !== undefined;
}

export function isElementBlueprintArray(content: any): content is Array<(ElementBlueprint | HTMLElement)> {
    return Array.isArray(content) && content.length > 0 && ((content[0] as ElementBlueprint).elementTag !== undefined || (content[0] instanceof HTMLElement));
}
