import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox } from 'react-native';

import Home from './pages/Home';

const queryClient = new QueryClient();

const App: React.FC = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default App;
