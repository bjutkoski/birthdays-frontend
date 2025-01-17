import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import Types from './types';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const {
      name,
      email,
      avatar_id,
      description,
      birthdate,
      ...rest
    } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      description,
      birthdate,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, `profile`, profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile)]);
