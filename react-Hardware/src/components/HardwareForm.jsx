import CustomInput from "./CustomInput";

export default function HardwareForm({ onSubmit, register, errors }) {

    return (
        <form onSubmit={onSubmit}>
            <CustomInput 
                label="Tên phần mềm"
                name="itemName"
                type="text"
                register={register}
                error={errors.itemName}
            />
            
            <CustomInput 
                label="Ram đã tiết kiệm"
                name="ramSaved"
                type="number"
                register={register}
                error={errors.ramSaved}
            />

            <CustomInput 
                label="Phương pháp"
                name="method"
                type="text"
                register={register}
                error={errors.method}
            />

            <button type="submit" className="btn btn-secondary">Thêm</button>
        </form>
    )
}