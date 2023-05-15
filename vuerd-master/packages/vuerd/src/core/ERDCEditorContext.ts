import { observable } from '@vuerd/lit-observable';
import * as R from 'ramda';

import { noop } from '@/core/helper';
import { createHelper } from '@/core/helper/editor.helper';
import { createCommand } from '@/engine/command';
import { createStore } from '@/engine/store';
import { IERDCEditorContext } from '@/internal-types/ERDCEditorContext';
import { ERDCEditorContext } from '@@types/core/ERDCEditorContext';

import { createGlobalEventObservable } from './helper/event.helper';
import { createEventBus } from './helper/eventBus.helper';
import { createKeymap } from './keymap';
import { createTheme } from './theme';

export function createdERDCEditorContext(): IERDCEditorContext {
  const helper = createHelper();

  return {
    theme: observable(createTheme()),
    keymap: observable(createKeymap()),
    globalEvent: createGlobalEventObservable(),
    eventBus: createEventBus(),
    store: createStore(helper),
    command: createCommand(),
    helper,
    snapshots: [],
    showPrompt: noop,
    showAlert: noop,
  };
}

export const omitERDCEditorContext = R.pipe<
  IERDCEditorContext,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  ERDCEditorContext
>(
  R.omit(['globalEvent', 'eventBus', 'snapshots', 'showPrompt', 'showAlert']),
  R.dissocPath(['store', 'history$']),
  R.dissocPath(['store', 'change$']),
  R.dissocPath(['store', 'destroy']),
  R.dissocPath(['helper', 'keydown$']),
  R.dissocPath(['helper', 'setGhostText']),
  R.dissocPath(['helper', 'setGhostInput']),
  R.dissocPath(['helper', 'focus']),
  R.dissocPath(['helper', 'blur']),
  R.dissocPath(['helper', 'destroy'])
);
