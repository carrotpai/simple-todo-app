import { AddTodoForm, TodoList } from '@/components';
import { TodoStatus } from '@/store/store';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

function a11yProps(index: number, label: string) {
  return {
    'aria-controls': `simple-tabpanel-${index}`,
    'aria-label': label,
  };
}

function MainPage() {
  const [currentTab, setCurrentTab] = useState<TodoStatus | 'all'>('all');
  const handleTabChange = (_: any, newTabValue: TodoStatus | 'all') => {
    setCurrentTab(newTabValue);
  };
  return (
    <Box component={'section'}>
      <Box>
        <Typography variant="h5" textAlign={'center'}>
          TODOS
        </Typography>
      </Box>
      <Grid container direction={'column'} alignItems={'center'}>
        <Box sx={{ width: { xs: '90%', sm: '80%', md: '55%', xl: '49%' } }}>
          <AddTodoForm />
        </Box>
        <Box marginTop={'64px'} sx={{ width: { xs: '90%', sm: '80%', xl: '90%' } }}>
          <Box>
            <Tabs
              component={'div'}
              role="tablist"
              value={currentTab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab
                role="tab"
                label="All"
                {...a11yProps(0, 'all')}
                value={'all'}
                sx={{ fontSize: { xs: '16px', md: '18px' } }}
              />
              <Tab
                role="tab"
                label="Active"
                {...a11yProps(1, 'active')}
                value={'pending'}
                sx={{ fontSize: { xs: '16px', md: '18px' } }}
              />
              <Tab
                role="tab"
                label="Fulfilled"
                {...a11yProps(2, 'fulfilled')}
                value={'done'}
                sx={{ fontSize: { xs: '16px', md: '18px' } }}
              />
            </Tabs>
          </Box>
          <TodoList todoStatus={currentTab} />
        </Box>
      </Grid>
    </Box>
  );
}

export default MainPage;
