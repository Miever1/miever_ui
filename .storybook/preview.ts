import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: true,
    },
    options: {
      storySort: {
        order: ['Welcome', '*'],
      },
    }
  },
};

export default preview;