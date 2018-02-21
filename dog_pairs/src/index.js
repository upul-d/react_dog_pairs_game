import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameContainer from './containers/GameContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<GameContainer />, document.getElementById('root'));
registerServiceWorker();
