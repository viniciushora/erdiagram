import { PanelConfig } from '@@types/index';

import { SQLDDLPanel as SQLDDLPanelUI } from './components';

const SQLDDLPanelConfig: PanelConfig = {
  type: SQLDDLPanelUI,
  icon: {
    prefix: 'mdi',
    name: 'database-export',
    size: 20,
  },
  key: '@vuerd/builtin-sql-ddl',
  name: 'SQL Script',
};

export const SQLDDLPanel = () => SQLDDLPanelConfig;
