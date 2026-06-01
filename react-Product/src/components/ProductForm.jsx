import CustomInput from "./CustomInput"

export default function ProductForm({ onSubmit, register, errors }) {
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

            <button type="submit" className="btn btn-outline-primary">Thêm sản phẩm</button>
        </form>
    )
}