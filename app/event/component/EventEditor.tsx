import { useState } from "react";
import { Event } from "../entity/Event";
import Cron from "react-js-cron";
import { SketchPicker } from 'react-color';
import 'react-js-cron/dist/styles.css';
import { InputText } from "@/app/share/components/InputText";
import { InputNumber } from "@/app/share/components/InputNumber";

interface EventEditorProps {
  event: Event;
  onSave: (event: Event) => void;
  onCancel: () => void;
}

export const EventEditor = ({
  event,
  onSave,
  onCancel,
}: EventEditorProps) => {
  const [editorEvent, setEditorEvent] = useState<Event>(event);

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div className="flex flex-col gap-4 w-80">
          <InputText
            label="Title"
            value={editorEvent.title}
            onChange={(e) =>
              setEditorEvent({ ...editorEvent, title: e.target.value })
            }
          />
          <Cron
            value={editorEvent.cronValue}
            setValue={(value: string) => setEditorEvent({ ...editorEvent, cronValue: value })}
            allowedDropdowns={["period", "months", "month-days", "week-days"]}
            defaultPeriod="year"
            allowedPeriods={["year", "month"]}
          />
          <InputText
            label="Description"
            value={editorEvent.description || ""}
            onChange={(e) =>
              setEditorEvent({ ...editorEvent, description: e.target.value })
            }
          />
          <InputNumber
            label="Story Points"
            value={editorEvent.storyPoints}
            onChange={(e) =>
              setEditorEvent({ ...editorEvent, storyPoints: parseInt(e.target.value) })
            }
          />
        </div>
        <div>
          <SketchPicker
            color={editorEvent.color}
            onChange={(color) =>
              setEditorEvent({ ...editorEvent, color: color.hex })
            }
          />
        </div>
      </div>
      <div
        className="flex justify-end gap-2 mt-4"
      >
        <button
          className="px-4 py-2 w-24 rounded-md border-2 border-red-500 text-red-500"
          onClick={onCancel}
        >Cancel</button>

        <button
          className="px-4 py-2 w-24 rounded-md bg-green-500 text-white"
          onClick={() => onSave(editorEvent)}
        >Save</button>
      </div>
    </div>
  );
}
