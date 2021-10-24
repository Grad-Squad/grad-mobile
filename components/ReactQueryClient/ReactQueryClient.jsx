import React from 'react';
import { childrenPropType } from 'proptypes';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();

const ReactQueryClient = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

ReactQueryClient.propTypes = {
  children: childrenPropType.isRequired,
};

export default ReactQueryClient;
