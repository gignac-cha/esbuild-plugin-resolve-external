import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './Root';

export const test = () => {
  createRoot(document.createElement('div')).render(createElement(Root));
};

if (require.main === module) {
  test();
}
