import { Box } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { formatMonth, modifyMonths } from './DateFunctions';
import UserMenu from './UserMenu';

interface ICalendarHeaderProps {
  month: string;
}

export default function CalendarHeader(props: ICalendarHeaderProps) {
  const { month } = props;

  return (
    <Box display="flex" alignItems="center" padding="8px 16px">
      <Box>
        <IconButton
          aria-label="Previous Month"
          component={Link}
          to={'/calendar/' + modifyMonths(month, -1)}
        >
          <Icon>chevron_left</Icon>
        </IconButton>

        <IconButton
          aria-label="Next Month"
          component={Link}
          to={'/calendar/' + modifyMonths(month, +1)}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </Box>

      <Box flex="1" component="h3" marginLeft="16px">
        {formatMonth(month)}
      </Box>

      <UserMenu />
    </Box>
  );
}
