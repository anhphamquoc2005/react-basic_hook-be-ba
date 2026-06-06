import CustomInput from "../components/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
  company: yup.string().trim().required("Chưa nhập tên công ty."),
  position: yup.string().trim().required("Chưa nhập vị trí."),
  status: yup.string().trim().required("Chưa nhập trạng thái."),
});

export default function AppForm({ apps, setApps }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      const existingApp = apps.find((app) => app.id.toString() === id);
      if (existingApp) {
        reset(existingApp);
      }
    }
  }, [id, apps, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", data);

      if (id) {
        const updatedApp = apps.map((app) =>
          app.id.toString() === id ? { ...app, ...data } : id,
        );

        setApps(updatedApp);
        alert("Cập nhật hồ sơ thành công!");
      } else {
        const newApp = {
          id: Date.now(),
          ...data,
        };

        setApps([newApp, ...apps]);
        alert("Thêm hồ sơ mới thành công!");
      }
      navigate("/");
    } catch (error) {
      alert("Kết nối thất bại! Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div>
      <h2>{id ? "Cập nhật hồ sơ" : "Thêm hồ sơ ứng tuyển"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Công ty"
          type="text"
          name="company"
          register={register}
          error={errors.company}
        />

        <CustomInput
          label="Vị trí"
          type="text"
          name="position"
          register={register}
          error={errors.position}
        />

        <CustomInput
          label="Trạng thái"
          type="text"
          name="status"
          register={register}
          error={errors.status}
        />

        <button className="btn btn-primary" type="submit">
          {id ? "Lưu thay đổi" : "Thêm hồ sơ"}
        </button>
        {" | "}
        <Link to="/" className="btn btn-secondary">
          Quay lại
        </Link>
      </form>
    </div>
  );
}
