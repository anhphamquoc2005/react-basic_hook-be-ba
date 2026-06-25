import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar navbar-expand-lg shadow p-3 mb-5 bg-body-tertiary rounded mt-2">
            <div className="container-fluid">
                <h5 className="navbar-brand">Tài chính</h5>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Chi tiêu</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/total" className="nav-link disabled" aria-disabled="true">Tổng chi tiêu</Link>
                        </li>
                    </ul>
                </div>

                <div className="d-flex">
                    <Link to="/add" className="btn btn-primary">Giao dịch</Link>
                </div>
            </div>
        </div>
    )    
}