import { Link } from "react-router-dom"; // Nhớ import thêm Link để tí làm nút Sửa nhé em

export default function MarketingList({ jewelrys, setJewelrys }) {
    const handleRemove = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
            setJewelrys(jewelrys.filter(j => j.id !== id));
        }
    };

    return (
        <div className="container-fluid mt-4">
            {jewelrys.length === 0 ? (
                <p className="text-center mt-3">Chưa có bài đăng nào ở đây.</p>
            ) : (
                /* ĐƯA CARD, TIÊU ĐỀ VÀ TABLE RA NGOÀI VÒNG LẶP */
                <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4 fw-bold text-uppercase">Danh sách Quản lý Truyền thông</h5>

                        <table className="table table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Tên món Trang sức</th>
                                    <th>Chủ đề</th>
                                    <th>Màu sắc</th>
                                    <th>Nội dung</th>
                                    <th>Giá</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>

                            {/* VÒNG LẶP CHỈ ĐẶT Ở ĐÂY ĐỂ DUYỆT CÁC DÒNG TR */}
                            <tbody>
                                {jewelrys.map(j => (
                                    /* <tr stage ngoài cùng đón key={j.id} là chuẩn bài */
                                    <tr key={j.id}>
                                        <td className="fw-bold">{j.itemName}</td>
                                        <td><span className="badge bg-info text-dark">{j.theme}</span></td>
                                        <td><code>{j.colorPalette}</code></td>
                                        <td>{j.caption}</td>
                                        <td className="text-success fw-bold">{j.price.toLocaleString()} đ</td>
                                        <td>
                                            {/* Nút Cập nhật để dẫn sang trang sửa */}
                                            <Link to={`/edit/${j.id}`} className="btn btn-sm btn-outline-secondary me-2">Sửa</Link>
                                            <button onClick={() => handleRemove(j.id)} className="btn btn-sm btn-danger">Xoá</button>
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