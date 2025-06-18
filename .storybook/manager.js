import { addons } from '@storybook/manager-api';
import customizeTheme from './customizeTheme';

addons.setConfig({
  theme: customizeTheme,
});