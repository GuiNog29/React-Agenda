export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export function getCalendarsEndPoint(): Promise<ICalendar[]> {
  return fetch('http://localhost:8080/calendars').then(response => {
    return response.json();
  });
}

export function getEventsEndPoint(): Promise<IEvent[]> {
  return fetch('http://localhost:8080/events').then(response => {
    return response.json();
  });
}
