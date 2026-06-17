import { Link } from "react-router-dom";

export default function API_EndpointList({ apiendpoints, setApiendpoints }) {
    const handleDelete = (id) => {
        setApiendpoints(apiendpoints.filter(a => a.id !== id));
    }

    return (
        <div className="container-fluid">
            <div className="card shadow p-3 mb-5 bg-body-tertiary rounded">
                <h4 className="card-header">Danh sách các API</h4>
                <div className="card-body">
                    {apiendpoints.length === 0 ? (
                        <p className="text-center mt-3">Chưa có API nào ở đây</p>
                    ) : (
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>End Point</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                    <th>Response Time</th>
                                    <th>Description</th>
                                    <th>Function</th>
                                </tr>
                            </thead>

                            {apiendpoints.map(a => (
                                <tbody>
                                    <tr key={a.id}>
                                        <td>{a.endpoint}</td>
                                        <td>{a.method}</td>
                                        <td>{a.status}</td>
                                        <td>{a.responseTime}</td>
                                        <td>{a.description}</td>
                                        <td>
                                            <button onClick={() => handleDelete(a.id)} className="btn btn-danger">Xoá</button>
                                            <Link to={`/edit/${a.id}`} className="btn btn-outline-secondary mx-2">Sửa</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}