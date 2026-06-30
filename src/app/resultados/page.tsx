import { Suspense } from 'react';
import ResultadosView from './ResultadosView';

export default function ResultadosPage() {
  return (
    <Suspense fallback={null}>
      <ResultadosView />
    </Suspense>
  );
}
