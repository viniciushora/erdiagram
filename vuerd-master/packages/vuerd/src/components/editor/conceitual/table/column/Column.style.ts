import { SIZE_COLUMN_HEIGHT } from '@/core/layout';
import { css } from '@/core/tagged';

export const ColumnStyle = css`
  .vuerd-column2 {
    height: ${SIZE_COLUMN_HEIGHT}px;
    fill: #fff0;
  }

  .vuerd-column2:hover {
    fill: var(--vuerd-color-font);
  }

  .vuerd-column2.select {
    background-color: var(--vuerd-color-column-select);
  }

  .vuerd-column2.active {
    background-color: var(--vuerd-color-column-active);
  }

  .vuerd-column2.draggable {
    opacity: 0.5;
  }

  .vuerd-column2 > vuerd-icon,
  .vuerd-column2 > vuerd-input,
  vuerd-column-key,
  vuerd-column-not-null,
  vuerd-column-data-type,
  vuerd-column-auto-increment,
  vuerd-column-unique {
    float: left;
  }
`;
