import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          done: false,
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#0ea5e9]">Todo App</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
          />
          <button
            onClick={addTask}
            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
          >
            <Plus size={20} />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              No tasks yet. Add one above!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center gap-3 hover:border-slate-600 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 rounded border-slate-600 text-[#0ea5e9] focus:ring-[#0ea5e9] focus:ring-offset-0 cursor-pointer"
                />
                <span
                  className={`flex-1 ${
                    task.done
                      ? "line-through text-slate-500"
                      : "text-white"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div className="mt-6 text-sm text-slate-400">
            {tasks.filter((t) => !t.done).length} of {tasks.length} tasks
            remaining
          </div>
        )}
      </div>
    </div>
  );
}

export default App;