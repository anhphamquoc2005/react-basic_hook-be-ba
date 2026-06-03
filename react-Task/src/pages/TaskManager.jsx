import { Link } from "react-router-dom";

export default function TaskManager({ tasks, setTasks }) {

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <div>
        <h5>Danh sách công việc</h5>

        <div>
          {tasks.length === 0 ? (
            <p>Chưa có công việc nào ở đây</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id}>
                <h4>{task.nameTask}</h4>
                <p>Trạng thái: {task.status}</p>
                <p>
                  Mô tả công việc:{" "}
                  {task.describe ? task.describe : "Không có mô tả"}
                </p>
                <button onClick={() => removeTask(task.id)}>Xóa</button>
                <button>Sửa</button>
              </div>
            ))
          )}
        </div>
        <div>
          <Link to="/tasks/add">
            <button className="btn btn-primary">Thêm công việc mới</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
