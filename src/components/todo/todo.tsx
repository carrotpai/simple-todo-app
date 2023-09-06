import { TodoStatus } from '@/store/store';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';

interface TodoProps {
  id: number;
  type: TodoStatus;
  name: string;
  date: string;
  checked?: boolean;

  onChange: (e: React.SyntheticEvent, checked: boolean) => void;
}

function Todo({ id, name, type, date, checked, onChange }: TodoProps) {
  return (
    <Grid
      component={'div'}
      role="listitem"
      container
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-start', md: 'center' }}
      justifyContent={'space-between'}
      gap={'8px'}
      width={{ xs: '100%', lg: '80%', xl: '67%' }}
      wrap="nowrap"
    >
      <FormGroup sx={{ maxWidth: { xs: '100%', md: '70%' } }}>
        <FormControlLabel
          disabled={type === 'done'}
          sx={{
            textDecorationLine: type === 'done' ? 'line-through' : 'none',
            color: type === 'done' ? (theme) => theme.palette.lightgray.dark : '#000000',
          }}
          control={<Checkbox checked={checked} />}
          onChange={onChange}
          label={name}
          value={id}
        />
      </FormGroup>
      <Box>
        <Typography variant="body2">{type}</Typography>
        <Typography mt={'8px'} color={(theme) => theme.palette.lightgray.dark}>
          {date}
        </Typography>
      </Box>
    </Grid>
  );
}

export default Todo;
