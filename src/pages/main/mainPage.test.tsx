import { fireEvent, render, screen } from '@/tests/utils';
import { MainPage } from '..';
import { useTodoStore } from '@/store/store';

const renderMainPage = () => {
  return render(<MainPage />);
};

describe('main page test (integration)', () => {
  beforeEach(() => useTodoStore.setState({ todos: [] }));

  test('user can add new todos by form', async () => {
    renderMainPage();
    const mainButton = screen.getByRole('button', { name: /Добавить TODO/ });
    fireEvent.click(mainButton);
    const addTodo = screen.getByRole('button', { name: /\+ todo/ });
    fireEvent.click(addTodo);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'new todo 1' } });
    fireEvent.change(inputs[1], { target: { value: 'new todo 2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Добавить' }));
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2);
  });

  test('active/fulfilled tabs should change their contents after user fulfill some todo', async () => {
    renderMainPage();
    const mainButton = screen.getByRole('button', { name: /Добавить TODO/ });
    fireEvent.click(mainButton);
    const addTodo = screen.getByRole('button', { name: /\+ todo/ });
    fireEvent.click(addTodo);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'new todo 1' } });
    fireEvent.change(inputs[1], { target: { value: 'new todo 2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Добавить' }));
    fireEvent.click(screen.getByLabelText('new todo 1'));
    fireEvent.click(screen.getByRole('button', { name: /отметить как выполненное/i }));
    fireEvent.click(screen.getByRole('tab', { name: 'active' }));
    let todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(1);
    fireEvent.click(screen.getByRole('tab', { name: 'fulfilled' }));
    todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(1);
    fireEvent.click(screen.getByRole('tab', { name: 'all' }));
    todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2);
  });

  test('empty todos should not be added to todos list', async () => {
    renderMainPage();
    const mainButton = screen.getByRole('button', { name: /Добавить TODO/ });
    fireEvent.click(mainButton);
    const addTodo = screen.getByRole('button', { name: /\+ todo/ });
    fireEvent.click(addTodo);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'new todo 1' } });
    fireEvent.change(inputs[1], { target: { value: 'new todo 2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Добавить' }));
    let todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Добавить' }));
    fireEvent.click(screen.getByRole('button', { name: 'Добавить' }));
    fireEvent.click(screen.getByRole('button', { name: 'Добавить' }));
    todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2);
  });
});
