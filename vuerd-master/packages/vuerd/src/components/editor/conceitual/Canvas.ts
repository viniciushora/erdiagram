import './memo/Memo';
import './table/Table';
import './table/HighLevelTable';
import './DrawRelationship';
import './CanvasSVG';

import {
  beforeMount,
  defineComponent,
  FunctionalComponent,
  html,
  watch,
} from '@vuerd/lit-observable';
import { cache } from 'lit-html/directives/cache';
import { repeat } from 'lit-html/directives/repeat';
import { styleMap } from 'lit-html/directives/style-map';

import { useContext } from '@/core/hooks/context.hook';
import { useRenderTrigger } from '@/core/hooks/renderTrigger.hook';
import { useUnmounted } from '@/core/hooks/unmounted.hook';

declare global {
  interface HTMLElementTagNameMap {
    'vuerd-canvas2': CanvasElement;
  }
}

export interface CanvasProps {}

export interface CanvasElement extends CanvasProps, HTMLElement {}

const Canvas: FunctionalComponent<CanvasProps, CanvasElement> = (
  props,
  ctx
) => {
  const contextRef = useContext(ctx);
  const { unmountedGroup } = useUnmounted();
  const { renderTrigger } = useRenderTrigger();

  beforeMount(() => {
    const {
      memoState: { memos },
      tableState: { tables },
    } = contextRef.value.store;

    unmountedGroup.push(
      watch(tables, renderTrigger),
      watch(memos, renderTrigger)
    );
  });

  return () => {
    const {
      canvasState: { width, height, scrollTop, scrollLeft, zoomLevel, show },
      memoState: { memos },
      tableState: { tables },
      editorState: { drawRelationship },
    } = contextRef.value.store;

    return html`
      <div
        class="vuerd-canvas2"
        style=${styleMap({
          width: `${width}px`,
          height: `${height}px`,
          top: `${scrollTop}px`,
          left: `${scrollLeft}px`,
          transform: `scale(${zoomLevel})`,
        })}
      >
        ${cache(
          zoomLevel > 0.7
            ? repeat(
                tables,
                table => table.id,
                table =>
                  table.visible
                    ? html`<vuerd-table2 .table=${table}></vuerd-table2>`
                    : null
              )
            : repeat(
                tables,
                table => table.id,
                table =>
                  table.visible
                    ? html`
                        <vuerd-high-level-table2
                          .table=${table}
                        ></vuerd-high-level-table2>
                      `
                    : null
              )
        )}
        ${repeat(
          memos,
          memo => memo.id,
          memo => html`<vuerd-memo2 .memo=${memo}></vuerd-memo2>`
        )}
        ${show.relationship
          ? html`<vuerd-canvas-svg2></vuerd-canvas-svg2>`
          : null}
        ${drawRelationship?.start
          ? html`
              <vuerd-draw-relationship2
                .draw=${drawRelationship}
              ></vuerd-draw-relationship2>
            `
          : null}
      </div>
    `;
  };
};

defineComponent('vuerd-canvas2', {
  shadow: false,
  render: Canvas,
});
