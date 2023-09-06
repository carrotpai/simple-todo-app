import { MainPage, MainPageLayout } from '@/pages';
import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPageLayout>
        <MainPage />
      </MainPageLayout>
    </ThemeProvider>
  );
}

export default App;
