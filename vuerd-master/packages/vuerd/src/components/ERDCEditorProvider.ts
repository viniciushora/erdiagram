import {
  defineComponent,
  getContext,
  html,
  ProviderElement,
} from '@vuerd/lit-observable';

import { SIZE_FONT } from '@/core/layout';
import { themeToString } from '@/core/theme';
import { IERDCEditorContext } from '@/internal-types/ERDCEditorContext';

declare global {
  interface HTMLElementTagNameMap {
    'vuerd-provider': ERDCEditorProviderElement;
  }
}

export interface ERDCEditorProviderElement
  extends ProviderElement<IERDCEditorContext> {}

defineComponent('vuerd-provider', {
  render: (_, ctx: ERDCEditorProviderElement) => () =>
    html`
      <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        :host {
          --vuerd-font-family: 'Noto Sans', sans-serif;
          font-size: ${SIZE_FONT}px;
          font-family: var(--vuerd-font-family) !important;
          ${themeToString(ctx.value.theme)};
        }
      </style>
      <slot></slot>
    `,
});

export const getVuerdContext = (ctx: Element) =>
  getContext<IERDCEditorContext>('vuerd-provider', ctx);
