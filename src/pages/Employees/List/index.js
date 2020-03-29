import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { MdPerson, MdCake } from 'react-icons/md';

import Info from '~/components/Info';
import api from '~/services/api';

import { Container, Employee, Avatar, Details, StyledButton } from './styles';

export default function Employees() {
  const history = useHistory();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function loadEmployees() {
      const response = await api.get('users');

      setEmployees(response.data);
    }

    loadEmployees();
  }, []);

  return (
    <Container>
      <header>
        <strong>Colaboradores</strong>
        <StyledButton
          backgroundColor="#3b9eff"
          buttonText="Adicionar"
          type="button"
          onClick={() => history.push('/employees/new')}
        />
      </header>

      <ul>
        {employees.map(employee => (
          <Employee key={employee.id}>
            <Link to={`/employees/${employee.id}`}>
              <Avatar
                src={
                  (employee.avatar && employee.avatar.url) ||
                  'https://api.adorable.io/avatars/50/abott@adorable.png'
                }
                alt="Avatar"
              />
              <Details>
                <div>
                  <Info icon={MdPerson} text={employee.name} />
                  <Info
                    icon={MdCake}
                    text={
                      employee.birthdate
                        ? format(parseISO(employee.birthdate), 'dd/MM/yyyy', {
                            locale: ptBr,
                          })
                        : '??/??/????'
                    }
                  />
                </div>
                <p>{employee.description}</p>
              </Details>
            </Link>
          </Employee>
        ))}
      </ul>
    </Container>
  );
}
