import { DefaultStyle } from '@/components/css';
import { IconStyle } from '@/components/Icon.style';

import { CanvasStyle } from './Canvas.style';
import { CanvasSVGStyle } from './CanvasSVG.style';
import { DragSelectStyle } from './DragSelect.style';
import { DrawRelationshipStyle } from './DrawRelationship.style';
import { ERDStyle } from './ERD.style';
import { FindStyle } from './find/Find.style';
import { InputStyle } from './Input.style';
import { MemoStyle } from './memo/Memo.style';
import { MinimapStyle } from './minimap/Minimap.style';
import { MinimapHandleStyle } from './minimap/MinimapHandle.style';
import { ColumnStyle } from './table/column/Column.style';
import { ColumnKeyStyle } from './table/column/ColumnKey.style';
import { HighLevelTableStyle } from './table/HighLevelTable.style';
import { TableStyle } from './table/Table.style';

export const IndexStyle = [
  DefaultStyle,
  ERDStyle,
  CanvasStyle,
  MemoStyle,
  TableStyle,
  HighLevelTableStyle,
  InputStyle,
  ColumnStyle,
  ColumnKeyStyle,
  DrawRelationshipStyle,
  CanvasSVGStyle,
  DragSelectStyle,
  MinimapStyle,
  MinimapHandleStyle,
  FindStyle,
  IconStyle,
].join('');
