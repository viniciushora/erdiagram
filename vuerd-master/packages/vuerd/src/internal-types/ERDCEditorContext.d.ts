import { showAlertDef } from '@/core/hooks/alert.hook';
import { showPromptDef } from '@/core/hooks/prompt.hook';
import { ERDCEditorContext } from '@@types/core/ERDCEditorContext';

import { EventBus, GlobalEventObservable } from './event.helper';
import { IHelper } from './helper';
import { IStore } from './store';

export interface IERDCEditorContext extends ERDCEditorContext {
  globalEvent: GlobalEventObservable;
  eventBus: EventBus;
  store: IStore;
  helper: IHelper;
  showPrompt: showPromptDef;
  showAlert: showAlertDef;
}
