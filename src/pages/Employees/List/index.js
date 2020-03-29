import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { MdPerson, MdCake } from 'react-icons/md';

import api from '~/services/api';

import { Container, Employee, Avatar, Details, InfoContainer } from './styles';

function Info({ icon: Icon, text }) {
  return (
    <InfoContainer>
      <Icon size={18} color="#84a9ac" />
      <span>{text}</span>
    </InfoContainer>
  );
}

Info.propTypes = {
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default function Employees() {
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
                      employee.birthday
                        ? format(parseISO(employee.birthday), 'dd/MM/yyyy', {
                            locale: ptBr,
                          })
                        : '??/??/????'
                    }
                  />
                </div>
                <p>Teste</p>
              </Details>
            </Link>
          </Employee>
        ))}
      </ul>
    </Container>
  );
}
