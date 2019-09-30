import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';
import { toast } from 'react-toastify';
import history from '../../../services/history';

import { addToCartSuccess, updateAmountSuccess } from './actions';

//function* => é uma função do JS que se chama Generator. É a mesma coisa que
//async , porém ele possui mais recursos
function* addToCart({ id }) {
  //select => Busca informações dentro do estado
  const producExists = yield select(state => state.cart.find(p => p.id === id));

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentStock = producExists ? producExists.amount : 0;

  const amount = currentStock + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (producExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    //yield => como se fosse o await do Generator
    //call => No saga, não se chama uma API diretamente, tem que usar o call
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    //put => Serve para chamar uma action
    yield put(addToCartSuccess(data));

    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  //takeLatest => Se o usuário clicar várias vezes seguidas, ele irá pegar somente a ultima
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
