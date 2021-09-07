import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {
  createEventEndPoint,
  deleteEventEndPoint,
  ICalendar,
  IEditingEvent,
  updateEventEndPoint,
} from './backend';
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@material-ui/core';

interface IEventFormDialogProps {
  event: IEditingEvent | null;
  calendars: ICalendar[];
  onCancel: () => void;
  onSave: () => void;
}

interface IValidationErrors {
  [field: string]: string;
}

export default function EventFormDialog(props: IEventFormDialogProps) {
  const [event, setEvent] = useState<IEditingEvent | null>(props.event);
  const [errors, setErrors] = useState<IValidationErrors>({});
  const inputDate = useRef<HTMLInputElement | null>();
  const inputDesc = useRef<HTMLInputElement | null>();

  useEffect(() => {
    setEvent(props.event);
    setErrors({});
  }, [props.event]);

  const isNew = !event?.id;

  function validate(): boolean {
    if (event) {
      const currentErrors: IValidationErrors = {};
      if (!event.date) {
        currentErrors['date'] = 'Date must be filled in';
        inputDate.current?.focus();
      }
      if (!event.desc) {
        currentErrors['desc'] = 'Description must be filled in';
        inputDesc.current?.focus();
      }
      setErrors(currentErrors);
      return Object.keys(currentErrors).length === 0;
    }
    return false;
  }

  function save(evt: React.FormEvent) {
    evt.preventDefault();
    if (event) {
      if (validate()) {
        if (isNew) {
          createEventEndPoint(event).then(props.onSave);
        } else {
          updateEventEndPoint(event).then(props.onSave);
        }
      }
    }
  }

  function deleteEvent() {
    if (event) {
      deleteEventEndPoint(event.id!).then(props.onSave);
    }
  }

  return (
    <div>
      <Dialog
        open={!!event}
        onClose={props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={save}>
          <DialogTitle id="form-dialog-title">
            {isNew ? 'Create Event' : 'Update Event'}
          </DialogTitle>
          <DialogContent>
            {event && (
              <>
                <TextField
                  inputRef={inputDate}
                  type="date"
                  margin="normal"
                  label="Date"
                  fullWidth
                  value={event.date}
                  onChange={evt =>
                    setEvent({ ...event, date: evt.target.value })
                  }
                  error={!!errors.date}
                  helperText={errors.date}
                />
                <TextField
                  inputRef={inputDesc}
                  autoFocus
                  margin="normal"
                  label="Description"
                  fullWidth
                  value={event.desc}
                  onChange={evt =>
                    setEvent({ ...event, desc: evt.target.value })
                  }
                  error={!!errors.desc}
                  helperText={errors.desc}
                />
                <TextField
                  type="time"
                  margin="normal"
                  label="Time"
                  fullWidth
                  value={event.time ?? ''}
                  onChange={evt =>
                    setEvent({ ...event, time: evt.target.value })
                  }
                />
                <FormControl margin="normal" fullWidth>
                  <InputLabel id="select-calendar">Schedule</InputLabel>
                  <Select
                    labelId="select-calendar"
                    value={event.calendarId}
                    onChange={evt =>
                      setEvent({
                        ...event,
                        calendarId: evt.target.value as number,
                      })
                    }
                  >
                    {props.calendars.map(calendar => (
                      <MenuItem key={calendar.id} value={calendar.id}>
                        {calendar.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {!isNew && (
              <Button type="button" onClick={deleteEvent} color="secondary" variant="contained">
                Delete
              </Button>
            )}
            <Box flex="1"></Box>
            <Button type="button" onClick={props.onCancel} variant="contained">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
