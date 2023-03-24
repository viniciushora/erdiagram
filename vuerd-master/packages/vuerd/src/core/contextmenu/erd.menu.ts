import { runAutomaticTablePlacement } from '@/core/AutomaticTablePlacement';
import { keymapOptionsToString, keymapOptionToString } from '@/core/keymap';
import { addMemo$ } from '@/engine/command/memo.cmd.helper';
import { addTable$ } from '@/engine/command/table.cmd.helper';
import { IERDEditorContext } from '@/internal-types/ERDEditorContext';
import { Menu, MenuOptions } from '@@types/core/contextmenu';

import { createDatabaseMenus } from './database.menu';
import { createDrawRelationshipMenus } from './drawRelationship.menu';
import { createExportMenus } from './export.menu';
import { createImportMenus } from './import.menu';
import { createShowMenus } from './show.menu';

const defaultOptions: MenuOptions = {
  nameWidth: 165,
  keymapWidth: 50,
};

export function createERDMenus(
  context: IERDEditorContext,
  canvas: Element
): Menu[] {
  const { store, keymap, eventBus } = context;
  return [
    {
      icon: {
        prefix: 'fas',
        name: 'table',
      },
      name: 'Nova Tabela',
      keymap: keymapOptionToString(keymap.addTable[0]),
      keymapTooltip: keymapOptionsToString(keymap.addTable),
      execute: () => store.dispatch(addTable$(store)),
    },
    {
      icon: {
        prefix: 'fas',
        name: 'sticky-note',
      },
      name: 'Nova anotação',
      keymap: keymapOptionToString(keymap.addMemo[0]),
      keymapTooltip: keymapOptionsToString(keymap.addMemo),
      execute: () => store.dispatch(addMemo$(store)),
    },
    {
      icon: {
        prefix: 'mdi',
        name: 'vector-line',
        size: 18,
      },
      name: 'Relacionamentos',
      children: createDrawRelationshipMenus(context),
    },
    {
      icon: {
        prefix: 'fas',
        name: 'eye',
      },
      name: 'Ver Opção',
      children: createShowMenus(context),
    },
    {
      icon: {
        prefix: 'mdi',
        name: 'database',
        size: 18,
      },
      name: 'Banco de Dados',
      children: createDatabaseMenus(context),
    },
    {
      icon: {
        prefix: 'fas',
        name: 'file-import',
      },
      name: 'Importar',
      children: createImportMenus(context),
    },
    {
      icon: {
        prefix: 'fas',
        name: 'file-export',
      },
      name: 'Exportar',
      children: createExportMenus(context, canvas),
    },
    {
      icon: {
        prefix: 'mdi',
        name: 'atom',
        size: 18,
      },
      name: 'Colocação de Tabela Automática',
      execute: () => runAutomaticTablePlacement(context),
    },
  ].map(menu => ({ ...menu, options: { ...defaultOptions } }));
}
