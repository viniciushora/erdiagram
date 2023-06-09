import { Menu, MenuOptions } from '@@types/core/contextmenu';
import { ERDEditorContext } from '@@types/core/ERDEditorContext';

import { createColumnNameCaseMenus } from './columnNameCase.menu';
import { createHighlightThemeMenus } from './highlightTheme.menu';
import { createLanguageMenus } from './language.menu';
import { createTableNameCaseMenus } from './tableNameCase.menu';

const defaultOptions: MenuOptions = {
  nameWidth: 120,
  keymapWidth: 0,
};

export const createGeneratorCodeMenus = (context: ERDEditorContext): Menu[] =>
  [
    {
      icon: {
        prefix: 'fas',
        name: 'code',
      },
      name: 'Linguagem',
      children: createLanguageMenus(context),
    },
    {
      icon: {
        prefix: 'mdi',
        name: 'format-letter-case',
        size: 18,
      },
      name: 'Name Case da Tabela',
      children: createTableNameCaseMenus(context),
    },
    {
      icon: {
        prefix: 'mdi',
        name: 'format-letter-case',
        size: 18,
      },
      name: 'Name Case da Coluna',
      children: createColumnNameCaseMenus(context),
    },
    {
      icon: {
        prefix: 'mdi',
        name: 'palette',
        size: 18,
      },
      name: 'Highlight Theme',
      children: createHighlightThemeMenus(context),
    },
  ].map(menu => ({ ...menu, options: { ...defaultOptions } }));
