import './Table';
import './Memo';
import './MinimapHandle';

import {
  beforeMount,
  defineComponent,
  FunctionalComponent,
  html,
  svg,
  watch,
} from '@vuerd/lit-observable';
import { classMap } from 'lit-html/directives/class-map';
import { repeat } from 'lit-html/directives/repeat';
import { styleMap } from 'lit-html/directives/style-map';

import { relationshipTpl } from '@/components/editor/logico/Relationship.template';
import { useContext } from '@/core/hooks/context.hook';
import { useRenderTrigger } from '@/core/hooks/renderTrigger.hook';
import { useUnmounted } from '@/core/hooks/unmounted.hook';
import {
  SIZE_MENUBAR_HEIGHT,
  SIZE_MINIMAP_MARGIN,
  SIZE_MINIMAP_WIDTH,
} from '@/core/layout';
import { movementCanvas } from '@/engine/command/canvas.cmd.helper';

declare global {
  interface HTMLElementTagNameMap {
    'vuerd-minimap2': MinimapElement;
  }
}

export interface MinimapProps {
  width: number;
  height: number;
}

export interface MinimapElement extends MinimapProps, HTMLElement {}

const Minimap: FunctionalComponent<MinimapProps, MinimapElement> = (
  props,
  ctx
) => {
  const contextRef = useContext(ctx);
  const { unmountedGroup } = useUnmounted();
  const { renderTrigger } = useRenderTrigger();

  const getStyleMap = () => {
    const { width, height } = contextRef.value.store.canvasState;
    const ratio = SIZE_MINIMAP_WIDTH / width;
    const x = (-1 * width) / 2 + SIZE_MINIMAP_WIDTH / 2;
    const y = (-1 * height) / 2 + (height * ratio) / 2;
    const left = x - SIZE_MINIMAP_WIDTH - SIZE_MINIMAP_MARGIN + props.width;
    const top = y + SIZE_MINIMAP_MARGIN;
    return {
      transform: `scale(${ratio}, ${ratio})`,
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}px`,
      top: `${top}px`,
    };
  };

  const getShadowStyle = () => {
    const left = props.width - SIZE_MINIMAP_WIDTH - SIZE_MINIMAP_MARGIN;
    const top = SIZE_MINIMAP_MARGIN;
    return {
      width: `${SIZE_MINIMAP_WIDTH}px`,
      height: `${SIZE_MINIMAP_WIDTH}px`,
      left: `${left}px`,
      top: `${top}px`,
    };
  };

  const onClickMove = (ev: MouseEvent) => {
    const { store } = contextRef.value;
    // minimap position
    const mapPosLeft = props.width - SIZE_MINIMAP_WIDTH - SIZE_MINIMAP_MARGIN;
    const mapPosTop = SIZE_MINIMAP_MARGIN + SIZE_MENUBAR_HEIGHT;

    // mouse on minimap
    const leftMap = ev.x - mapPosLeft;
    const topMap = ev.y - mapPosTop;

    // ratio size of minimap
    const { width } = contextRef.value.store.canvasState;
    const ratio = SIZE_MINIMAP_WIDTH / width;

    // the orange square showing what user sees position
    const mapDetailTop = (props.height * ratio) / 2;
    const mapDetailLeft = (props.width * ratio) / 2;

    // real movement
    const { scrollLeft, scrollTop } = contextRef.value.store.canvasState;
    const movementX = scrollLeft + (leftMap - mapDetailLeft) / ratio;
    const movementY = scrollTop + (topMap - mapDetailTop) / ratio;

    store.dispatch(movementCanvas(-movementX, -movementY));
  };

  beforeMount(() => {
    const {
      memoState: { memos },
      tableState: { tables },
      relationshipState: { relationships },
    } = contextRef.value.store;

    unmountedGroup.push(
      watch(tables, renderTrigger),
      watch(memos, renderTrigger),
      watch(relationships, renderTrigger)
    );
  });

  return () => {
    const {
      canvasState: { width, height, zoomLevel, show },
      tableState: { tables },
      memoState: { memos },
      relationshipState: { relationships },
    } = contextRef.value.store;

    return html`
      <div
        class="vuerd-minimap-shadow2"
        style=${styleMap(getShadowStyle())}
      ></div>
      <div
        class="vuerd-minimap2"
        style=${styleMap(getStyleMap())}
        @click=${onClickMove}
      >
        <div class="vuerd-erd-background2"></div>
        <div
          class="vuerd-canvas2"
          style=${styleMap({
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${zoomLevel})`,
          })}
        >
          ${repeat(
            tables,
            table => table.id,
            table =>
              table.visible
                ? html`
                    <vuerd-minimap-table2 .table=${table}></vuerd-minimap-table2>
                  `
                : null
          )}
          ${repeat(
            memos,
            memo => memo.id,
            memo =>
              html`<vuerd-minimap-memo2 .memo=${memo}></vuerd-minimap-memo2>`
          )}
          ${show.relationship
            ? svg`
              <svg
                class="vuerd-canvas-svg2"
                style=${styleMap({
                  width: `${width}px`,
                  height: `${height}px`,
                })}
              >
              ${repeat(
                relationships,
                relationship => relationship.id,
                relationship =>
                  relationship.visible
                    ? svg`
                    <g
                      class=${classMap({
                        'vuerd-relationship2': true,
                        identification: relationship.identification,
                      })}
                    >
                      ${relationshipTpl(relationship, 12)}
                    </g>
                `
                    : null
              )}
              </svg>
          `
            : null}
        </div>
      </div>
      <vuerd-minimap-handle2
        .width=${props.width}
        .height=${props.height}
      ></vuerd-minimap-handle2>
    `;
  };
};

defineComponent('vuerd-minimap2', {
  observedProps: ['width', 'height'],
  shadow: false,
  render: Minimap,
});
