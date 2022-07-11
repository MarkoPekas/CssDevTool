import { Component, createEffect, createSignal } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import CssDevTool from '../components/CssDevTool';

const App: Component = () => {
  const [css, setCss] = createSignal({
    'header-main': {
      color: 'red',
      'font-size': '20px'
    },
    'body': {
      'background-color': 'blue',
      'font-size': '30px'
    } 
  });
  createEffect(() => {
    console.log(css())
  })
  return (
    <div class={styles.App}>
      <div style={{"width": "400px", margin: '0 auto'}}>
        <CssDevTool css={css()} setCss={setCss} />
      </div>
    </div>
  );
};

export default App;
