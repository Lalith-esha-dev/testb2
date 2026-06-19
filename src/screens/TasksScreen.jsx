import { useState } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import Card from '../components/Card';
import './TasksScreen.css';

const INITIAL_TASKS = [
  { id: '1', label: 'Review app screens', done: true },
  { id: '2', label: 'Try the Explore tab', done: false },
  { id: '3', label: 'Update profile info', done: false },
  { id: '4', label: 'Check activity feed', done: false },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const completed = tasks.filter((t) => t.done).length;

  return (
    <ScreenLayout scroll>
      <h1 className="tasks-header">Tasks</h1>
      <p className="tasks-subheader">
        {completed} of {tasks.length} completed
      </p>

      {tasks.map((task) => (
        <button
          key={task.id}
          type="button"
          className="tasks-item-button"
          aria-pressed={task.done}
          aria-label={task.label}
          onClick={() => toggleTask(task.id)}
        >
          <Card className="tasks-card">
            <div className="tasks-row">
              <span
                className={
                  task.done
                    ? 'tasks-checkbox tasks-checkbox-done'
                    : 'tasks-checkbox'
                }
                aria-hidden="true"
              >
                {task.done ? <span className="tasks-checkmark">✓</span> : null}
              </span>
              <span
                className={
                  task.done ? 'tasks-label tasks-label-done' : 'tasks-label'
                }
              >
                {task.label}
              </span>
            </div>
          </Card>
        </button>
      ))}
    </ScreenLayout>
  );
}
