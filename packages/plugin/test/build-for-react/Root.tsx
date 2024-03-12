import { StrictMode } from 'react';

export const Root = () => {
  return (
    <StrictMode>
      <header></header>
      <nav></nav>
      <main>
        <h1>Hello, World!</h1>
        <ul>
          <li>Item #1</li>
          <li>Item #2</li>
          <li>Item #3</li>
        </ul>
      </main>
      <footer></footer>
    </StrictMode>
  );
};
