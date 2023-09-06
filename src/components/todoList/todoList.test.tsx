import { TodoList } from '..';
import { useTodoStore } from '@/store/store';
import { render, screen, fireEvent } from '@/tests/utils';
import { formatTodoTime } from '@/utils';

const renderTodoList = () => {
  return render(<TodoList />);
};

describe('todo list without data', () => {
  test('should be empty todo list', async () => {
    renderTodoList();
    expect(await screen.findByText(/Пусто!/)).toBeInTheDocument();
  });
});

describe('todo list with some data', () => {
  beforeEach(() =>
    useTodoStore.setState({
      todos: [
        {
          id: 1,
          name: 'test todo 1',
          type: 'pending',
          date: formatTodoTime(new Date()) ?? 'unknown date',
        },
        {
          id: 1,
          name: 'test todo 2',
          type: 'pending',
          date: formatTodoTime(new Date()) ?? 'unknown date',
        },
        {
          id: 1,
          name: 'test todo 3',
          type: 'pending',
          date: formatTodoTime(new Date()) ?? 'unknown date',
        },
      ],
    })
  );

  test('should render empty message for empty list', async () => {
    renderTodoList();
    expect(await screen.findAllByRole('listitem')).toBeDefined();
  });

  test('should toggle visibility of update todo button when selecting/deleting todos for checklist', async () => {
    renderTodoList();
    const firstTodo = await screen.findByLabelText(/test todo 1/);
    fireEvent.click(firstTodo);
    expect(
      await screen.findByRole('button', { name: /отметить как выполненное/i })
    ).toBeInTheDocument();
    fireEvent.click(firstTodo);
    expect(
      await screen.queryByRole('button', { name: /отметить как выполненное/i })
    ).not.toBeInTheDocument();
  });

  test('after fulfilling todo - todo should be disabled', async () => {
    renderTodoList();
    const firstTodo = await screen.findByLabelText(/test todo 1/);
    fireEvent.click(firstTodo);
    expect(
      await screen.findByRole('button', { name: /отметить как выполненное/i })
    ).toBeInTheDocument();
    const button = await screen.findByRole('button', { name: /отметить как выполненное/i });
    fireEvent.click(button);
    expect(firstTodo).toHaveProperty('disabled', true);
  });

  test('todo should change checked state on click', async () => {
    renderTodoList();
    const firstTodo = await screen.findByLabelText(/test todo 1/);
    fireEvent.click(firstTodo);
    expect(firstTodo).toHaveProperty('checked', true);
    fireEvent.click(firstTodo);
    expect(firstTodo).toHaveProperty('checked', false);
  });
});
