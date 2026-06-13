import CustomInput from "../components/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
  model: yup.string().trim().required("The form must not be left blank."),
  brand: yup.string().trim().required("The brand space cannot be left blank."),
  size: yup
    .number()
    .typeError("Size can only be entered as a number.")
    .positive("The size must not be a negative number.")
    .required("The size field cannot be left blank."),
  price: yup
    .number()
    .typeError("Price can only be entered as a number.")
    .positive("The price must not be a negative number.")
    .required("The price field cannot be left blank."),
  quantity: yup
    .number()
    .typeError("Quantity can only be entered as a number.")
    .positive("The quantity must not be a negative number.")
    .required("The quantity field cannot be left blank."),
});

export default function BootsForm({ boots, setBoots }) {
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
      const existingBoots = boots.find((b) => b.id.toString() === id);
      if (existingBoots) {
        reset(existingBoots);
      }
    }
  }, [id, reset, boots]);

  const onSubmit = (data) => {
    if (id) {
      const updatedBoots = boots.map((b) =>
        b.id.toString() === id ? { ...b, ...data } : p,
      );
      setBoots(updatedBoots);
      alert("Product information updated successfully.");
    } else {
      const newBoots = {
        id: Date.now(),
        ...data,
      };
      setBoots(newBoots);
      alert("New product added successfully.");
    }
    navigate("/");
  };

  return (
    <div className="card mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
      <h2 className="card-header">
        {id ? "Update information" : "Add new product"}
      </h2>
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Model"
          type="text"
          name="model"
          register={register}
          error={errors.model}
        />

        <CustomInput
          label="Brand"
          type="text"
          name="brand"
          register={register}
          error={errors.brand}
        />

        <div className="row">
          <div className="col">
            <CustomInput
              label="Size"
              type="number"
              name="size"
              register={register}
              error={errors.size}
            />
          </div>

          <div className="col">
            <CustomInput
              label="Price"
              type="number"
              name="price"
              register={register}
              error={errors.price}
            />
          </div>

          <div className="col">
            <CustomInput
              label="Quantity"
              type="number"
              name="quantity"
              register={register}
              error={errors.quantity}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Updated" : "Add new"}
        </button>
      </form>
    </div>
  );
}
