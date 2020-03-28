import Types from './types';

export function updateProfileRequest(data) {
  return {
    type: Types.UPDATE_PROFILE_REQUEST,
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: Types.UPDATE_PROFILE_SUCCESS,
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: Types.UPDATE_PROFILE_FAILURE,
  };
}
