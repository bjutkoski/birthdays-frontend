import produce from 'immer';
import Types from './types';
import AuthTypes from '../auth/types';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case AuthTypes.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case Types.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
