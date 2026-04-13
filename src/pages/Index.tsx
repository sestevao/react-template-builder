import { BuilderProvider } from '@/contexts/BuilderContext';
import BuilderDashboard from '@/pages/BuilderDashboard';

const Index = () => {
  return (
    <BuilderProvider>
      <BuilderDashboard />
    </BuilderProvider>
  );
};

export default Index;
