
import React from "react";

export const decorators = [
  Story => (
    <div style={{ margin: '1em' }}>
      {Story()}
    </div>
  ),
];