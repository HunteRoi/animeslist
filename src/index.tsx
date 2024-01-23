import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { App } from './App';

const container = createRoot(document.getElementById('root')!);
container.render(<App />);

serviceWorker.unregister();
