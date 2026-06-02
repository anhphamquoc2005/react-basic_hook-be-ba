import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import ProductForm from "./components/ProductForm";
import CustomModal from "./components/CustomModal";

const schema = yup.object({
  nameProduct: yup
    .string()
    .trim()
    .required("Tên sản phẩm không được để trống."),
  priceProduct: yup
    .number()
    .typeError("Giá tiền chỉ được nhập số.")
    .positive("Giá tiền phải lớn hơn 0.")
    .required("Giá tiền không được để trống."),
  describeProduct: yup.string().trim(),
});

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [latestProduct, setLatestProduct] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEditClick = (product) => {
    setEditingId(product.id);
    reset({
      nameProduct: product.nameProduct,
      priceProduct: product.priceProduct,
      describeProduct: product.describeProduct,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    reset({ nameProduct: "", priceProduct: "", describeProduct: "" });
  };

  const onSubmit = async (data) => {
    if (editingId !== null) {
        const updatedProduct = products.map(product => 
            product.id === editingId ? {...product, ...data} : product
        );

        setProducts(updatedProduct);
        setEditingId(null);
        reset({ nameProduct: "", priceProduct: "", describeProduct: "" });
    } else {
      try {
        await axios.post("https://jsonplaceholder.typicode.com/posts", data);

        const newProduct = {
          id: Date.now(),
          ...data,
        };

        setProducts([newProduct, ...products]);
        setShowModal(true);
        setLatestProduct(newProduct);
        reset();
      } catch (error) {
        alert("Kết nối thất bại. Vui lòng kiểm tra lại!");
      }
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <div>
        <h5>Thêm sản phẩm mới</h5>
        <div>
          <ProductForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isEditing={editingId !== null}
            onCancel={handleCancel}
          />
        </div>
      </div>

      <div>
        <h5>Danh sách sản phẩm</h5>
        <div>
          {products.length === 0 ? (
            <p>Chưa có sản phẩm nào</p>
          ) : (
            products.map((product) => (
              <div key={product.id}>
                <h4>{product.nameProduct}</h4>
                <p>
                  Giá: <strong>{product.priceProduct}</strong>
                </p>
                <p>
                  Mô tả: <strong>{product.describeProduct ? product.describeProduct : "Không có mô tả"}</strong>
                </p>
                <button onClick={() => removeProduct(product.id)}>Xóa</button>
                <button onClick={() => handleEditClick(product)}>Sửa</button>
              </div>
            ))
          )}
        </div>
      </div>

      <CustomModal
        isOpen={showModal}
        title="Lưu thành công!"
        onClose={() => setShowModal(false)}
      >
        {latestProduct && (
          <div>
            <p>
              {latestProduct.nameProduct} vừa được thêm vào danh sách sản phẩm
            </p>
            <p>Giá: {latestProduct.priceProduct}</p>
            <p>Mô tả: {latestProduct.describeProduct}</p>
          </div>
        )}
      </CustomModal>
    </div>
  );
}
