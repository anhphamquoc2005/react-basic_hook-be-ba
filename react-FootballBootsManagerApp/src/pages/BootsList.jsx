import { Link } from "react-router-dom";

export default function BootsList({ boots, setBoots }) {
  const handleRemove = (id) => {
    setBoots(boots.filter((b) => b.id !== id));
  };

  return (
    <div className="container-fluid">
      {boots.length === 0 ? (
        <p className="text-center mt-3">Chưa có sản phẩm nào ở đây.</p>
      ) : (
        <div className="card mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
          <h2 className="card-header text-center">Boots List</h2>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Brand</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                {boots.map((b) => (
                  <tr key={b.id}>
                    <td>{b.model}</td>
                    <td>{b.brand}</td>
                    <td>{b.size}</td>
                    <td>{b.price} VNĐ</td>
                    <td>{b.quantity}</td>
                    <td>

                      <Link to={`/edit/${b.id}`} className="btn btn-outline-secondary mx-2">Sửa</Link>

                      <button
                        onClick={() => handleRemove(b.id)}
                        className="btn btn-danger"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
