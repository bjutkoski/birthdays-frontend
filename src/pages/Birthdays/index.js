import React, { useState, useMemo, useEffect } from 'react';
import {
  parseISO,
  format,
  subDays,
  addDays,
  subWeeks,
  addWeeks,
  subMonths,
  addMonths,
  startOfYear,
  endOfYear,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
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

const dateTypes = {
  DAY: 'Dia',
  WEEK: 'Semana',
  MONTH: 'Mês',
  ALL: 'Todos',
};

const handleDate = {
  [dateTypes.DAY]: {
    getInitStartDate: () => new Date(),
    getInitEndDate: () => new Date(),
    getPrevStartDate: currentStartDate => subDays(currentStartDate, 1),
    getPrevEndDate: currentEndDate => subDays(currentEndDate, 1),
    getNextStartDate: currentStartDate => addDays(currentStartDate, 1),
    getNextEndDate: currentEndDate => addDays(currentEndDate, 1),
    getFormattedDate: startDate =>
      format(startDate, "d 'de' MMMM", { locale: ptBr }),
  },
  [dateTypes.WEEK]: {
    getInitStartDate: () => startOfWeek(new Date()),
    getInitEndDate: () => endOfWeek(new Date()),
    getPrevStartDate: currentStartDate => subWeeks(currentStartDate, 1),
    getPrevEndDate: currentEndDate => subWeeks(currentEndDate, 1),
    getNextStartDate: currentStartDate => addWeeks(currentStartDate, 1),
    getNextEndDate: currentEndDate => addWeeks(currentEndDate, 1),
    getFormattedDate: (startDate, endDate) =>
      `${format(startDate, "d 'de' MMMM", {
        locale: ptBr,
      })} - ${format(endDate, "d 'de' MMMM", { locale: ptBr })}`,
  },
  [dateTypes.MONTH]: {
    getInitStartDate: () => startOfMonth(new Date()),
    getInitEndDate: () => endOfMonth(new Date()),
    getPrevStartDate: currentStartDate => subMonths(currentStartDate, 1),
    getPrevEndDate: currentEndDate => subMonths(currentEndDate, 1),
    getNextStartDate: currentStartDate => addMonths(currentStartDate, 1),
    getNextEndDate: currentEndDate => addMonths(currentEndDate, 1),
    getFormattedDate: startDate => format(startDate, 'MMMM', { locale: ptBr }),
  },
  [dateTypes.ALL]: {
    getInitStartDate: () => startOfYear(new Date()),
    getInitEndDate: () => endOfYear(new Date()),
    getPrevStartDate: currentStartDate => currentStartDate,
    getPrevEndDate: currentEndDate => currentEndDate,
    getNextStartDate: currentStartDate => currentStartDate,
    getNextEndDate: currentEndDate => currentEndDate,
    getFormattedDate: () => 'Todos',
  },
};

export default function Birthdays() {
  const [birthdays, setBirthdays] = useState([]);
  const [dateType, setDateType] = useState(dateTypes.ALL);
  const [startDate, setStartDate] = useState(startOfYear(new Date()));
  const [endDate, setEndDate] = useState(endOfYear(new Date()));

  useEffect(() => {
    setStartDate(handleDate[dateType].getInitStartDate());
    setEndDate(handleDate[dateType].getInitEndDate());
  }, [dateType]);

  const dateFormatted = useMemo(
    () => handleDate[dateType].getFormattedDate(startDate, endDate),
    [dateType, startDate, endDate]
  );

  useEffect(() => {
    async function loadEmployees() {
      const start = format(startDate, 'MM-dd');
      const end = format(endDate, 'MM-dd');
      const response = await api.get(`birthdays?start=${start}&end=${end}`);

      setBirthdays(response.data);
    }

    loadEmployees();
  }, [dateType, startDate, endDate]);

  function handlePrevDate() {
    setStartDate(handleDate[dateType].getPrevStartDate(startDate));
    setEndDate(handleDate[dateType].getPrevEndDate(endDate));
  }

  function handleNextDate() {
    setStartDate(handleDate[dateType].getNextStartDate(startDate));
    setEndDate(handleDate[dateType].getNextEndDate(endDate));
  }

  function handlePrevDateType() {
    const values = Object.values(dateTypes);
    let index = values.findIndex(key => key === dateType);
    if (index === 0) {
      index = values.length - 1;
    } else {
      index -= 1;
    }
    setDateType(values[index]);
  }

  function handleNextDateType() {
    const values = Object.values(dateTypes);
    let index = values.findIndex(key => key === dateType);
    if (index === values.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setDateType(values[index]);
  }

  return (
    <Container>
      <header>
        <SelectDate>
          <button type="button" onClick={handlePrevDateType}>
            <MdChevronLeft size={36} color="#FFF" />
          </button>
          <strong>{dateType}</strong>
          <button type="button" onClick={handleNextDateType}>
            <MdChevronRight size={36} color="#FFF" />
          </button>
        </SelectDate>
        <SelectDate>
          <button type="button" onClick={handlePrevDate}>
            <MdChevronLeft size={36} color="#FFF" />
          </button>
          <strong>{dateFormatted}</strong>
          <button type="button" onClick={handleNextDate}>
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
