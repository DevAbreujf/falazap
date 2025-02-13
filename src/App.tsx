
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth-context';
import { Toaster } from '@/components/ui/toaster';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { PerformanceMonitor } from './components/monitoring/performance-monitor';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
        <PerformanceMonitor />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
