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

export default function Birthdays() {
  const [birthdays, setBirthdays] = useState([]);
  const [dateType, setDateType] = useState(dateTypes.ALL);
  const [startDate, setStartDate] = useState(startOfYear(new Date()));
  const [endDate, setEndDate] = useState(endOfYear(new Date()));

  useEffect(() => {
    if (dateType === dateTypes.ALL) {
      setStartDate(startOfYear(new Date()));
      setEndDate(endOfYear(new Date()));
    } else if (dateType === dateTypes.DAY) {
      setStartDate(new Date());
      setEndDate(new Date());
    } else if (dateType === dateTypes.WEEK) {
      setStartDate(startOfWeek(new Date()));
      setEndDate(endOfWeek(new Date()));
    } else if (dateType === dateTypes.MONTH) {
      setStartDate(startOfMonth(new Date()));
      setEndDate(endOfMonth(new Date()));
    }
  }, [dateType]);

  const dateFormatted = useMemo(() => {
    if (dateType === dateTypes.DAY)
      return format(startDate, "d 'de' MMMM", { locale: ptBr });
    if (dateType === dateTypes.WEEK)
      return `${format(startDate, "d 'de' MMMM", {
        locale: ptBr,
      })} - ${format(endDate, "d 'de' MMMM", { locale: ptBr })}`;
    if (dateType === dateTypes.MONTH)
      return format(startDate, 'MMMM', { locale: ptBr });

    return 'Todos';
  }, [dateType, startDate, endDate]);

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
    if (dateType === dateTypes.DAY) {
      const prevDate = subDays(startDate, 1);
      setStartDate(prevDate);
      setEndDate(prevDate);
    } else if (dateType === dateTypes.WEEK) {
      setStartDate(subWeeks(startDate, 1));
      setEndDate(subWeeks(endDate, 1));
    } else if (dateType === dateTypes.MONTH) {
      const prevDate = subMonths(startDate, 1);
      setStartDate(startOfMonth(prevDate));
      setEndDate(endOfMonth(prevDate));
    }
  }

  function handleNextDate() {
    if (dateType === dateTypes.DAY) {
      const nextDate = addDays(startDate, 1);
      setStartDate(nextDate);
      setEndDate(nextDate);
    } else if (dateType === dateTypes.WEEK) {
      setStartDate(addWeeks(startDate, 1));
      setEndDate(addWeeks(endDate, 1));
    } else if (dateType === dateTypes.MONTH) {
      const prevDate = addMonths(startDate, 1);
      setStartDate(startOfMonth(prevDate));
      setEndDate(endOfMonth(prevDate));
    }
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
