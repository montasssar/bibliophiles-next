'use client';

import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@/context/AuthContext';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { apolloClient } from '@/lib/apolloClient'; // ✅ renamed to match updated export

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        {children}
        <ScrollToTop />
      </AuthProvider>
    </ApolloProvider>
  );
}
