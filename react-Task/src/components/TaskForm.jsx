import CustomInput from './CustomInput'

export default function TaskForm({ onSubmit, register, errors, isEditing, onCancel }) {
    return (
        <form onSubmit={onSubmit}>
            <CustomInput 
                label="Name"
                type="text"
                name="nameTask"
                register={register}
                error={errors.nameTask}
            />

            <CustomInput 
                label="Status"
                type="text"
                name="status"
                register={register}
                error={errors.status}
            />

            <CustomInput 
                label="Description"
                type="text"
                name="describe"
                register={register}
                error={errors.describ}
            />

            <div>
                <button 
                    type='submit' 
                    className='btn btn-outline-primary'
                >
                    {isEditing ? "Lưu thay đổi" : "Thêm task mới"}
                </button>

                {isEditing && (
                    <button type='button' onClick={onCancel}>
                        Hủy
                    </button>
                )}
            </div>
        </form>
    )
}