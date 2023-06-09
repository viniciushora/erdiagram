/* eslint-disable import/no-duplicates */
import '@/components/editor/logico/Input';
import './column/Column';
import './column/ColumnReverse';

import { Easing, Tween } from '@tweenjs/tween.js';
import {
  beforeMount,
  defineComponent,
  FunctionalComponent,
  html,
  observable,
  updated,
  watch,
} from '@vuerd/lit-observable';
import { classMap } from 'lit-html/directives/class-map';
import { repeat } from 'lit-html/directives/repeat';
import { styleMap } from 'lit-html/directives/style-map';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { FlipAnimation } from '@/core/flipAnimation';
import { onPreventDefault } from '@/core/helper/dom.helper';
import { Bus } from '@/core/helper/eventBus.helper';
import { useColorPicker } from '@/core/hooks/colorPicker.hook';
import { useContext } from '@/core/hooks/context.hook';
import { useHasTable } from '@/core/hooks/hasTable.hook';
import { useTooltip } from '@/core/hooks/tooltip.hook';
import { useUnmounted } from '@/core/hooks/unmounted.hook';
import { keymapOptionsToString } from '@/core/keymap';
import { SIZE_TABLE_BORDER, SIZE_TABLE_PADDING } from '@/core/layout';
import { addColumn$, moveColumn$ } from '@/engine/command/column.cmd.helper';
import {
  editTable,
  editTableEnd,
  focusTable,
} from '@/engine/command/editor.cmd.helper';
import {
  changeColorTable,
  changeTableComment,
  changeTableName,
  changeDisplayColumns,
  moveTable,
  removeTable,
  selectTable$,
} from '@/engine/command/table.cmd.helper';
import { relationshipSort } from '@/engine/store/helper/relationship.helper';
import { Move } from '@/internal-types/event.helper';
import { TableType } from '@@types/engine/store/editor.state';
import { Table, TableBody} from '@@types/engine/store/table.state';
import { RedirectColumnsButton } from '@@types/engine/store/redirectColumnsButton';

import { DragoverColumnDetail } from './column/Column';

declare global {
  interface HTMLElementTagNameMap {
    'vuerd-table2': TableElement;
  }
}

export interface TableProps {
  table: Table;
}

export interface TableElement extends TableProps, HTMLElement {}

const TABLE_PADDING = (SIZE_TABLE_PADDING + SIZE_TABLE_BORDER) * 2;
const ANIMATION_TIME = 300;

