import React from "react";

import Box from "../src/Components/Box";

export const parameters = {
  facelift: {
    addProvider: true,
    override: 
      {
        colorSecondary: '#12aa9c',
        barSelectedColor: '#12aa9c',
        brandUrl: 'https://components.miever.net',
        brandImage: './miever_ui.png',
      }
    ,
    themes: [
      {
        type: 'mui',
        key: 'mui-1',
        title: 'Default Material UI theme',
          variants: {
          light: {},
          dark: {}
        },
        resposiveFontSizes: true
      },
    ],
  },
}

export const decorators = [
  Story => (
    <Box style={{ height: '240px' }}>
      {Story()}
    </Box>
  ),
];