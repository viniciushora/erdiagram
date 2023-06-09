export interface TableState {
  tables: Table[];
  indexes: Index[]; // ADD: version 1.2.0
}

export interface PureTable {
  id: string;
  name: string;
  displayColumns: number;
  comment: string;
  columns: Column[];
  ui: TableUI;
  visible?: boolean;
}

export interface Table extends PureTable {
  width(): number;
  height(): number;
  height_concept(): number;
  maxWidthColumn(): ColumnWidth;
}

export interface ColumnWidth {
  width: number;
  name: number;
  comment: number;
  dataType: number;
  default: number;
  notNull: number;
  autoIncrement: number;
  unique: number;
}

export interface TableUI {
  active: boolean;
  top: number;
  left: number;
  zIndex: number;
  widthName: number;
  widthComment: number;
  color?: string; // ADD: version 2.1.?
}

export interface Column {
  id: string;
  name: string;
  comment: string;
  dataType: string;
  default: string;
  option: ColumnOption;
  ui: ColumnUI;
}

export interface ColumnOption {
  autoIncrement: boolean;
  primaryKey: boolean;
  unique: boolean;
  notNull: boolean;
}

export type ColumnOptionKey = keyof ColumnOption;

export interface ColumnUI {
  active: boolean;
  pk: boolean;
  fk: boolean;
  pfk: boolean;
  widthName: number;
  widthComment: number;
  widthDataType: number;
  widthDefault: number;
}

export interface Index {
  id: string;
  name: string;
  tableId: string;
  columns: IndexColumn[];
  unique: boolean;
}

export interface IndexColumn {
  id: string;
  orderType: OrderType;
}

export interface TableBody {
  top: number;
  left: number;
  vertical: boolean;
}

export type OrderType = 'ASC' | 'DESC';
