import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar navbar-expand-lg shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Football Boots Manager</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Boots</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/accessory" className="nav-link disable" aria-disabled="true">Accessory</Link>
                        </li>
                    </ul>
                </div>

                <div className="d-flex">
                    <Link to="/add" className="btn btn-primary">Add Boots</Link>
                </div>
            </div>
        </div>
    )
}