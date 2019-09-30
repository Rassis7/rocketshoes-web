import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddlaware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddlaware = createSagaMiddlaware();

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(sagaMiddlaware)
      )
    : applyMiddleware(sagaMiddlaware);

const store = createStore(rootReducer, enhancer);

sagaMiddlaware.run(rootSaga);

export default store;
