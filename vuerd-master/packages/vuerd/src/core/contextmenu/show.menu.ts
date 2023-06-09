import { changeCanvasShow } from '@/engine/command/canvas.cmd.helper';
import { Menu, MenuOptions } from '@@types/core/contextmenu';
import { ERDEditorContext } from '@@types/core/ERDEditorContext';
import { ShowKey } from '@@types/engine/store/canvas.state';

interface ShowMenu {
  name: string;
  showKey: ShowKey;
}

const showMenus: ShowMenu[] = [
  {
    name: 'Comentário da Tabela',
    showKey: 'tableComment',
  },
  {
    name: 'Comentário da Coluna',
    showKey: 'columnComment',
  },
  {
    name: 'Tipo de Dado',
    showKey: 'columnDataType',
  },
  {
    name: 'Default',
    showKey: 'columnDefault',
  },
  {
    name: 'Not Null',
    showKey: 'columnNotNull',
  },
  {
    name: 'Unique',
    showKey: 'columnUnique',
  },
  {
    name: 'Auto Increment',
    showKey: 'columnAutoIncrement',
  },
  {
    name: 'Relacionamento',
    showKey: 'relationship',
  },
];

const defaultOptions: MenuOptions = {
  nameWidth: 115,
  keymapWidth: 0,
  close: false,
};

export const createShowMenus = ({ store }: ERDEditorContext): Menu[] =>
  showMenus.map(showMenu => ({
    icon: store.canvasState.show[showMenu.showKey]
      ? {
          prefix: 'fas',
          name: 'check',
        }
      : undefined,
    name: showMenu.name,
    execute: () => store.dispatch(changeCanvasShow(store, showMenu.showKey)),
    options: {
      ...defaultOptions,
    },
  }));
