import { TaskForm } from "../components/TaskForm";
import { TasksAPI } from "../api/tasks.api";
import type { CreateTaskInput } from "../../../shared/index";

export default function CreateTaskPage() {
  const handleCreate = async (input: CreateTaskInput) => {
    await TasksAPI.create(input);
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Create a New Task</h2>
      <p style={styles.sub}>Fill in the details below to add a new task.</p>
      <TaskForm onCreate={handleCreate} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: "32px 24px", maxWidth: 600 },
  heading: { fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "#111827" },
  sub: { fontSize: 14, color: "#6b7280", margin: "0 0 24px" },
};