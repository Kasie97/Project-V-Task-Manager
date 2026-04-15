import type { Task } from "../../../shared/index";

const STATUS_STYLES: Record<string, React.CSSProperties> = {
  todo: { background: "#fef9c3", color: "#854d0e" },
  "in-progress": { background: "#dbeafe", color: "#1e40af" },
  done: { background: "#dcfce7", color: "#15803d" },
};

type Props = {
  task: Task;
};

export const TaskItem = ({ task }: Props) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.title}>{task.title}</span>
        <span style={{ ...styles.badge, ...STATUS_STYLES[task.status] }}>
          {task.status}
        </span>
      </div>
      {task.description && (
        <p style={styles.description}>{task.description}</p>
      )}
      <p style={styles.meta}>
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "12px 16px",
    marginBottom: 12,
    background: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontWeight: 600,
    fontSize: 15,
    color: "#111827",
  },
  badge: {
    fontSize: 12,
    fontWeight: 600,
    padding: "2px 10px",
    borderRadius: 12,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 13,
    color: "#6b7280",
    margin: "4px 0 8px",
  },
  meta: {
    fontSize: 12,
    color: "#9ca3af",
    margin: 0,
  },
};