import { Event } from "../db/schema/defaultSchema.ts";

type SortType = "ASC" | "DESC";

export const getAllEvents = async (sortType: SortType) => {
  try {
    const events = await Event.find({ eventId: sortType });
    console.log(events);
    return events;
  } catch (error) {
    throw new Error("Error fetching events: " + error);
  }
};
