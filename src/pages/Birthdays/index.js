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
    getInit: () => [new Date(), new Date()],
    getPrev: (currentStartDate, currentEndDate) => [
      subDays(currentStartDate, 1),
      subDays(currentEndDate, 1),
    ],
    getNext: (currentStartDate, currentEndDate) => [
      addDays(currentStartDate, 1),
      addDays(currentEndDate, 1),
    ],
    getFormattedDate: startDate =>
      format(startDate, "d 'de' MMMM", { locale: ptBr }),
  },
  [dateTypes.WEEK]: {
    getInit: () => [startOfWeek(new Date()), endOfWeek(new Date())],
    getPrev: (currentStartDate, currentEndDate) => [
      subWeeks(currentStartDate, 1),
      subWeeks(currentEndDate, 1),
    ],
    getNext: (currentStartDate, currentEndDate) => [
      addWeeks(currentStartDate, 1),
      addWeeks(currentEndDate, 1),
    ],
    getFormattedDate: (startDate, endDate) =>
      `${format(startDate, "d 'de' MMMM", {
        locale: ptBr,
      })} - ${format(endDate, "d 'de' MMMM", { locale: ptBr })}`,
  },
  [dateTypes.MONTH]: {
    getInit: () => [startOfMonth(new Date()), endOfMonth(new Date())],
    getPrev: currentStartDate => {
      const prevDate = subMonths(currentStartDate, 1);
      return [prevDate, endOfMonth(prevDate)];
    },
    getNext: currentStartDate => {
      const nextDate = addMonths(currentStartDate, 1);
      return [nextDate, endOfMonth(nextDate)];
    },
    getFormattedDate: startDate => format(startDate, 'MMMM', { locale: ptBr }),
  },
  [dateTypes.ALL]: {
    getInit: () => [startOfYear(new Date()), endOfYear(new Date())],
    getPrev: (currentStartDate, currentEndDate) => [
      currentStartDate,
      currentEndDate,
    ],
    getNext: (currentStartDate, currentEndDate) => [
      currentStartDate,
      currentEndDate,
    ],
    getFormattedDate: () => 'Todos',
  },
};

export default function Birthdays() {
  const [birthdays, setBirthdays] = useState([]);
  const [dateType, setDateType] = useState(dateTypes.MONTH);
  const [startDate, setStartDate] = useState(
    handleDate[dateTypes.MONTH].getInit()[0]
  );
  const [endDate, setEndDate] = useState(
    handleDate[dateTypes.MONTH].getInit()[1]
  );

  useEffect(() => {
    const [initStartDate, initEndDate] = handleDate[dateType].getInit();
    setStartDate(initStartDate);
    setEndDate(initEndDate);
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
    const [prevStartDate, prevEndDate] = handleDate[dateType].getPrev(
      startDate,
      endDate
    );
    setStartDate(prevStartDate);
    setEndDate(prevEndDate);
  }

  function handleNextDate() {
    const [nextStartDate, nextEndDate] = handleDate[dateType].getNext(
      startDate,
      endDate
    );
    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
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
