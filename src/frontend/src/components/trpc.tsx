import { type trpcComposition } from '@backend/src/index';
import { QueryClient } from '@tanstack/react-query';
import { createTRPCReact, httpLink } from '@trpc/react-query';
import { useState } from 'react';


export const trpc = createTRPCReact<typeof trpcComposition.appRouter>();
export const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });
export const trpcClient = (apiBaseUrl: string) =>
  trpc.createClient({
    links: [
      httpLink({
        fetch: window.fetch,
        url: apiBaseUrl,
      }),
    ],
  });

interface Props {
  dashboardApiBaseUrl: string;
  children: React.ReactNode;
}

function TrpcProvider({ dashboardApiBaseUrl, children }: Props) {
  const [trpcClientInstance] = useState(() => trpcClient(dashboardApiBaseUrl));

  return (
    <trpc.Provider client={trpcClientInstance} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
}
export default TrpcProvider;
