import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import moment from "moment";
import 'moment/locale/he';

moment.locale('he');

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
