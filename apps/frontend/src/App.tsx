import { useState } from "react";
import CreateTaskPage from "./pages/CreateTaskPage";
import TasksPage from "./pages/TaskPage";

type Page = "create" | "view";

export default function App() {
  const [page, setPage] = useState<Page>("create");

  return (
    <div style={styles.root}>
      <nav style={styles.nav}>
        <span style={styles.brand}>Quant Task Manager</span>
        <div style={styles.navLinks}>
          <button
            onClick={() => setPage("create")}
            style={{ ...styles.navBtn, ...(page === "create" ? styles.navBtnActive : {}) }}
          >
            Create Task
          </button>
          <button
            onClick={() => setPage("view")}
            style={{ ...styles.navBtn, ...(page === "view" ? styles.navBtnActive : {}) }}
          >
            View Tasks
          </button>
        </div>
      </nav>

      <main style={styles.main}>
        {page === "create" ? <CreateTaskPage /> : <TasksPage />}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: { fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: "#cddff1" },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    height: 56,
    background: "#f5e4e4",
    borderBottom: "1px solid #e5e7eb",
  },
  brand: { fontWeight: 700, fontSize: 16, color: "#111827" },
  navLinks: { display: "flex", gap: 8 },
  navBtn: {
    padding: "6px 16px",
    fontSize: 14,
    border: "1px solid #566178",
    borderRadius: 6,
    background: "transparent",
    cursor: "pointer",
    color: "#4c3751",
  },
  navBtnActive: {
    background: "#323a1a",
    color: "#fff",
    border: "1px solid #2563eb",
  },
  main: { maxWidth: 720, margin: "0 auto" },
};