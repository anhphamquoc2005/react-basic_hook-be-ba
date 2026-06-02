import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import ShoppingForm from "./components/ShoppingForm";
import CustomModal from "./components/CustomModal";

const schema = yup.object({
  productName: yup.string().trim().required("Chưa nhập tên sản phẩm."),
  quantity: yup
    .number()
    .typeError("Chỉ được nhập số.")
    .positive("Số lượng phải lớn hơn 0.")
    .required("Chưa nhập số lượng sản phẩm."),
  productClassify: yup.string().trim().required("Chưa phân loại sản phẩm."),
});

export default function ShoppingManager() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [latestPurchase, setLatestPurChase] = useState(null);
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
      productName: product.productName,
      quantity: product.quantity,
      productClassify: product.productClassify,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    reset({ productName: "", quantity: "", productClassify: "" });
  };

  const onSubmit = async (data) => {
    if (editingId !== null) {
      const updatedProduct = products.map(product =>
        product.id === editingId ? { ...product, ...data } : product
      );

      setProducts(updatedProduct);
      setEditingId(null);
      reset({ productName: "", quantity: "", productClassify: "" });
    } else {
      try {
        await axios.post("https://jsonplaceholder.typicode.com/posts", data);

        const newProduct = {
          id: Date.now(),
          ...data,
        };

        setProducts([newProduct, ...products]);
        setLatestPurChase(newProduct);
        setShowModal(true);
        reset();
      } catch (error) {
        alert("Kết nối không thành công, vui lòng kiểm tra lại!");
      }
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <div>
        <div>
          <h5>Số tay mua sắm</h5>

          <div>
            <ShoppingForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              errors={errors}
              isEditing={editingId !== null}
              onCancel={handleCancel}
            />
          </div>
        </div>

        <div>
          <h3>Giỏ hàng</h3>

          {products.length === 0 ? (
            <p>Chưa có sản phẩm nào</p>
          ) : (
            products.map((product) => (
              <div key={product.id}>
                <h4>{product.productName}</h4>
                <p>Số lượng: {product.quantity}</p>
                <p>Loại: {product.productClassify}</p>
                <button onClick={() => removeProduct(product.id)} className="btn btn-outline-danger">Xóa</button>
                <button onClick={() => handleEditClick(product)} className="btn btn-light">Sửa</button>
              </div>
            ))
          )}
        </div>
      </div>

      <CustomModal
        isOpen={showModal}
        title="Đã thêm thành công!"
        onClose={() => setShowModal(false)}
      >
        {latestPurchase && (
          <div>
            <p> Bạn vừa thêm<strong>{" "}{latestPurchase.quantity} {latestPurchase.productName}{" "}</strong>
              vào giỏ hàng.
            </p>
            <p>Đừng quên mua nhé!</p>
          </div>
        )}
      </CustomModal>
    </div>
  );
}
