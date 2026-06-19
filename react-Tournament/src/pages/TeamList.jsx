import { Link } from "react-router-dom";

export default function TeamList({ tournaments, setTournaments }) {
    const handleRemove = (id) => {
        setTournaments(tournaments.filter(t => t.id !== id));
    }

    return (
        <div className="container-fluid">
            {tournaments.length === 0 ? (
                <p className="text-center mt-3">Chưa có đội nào đăng ký.</p>
            ) : (
                <div className="card text-center shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    <h3 className="card-header">Danh sách các đội</h3>
                    <div className="card-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên đội</th>
                                        <th>Đội trưởng</th>
                                        <th>Số lượng thành viên</th>
                                        <th>Số máy</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                {tournaments.map(t =>(
                                    <tbody>
                                        <tr key={t.id}>
                                            <td>{t.id}</td>
                                            <td>{t.teamName}</td>
                                            <td>{t.captain}</td>
                                            <td>{t.memberCount}</td>
                                            <td>{t.pcNumber}</td>
                                            <td>{t.status}</td>
                                            <td>
                                                <button onClick={() => handleRemove(t.id)} className="btn btn-danger mx-2">Xoá</button>
                                                <Link to={`/edit/${t.id}`} className="btn btn-outline-secondary">Sửa thông tin</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                    </div>
                </div>
            )}
        </div>
    )
}