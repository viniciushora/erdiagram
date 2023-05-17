import { css } from '@/core/tagged';

export const MinimapStyle = css`
  .vuerd-minimap2 {
    position: absolute;
    overflow: hidden;
  }

  .vuerd-minimap-shadow2 {
    position: absolute;
    box-shadow: 0 1px 6px var(--vuerd-color-minimap-shadow);
    pointer-events: none;
  }
`;
