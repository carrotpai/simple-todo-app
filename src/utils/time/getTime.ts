import { ru } from 'date-fns/locale';
import { format, isValid, setDefaultOptions } from 'date-fns';

setDefaultOptions({ locale: ru });

export const formatTodoTime = (date: Date) => {
  if (!isValid(date)) return undefined;
  const result = format(date, 'd MMMM yyyy');
  return result;
};
