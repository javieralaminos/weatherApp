import { QueryClient } from '@tanstack/react-query';
import { createTRPCReact, httpLink } from '@trpc/react-query';
import { trpcComposition } from '@weatherApp/backend/lib/index';
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
  apiBaseUrl: string;
  children: React.ReactNode;
}

function TrpcProvider({ apiBaseUrl, children }: Props) {
  const [trpcClientInstance] = useState(() => trpcClient(apiBaseUrl));

  return (
    <trpc.Provider client={trpcClientInstance} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
}
export default TrpcProvider;
