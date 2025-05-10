'use client';

import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@/context/AuthContext';
import ScrollToTop from '@/components/layout/ScrollToTop';
import client from '@/lib/apolloClient';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        {children}
        <ScrollToTop />
      </AuthProvider>
    </ApolloProvider>
  );
}
