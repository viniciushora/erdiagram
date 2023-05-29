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

  .vuerd-column2 > vuerd-icon,
  .vuerd-column2 > vuerd-input2,
  vuerd-column-key2 {
    float: left;
  }

  .ligacao {
    width: 50px;
    height:0px;
    margin-top:9px;
    border: 1px solid var(--vuerd-color-table);
  }
`;
