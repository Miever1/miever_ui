import { createContext } from 'react';

/** Carries the row gutter down to child columns so they can apply matching padding. */
export const RowContext = createContext<{ gutter: number }>({ gutter: 0 });
