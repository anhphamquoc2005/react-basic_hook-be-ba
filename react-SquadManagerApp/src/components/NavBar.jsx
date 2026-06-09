import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Squad Manager</Link>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Đội hình</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link">Sơ đồ</Link>
                    </li>
                </ul>
                <div className="d-flex">
                    <Link to="/add" className="btn btn-primary">Chiêu mộ cầu thủ mới</Link>
                </div>
            </div>
        </div>
    )
}