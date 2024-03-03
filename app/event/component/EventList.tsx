import { useState } from "react";
import { Event } from "../entity/Event";
import { EventEditor } from "./EventEditor";
import { EventItem } from "./EventItem";
import { Modal } from "@/app/share/components/Modal";
import { FaPlusCircle } from "react-icons/fa";

interface EventListProps {
  events: Event[];
  setEventList: (events: Event[]) => void;
}

export const EventList = ({ events, setEventList }: EventListProps) => {
  const [eventToSave, setEventToSave] = useState<Event | null>(null)

  return (<>
    <div className="flex flex-col rounded border-red-600/70 p-2 border-2 gap-1">
      {events.map((event) => (
        <EventItem
          key={event.title}
          event={event}
          onEdit={(event) => setEventToSave(event)}
          onDelete={() => {
            setEventList(events.filter(e => e.title !== event.title))
          }}
        />
      ))}
      <div
        className="flex justify-center items-center cursor-pointer text-blue-500 m-2"
      >
        <button
          className="flex gap-2 justify-center items-center cursor-pointer text-blue-500"
          onClick={
            () => setEventToSave({
              title: '',
              color: '',
              cronValue: '',
              storyPoints: 1
            })
          }
        ><FaPlusCircle /> Añadir Evento</button>
      </div>
    </div>

    {
      eventToSave
      &&
      <Modal
        open={true}
        onClose={() => setEventToSave(null)}
      >
        <EventEditor
          event={eventToSave}
          onSave={(event) => {
            if (events.some(e => e.title === event.title)) {
              setEventList(events.map(e => e.title === event.title ? event : e))
            } else {
              setEventList([...events, event])
            }
            setEventToSave(null)
          }}
          onCancel={() => {
            setEventToSave(null)
          }}
        />
      </Modal>
    }
  </>
  );
}
