export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEditingEvent {
  id: number;
}

export function getCalendarsEndPoint(): Promise<ICalendar[]> {
  return fetch('http://localhost:8080/calendars').then(handleResponse);
}

export function getEventsEndPoint(from: string, to: string): Promise<IEvent[]> {
  return fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte=${to}&_sort=date,time`
  ).then(handleResponse);
}

export function createEventEndPoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`http://localhost:8080/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

export function updateEventEndPoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`http://localhost:8080/events/${event.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

export function deleteEventEndPoint(eventID: number): Promise<void> {
  return fetch(`http://localhost:8080/events/${eventID}`, {
    method: 'DELETE',
  }).then(handleResponse);
}

export function getUserEndPoint() {
  return fetch(`http://localhost:8080/events/auth/user`, {}).then(
    handleResponse
  );
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
