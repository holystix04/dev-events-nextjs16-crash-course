'use server';

import type { IEvent } from '@/database';
import { Event } from '@/database';
import connectDB from '@/lib/mongodb';

export const getSimilarEventsBySlug = async (
  slug: string
): Promise<IEvent[]> => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    const events = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
    return events.map(
      (event) =>
        ({
          id: event._id,
          title: event.title,
          slug: event.slug,
          description: event.description,
          overview: event.overview,
          date: event.date,
          time: event.time,
          location: event.location,
          mode: event.mode,
          agenda: event.agenda,
          audience: event.audience,
          tags: event.tags,
          organizer: event.organizer,
          image: event.image,
        }) as IEvent
    );
  } catch (error) {
    console.error('Error fetching similar events:', error);
    return [];
  }
};
