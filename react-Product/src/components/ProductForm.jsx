import CustomInput from "./CustomInput"

export default function ProductForm({ onSubmit, register, errors, isEditing, onCancel }) {
    return (
        <form onSubmit={onSubmit}>
            <CustomInput 
                label="Name"
                type="text"
                name="nameProduct"
                register={register}
                error={errors.nameProduct}
            />

            <CustomInput 
                label="Price"
                type="number"
                name="priceProduct"
                register={register}
                error={errors.priceProduct}
            />

            <CustomInput 
                label="Description"
                type="text"
                name="describeProduct"
                register={register}
                error={errors.describeProduct}
            />

            <div>
                <button 
                    type="submit" 
                    className="btn btn-outline-primary"
                >
                    {isEditing ? "Lưu thay đổi" : "Thêm mới sản phẩm"}
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