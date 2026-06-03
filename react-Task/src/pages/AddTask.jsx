import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import CustomModal from "../components/CustomModal";

const schema = yup.object({
  nameTask: yup.string().trim().required("Tên task không được bỏ trống."),
  status: yup.string().trim().required("Trạng thái task không được bỏ trống."),
  describe: yup.string().trim(),
});

export default function AddTask({ tasks, setTasks }) {

  const navigate = useNavigate();

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
      await axios.post("https://jsonplaceholder.typicode.com/posts", data);

      const newTask = { id: Date.now(), ...data };
      setTasks([newTask, ...tasks]);

      alert("Thêm công việc thành công!");
      navigate("/");
    } catch (error) {
      alert("Lỗi kết nối!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <div>
        <h2>Thêm Công Việc Mới</h2>
        <TaskForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
