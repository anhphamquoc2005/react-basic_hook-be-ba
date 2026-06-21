import { Link } from "react-router-dom";

export default function EpicLibrary({ games, setGames }) {
    const handleRemove = (id) => {
        setGames(games.filter(g => g.id != id));
    };

    return (
        <div className="container-fluid">
            {games.length === 0 ? (
                <p className="text-center mt-3">Chưa có game nào được thêm vào đây</p>
            ) : (
                <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded mt-3">
                    <div className="card-header">
                        <h3>Thư viện Game</h3>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên game</th>
                                    <th>Nền tảng</th>
                                    <th>Thể loại</th>
                                    <th>Thời gian đã chơi</th>
                                    <th>Trạng thái</th>
                                    <th></th>
                                </tr>
                            </thead>

                            {games.map(g => (
                                <tbody>
                                    <tr key={g.id}>
                                        <td>{g.id}</td>
                                        <td>{g.gameName}</td>
                                        <td>{g.platform}</td>
                                        <td>{g.genre}</td>
                                        <td>{g.hoursPlayed}</td>
                                        <td>{g.status}</td>
                                        <td>
                                            <button onClick={() => handleRemove(g.id)} className="btn btn-danger">Xoá</button>
                                            <Link to={`/edit/${g.id}`} className="btn btn-info mx-2">Cập nhật</Link>
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