import { Box } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ICalendar } from './backend';
import React from 'react';

interface ICalendarsViewProps {
  calendars: ICalendar[];
  toggleCalendar: (i: number) => void;
  calendarsSelected: boolean[];
}

export const CalendarsView = React.memo(function (props: ICalendarsViewProps) {
  const { calendars, toggleCalendar, calendarsSelected } = props;

  return (
    <Box marginTop="64px">
      <h3>Schedule</h3>
      {calendars.map((calendar, i) => (
        <div key={calendar.id}>
          <FormControlLabel
            control={
              <Checkbox
                style={{ color: calendar.color }}
                checked={calendarsSelected[i]}
                onChange={() => toggleCalendar(i)}
              />
            }
            label={calendar.name}
          />
        </div>
      ))}
    </Box>
  );
});
