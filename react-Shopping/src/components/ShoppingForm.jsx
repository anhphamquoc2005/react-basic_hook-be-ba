import CustomInput from "./CustomInput";

export default function ShoppingForm({ onSubmit, register, errors, isEditing, onCancel }) {
    return (
        <form onSubmit={onSubmit}>
            <CustomInput 
                label="Tên món hàng"
                type="text"
                name="productName"
                register={register}
                error={errors.productName}
            />

            <CustomInput 
                label="Số lượng cần mua"
                type="number"
                name="quantity"
                register={register}
                error={errors.quantity}
            />

            <CustomInput 
                label="Phân loại hàng"
                type="text"
                name="productClassify"
                register={register}
                error={errors.productClassify}
            />

            <div>
                <button 
                    className="btn btn-outline-primary" 
                    type="submit"
                >
                    {isEditing ? "Lưu thay đổi" : "Thêm sản phẩm vào giỏ hàng"}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    )
}