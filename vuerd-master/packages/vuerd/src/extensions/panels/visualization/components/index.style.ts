import { ScrollbarStyle } from '@/components/css/scrollbar.style';
import { InputStyle } from '@/components/editor/logico/Input.style';
import { ColumnStyle } from '@/components/editor/logico/table/column/Column.style';
import { ColumnAutoIncrementStyle } from '@/components/editor/logico/table/column/ColumnAutoIncrement.style';
import { ColumnDataTypeStyle } from '@/components/editor/logico/table/column/ColumnDataType.style';
import { ColumnKeyStyle } from '@/components/editor/logico/table/column/ColumnKey.style';
import { ColumnNotNullStyle } from '@/components/editor/logico/table/column/ColumnNotNull.style';
import { ColumnUniqueStyle } from '@/components/editor/logico/table/column/ColumnUnique.style';
import { TableStyle } from '@/components/editor/logico/table/Table.style';

import { VisualizationStyle } from './Visualization.style';

export const IndexStyle = [
  VisualizationStyle,
  ScrollbarStyle,
  TableStyle,
  InputStyle,
  ColumnStyle,
  ColumnKeyStyle,
  ColumnDataTypeStyle,
  ColumnNotNullStyle,
  ColumnUniqueStyle,
  ColumnAutoIncrementStyle,
].join('');
