import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTasksQuery } from "@/redux/api/baseAPI";
import { updateFilter } from "@/redux/features/task/taskSlice";
import { useAppDispatch } from "@/redux/Hooks/hook";
import { ITask } from "@/types/taskType";

import React from "react";

const Task: React.FC = () => {
  const { data, isLoading, isError } = useGetTasksQuery(undefined, {
    pollingInterval: 30000, // to refetch every 30 seconds
    refetchOnMountOrArgChange: true, // to refetch on mount or when the argument changes
    refetchOnFocus: true, // to refetch on focus meaning when the tab is active
    refetchOnReconnect: true, // to refetch on reconnect meaing when the network is back
  });
  console.log({ data, isLoading, isError });
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="flex justify-between  w-full items-center">
        <h1 className="my-3 text-lg font-bold">Task</h1>

        <div className="flex justify-between w-full   items-center gap-3">
          {" "}
          <AddTaskModal />
          <Tabs defaultValue="all" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                onClick={() => dispatch(updateFilter("all"))}
                value="all"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                onClick={() => dispatch(updateFilter("low"))}
                value="low"
              >
                Low
              </TabsTrigger>
              <TabsTrigger
                onClick={() => dispatch(updateFilter("medium"))}
                value="medium"
              >
                Medium
              </TabsTrigger>
              <TabsTrigger
                onClick={() => dispatch(updateFilter("high"))}
                value="high"
              >
                High
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2  gap-4">
        {!isLoading &&
          data.tasks.map((task: ITask) => {
            return <TaskCard key={task.id} task={task} />;
          })}
      </div>
    </div>
  );
};

export default Task;
