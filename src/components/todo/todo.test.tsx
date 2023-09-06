import { formatTodoTime } from '@/utils';
import { Todo } from '..';
import { render, screen, act, fireEvent } from '@/tests/utils';

const renderTodo = () => {
  return render(
    <Todo
      id={1}
      name="one todo"
      date={formatTodoTime(new Date()) ?? 'unknown date'}
      type="pending"
      onChange={(e) => {}}
    />
  );
};

describe('todo tests', () => {
  test('should render label', async () => {
    renderTodo();
    expect(await screen.findByLabelText(/one todo/)).toBeInTheDocument();
  });
});
