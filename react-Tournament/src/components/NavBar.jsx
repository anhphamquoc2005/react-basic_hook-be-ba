import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar navbar-expand-lg shadow p-3 mb-5 bg-body-tertiary rounded mt-3">
            <div className="container-fluid">
                <h5 className="navbar-brand">FC Online</h5>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Danh sách các đội</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/format" className="nav-link disabled" aria-disabled="true">Competition format</Link>
                        </li>
                    </ul>
                </div>

                <div className="d-flex">
                    <Link to="/add" className="btn btn-primary">Đăng ký</Link>
                </div>
            </div>
        </div>
    )
}