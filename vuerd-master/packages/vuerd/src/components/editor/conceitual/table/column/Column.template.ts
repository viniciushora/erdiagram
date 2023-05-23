import { html, TemplateResult } from '@vuerd/lit-observable';
import { repeat } from 'lit-html/directives/repeat';

import { IERDCEditorContext } from '@/internal-types/ERDCEditorContext';
import { ColumnType } from '@@types/engine/store/canvas.state';

import { ColumnProps } from './Column';

interface ReshapeColumn {
  columnType: ColumnType;
  template: TemplateResult;
}

export interface ColumnTplProps {
  onInput(event: Event, columnType: ColumnType): void;
  onFocus(event: MouseEvent, columnType: ColumnType): void;
  onBlur(): void;
  onEdit(columnType: ColumnType): void;
}

export function columnTpl(
  props: ColumnProps,
  { store, helper }: IERDCEditorContext,
  { onInput, onFocus, onBlur, onEdit }: ColumnTplProps
) {
  const {
    canvasState: { show, setting },
  } = store;
  const { column } = props;
  const { ui } = column;

  const reshapeColumns = setting.columnOrder
    .map<ReshapeColumn | null>(columnType => {
      switch (columnType) {
        case 'columnName':
          return {
            columnType,
            template: html`
              <vuerd-input2
                .width=${props.widthName}
                .value=${column.name}
                .active=${ui.active}
                .select=${props.select}
                .focusState=${props.focusName}
                .edit=${props.editName}
                placeholder="coluna"
                @vuerd-input-blur=${onBlur}
                @input=${(event: Event) => onInput(event, 'columnName')}
                @mousedown=${(event: MouseEvent) =>
                  onFocus(event, 'columnName')}
                @dblclick=${() => onEdit('columnName')}
              ></vuerd-input2>
            `,
          };

        default:
          return null;
      }
    })
    .filter(reshapeColumn => !!reshapeColumn) as ReshapeColumn[];

  return repeat(
    reshapeColumns,
    reshapeColumn => reshapeColumn.columnType,
    reshapeColumn => reshapeColumn.template
  );
}
