import CustomInput from "./component/CustomInput";

export default function MaintenanceForm({ onSubmit, register, errors }) {
    return (
        <form onSubmit={onSubmit}>
            <CustomInput 
                label="Tên phụ tùng"
                name="partName"
                type="text"
                register={register}
                error={errors.partName}
            />

            <CustomInput 
                label="Giá tiền"
                name="const"
                type="number"
                register={register}
                error={errors.const}
            />

            <CustomInput 
                label="Trạng thái"
                name="status"
                type="text"
                register={register}
                error={errors.status}
            />

            <button type="submit" className="btn btn-secondary">Thêm lịch sử</button>
        </form>
    )
}