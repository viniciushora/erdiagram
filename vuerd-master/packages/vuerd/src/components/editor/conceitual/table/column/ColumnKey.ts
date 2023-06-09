import {
  defineComponent,
  FunctionalComponent,
  html,
} from '@vuerd/lit-observable';
import { classMap } from 'lit-html/directives/class-map';

import { ColumnUI } from '@@types/engine/store/table.state';

declare global {
  interface HTMLElementTagNameMap {
    'vuerd-column-key2': ColumnKeyElement;
  }
}

export interface ColumnKeyProps {
  ui: ColumnUI;
}

export interface ColumnKeyElement extends ColumnKeyProps, HTMLElement {}

const ColumnKey: FunctionalComponent<ColumnKeyProps, ColumnKeyElement> = (
  props,
  ctx
) => {
  return () => html`
    <div
      class=${classMap({
        'vuerd-column-key2': true,
        pk: props.ui.pk,
        fk: props.ui.fk,
        pfk: props.ui.pfk,
      })}
    >
      <vuerd-icon size="18" name="key"></vuerd-icon>
    </div>
  `;
};

defineComponent('vuerd-column-key2', {
  observedProps: ['ui'],
  shadow: false,
  styleMap: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  render: ColumnKey,
});
