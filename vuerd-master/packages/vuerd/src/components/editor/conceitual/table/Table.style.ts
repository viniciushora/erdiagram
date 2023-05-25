import {
  SIZE_FONT,
  SIZE_TABLE_BORDER,
  SIZE_TABLE_HEADER_BODY_HEIGHT,
  SIZE_TABLE_PADDING,
} from '@/core/layout';
import { css } from '@/core/tagged';

export const TableStyle = css`
  .vuerd-table-complex{
    display: inline-block;
  }

  .vuerd-table2 {
    position: absolute;
    display:inline-blocks;
    opacity: 0.9;
    padding: ${SIZE_TABLE_PADDING}px;
    font-size: ${SIZE_FONT}px;
    fill: #fff0;
    color: #fff0;
    background-color: var(--vuerd-color-table);
    border: solid #fff0 ${SIZE_TABLE_BORDER}px;
    border-radius: 5px;
  }

  .vuerd-table2:hover {
    fill: var(--vuerd-color-font);
    color: var(--vuerd-color-font);
  }

  .vuerd-table2.active {
    border: solid var(--vuerd-color-table-active) ${SIZE_TABLE_BORDER}px;
    box-shadow: 0 1px 6px var(--vuerd-color-table-active);
  }

  .vuerd-table2 .vuerd-table-header2 {
    position: relative;
    text-align:center;
  }

  .vuerd-table2 .vuerd-table-header-color2 {
    position: absolute;
    height: 4px;
    top: -11px;
    left: -10px;
    border-radius: 5px 5px 0 0;
    opacity: 0.9;
    cursor: pointer;
  }

  .vuerd-table2 .vuerd-table-header-top2 {
    overflow: hidden;
    cursor: move;
  }

  .vuerd-table2 .vuerd-table-header-top2 .vuerd-button2 {
    margin-left: 5px;
    float: right;
  }

  .vuerd-table2 .vuerd-table-header-body2 {
    height: ${SIZE_TABLE_HEADER_BODY_HEIGHT}px;
  }

  .vuerd-table2 .vuerd-table-header-body2 > vuerd-input2 {
    float: center;
  }

  /* animation flip */
  .vuerd-column-move2 {
    transition: transform 0.3s;
  }

  .vuerd-table-default2:hover {
    color: var(--vuerd-color-font-active);
  }

  .vuerd-table-name2{
    visibility: visible;
  }

  .vuerd-table-body2{
    position:relative;
  }
`;
