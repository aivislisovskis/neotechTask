import styles from './css.css';
console.info('JS is RUN!');


const rootElement: HTMLElement | null = document.getElementById('codeBase');

if (rootElement) {
    rootElement.className = styles.someClass;
}