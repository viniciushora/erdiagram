import { SIZE_COLUMN_MARGIN_RIGHT } from '@/core/layout';
import { css } from '@/core/tagged';

export const ColumnKeyStyle = css`
  .vuerd-column-key2 {
    display: flex;
    vertical-align: middle;
    align-items: center;
    fill: #fff0;
    border-radius: 100%;
    background-color: var(--vuerd-color-table);
  }

  .vuerd-column-key2.pk {
    background-color: #000000;
  }
`;
