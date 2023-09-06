import React from 'react';
import { Box } from '@mui/material';

interface MainPageLayoutProps {
  children: React.ReactNode;
}

function MainPageLayout({ children }: MainPageLayoutProps) {
  return (
    <Box
      component="main"
      width={{ xs: '90%', lg: '70%', xl: '60%' }}
      margin={'auto'}
      paddingBottom={'100px'}
      paddingTop={'100px'}
    >
      {children}
    </Box>
  );
}

export default MainPageLayout;
