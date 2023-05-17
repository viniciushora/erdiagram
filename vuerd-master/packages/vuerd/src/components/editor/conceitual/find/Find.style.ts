import { SIZE_COLUMN_MARGIN_RIGHT, SIZE_FONT } from '@/core/layout';
import { css } from '@/core/tagged';

export const FindStyle = css`
  .vuerd-find2 {
    width: 225px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    right: 190px;
    color: var(--vuerd-color-font);
    background-color: var(--vuerd-color-menubar);
    opacity: 0.9;
    fill: #fff0;
  }

  .vuerd-find:hover2 {
    fill: var(--vuerd-color-font);
  }

  .vuerd-find-table2 {
    position: relative;
  }

  .vuerd-find-table2 input {
    display: flex;
    width: 193px;
    vertical-align: middle;
    align-items: center;
    margin-right: ${SIZE_COLUMN_MARGIN_RIGHT}px;
    color: var(--vuerd-color-font-active);
    background-color: var(--vuerd-color-menubar);
    outline: none;
    border: none;
    opacity: 0.9;
    padding: 1px 0 1px 0;
    height: 17px;
    font-size: ${SIZE_FONT}px;
    font-family: var(--vuerd-font-family);
    border-bottom: solid #fff0 1.5px;
  }

  .vuerd-find-table2 input:focus {
    border-bottom: solid var(--vuerd-color-edit) 1.5px;
  }

  .vuerd-find-table-list2 {
    position: absolute;
    top: 27px;
    left: 0;
    z-index: 100;
    color: var(--vuerd-color-font);
    background-color: var(--vuerd-color-contextmenu);
    opacity: 0.9;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .vuerd-find-table-list2 > li {
    padding: 5px;
    cursor: pointer;
    font-size: ${SIZE_FONT}px;
  }
  .vuerd-find-table-list2 > li:hover,
  .vuerd-find-table-hint2.active {
    color: var(--vuerd-color-font-active);
    background-color: var(--vuerd-color-contextmenu-active);
  }
  .vuerd-find-table-list2 > li:hover .vuerd-find-table-hint-mark2,
  .vuerd-find-table-hint2.active .vuerd-find-table-hint-mark2 {
    color: var(--vuerd-color-font-active);
  }
  /* animation flip */
  .vuerd-find-table-hint-move2 {
    transition: transform 0.2s;
  }

  .vuerd-find-table-hint-mark2 {
    color: var(--vuerd-color-edit);
  }
`;
