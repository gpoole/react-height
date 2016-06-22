import React from 'react';
import VariableText from './VariableText';
import Nested from './Nested';
import Blocks from './Blocks';
import {name} from '../../../package.json'
import css  from './App.css';


const App = React.createClass({
  render() {
    return (
      <div className={css.container}>
        <h1>{name}</h1>

        <section className={css.section}>
          <h2>Example 1. Variable text</h2>
          <VariableText />
        </section>

        <section className={css.section}>
          <h2>Example 2. Nested Blocks</h2>
          <Nested />
        </section>

        <section className={css.section}>
          <h2>Example 3. Width and height</h2>
          <Blocks />
        </section>
      </div>
    );
  }
});


export default App;
