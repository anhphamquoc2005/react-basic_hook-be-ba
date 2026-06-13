import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar navbar-expand-lg shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Quản lý Nội dung</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Danh sách</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">Giới thiệu</Link>
                        </li>
                    </ul>
                </div>

                <div className="d-flex">
                    <Link to="/add" className="btn btn-primary">Thêm nội dung mới</Link>
                </div>
            </div>
        </div>
    )
}