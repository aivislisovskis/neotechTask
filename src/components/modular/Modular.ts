import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import styles from './modular.css';
import { ModularContent } from './ModularContent';
import { ModularElements } from './Modular.types';

export class Modular {
  elements: ModularElements = {};
  private isVisible: boolean = false;

  constructor(public parent: HTMLElement, private contentManager: ModularContent, private title: string = '') {
    this.createBase();
    if (contentManager) {
      this.applyContentManager(contentManager);
    }
    this.setTitle();

    document.addEventListener('keyup', this.onEscape)
  }

  public toogle = (_: MouseEvent | null, visible?: boolean) => {
    if (typeof visible !== 'boolean') {
      this.isVisible = !this.isVisible;
    } else {
      this.isVisible = visible;
    }

    this.elements.overlay && (this.elements.overlay.className = (!this.isVisible ? styles.overlay : `${styles.show} ${styles.overlay}`));
  };

  public setTitle = (title?: string) => {
    title && (this.title = title);
    this.elements.title && (this.elements.title.innerHTML = this.title);
  };

  public applyContentManager(content: ModularContent) {
    this.contentManager || (this.contentManager = content);
    this.contentManager.body && this.elements.container?.appendChild(this.contentManager.body);
    this.contentManager.buttons && this.elements.buttons?.appendChild(this.contentManager.buttons);
    this.contentManager.setClose(this.toogle);
  }

  public applyData(data?: any, id?: number | string | null) {
    if (data && id) {
      this.contentManager.applyData(data, id);
    } else {
      this.contentManager.applyNew();
    }
    this.toogle(null, true);
  }

  public onEscape = (e: KeyboardEvent) => {
    if (this.isVisible && e.key === 'Escape') {
      this.isVisible = false;
      this.elements.overlay && (this.elements.overlay.className = styles.overlay);
    }
  }

  private createBase() {
    this.elements.overlay = this.parent.appendChild(create(Elements.div, {
      className: styles.overlay,
      actions: { click: this.toogle },
      content: this.elements.body = create(Elements.div, {
        className: styles.body,
        actions: { click: (e: MouseEvent) => e.stopPropagation()},
        content: [
          create(Elements.div, {
            className: styles.header,
            content: [
              this.elements.title = create(Elements.div, {
                className: styles.title,
              }),
              create(Elements.div, {
                className: styles.close,
                content: 'x',
                actions: {
                  click: this.toogle
                },
                props: {
                  title: 'Close'
                }
              }),
            ],
        }),
         this.elements.container = create(Elements.div, {
           className: styles.container,
         }),
          this.elements.buttons = create(Elements.div, {
            className: styles.buttonGroup,
          })
        ]
      })
    }));
  }
}
