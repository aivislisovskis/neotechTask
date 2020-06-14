import {
    Elements,
    ElementBlueprint,
    ElementOptions,
    isElementBlueprint,
    isElementBlueprintArray,
    ElementProps,
} from './create.types';

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

        if (options.props) {
            for (let a in options.props) {
                if (options.props.hasOwnProperty(a)) {
                    // @ts-ignorenewElement
                    newElement[a] = options.props[a];
                }
            }
        }

        if (options.actions) {
            for (let a in options.actions) {
                if (options.actions.hasOwnProperty(a)) {
                    // @ts-ignorenewElement
                    newElement.addEventListener(a, options.actions[a]);
                }
            }
        }
    }

    return newElement;
};
