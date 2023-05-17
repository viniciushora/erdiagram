import {
  defineComponent,
  FunctionalComponent,
  html,
} from '@vuerd/lit-observable';
import { styleMap } from 'lit-html/directives/style-map';

import { Table } from '@@types/engine/store/table.state';

declare global {
  interface HTMLElementTagNameMap {
    'vuerd-minimap-table2': MinimapTableElement;
  }
}

export interface MinimapTableProps {
  table: Table;
}

export interface MinimapTableElement extends MinimapTableProps, HTMLElement {}

const MinimapTable: FunctionalComponent<
  MinimapTableProps,
  MinimapTableElement
> = (props, ctx) => () => {
  const { table } = props;
  const { ui } = table;
  table.maxWidthColumn();

  return html`
    <div
      class="vuerd-table2"
      style=${styleMap({
        top: `${ui.top}px`,
        left: `${ui.left}px`,
        zIndex: `${ui.zIndex}`,
        width: `${table.width()}px`,
        height: `${table.height()}px`,
      })}
    ></div>
  `;
};

defineComponent('vuerd-minimap-table2', {
  observedProps: ['table'],
  shadow: false,
  render: MinimapTable,
});
