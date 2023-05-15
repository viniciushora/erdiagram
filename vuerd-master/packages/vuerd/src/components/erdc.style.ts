import { ColorPicker } from '@/components/css/colorPicker.style';
import { TippyStyle } from '@/components/css/tippy.style';

import { SettingDrawerStyle } from './drawer/SettingDrawer.style';
import { TablePropertiesDrawerStyle } from './drawer/tablePropertiesDrawer/TablePropertiesDrawer.style';
import { InputStyle } from './editor/conceitual/Input.style';
import { ERDCEditorStyle } from './ERDCEditor.style';
import { IconStyle } from './Icon.style';

export const IndexStyle = [
  ColorPicker,
  TippyStyle,
  ERDCEditorStyle,
  TablePropertiesDrawerStyle,
  SettingDrawerStyle,
  IconStyle,
  InputStyle,
].join('');
