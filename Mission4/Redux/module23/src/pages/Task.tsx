import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import { selectFilter, selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/Hooks/hook";
import React from "react";

const Task: React.FC = () => {
  const tasks = useAppSelector(selectTasks);
  const filter = useAppSelector(selectFilter);
  console.log(filter);
  console.log(tasks);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="my-3 text-lg font-bold">Task</h1>
        <AddTaskModal />
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2  gap-4">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};

export default Task;
