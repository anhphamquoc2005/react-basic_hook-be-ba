import { Link } from "react-router-dom";

export default function ServerList({ servers, setServers }) {
    const handleRemove = (id) => {
        setServers(servers.filter(s => s.id != id));
    }

    return (
        <div className="container-fluid">
            {servers.length === 0 ? (
                <p className="text-center mt-3">Chưa có dữ liệu nào ở đây</p>
            ) : (
                <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Server name</th>
                                    <th>IP Address</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>

                            {servers.map(s => (
                                <tbody>
                                    <tr key={s.id}>
                                        <td>{s.serverName}</td>
                                        <td>{s.ipAddress}</td>
                                        <td>{s.status}</td>
                                        <td>
                                            <button onClick={() => handleRemove(s.id)} className="btn btn-danger">Xoá</button>
                                            <Link to={`/edit/${s.id}`} className="btn btn-outline-secondary mx-2">Sửa</Link>
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