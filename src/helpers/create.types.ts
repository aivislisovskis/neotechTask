export interface ElementOptions {
    className?: string | Array<string>,
    content?: string | ElementBlueprint | Array<ElementBlueprint> | HTMLElement | Array<HTMLElement> | null
}

export interface ElementBlueprint {
    elementTag: Elements,
    options?: ElementOptions,
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
