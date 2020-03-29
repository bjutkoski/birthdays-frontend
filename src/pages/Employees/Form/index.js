import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import AvatarInput from '~/components/AvatarInput';

import api from '~/services/api';

import { Container } from './styles';

export default function Employee() {
  const { id } = useParams();
  const history = useHistory();

  const [employee, setEmployee] = useState();

  useEffect(() => {
    async function loadEmployee() {
      const response = await api.get(`users/${id}`);

      setEmployee(response.data);
    }

    if (id) loadEmployee();
  }, [id]);

  async function createEmployee(data) {
    const response = await api.post(`users`, data);

    setEmployee(response.data);
  }

  async function updateEmployee(data) {
    const response = await api.put(`users/${id}`, data);

    setEmployee(response.data);
  }

  async function handleSubmit(data) {
    if (id) {
      if (data.password === '') delete data.password;
      await updateEmployee(data);
    } else {
      await createEmployee(data);
    }
    history.push('/employees');
  }

  return (
    <Container>
      <Form autoComplete="off" initialData={employee} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />
        <Input name="name" placeholder="Nome completo" />
        <Input name="description" placeholder="Descrição" />
        <Input name="birthdate" placeholder="Data de Nascimento" type="date" />
        <hr />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <button type="submit">Gravar</button>
      </Form>
    </Container>
  );
}
