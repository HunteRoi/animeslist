import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import * as serviceWorker from './serviceWorker';
import { App } from './App';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
