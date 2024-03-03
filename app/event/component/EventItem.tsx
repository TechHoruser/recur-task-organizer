import { FaPenAlt, FaTrash } from "react-icons/fa";
import { Event } from "../entity/Event";

interface EventItemProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

export const EventItem = ({
  event,
  onEdit,
  onDelete,
}: EventItemProps) => {
  return (
    <div className="flex items-center gap-1">
      <div
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: event.color }}
      ></div>
      <h2 className="w-64">{event.title}</h2>
      <p className="w-6 flex justify-center">{event.storyPoints}</p>

      <button
        className="cursor-pointer text-blue-500"
        onClick={() => onEdit(event)}
      ><FaPenAlt /></button>
      <button
        className="cursor-pointer text-red-500"
        onClick={() => onDelete(event)}
      ><FaTrash /></button>
    </div>
  );
}
