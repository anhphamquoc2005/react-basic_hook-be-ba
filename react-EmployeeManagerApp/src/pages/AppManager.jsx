import { Link } from "react-router-dom";

export default function AppManager({ apps, setApps }) {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa hồ sơ này?");
    if (confirmDelete) {
      setApps(apps.filter((app) => app.id !== id));
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quản lý hồ sơ Nhân Viên</h2>
        <Link to="/add" className="btn btn-primary">
          Thêm mới hồ sơ
        </Link>
      </div>
      <div className="ms-5 me-5">
        {apps.length === 0 ? (
          <p className="text-center">Chưa có hồ sơ nào ở đây.</p>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Công ty</th>
                <th>Ví trí</th>
                <th>Trạng thái</th>
                <th>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.id}>
                  <td>
                    <strong>{app.company}</strong>
                  </td>
                  <td>{app.position}</td>
                  <td>{app.status}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="btn btn-danger"
                    >
                      Xóa
                    </button>
                    {" | "}
                    <Link
                      to={`/edit/${app.id}`}
                      className="btn btn-outline-secondary"
                    >
                      Sửa
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
