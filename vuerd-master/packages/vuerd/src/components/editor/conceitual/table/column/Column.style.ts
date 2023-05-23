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

  .vuerd-column2.draggable {
    opacity: 0.5;
  }
`;
