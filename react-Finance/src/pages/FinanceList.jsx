import { Link } from "react-router-dom";

export default function FinanceList({ finances, setFinances }) {
    const handleRemove = (id) => {
        setFinances(finances.filter(f => f.id != id));
    }

    return (
        <div className="container-fluid">
            {finances.length === 0 ? (
                <p className="text-center">Chưa có chi tiêu nào ở đây.</p>
            ) : (
                <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    <div className="card-header">
                        <h3>Chi tiêu</h3>
                    </div>

                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Giao dịch</th>
                                    <th>Kiểu chi tiêu</th>
                                    <th>Loại giao dịch</th>
                                    <th>Số tiền</th>
                                    <th>Thời gian</th>
                                    <th></th>
                                </tr>
                            </thead>

                            {finances.map(f => (
                                <tbody>
                                    <tr key={f.id}>
                                        <td>{f.id}</td>
                                        <td>{f.transactionName}</td>
                                        <td>{f.type}</td>
                                        <td>{f.category}</td>
                                        <td>{f.amount}</td>
                                        <td>{f.date}</td>
                                        <td>
                                            <button onClick={() => handleRemove(f.id)} className="btn btn-danger">Xoá</button>
                                            <Link to={`/edit/${f.id}`} className="btn btn-outline-secondary mx-2">Sửa</Link>
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