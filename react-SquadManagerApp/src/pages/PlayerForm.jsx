import CustomInput from "../components/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { data, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
  namePlayer: yup.string().trim().required("Tên cầu thủ không được để trống."),
  position: yup.string().trim().required("Chưa nhập vị trí cầu thủ."),
  ovr: yup
    .number()
    .typeError("Chỉ được nhập số")
    .positive("Chỉ số của cầu thủ không được là số âm.")
    .required("Chỉ số của cầu thủ là bao nhiều?"),
  status: yup
    .string()
    .trim()
    .required("Vui lòng cho biết trạng thái của cầu thủ hiện tại."),
});

export default function PlayerForm({ players, setPlayers }) {
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
      const existingPlayer = players.find((p) => p.id.toString() === id);
      if (existingPlayer) {
        reset(existingPlayer);
      }
    }
  }, [id, players, reset]);

  const onSubmit = (data) => {
    if (id) {
      const updatedPlayer = players.map((p) =>
        p.id.toString() === id ? { ...p, ...data } : p,
      );
      setPlayers(updatedPlayer);
      alert("Cập nhật thông tin thành công!");
    } else {
      const newPlayer = {
        id: Date.now(),
        ...data,
      };
      setPlayers([newPlayer, ...players]);
      alert("Chiêu mộ cầu thủ thành công!");
    }
    navigate("/");
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{id ? "Cập nhật thông tin" : "Chiêu mộ cầu thủ"}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Tên cầu thủ"
            type="text"
            name="namePlayer"
            register={register}
            error={errors.namePlayer}
          />
          <div className="row">
            <div className="col">
              <CustomInput
                label="Vị trí"
                type="text"
                name="position"
                register={register}
                error={errors.position}
              />
            </div>
            <div className="col-md-2">
              <CustomInput
                label="OVR"
                type="number"
                name="ovr"
                register={register}
                error={errors.ovr}
              />
            </div>
          </div>
          <CustomInput
            label="Trạng thái"
            type="text"
            name="status"
            register={register}
            error={errors.status}
          />

          <button type="submit" className="btn btn-primary w-100">
            {id ? "Cập nhật" : "Chiêu mộ"}
          </button>
        </form>
      </div>
    </div>
  );
}
