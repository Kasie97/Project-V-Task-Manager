import { useEffect, useState } from "react";
import type { CreateTaskInput, User } from "../../../shared/index";
import { UsersAPI } from "../api/users.api";

type Props = {
  onCreate: (data: CreateTaskInput) => Promise<void>;
};

export const TaskForm = ({ onCreate }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
  UsersAPI.getAll().then(setUsers).catch(console.error);
}, []);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!title.trim() || !userId) {
      setError("Title and user are required.");
      return;
    }

    setLoading(true);
    try {
      await onCreate({ title: title.trim(), description: description.trim(), userId });
      setTitle("");
      setDescription("");
      setUserId("");
      setSuccess(true);
    } catch {
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label style={styles.label}>Assigned User *</label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={styles.input}
        >
          <option value="">— Select a user —</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Title *</label>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Description</label>
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ ...styles.input, resize: "vertical" }}
        />
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>✅ Task created successfully!</p>}

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 480,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    padding: "8px 12px",
    fontSize: 14,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    background: "#6a7691",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  error: { color: "#dc2626", fontSize: 13, margin: 0 },
  success: { color: "#16a34a", fontSize: 13, margin: 0 },
};