import { addons } from '@storybook/manager-api';

addons.setConfig({
  base: localStorage.getItem('sb-addon-dark-mode') === 'true' ? 'dark' : 'light',
  colorSecondary: '#0CC0DF',
  colorPrimary: '#0CC0DF',
  brandImage: "https://miever.s3.ap-east-1.amazonaws.com/static/miever-ui.webp"
});