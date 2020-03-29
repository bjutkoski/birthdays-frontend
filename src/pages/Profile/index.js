import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from '~/components/AvatarInput';

import { Container, StyledButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />
        <Input name="name" placeholder="Nome completo" />
        <hr />
        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <StyledButton
          backgroundColor="#3b9eff"
          buttonText="Atualizar perfil"
          type="submit"
        />
      </Form>
      <StyledButton
        backgroundColor="#f64c75"
        buttonText="Sair do Bdays"
        type="button"
        onClick={handleSignOut}
      />
    </Container>
  );
}
