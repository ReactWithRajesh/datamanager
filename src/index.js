import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index'; // Create reducers/index.js to combine reducers
import App from './App';



const store = createStore(rootReducer);

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js').then((registration) => {
//         console.log('Service Worker registered with scope:', registration.scope);
//     }).catch((error) => {
//         console.error('Error registering Service Worker:', error);
//     });
// }

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
