import {
  defineComponent,
  FunctionalComponent,
  html,
} from '@vuerd/lit-observable';

import { useContext } from '@/core/hooks/context.hook';
import { keymapOptionsToString } from '@/core/keymap';

declare global {
  interface HTMLElementTagNameMap {
    'vuerd-help-drawer': HelpDrawerElement;
  }
}

export interface HelpDrawerProps {
  width: number;
  visible: boolean;
}

export interface HelpDrawerElement extends HelpDrawerProps, HTMLElement {}

interface HelpDescribe {
  name: string;
  keymap: string;
}

const HelpDrawer: FunctionalComponent<HelpDrawerProps, HelpDrawerElement> = (
  props,
  ctx
) => {
  const contextRef = useContext(ctx);

  const getHelpDescribe = (): HelpDescribe[] => {
    const { keymap } = contextRef.value;
    return [
      {
        name: 'Editando - ERD',
        keymap: `dblclick, ${keymapOptionsToString(keymap.edit)}`,
      },
      {
        name: 'Editando - Grid',
        keymap: 'dblclick, Enter',
      },
      {
        name: 'All Stop',
        keymap: keymapOptionsToString(keymap.stop),
      },
      {
        name: 'Busca - buscar, filtrar',
        keymap: keymapOptionsToString(keymap.find),
      },
      {
        name: 'Undo - ERD',
        keymap: keymapOptionsToString(keymap.undo),
      },
      {
        name: 'Redo - ERD',
        keymap: keymapOptionsToString(keymap.redo),
      },
      {
        name: 'Seleção - tabela, memo',
        keymap: `Ctrl + Drag, Click, Ctrl + Click, Cmd + Drag, Cmd + Click, ${keymapOptionsToString(
          keymap.selectAllTable
        )}`,
      },
      {
        name: 'Seleção - coluna, filtro',
        keymap: `Click, Ctrl + Click, Cmd + Click, Shift + Click, Shift + Arrow key(up, down), ${keymapOptionsToString(
          keymap.selectAllColumn
        )}`,
      },
      {
        name: 'Movimento - tabela, memo, coluna, filtro',
        keymap: 'Drag, Ctrl + Drag, Cmd + Drag',
      },
      {
        name: 'Copiar - coluna',
        keymap: keymapOptionsToString(keymap.copyColumn),
      },
      {
        name: 'Colar - coluna',
        keymap: keymapOptionsToString(keymap.pasteColumn),
      },
      {
        name: 'Contextmenu - ERD, Tabela, Relatacionamento, SQL Script, Gerar Código',
        keymap: 'Right-click',
      },
      {
        name: 'Propriedades da Tabela',
        keymap: keymapOptionsToString(keymap.tableProperties),
      },
      {
        name: 'Nova Tabela',
        keymap: keymapOptionsToString(keymap.addTable),
      },
      {
        name: 'Novo Memo',
        keymap: keymapOptionsToString(keymap.addMemo),
      },
      {
        name: 'Novo - coluna, filtro',
        keymap: keymapOptionsToString(keymap.addColumn),
      },
      {
        name: 'Deletar - tabela, memo',
        keymap: keymapOptionsToString(keymap.removeTable),
      },
      {
        name: 'Mover atributos para cima da tabela',
        keymap: keymapOptionsToString(keymap.changeDisplayColumnsTop),
      },
      {
        name: 'Mover atributos a esquerda da tabela',
        keymap: keymapOptionsToString(keymap.changeDisplayColumnsLeft),
      },
      {
        name: 'Mover atributos a direita da tabela',
        keymap: keymapOptionsToString(keymap.changeDisplayColumnsRight),
      },
      {
        name: 'Mover atributos para baixo da tabela',
        keymap: keymapOptionsToString(keymap.changeDisplayColumnsBottom),
      },
      {
        name: 'Esconder Tabela',
        keymap: keymapOptionsToString(keymap.hideTable),
      },
      {
        name: 'Deletar - coluna, filtro',
        keymap: keymapOptionsToString(keymap.removeColumn),
      },
      {
        name: 'Selecionar Dica - dataType, busca',
        keymap: 'Arrow key(right), Click',
      },
      {
        name: 'Mover Dica - dataType, busca',
        keymap: 'Arrow key(up, down)',
      },
      {
        name: 'Chave Primária',
        keymap: keymapOptionsToString(keymap.primaryKey),
      },
      {
        name: 'checkbox - Grid, filtro',
        keymap: 'Space, Click',
      },
      {
        name: 'Mover Checkbox - Grid, filtro',
        keymap: 'Arrow key(up, down, left, right)',
      },
      {
        name: 'Relacionamento - (0,1)',
        keymap: keymapOptionsToString(keymap.relationshipZeroOne),
      },
      {
        name: 'Relacionamento - (0,n)',
        keymap: keymapOptionsToString(keymap.relationshipZeroN),
      },
      {
        name: 'Relacionamento - 1',
        keymap: keymapOptionsToString(keymap.relationshipOneOnly),
      },
      {
        name: 'Relacionamento - (1,n)',
        keymap: keymapOptionsToString(keymap.relationshipOneN),
      },
      {
        name: 'Aumentar Zoom - ERD',
        keymap: keymapOptionsToString(keymap.zoomIn),
      },
      {
        name: 'Diminuir Zoom - ERD',
        keymap: keymapOptionsToString(keymap.zoomOut),
      },
    ];
  };

  const onClose = () => ctx.dispatchEvent(new CustomEvent('close'));

  return () => html`
    <vuerd-drawer
      name="Ajuda"
      .width=${props.width}
      .visible=${props.visible}
      @close=${onClose}
    >
      <table>
        <thead>
          <th>Nome</th>
          <th>Tecla</th>
        </thead>
        <tbody>
          ${getHelpDescribe().map(
            describe => html`
              <tr>
                <td>${describe.name}</td>
                <td>${describe.keymap}</td>
              </tr>
            `
          )}
        </tbody>
      </table>
    </vuerd-drawer>
  `;
};

defineComponent('vuerd-help-drawer', {
  observedProps: ['width', 'visible'],
  shadow: false,
  render: HelpDrawer,
});
