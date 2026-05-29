import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import HardwareForm from './components/HardwareForm';
import CustomModal from './components/CustomModal';

const schema = yup.object({
    itemName: yup
        .string()
        .trim()
        .required("Vui lòng điền tên phần mềm."),
    ramSaved: yup
        .number()
        .typeError("Chỉ được điền số.")
        .positive("Mức Ram phải lớn hơn 0.")
        .required("Vui lòng điền mức Ram đã tiết kiệm."),
    method: yup
        .string()
        .trim()
        .required("Vui lòng điền phương pháp."),
});

export default function HardwareTracker() {
    const [optimizations, setOptimizations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [latestEntry, setLatestEntry] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async(data) => {
        try {
            await axios.post("https://jsonplaceholder.typicode.com/posts", data);

            const newEntry = {
                id: Date.now(),
                ...data
            };

            setOptimizations([newEntry, ...optimizations]);
            setShowModal(true);
            setLatestEntry(newEntry);
            reset();
        } catch (error) {
            alert("Kết nối không thành công vui lòng thử lại!!");
        }
    }

    const removeEntry = (id) => {
        setOptimizations(optimizations.filter(item => item.id !== id));
    }

    return (
        <div>
            <div>
                <div>
                    <h5>TỐI ƯU HIỆU NĂNG</h5>

                    <HardwareForm 
                        onSubmit={handleSubmit(onSubmit)}
                        register={register}
                        errors={errors}
                    />

                    <h4>Lịch sử tối ưu</h4>
                    {optimizations.length === 0 ? (
                        <p>Chưa tối ưu lần nào.</p>
                    ) : (
                        optimizations.map(item => (
                            <div key={item}>
                                <h4>{item.itemName}</h4>
                                <p><strong>Tiết kiệm:</strong> {item.ramSaved} MB RAM</p>
                                <p><strong>Cách làm:</strong> {item.method} </p>
                                <button onClick={() => removeEntry(item.id)}>Xóa</button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <CustomModal isOpen={showModal} title="Đã lưu tinh chỉnh." onClose={() => setShowModal(false)}>
                {latestEntry && (
                    <div>
                        <p><strong>Mục: </strong> {latestEntry.itemName} </p>
                        <p><strong>Hiệu quả: </strong> Giảm {latestEntry.ramSaved} MB RAM</p>
                        <p>Hệ thống đã ghi nhận thành công.</p>
                    </div>
                )}
            </CustomModal>
        </div>
    );
}