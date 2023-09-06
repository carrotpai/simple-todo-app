import { afterEach, vi } from 'vitest';
import * as zustand from 'zustand';
import { act } from '@testing-library/react';

const { create: actualCreate, createStore: actualCreateStore } =
  await vi.importActual<typeof zustand>('zustand');

export const storeResetFns = new Set<() => void>();

export const create = (<T>() => {
  console.log('mock create');
  return (stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    const initState = store.getState();
    storeResetFns.add(() => {
      store.setState(initState, true);
    });
  };
}) as typeof zustand.create;

export const createStore = (<T>() => {
  return (stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreateStore(stateCreator);
    const initState = store.getState();
    storeResetFns.add(() => {
      store.setState(initState, true);
    });
  };
}) as typeof zustand.createStore;

afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
