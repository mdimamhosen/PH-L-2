import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { removeTask, toggleState } from "@/redux/features/task/taskSlice";
import { useAppDispatch } from "@/redux/Hooks/hook";
import { ITask } from "@/types/taskType";
import { Trash2 } from "lucide-react";

interface IProps {
  task: ITask;
}

const TaskCard = ({ task }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="rounded p-4 w-80 border border-neutral-500 shadow-lg">
        <div className="flex justify-between items-center">
          <h1
            className={cn("text-lg font-bold", {
              "line-through text-red-700": task.isComplete,
            })}
          >
            {task.title}
          </h1>
          <Button
            onClick={() => dispatch(removeTask(task.id))}
            className="px-2 py-1 rounded"
          >
            <Trash2 />
          </Button>
        </div>
        <p className="text-gray-500 mt-2">{task.description}</p>
        <p className="text-gray-500 mt-2">
          {task.assignedTo !== null ? task.assignedTo : "No one is assigned"}
        </p>

        <div className="flex justify-between items-center mt-4">
          {/* <p className="text-gray-500">Due Date: {task.dueDate}</p> */}
          <div className="flex items-center gap-1">
            <Checkbox
              checked={task.isComplete}
              onClick={() => dispatch(toggleState(task.id))}
            />
            <p
              className={cn("w-3 h-3 rounded-full", {
                "bg-red-500": task.priority === "high",
                "bg-yellow-500": task.priority === "medium",
                "bg-green-500": task.priority === "low",
              })}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
