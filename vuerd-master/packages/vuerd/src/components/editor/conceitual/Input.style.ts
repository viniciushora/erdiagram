import {
  SIZE_COLUMN_MARGIN_RIGHT,
  SIZE_FONT,
  SIZE_INPUT_EDIT_HEIGHT,
} from '@/core/layout';
import { css } from '@/core/tagged';

export const InputStyle = css`
  .vuerd-input2 {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    margin-right: ${SIZE_COLUMN_MARGIN_RIGHT}px;
    color: var(--vuerd-color-font-active);
  }

  input.vuerd-input2 {
    outline: none;
    border: none;
    opacity: 0.9;
    padding: 1px 0 1px 0;
    height: 17px;
    text-align:center;
    font-size: ${SIZE_FONT}px;
    font-family: var(--vuerd-font-family);
  }

  div.vuerd-input2 {
    border-bottom: solid #fff0 1.5px;
    height: ${SIZE_INPUT_EDIT_HEIGHT}px;
    cursor: default;
  }

  .vuerd-input2 > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vuerd-input2.select {
    background-color: var(--vuerd-color-column-select);
  }

  .vuerd-input2.active {
    background-color: var(--vuerd-color-column-active);
  }

  .vuerd-input2.focus {
    border-bottom: solid var(--vuerd-color-focus) 1.5px;
  }

  .vuerd-input2.edit {
    border-bottom: solid var(--vuerd-color-edit) 1.5px;
  }

  .vuerd-input2.placeholder {
    color: var(--vuerd-color-font-placeholder);
  }
`;
