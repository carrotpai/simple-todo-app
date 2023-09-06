import { TodoStatus, TodoType, useTodoStore } from '@/store/store';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useCallback, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Todo } from '..';
import { debounce } from '@/utils';

interface TodoListProps {
  todoStatus?: TodoStatus | 'all';
}

function TodoList({ todoStatus = 'all' }: TodoListProps) {
  const [checkedTodosIds, setCheckedTodosIds] = useState<Array<number>>([]);
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState<Array<TodoType>>([]);

  const { todosLength, getTodos, fulfillTodos } = useTodoStore((state) => ({
    todosLength: state.todos.length,
    getTodos: state.getTodos,
    fulfillTodos: state.fulfillTodos,
  }));

  const handleCheckboxChange = (e: React.SyntheticEvent, checked: boolean) => {
    const { value } = e.target as HTMLInputElement;
    if (checked) {
      if (!checkedTodosIds.includes(+value)) setCheckedTodosIds((ids) => [...ids, +value]);
    } else {
      setCheckedTodosIds((ids) => {
        const newIds = ids.filter((todoId) => todoId !== +value);
        return newIds;
      });
    }
  };

  useEffect(() => {
    setTodos(getTodos(todoStatus, search));
  }, [todoStatus, search, getTodos, todosLength]);

  return (
    <Box marginTop={'24px'}>
      <Box>
        <TextField
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            placeholder: 'Поиск...',
          }}
        />
      </Box>
      <Grid
        component={'div'}
        role="list"
        marginTop={'24px'}
        container
        direction={'column'}
        gap={'16px'}
      >
        {todos.length ? (
          todos.map((todo, ind) => (
            <Todo
              checked={checkedTodosIds.includes(todo.id) || todo.type === 'done'}
              id={todo.id}
              key={`todo-${ind}`}
              name={todo.name}
              date={todo.date}
              type={todo.type}
              onChange={handleCheckboxChange}
            />
          ))
        ) : (
          <Grid marginTop={'24px'} container direction={'column'} alignItems={'center'}>
            <ErrorOutlineIcon color={'primary'} />
            <Typography sx={{ marginTop: '12px' }}>Пусто!</Typography>
          </Grid>
        )}
      </Grid>
      {!!checkedTodosIds.length && (
        <Button
          type="button"
          sx={{ marginTop: '32px' }}
          onClick={() => {
            fulfillTodos(checkedTodosIds);
            setTodos(getTodos(todoStatus, search));
            setCheckedTodosIds([]);
          }}
        >
          Отметить как выполненное
        </Button>
      )}
    </Box>
  );
}

export default TodoList;
