import { useTodoStore } from '@/store/store';
import { formatTodoTime } from '@/utils';
import { Box, Button, Collapse, Grid, TextField, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import React, { useRef, useState } from 'react';

function AddTodoForm() {
  const currentInputInd = useRef(1);

  const [isActive, setIsActive] = useState(false);
  const [inputFields, setInputFields] = useState<Array<Record<string, string>>>([{ 'todo-1': '' }]);

  const addTodo = useTodoStore((state) => state.addTodo);
  const getTodosLength = useTodoStore((state) => state.getTodosLength);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ind: number
  ) => {
    const data = [...inputFields];
    data[ind][e.target.name] = e.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    const newInput = { [`todo-${currentInputInd.current + 1}`]: '' };
    currentInputInd.current += 1;
    setInputFields([...inputFields, newInput]);
  };

  const removeFields = (index: number) => {
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  return (
    <Box component={'div'} role="form" marginTop={'24px'}>
      <Button
        type="button"
        sx={{
          borderRadius: isActive ? '4px 4px 0 0' : '4px 4px 0 0',
        }}
        fullWidth
        variant="form"
        onClick={() => setIsActive((val) => !val)}
      >
        Добавить TODO
      </Button>
      <Collapse timeout={300} in={isActive}>
        <Box
          sx={{
            border: (theme) => `2px solid ${theme.palette.primary.main}`,
            borderTop: 'none',
            borderRadius: '0px 0px 4px 4px',
            padding: '32px 12px 12px 24px',
          }}
        >
          <Grid container direction={'column'} gap={'32px'}>
            {inputFields.map((input, ind) => {
              const name = Object.keys(input)[0];
              return (
                <Grid
                  width={'100%'}
                  container
                  direction={{ xs: 'column', md: 'row' }}
                  gap={'12px'}
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  key={name}
                  wrap="nowrap"
                >
                  <Typography>{`New todo`}</Typography>
                  <Grid
                    container
                    direction={'row'}
                    gap={'12px'}
                    wrap="nowrap"
                    sx={{ width: { xs: '100%', md: '80%' } }}
                  >
                    <TextField
                      type="text"
                      aria-label={name}
                      fullWidth
                      size="small"
                      name={name}
                      value={input[name]}
                      onChange={(e) => {
                        handleInputChange(e, ind);
                      }}
                    />
                    {ind !== 0 && (
                      <Button
                        type="button"
                        aria-label="delete"
                        size="small"
                        sx={{
                          border: 'none',
                          background: 'none',
                          minWidth: '36px',
                          height: '36px',
                          borderRadius: '100px',
                        }}
                        onClick={() => removeFields(ind)}
                      >
                        <RemoveCircleOutlineIcon sx={{ fontSize: 28 }} />
                      </Button>
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Button type="button" sx={{ marginTop: '24px' }} size="small" onClick={addFields}>
            + todo
          </Button>
        </Box>
        <Grid container marginTop={'24px'}>
          <Grid container gap={'12px'} direction={'row'} justifyContent={'end'}>
            <Button
              type="button"
              size="small"
              onClick={() => {
                setIsActive(false);
              }}
            >
              Отмена
            </Button>
            <Button
              type="button"
              size="small"
              onClick={() => {
                inputFields.forEach((input) => {
                  const name = Object.keys(input)[0];
                  if (input[name]) {
                    addTodo({
                      id: getTodosLength() + 1,
                      name: input[name],
                      type: 'pending',
                      date: formatTodoTime(new Date()) ?? 'unknown date',
                    });
                  }
                });
                setInputFields([{ 'todo-1': '' }]);
              }}
            >
              Добавить
            </Button>
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
}

export default AddTodoForm;
