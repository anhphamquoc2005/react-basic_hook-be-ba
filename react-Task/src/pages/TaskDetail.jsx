import { useParams, Link } from "react-router-dom";

export default function TaskDetail({ tasks }) {
    const { id } = useParams();
    
    // Tự tìm task dựa vào ID
    const task = tasks.find(t => t.id.toString() === id);

    // Nếu ID sai hoặc task không có
    if (!task) {
        return (
            <div style={{ padding: "20px" }}>
                <h2>Công việc này không tồn tại!</h2>
                <Link to="/">
                    <button className="btn btn-secondary">Quay lại danh sách</button>
                </Link>
            </div>
        );
    }

    // Nếu tìm thấy thì in ra bình thường
    return (
        <div style={{ padding: "20px" }}>
            <h2>Chi tiết công việc {id}.</h2>
            <h4>{task.nameTask}</h4>
            <p>Trạng thái: {task.status}</p>
            <p>Mô tả công việc: {task.describe ? task.describe : "Không có mô tả"}</p>

            <Link to="/">
                <button className="btn btn-secondary">Quay lại danh sách</button>
            </Link>
        </div>
    )
}