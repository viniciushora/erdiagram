import { ERDEditorElement } from './components/ERDEditorElement';
import { ERDCEditorElement } from './components/ERDCEditorElement';

export { ERDEditorElement } from './components/ERDEditorElement';
export { ERDEditorContext } from './core/ERDEditorContext';
export { ERDCEditorElement } from './components/ERDCEditorElement';
export { ERDCEditorContext } from './core/ERDCEditorContext';
export * from './core/extension';
export * from './core/file';
export * from './core/icon';
export * from './core/observable';
export * from './core/panel';

declare global {
  interface HTMLElementTagNameMap {
    'erd-editor': ERDEditorElement;
    'vuerd-editor': ERDEditorElement;
    'erd-editor2': ERDCEditorElement;
    'vuerd-editor2': ERDCEditorElement;
  }
}
