import { Elements, ElementBlueprint, ElementOptions } from "./create.types";

export const create = (elementTag: Elements, options?: ElementOptions ): HTMLElement => {
    const newElement: HTMLElement = document.createElement(elementTag);

    if (options) {
        if (options.className) {
            if (typeof options.className === 'string') {
                newElement.className = options.className;
            } else {
                const unique = [...new Set(options?.className)];
                newElement.className = unique.join(' ');
            }
        }

        if (options.content) {
            if (typeof options.content === 'string') {
                const newText = document.createTextNode(options.content);
                newElement.appendChild(newText);
            }

            if (isElementBlueprint(options.content)) {
                const subElement: HTMLElement = create(options.content.elementTag, options.content.options);
                newElement.appendChild(subElement);
            }

            if (options.content instanceof HTMLElement) {
                newElement.appendChild(options.content)
            }

            if (isElementBlueprintArray(options.content)) {
                options.content.forEach((element: ElementBlueprint | HTMLElement) => {
                    const subElement = isElementBlueprint(element) ? create(element.elementTag, element.options) : element;
                    newElement.appendChild(subElement);
                })
            }
        }
    }

    return newElement;
};

function isElementBlueprint(content: any): content is ElementBlueprint {
    return (content as ElementBlueprint).elementTag !== undefined;
}

function isElementBlueprintArray(content: any): content is Array<(ElementBlueprint | HTMLElement)> {
    return Array.isArray(content) && content.length > 0 && ((content[0] as ElementBlueprint).elementTag !== undefined || (content[0] instanceof HTMLElement));
}
