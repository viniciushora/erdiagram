import { getBase64Icon } from '@/core/icon';
import { keymapOptionsToString, keymapOptionToString } from '@/core/keymap';
import { drawStartRelationship$ } from '@/engine/command/editor.cmd.helper';
import { Menu, MenuOptions } from '@@types/core/contextmenu';
import { ERDEditorContext } from '@@types/core/ERDEditorContext';
import { RelationshipKeymapName } from '@@types/core/keymap';
import { RelationshipType } from '@@types/engine/store/relationship.state';

interface RelationshipMenu {
  name: string;
  relationshipType: RelationshipType;
  keymapName: RelationshipKeymapName;
}

export const relationshipMenus: RelationshipMenu[] = [
  {
    name: '(0,1)',
    relationshipType: 'ZeroOne',
    keymapName: 'relationshipZeroOne',
  },
  {
    name: '(0,n)',
    relationshipType: 'ZeroN',
    keymapName: 'relationshipZeroN',
  },
  {
    name: '1',
    relationshipType: 'OneOnly',
    keymapName: 'relationshipOneOnly',
  },
  {
    name: '(1,n)',
    relationshipType: 'OneN',
    keymapName: 'relationshipOneN',
  },
];

export const defaultOptions: MenuOptions = {
  nameWidth: 75,
  keymapWidth: 85,
};

export const createDrawRelationshipMenus = ({
  keymap,
  store,
}: ERDEditorContext): Menu[] =>
  relationshipMenus.map(relationshipMenu => ({
    iconBase64: getBase64Icon(relationshipMenu.relationshipType),
    name: relationshipMenu.name,
    keymap: keymapOptionToString(keymap[relationshipMenu.keymapName][0]),
    keymapTooltip: keymapOptionsToString(keymap[relationshipMenu.keymapName]),
    execute: () =>
      store.dispatch(
        drawStartRelationship$(store, relationshipMenu.relationshipType)
      ),
    options: {
      ...defaultOptions,
    },
  }));
