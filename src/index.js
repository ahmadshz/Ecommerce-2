import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Components/button.css'
import './css/Components/alert.css'
import './css/Components/Loading.css'
import './css/Components/google.css'
import './Pages/Website/Auth/auth.css'
import 'react-loading-skeleton/dist/skeleton.css'
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import CartChangeContext from './Context/CartChangeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <CartChangeContext>
          <Router>
            <App />
          </Router>
        </CartChangeContext>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);


