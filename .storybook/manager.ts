import { addons } from '@storybook/addons';

// @ts-ignore
import favicon from '/public/favicon.png';

const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', favicon);
document.head.appendChild(link);

addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'bottom',
    enableShortcuts: true,
    isToolshown: true,
    theme: undefined,
    selectedPanel: undefined,
    initialActive: 'sidebar',
    sidebar: {
      showRoots: false,
      collapsedRoots: ['other'],
    },
  });