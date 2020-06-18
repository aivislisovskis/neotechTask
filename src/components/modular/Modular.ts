import { create } from '../../helpers/create';
import { Elements } from '../../helpers/create.types';
import styles from './modular.css';
import { ModularContent } from './ModularContent';

interface ModularElements {
  body?: HTMLElement,
  overlay?: HTMLElement,
  title?: HTMLElement,
  container?: HTMLElement,
  buttons?: HTMLElement,
}

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

  public toogle = () => {
    this.isVisible = !this.isVisible;
    this.elements.overlay && (this.elements.overlay.className = this.isVisible ? styles.overlay : `${styles.hidden} ${styles.overlay}`);
  };

  public setTitle = (title?: string) => {
    title && (this.title = title);
    this.elements.title && (this.elements.title.innerHTML = this.title);
  };

  public applyContentManager(content: ModularContent) {
    this.contentManager || (this.contentManager = content);
    console.info(this.contentManager);
    this.contentManager.body && this.elements.container?.appendChild(this.contentManager.body);
  }

  public applyData(data?: any, id?: number | string) {
    if (data && id) {
      this.contentManager.applyData(data, id);
    } else {
      this.contentManager.applyNew();
    }
    this.toogle();
  }

  public onEscape = (e: KeyboardEvent) => {
    if (this.isVisible && e.key === 'Escape') {
      this.isVisible = false;
      this.elements.overlay && (this.elements.overlay.className = `${styles.hidden} ${styles.overlay}`);
    }
  }

  private createBase() {
    this.elements.overlay = this.parent.appendChild(create(Elements.div, {
      className: [styles.overlay, styles.hidden],
      content: this.elements.body = create(Elements.div, {
        className: styles.body,
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
