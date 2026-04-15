import type { Task } from "../../../shared/index";
import { TaskItem } from "./TaskItem";

type Props = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: Props) => {
  if (tasks.length === 0) {
    return <p style={{ color: "#6b7280", fontSize: 14 }}>No tasks found for this user.</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};