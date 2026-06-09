import { Link } from "react-router-dom";

export default function SquadList({ players, setPlayers }) {
  const handleSell = (id) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  console.log("Dữ liệu cầu thủ hiện tại là:", players);

  return (
    <div className="container">
      {players.length === 0 ? (
        <p className="text-center mt-3">Chưa có cầu thủ nào ở đây</p>
      ) : (
        <div className="card">
          <div className="card-body">
            <h2 className="card-header text-center mb-3">
              Danh sách các cầu thủ
            </h2>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Tên cầu thủ</th>
                  <th>Vị trí</th>
                  <th>OVR</th>
                  <th>Trạng thái</th>
                  <th>Chức năng</th>
                </tr>
              </thead>

              <tbody>
                {players.map((p) => (
                  <tr key={p.id} className="align-middle">
                    <td className="fw-bold">{p.namePlayer}</td>
                    <td>{p.position}</td>
                    <td>{p.ovr}</td>
                    <td>{p.status}</td>
                    <td>
                      <Link
                        to={`/edit/${p.id}`}
                        className="btn btn-ouline-secondary"
                      >
                        Cập nhật
                      </Link>
                      <button
                        onClick={() => handleSell(p.id)}
                        className="btn btn-danger"
                      >
                        Bán cầu thủ
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
