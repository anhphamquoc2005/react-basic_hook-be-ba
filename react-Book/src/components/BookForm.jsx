import CustomInput from './CustomInput';

export default function BookForm({ onSubmit, register, errors, isEditing, onCancel }) {
    return (
        <form onSubmit={onSubmit}>
            <CustomInput 
                label="Tên sách"
                type="text"
                name="nameBook"
                register={register}
                error={errors.nameBook}
            />

            <CustomInput 
                label="Giá"
                type="number"
                name="price"
                register={register}
                error={errors.price}
            />

            <CustomInput 
                label="Tác giả"
                type="text"
                name="author"
                register={register}
                error={errors.author}
            />

            <div>
                <button type='submit' className='btn btn-outline-primary'>
                    {isEditing ? "Lưu thay đổi" : "Thêm sách mới"}
                </button>

                {isEditing && (
                    <button
                        type='button'
                        className='btn btn-outline-secondary'
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    )
}