export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isComplete: boolean;
  assignedTo: string | null;
  priority: "low" | "medium" | "high";
}
