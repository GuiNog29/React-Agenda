import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useParams } from 'react-router';
import { CalendarsView } from './CalendarsView';
import { CalendarHeader } from './CalendarHeader';
import { Calendar, ICalendarCell, IEventWithCalendar } from './Calendar';
import EventFormDialog from './EventFormDialog';
import { getToday } from './DateFunctions';
import {
  getCalendarsEndPoint,
  getEventsEndPoint,
  ICalendar,
  IEvent,
} from './backend';
import { reducer } from './CalendarScreeReducer';

export default function CalendarScreen() {
  const [state, dispatch] = useReducer(reducer, {
    calendars: [],
    calendarsSelected: [],
    events: [],
    editingEvent: null,
  });

  const { events, calendars, calendarsSelected, editingEvent } = state;

  const { month } = useParams<{ month: string }>();

  const weeks = useMemo(() => {
    return generateCalendar(
      month + '-01',
      events,
      calendars,
      calendarsSelected
    );
  }, [month, events, calendars, calendarsSelected]);

  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    Promise.all([
      getCalendarsEndPoint(),
      getEventsEndPoint(firstDate, lastDate),
    ]).then(([calendars, events]) => {
      dispatch({ type: 'load', payload: { events, calendars } });
    });
  }, [firstDate, lastDate]);

  function refreshEvents() {
    getEventsEndPoint(firstDate, lastDate).then(events => {
      dispatch({ type: 'load', payload: { events } });
    });
  }

  const closeDialog = useCallback(() => {
    dispatch({ type: 'closeDialog' });
  }, []);

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224, 224, 224)"
        width="16em"
        padding="8px 16px"
      >
        <h2>React Schedule</h2>

        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: 'new', payload: getToday() })}
        >
          New Event
        </Button>

        <CalendarsView
          calendars={calendars}
          dispatch={dispatch}
          calendarsSelected={calendarsSelected}
        />
      </Box>

      <Box display="flex" flex="1" flexDirection="column">
        <CalendarHeader month={month} />

        <Calendar weeks={weeks} dispatch={dispatch} />

        <EventFormDialog
          event={editingEvent}
          calendars={calendars}
          onCancel={closeDialog}
          onSave={() => {
            closeDialog();
            refreshEvents();
          }}
        />
      </Box>
    </Box>
  );
}

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  calendars: ICalendar[],
  calendarSelected: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + 'T12:00:00');
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);

  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];

    for (let i = 0; i < 7; i++) {
      const formatMonth = (currentDay.getMonth() + 1)
        .toString()
        .padStart(2, '0');

      const formatDay = currentDay.getDate().toString().padStart(2, '0');
      const isoDate = `${currentDay.getFullYear()}-${formatMonth}-${formatDay}`;

      const events: IEventWithCalendar[] = [];
      for (const event of allEvents) {
        if (event.date === isoDate) {
          const calendarIndex = calendars.findIndex(
            cal => cal.id === event.calendarId
          );
          if (calendarSelected[calendarIndex]) {
            events.push({ ...event, calendar: calendars[calendarIndex] });
          }
        }
      }

      week.push({
        dayOfMonth: currentDay.getDate(),
        date: isoDate,
        events,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}