const Table: FunctionalComponent<TableProps, TableElement> = (props, ctx) => {
  const contextRef = useContext(ctx);
  const { hasFocusState, hasEdit, hasSelectColumn, hasDraggableColumn } =
    useHasTable(props, ctx);
  useTooltip(['.vuerd-table-button2'], ctx);
  const { resetTooltip } = useTooltip(['.vuerd-table-comment2'], ctx);
  const flipAnimation = new FlipAnimation(
    ctx.shadowRoot ? ctx.shadowRoot : ctx,
    'vuerd-column2',
    'vuerd-column-move2'
  );
  const draggable$ = new Subject<CustomEvent<DragoverColumnDetail>>();
  const { unmountedGroup } = useUnmounted();
  const state = observable({ color: '', id: props.table?.id });
  useColorPicker('.vuerd-table-header-color2', ctx, state);
  let leftTween: Tween<{ left: number }> | null = null;
  let topTween: Tween<{ top: number }> | null = null;

  const onInput = (event: InputEvent, focusType: string) => {
    const { store, helper } = contextRef.value;
    const input = event.target as HTMLInputElement;
    switch (focusType) {
      case 'tableName':
        store.dispatch(changeTableName(helper, props.table.id, input.value));
        break;
      case 'tableComment':
        store.dispatch(changeTableComment(helper, props.table.id, input.value));
        break;
    }
  };

  const onMove = ({ event, movementX, movementY }: Move) => {
    event.type === 'mousemove' && event.preventDefault();
    const { store } = contextRef.value;
    store.dispatch(
      moveTable(
        store,
        event.ctrlKey || event.metaKey,
        movementX,
        movementY,
        props.table.id
      )
    );
  };

  const onMoveStart = (event: MouseEvent | TouchEvent) => {
    const el = event.target as HTMLElement;
    const { store, globalEvent, eventBus } = contextRef.value;
    const { drag$ } = globalEvent;

    if (!el.closest('.vuerd-button2') && !el.closest('vuerd-input2')) {
      leftTween?.stop();
      topTween?.stop();

      drag$.subscribe({
        next: onMove,
        complete: () => eventBus.emit(Bus.BalanceRange.move),
      });
    }

    store.dispatch(
      selectTable$(store, event.ctrlKey || event.metaKey, props.table.id)
    );
  };

  const onRemoveTable = () => {
    const { store } = contextRef.value;
    store.dispatch(removeTable(store, props.table.id));
  };

  const onAddColumn = () => {
    const { store } = contextRef.value;
    store.dispatch(addColumn$(store, props.table.id));
  };

  const onFocus = (focusType: TableType) => {
    const { store } = contextRef.value;
    store.dispatch(focusTable(props.table.id, focusType));
  };

  const onBlur = () => {
    const { store } = contextRef.value;
    store.dispatch(editTableEnd());
  };

  const onEdit = () => {
    const { store } = contextRef.value;
    store.dispatch(editTable());
  };

  const onChangeDisplayColumns = (displayType: number) => {
    const { store } = contextRef.value;
    store.dispatch(changeDisplayColumns(props.table.id, displayType));
  };

  const onDragoverGroupColumn = (event: CustomEvent<DragoverColumnDetail>) =>
    draggable$.next(event);

  const onDraggableColumn = (event: CustomEvent<DragoverColumnDetail>) => {
    const { store } = contextRef.value;
    const {
      editorState: { draggableColumn },
    } = store;
    const { tableId, columnId } = event.detail;

    if (!draggableColumn || draggableColumn.columnIds.includes(columnId))
      return;

    flipAnimation.snapshot();
    store.dispatch(
      moveColumn$(
        store,
        draggableColumn.tableId,
        draggableColumn.columnIds,
        tableId,
        columnId
      )
    );
  };

  const moveBalance = () => {
    const {
      canvasState: { width, height },
      tableState: { tables },
      relationshipState: { relationships },
    } = contextRef.value.store;
    const minWidth = width - (props.table.width() + TABLE_PADDING);
    const minHeight = height - (props.table.height() + TABLE_PADDING);
    const x = props.table.ui.left > minWidth ? minWidth : 0;
    const y = props.table.ui.top > minHeight ? minHeight : 0;

    if (props.table.ui.left < 0 || props.table.ui.left > minWidth) {
      leftTween = new Tween(props.table.ui)
        .to({ left: x }, ANIMATION_TIME)
        .easing(Easing.Quadratic.Out)
        .onUpdate(() => relationshipSort(tables, relationships))
        .onComplete(() => (leftTween = null))
        .start();
    }

    if (props.table.ui.top < 0 || props.table.ui.top > minHeight) {
      topTween = new Tween(props.table.ui)
        .to({ top: y }, ANIMATION_TIME)
        .easing(Easing.Quadratic.Out)
        .onUpdate(() => relationshipSort(tables, relationships))
        .onComplete(() => (topTween = null))
        .start();
    }
  };

  updated(() => flipAnimation.play());

  beforeMount(() => {
    const { eventBus, store } = contextRef.value;
    const {
      canvasState: { show },
    } = store;

    state.color = props.table.ui.color || '';

    unmountedGroup.push(
      draggable$.pipe(debounceTime(50)).subscribe(onDraggableColumn),
      eventBus.on(Bus.BalanceRange.move).subscribe(moveBalance),
      watch(props.table, propName => {
        if (propName !== 'comment') return;

        resetTooltip();
      }),
      watch(show, propName => {
        if (propName !== 'tableComment') return;

        resetTooltip();
      }),
      watch(state, propName => {
        if (propName !== 'color') return;
        store.dispatch(
          changeColorTable(store, true, state.color, props.table.id)
        );
      })
    );
  });

  return () => {
    const {
      keymap,
      store: {
        canvasState: { show },
      },
    } = contextRef.value;

    const redirectColumnsTopButton: RedirectColumnsButton = {
      name: 'changeDisplayColumnsTop',
      key: 1,
      keymap: keymap.changeDisplayColumnsTop,
      icon: 'arrow-up'
    }

    const redirectColumnsLeftButton: RedirectColumnsButton = {
      name: 'changeDisplayColumnsLeft',
      key: 2,
      keymap: keymap.changeDisplayColumnsLeft,
      icon: 'arrow-left'
    }

    const redirectColumnsRightButton: RedirectColumnsButton = {
      name: 'changeDisplayColumnsRight',
      key: 3,
      keymap: keymap.changeDisplayColumnsRight,
      icon: 'arrow-right'
    }

    const redirectColumnsBottomButton: RedirectColumnsButton = {
      name: 'changeDisplayColumnsBottom',
      key: 4,
      keymap: keymap.changeDisplayColumnsBottom,
      icon: 'arrow-down'
    }

    const displayOptions: RedirectColumnsButton[] = [
      redirectColumnsTopButton,
      redirectColumnsLeftButton,
      redirectColumnsRightButton,
      redirectColumnsBottomButton
    ]

    const { table } = props;
    const { ui, columns } = table;
    const widthColumn = table.maxWidthColumn();

    state.id = table.id;

    const displayColumnsTopSettings: TableBody = {
      top: (table.height() - 2*table.height() - 39) + (table.columns.length - 1) * 10.2,
      left: (table.width() - table.width() - 90) + (table.columns.length - 1) * 10.2,
      vertical: true
    }

    const displayColumnsLeftSettings: TableBody = {
      top: table.height() - table.height() - 45,
      left: table.width() - table.width() - 150,
      vertical: false
    }

    const displayColumnsRightSettings: TableBody = {
      top: table.height() - table.height() - 45,
      left: table.width() + 10,
      vertical: false
    }

    const displayColumnsBottomSettings: TableBody = {
      top: (table.height() + 22) - (table.columns.length - 1) * 30.6,
      left: (table.width() - table.width() - 90) + (table.columns.length - 1) * 10.2,
      vertical: true
    }

    const displayColumnsSettings: TableBody[] = [
      displayColumnsTopSettings,
      displayColumnsLeftSettings,
      displayColumnsRightSettings,
      displayColumnsBottomSettings
    ]

    const displayOption: TableBody = displayColumnsSettings[table.displayColumns-1]

    return html`
      <div
        class=${classMap({
          'vuerd-table2': true,
          active: ui.active,
        })}
        style=${styleMap({
          top: `${ui.top}px`,
          left: `${ui.left}px`,
          zIndex: `${ui.zIndex}`,
          width: `${table.width()}px`,
          height: `${table.height_concept()}px`,
        })}
        data-id=${table.id}
        @mousedown=${onMoveStart}
        @touchstart=${onMoveStart}
      >
        <div class="vuerd-table-header2">
          <div
            class="vuerd-table-header-color2"
            style=${styleMap({
              width: `${table.width() + SIZE_TABLE_PADDING * 2}px`,
              backgroundColor: ui.color ?? '',
            })}
          ></div>
          ${repeat(
            displayOptions,
            displayOption =>
              displayOption.key != table.displayColumns
              ? html`
              <vuerd-icon
                class="vuerd-button2 vuerd-table-button2 vuerd-priority-button}"
                data-tippy-content=${keymapOptionsToString(displayOption.keymap)}
                name=${displayOption.icon}
                size="12"
                @click=${() => onChangeDisplayColumns(displayOption.key)}
              ></vuerd-icon>
              `
              : null
          )
          }
          <div class="vuerd-table-header-top2">
            <vuerd-icon
              class="vuerd-button2 vuerd-table-button2 vuerd-priority-button"
              data-tippy-content=${keymapOptionsToString(keymap.removeTable)}
              name="times"
              size="12"
              @click=${onRemoveTable}
            ></vuerd-icon>
            <vuerd-icon
              class="vuerd-button2 vuerd-table-button2 vuerd-priority-button"
              data-tippy-content=${keymapOptionsToString(keymap.addColumn)}
              name="plus"
              size="12"
              @click=${onAddColumn}
            ></vuerd-icon>
          </div>
          <div class="vuerd-table-header-body2">
            <vuerd-input2
              class="vuerd-table-name2"
              .width=${table.ui.widthName}
              .value=${table.name}
              .focusState=${hasFocusState('tableName')}
              .edit=${hasEdit('tableName')}
              placeholder="tabela"
              @input=${(event: InputEvent) => onInput(event, 'tableName')}
              @mousedown=${() => onFocus('tableName')}
              @dblclick=${onEdit}
              @vuerd-input-blur=${onBlur}
            ></vuerd-input2>
          </div
        </div>
        <div
        class="${!displayOption.vertical ? 'vuerd-table-body2' : 'vuerd-table-body2-vertical'}"
        style=${styleMap({
          top: `${displayOption.top}px`,
          left: `${displayOption.left}px`
        })}
        @dragenter=${onPreventDefault}
        @dragover=${onPreventDefault}
        >
        <div class="vuerd-table-button-changedisplay">
        </div>
        ${table.displayColumns === 1 || table.displayColumns === 3
          ? repeat(
          columns,
          column => column.id,
          column =>
            html`
              <vuerd-column2
                .tableId=${table.id}
                .column=${column}
                .select=${hasSelectColumn(column.id)}
                .draggable=${hasDraggableColumn(column.id)}
                .focusName=${hasFocusState('columnName', column.id)}
                .focusDataType=${hasFocusState('columnDataType', column.id)}
                .focusNotNull=${hasFocusState('columnNotNull', column.id)}
                .focusDefault=${hasFocusState('columnDefault', column.id)}
                .focusComment=${hasFocusState('columnComment', column.id)}
                .focusUnique=${hasFocusState('columnUnique', column.id)}
                .focusAutoIncrement=${hasFocusState(
                  'columnAutoIncrement',
                  column.id
                )}
                .editName=${hasEdit('columnName', column.id)}
                .editComment=${hasEdit('columnComment', column.id)}
                .editDataType=${hasEdit('columnDataType', column.id)}
                .editDefault=${hasEdit('columnDefault', column.id)}
                .widthName=${widthColumn.name}
                .widthComment=${widthColumn.comment}
                .widthDataType=${widthColumn.dataType}
                .widthDefault=${widthColumn.default}
                @dragover-column=${onDragoverGroupColumn}
              ></vuerd-column2>
            `
        )
          : table.displayColumns === 2 || table.displayColumns === 4
          ? repeat(
            columns,
            column => column.id,
            column =>
              html`
                <vuerd-column2-reverse
                  .tableId=${table.id}
                  .column=${column}
                  .select=${hasSelectColumn(column.id)}
                  .draggable=${hasDraggableColumn(column.id)}
                  .focusName=${hasFocusState('columnName', column.id)}
                  .focusDataType=${hasFocusState('columnDataType', column.id)}
                  .focusNotNull=${hasFocusState('columnNotNull', column.id)}
                  .focusDefault=${hasFocusState('columnDefault', column.id)}
                  .focusComment=${hasFocusState('columnComment', column.id)}
                  .focusUnique=${hasFocusState('columnUnique', column.id)}
                  .focusAutoIncrement=${hasFocusState(
                    'columnAutoIncrement',
                    column.id
                  )}
                  .editName=${hasEdit('columnName', column.id)}
                  .editComment=${hasEdit('columnComment', column.id)}
                  .editDataType=${hasEdit('columnDataType', column.id)}
                  .editDefault=${hasEdit('columnDefault', column.id)}
                  .widthName=${widthColumn.name}
                  .widthComment=${widthColumn.comment}
                  .widthDataType=${widthColumn.dataType}
                  .widthDefault=${widthColumn.default}
                  @dragover-column=${onDragoverGroupColumn}
                ></vuerd-column2-reverse>
              `
        )
        : null }
        </div>
      </div>
    `;
  };
};

defineComponent('vuerd-table2', {
  observedProps: ['table'],
  shadow: false,
  render: Table,
});
