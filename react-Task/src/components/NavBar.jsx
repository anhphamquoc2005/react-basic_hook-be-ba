import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Trang chủ</Link>
                </li>
                <li className="nav-item">
                    <Link to="/tasks/add" className="nav-link">Thêm mới công việc</Link>
                </li>
            </ul>
        </div>
    )
}