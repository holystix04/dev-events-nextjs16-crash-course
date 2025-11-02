import { Suspense } from 'react';

import EventDetails from '@/components/EventDetails';

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = params.then((s) => s.slug);
  return (
    <main>
      <Suspense fallback={<div>Loading event details...</div>}>
        <EventDetails params={slug} />
      </Suspense>
    </main>
  );
};
export default EventDetailsPage;
