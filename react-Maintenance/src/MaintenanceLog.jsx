import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MaintenanceForm from "./MaintenanceForm";
import CustomModal from "./component/CustomModal";

const schema = yup.object({
  partName: yup.string().trim().required("Tên phụ tùng không được để trống."),
  const: yup
    .number()
    .typeError("Chi phí phải là số")
    .positive("Chi phí phải lớn hơn 0")
    .required("Giá tiền không được để trống."),
  status: yup.string().trim().required("Trạng thái không được để trống"),
});

export default function MaintenanceLog() {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [latestRecord, setLatestRecord] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const newRecord = {
        id: Date.now(),
        ...data,
      };

      (setRecords([newRecord, ...records]),
        setLatestRecord(newRecord),
        setShowModal(true),
        reset());
    } catch (error) {
      alert("Lưu thất bại, vui lòng kiểm tra kết nối");
    }
  };

  const removeRecord = (id) => {
    setRecords(records.filter((records) => records.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Số tay bảo dưỡng xe máy</h2>

      <div className="row">
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-warning">
              <h3>Thêm mới lịch sử</h3>
            </div>

            <div className="card-body bg-light">
              <MaintenanceForm
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
              />
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-secondary text-white">
              <h3>Lịch sử bảo dưỡng ({records.length})</h3>
            </div>

            <div className="card-body bg-light" style={{ minHeight: "400" }}>
              {records.length === 0 ? (
                <p className="text-center text-muted mt-4">
                  Chưa có dữ liệu bảo dưỡng.
                </p>
              ) : (
                records.map((record) => (
                  <div
                    key={record}
                    className="card mb-2 shadow-sm border-start border-warning border-4"
                  >
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="card-title">{record.partName}</h4>
                        <p className="card-text mb-0 text-secondary small">
                          <strong>Chi phí: {record.const} VNĐ</strong> | Trạng thái:{" "}
                          {record.status}
                        </p>
                      </div>
                      <button
                        class="btn btn-outline-danger btn-sm mt-1"
                        onClick={() => removeRecord(record.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={showModal}
        title="Lưu thành công!"
        onClose={() => setShowModal(false)}
      >
        {latestRecord && (
          <div>
            <p>Phụ tùng: {latestRecord.partName}</p>
            <p className="card-text mb-0 text-secondary small">
              <strong>Chi phí: {latestRecord.const} VNĐ</strong> | Trạng thái:{" "}
              {latestRecord.status}
            </p>
          </div>
        )}
      </CustomModal>
    </div>
  );
}
