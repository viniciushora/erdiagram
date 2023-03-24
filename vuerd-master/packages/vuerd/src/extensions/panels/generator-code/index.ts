import { PanelConfig } from '@@types/index';

import { GeneratorCodePanel } from './components';

const generatorCodePanelConfig: PanelConfig = {
  type: GeneratorCodePanel,
  icon: {
    prefix: 'fas',
    name: 'file-code',
  },
  key: '@vuerd/builtin-generator-code',
  name: 'Gerar Código',
};

export const generatorCodePanel = () => generatorCodePanelConfig;
