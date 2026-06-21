import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar navbar-expand-lg shadow p-3 mb-5 bg-body-tertiary mt-3 rounded">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Technical Spec</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Thư viện game</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/stream" className="nav-link disabled" aria-disabled="true">Nền tảng Stream</Link>
                        </li>
                    </ul>
                </div>

                <div className="d-flex">
                    <Link to="/add" className="btn btn-primary">Thêm game mới</Link>
                </div>
            </div>
        </div>
    )   
}