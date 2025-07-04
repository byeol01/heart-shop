// src/components/jsx/Main.jsx

import React from 'react';
import Main1 from '../jsx/Main1';
import Main2 from '../jsx/Main2';
import Main3 from '../jsx/Main3';

const Main = () => {
  return (
    <main>
      <section id="section1">
        <Main1 />
      </section>

      <section id="section2">
        <Main2 />
      </section>

      <section id="section3">
        <Main3 />
      </section>
    </main>
  );
};

export default Main;
