import { GridColumnDataTypeEditor } from '@/extensions/panels/grid/components/grid/GridColumnDataTypeEditor';
import { GridColumnOptionEditor } from '@/extensions/panels/grid/components/grid/GridColumnOptionEditor';
import { GridTextEditor } from '@/extensions/panels/grid/components/grid/GridTextEditor';
import { GridTextRender } from '@/extensions/panels/grid/components/grid/GridTextRender';

export const gridColumns: any = [
  {
    header: 'Tabela',
    name: 'tableName',
    renderer: { type: GridTextRender, options: { placeholder: 'tabela' } },
    editor: { type: GridTextEditor, options: { placeholder: 'tabela' } },
  },
  {
    header: 'Comentário da Tabela',
    name: 'tableComment',
    renderer: { type: GridTextRender, options: { placeholder: 'comentário' } },
    editor: { type: GridTextEditor, options: { placeholder: 'comentário' } },
  },
  {
    header: 'Opção',
    name: 'option',
    minWidth: 100,
    renderer: { type: GridTextRender, options: { placeholder: 'opção' } },
    editor: { type: GridColumnOptionEditor },
  },
  {
    header: 'Nome',
    name: 'name',
    renderer: { type: GridTextRender, options: { placeholder: 'coluna' } },
    editor: { type: GridTextEditor, options: { placeholder: 'coluna' } },
  },
  {
    header: 'DataType',
    name: 'dataType',
    minWidth: 200,
    renderer: { type: GridTextRender, options: { placeholder: 'dataType' } },
    editor: { type: GridColumnDataTypeEditor },
  },
  {
    header: 'Default',
    name: 'default',
    renderer: { type: GridTextRender, options: { placeholder: 'default' } },
    editor: { type: GridTextEditor, options: { placeholder: 'default' } },
  },
  {
    header: 'Comentário',
    name: 'comment',
    renderer: { type: GridTextRender, options: { placeholder: 'comentário' } },
    editor: { type: GridTextEditor, options: { placeholder: 'comentário' } },
  },
].map((gridColumn: any) => ({
  ...gridColumn,
  sortingType: 'asc',
  sortable: true,
}));
