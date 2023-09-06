import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import React from 'react';
const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
