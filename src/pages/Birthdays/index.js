import React, { useState, useMemo, useEffect } from 'react';
import { parseISO, format, subDays, addDays } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import {
  MdChevronLeft,
  MdChevronRight,
  MdPerson,
  MdCake,
} from 'react-icons/md';

import Info from '~/components/Info';
import api from '~/services/api';

import { Container, Birthday, Avatar, SelectDate } from './styles';

export default function Birthdays() {
  const [birthdays, setBirthdays] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: ptBr }),
    [date]
  );

  useEffect(() => {
    async function loadEmployees() {
      const response = await api.get('birthdays?start=01-01&end=12-31');

      setBirthdays(response.data);
    }

    loadEmployees();
  }, []);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <SelectDate>
          <button type="button" onClick={handlePrevDay}>
            <MdChevronLeft size={36} color="#FFF" />
          </button>
          <strong>{dateFormatted}</strong>
          <button type="button" onClick={handleNextDay}>
            <MdChevronRight size={36} color="#FFF" />
          </button>
        </SelectDate>
        <SelectDate>
          <button type="button" onClick={handlePrevDay}>
            <MdChevronLeft size={36} color="#FFF" />
          </button>
          <strong>{dateFormatted}</strong>
          <button type="button" onClick={handleNextDay}>
            <MdChevronRight size={36} color="#FFF" />
          </button>
        </SelectDate>
      </header>

      <ul>
        {birthdays.map(birthday => (
          <Birthday key={birthday.id}>
            <Avatar
              src={
                (birthday.avatar && birthday.avatar.url) ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Avatar"
            />
            <div>
              <Info icon={MdPerson} text={birthday.name} />
              <Info
                icon={MdCake}
                text={
                  birthday.birthdate
                    ? format(parseISO(birthday.birthdate), "d 'de' MMMM", {
                        locale: ptBr,
                      })
                    : 'Não informado'
                }
              />
            </div>
          </Birthday>
        ))}
      </ul>
    </Container>
  );
}
