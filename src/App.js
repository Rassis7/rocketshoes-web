import React from 'react';

//Estou o chamando aqui, pq quero que o header tenha acesso também a navegação
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import GlobalStyles from './styles/global';

import Header from './components/Header';

//Isso tem que vir antes do import do store
import './config/ReactotronConf';

import history from './services/history';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyles />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}
