import CustomInput from './CustomInput'

export default function BankingForm({ onSubmit, register, errors, isEditing, onCancel }) {
    return (
        <form onSubmit={onSubmit}>
            <CustomInput 
                label="Tên ngân hàng"
                type="text"
                name="nameBank"
                register={register}
                error={errors.nameBank}
            />

            <CustomInput 
                label="Số tiền"
                type="number"
                name="amount"
                register={register}
                error={errors.amount}
            />

            <CustomInput 
                label="Ghi chú"
                type="text"
                name="note"
                register={register}
                error={errors.note}
            />

            <div>
                <button
                    type='submit'
                    className='btn btn-success'
                >
                    {isEditing ? "Lưu thay đổi" : "Chuyển Khoản"}
                </button>

                {isEditing && (
                    <button
                        type='button'
                        className='btn btn-secondary'
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    )
}