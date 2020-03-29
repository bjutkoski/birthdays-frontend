import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import AvatarInput from '~/components/AvatarInput';
import Checkbox from '~/components/Checkbox';

import api from '~/services/api';

import { Container, StyledButton } from './styles';

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

    toast.success('Cadastro criado com sucesso');
  }

  async function updateEmployee(data) {
    const response = await api.put(`users/${id}`, data);

    setEmployee(response.data);

    toast.success('Cadastro atualizado com sucesso');
  }

  async function deleteEmployee() {
    await api.delete(`users/${id}`);

    toast.success('Cadastro excluído com sucesso');
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

  async function handleDelete() {
    await deleteEmployee();
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
        <Checkbox name="admin" label="Administrador" />
        <hr />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <StyledButton
          backgroundColor="#3b9eff"
          buttonText="Gravar"
          type="submit"
        />
      </Form>
      {id && (
        <StyledButton
          backgroundColor="#f64c75"
          buttonText="Excluir"
          type="button"
          onClick={handleDelete}
        />
      )}
    </Container>
  );
}
