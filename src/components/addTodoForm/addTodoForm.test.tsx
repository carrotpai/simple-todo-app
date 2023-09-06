import { AddTodoForm } from '..';
import { render, screen, act, fireEvent, waitFor } from '@/tests/utils';

const renderForm = () => {
  return render(<AddTodoForm />);
};

describe('todo form tests', () => {
  test('should collapse on main/cancel buttons clicks', async () => {
    renderForm();
    const mainButton = screen.getByRole('button', { name: /Добавить TODO/ });
    fireEvent.click(mainButton);
    expect(await screen.findByRole('button', { name: /\+ todo/ })).toBeVisible();
    const cancelButton = await screen.findByRole('button', { name: /Отмена/ });
    expect(cancelButton).toBeVisible();
    fireEvent.click(cancelButton);
    await waitFor(() => expect(cancelButton).not.toBeVisible());
  });

  test('should add new input on add todo button click', async () => {
    renderForm();
    const mainButton = screen.getByRole('button', { name: /Добавить TODO/ });
    fireEvent.click(mainButton);
    const addTodo = screen.getByRole('button', { name: /\+ todo/ });
    fireEvent.click(addTodo);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
  });

  test('should remove additional input on corresponding minus button click', async () => {
    renderForm();
    const mainButton = screen.getByRole('button', { name: /Добавить TODO/ });
    fireEvent.click(mainButton);
    const addTodo = screen.getByRole('button', { name: /\+ todo/ });
    fireEvent.click(addTodo);
    fireEvent.click(addTodo);
    let inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(3);
    fireEvent.click(screen.getAllByRole('button', { name: 'delete' })[0]);
    inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
    expect(screen.getByLabelText(/todo-3/)).toBeInTheDocument();
  });
});
