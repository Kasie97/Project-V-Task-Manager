import { useState, useEffect } from "react";
import { TasksAPI } from "../api/tasks.api";
import { UsersAPI } from "../api/users.api";
import { TaskList } from "../components/TaskList";
import type { Task, User } from "../../../shared/index";

export default function TasksPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    UsersAPI.getAll().then(setUsers).catch(() => setError("Failed to load users."));
  }, []);

  const handleFetch = async () => {
    if (!userId) {
      setError("Please select a user.");
      return;
    }
    setError("");
    setLoading(true);
    setSearched(false);
    try {
      const data = await TasksAPI.getByUserId(userId);
      setTasks(data);
      setSearched(true);
    } catch {
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedUser = users.find((u) => u.id === userId);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>View Tasks by User</h2>
      <p style={styles.sub}>Select a user to see all their assigned tasks.</p>

      <div style={styles.row}>
        <select
          value={userId}
          onChange={(e) => { setUserId(e.target.value); setSearched(false); }}
          style={styles.select}
        >
          <option value="">— Select a user —</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <button onClick={handleFetch} disabled={loading} style={styles.button}>
          {loading ? "Loading..." : "Fetch Tasks"}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {searched && (
        <>
          <h3 style={styles.resultHeading}>
            {tasks.length} task{tasks.length !== 1 ? "s" : ""} for{" "}
            {selectedUser?.name ?? userId}
          </h3>
          <TaskList tasks={tasks} />
        </>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { padding: "32px 24px", maxWidth: 600 },
  heading: { fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "#111827" },
  sub: { fontSize: 14, color: "#6b7280", margin: "0 0 24px" },
  row: { display: "flex", gap: 12, marginBottom: 16, alignItems: "center" },
  select: {
    padding: "8px 12px",
    fontSize: 14,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    flex: 1,
  },
  button: {
    padding: "8px 18px",
    fontSize: 14,
    fontWeight: 600,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  error: { color: "#dc2626", fontSize: 13 },
  resultHeading: { fontSize: 16, fontWeight: 600, color: "#374151", margin: "16px 0 12px" },
};