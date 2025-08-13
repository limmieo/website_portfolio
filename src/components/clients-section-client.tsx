'use client';

import dynamic from 'next/dynamic';

// Dynamically import the ClientsSection component with no SSR
const ClientsSection = dynamic(
  () => import('./clients-section').then((mod) => mod.default),
  { ssr: false }
);

export default function ClientsSectionClient() {
  return <ClientsSection />;
}
