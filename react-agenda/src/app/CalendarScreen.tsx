import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Icon } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';

const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const useStyles = makeStyles({
  table: {
    borderTop: '1px solid rgb(224, 224, 224)',
    minHeight: '100%',
    '& td ~ td, & th ~ th': {
      borderLeft: '1px solid rgb(224, 224, 224)',
    },
  },
});

export default function CalendarScreen() {
  const classes = useStyles();
  const weeks = generateCalendar(getToday());

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224, 224, 224)"
        width="16em"
        padding="8px 16px"
      >
        <h2>React Agenda</h2>

        <Button variant="outlined" color="primary">
          Novo Evento
        </Button>

        <Box marginTop="60px">
          <h3>Agendas</h3>
        </Box>

        <FormControlLabel control={<Checkbox />} label="Pessoal" />
        <FormControlLabel control={<Checkbox />} label="Trabalho" />
      </Box>

      <TableContainer component={'div'}>
        <Box display="flex" alignItems="center" padding="8px 16px">
          <Box flex="1">
            <IconButton aria-label="Previous Month">
              <Icon>chevron_left</Icon>
            </IconButton>

            <IconButton aria-label="Next Month">
              <Icon>chevron_right</Icon>
            </IconButton>

            <Box component="h3" marginLeft="16px" flex="1">
              Setembro de 2021
            </Box>
          </Box>

          <IconButton aria-label="Next Month">
            <Avatar></Avatar>
          </IconButton>
        </Box>

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map(day => (
                <TableCell align="center" key={day}>
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {weeks.map((week, i) => (
              <TableRow key={i}>
                {week.map(cell => (
                  <TableCell align="center" key={cell.date}>
                    {cell.date}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

interface ICalendarCell {
  date: string;
}

function generateCalendar(date: string): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + 'T12:00:00');
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);

  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];

    for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const formatMonth = (currentDay.getMonth() + 1)
        .toString()
        .padStart(2, '0');
      const formatDay = currentDay.getDate().toString().padStart(2, '0');
      const isoDate = `${currentDay.getFullYear()}-${formatMonth}-${formatDay}`;
      week.push({ date: isoDate });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}

function getToday() {
  return '2021-09-04';
}
