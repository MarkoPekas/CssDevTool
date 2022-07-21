import { Component, createEffect, createSignal } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import CssDevTool from '../components/CssDevTool';

const App: Component = () => {
  const [css, setCss] = createSignal({
    'element-style': {
      width: '100px',
      height: '100px',
      'background-color': 'red',
      'font-size': '20px'
    },
    'body': {
      'background-color': 'blue',
      'font-size': '30px'
    } 
  });
  return (
    <div class={styles.App}>
      <div style={{'display': 'flex'}}>
      <div style={{width: '50%'}}>
        <div style={css()['element-style']}></div>
      </div>
      <div style={{width: '50%'}}>
        <div style={{"width": "400px", margin: '0 auto',}}>
          <CssDevTool css={css()} setCss={setCss} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default App;
