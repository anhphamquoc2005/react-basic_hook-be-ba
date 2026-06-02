import CustomModal from "./components/CustomModal";
import BankingForm from "./components/BankingForm";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import {useForm} from "react-hook-form";
import * as yup from 'yup';

const schema = yup.object({
    nameBank: yup
        .string()
        .trim()
        .required("Bạn chọn ngân hàng nào?"),
    amount: yup
        .number()
        .typeError("Chỉ được nhập số!")
        .positive("Số tiền không được là số âm.")
        .min(2000, "Bạn được chuyển ít nhất 2000vnđ")
        .required("Số tiền bạn muốn chuyển là bao nhiêu?"),
    note: yup
        .string()
        .trim(),
});

export default function BankingManager() {
    const [banks, setBanks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [latestTransfer, setLatestTransfer] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleEditClick = (bank) => {
        setEditingId(bank.id);
        reset({
            nameBank: bank.nameBank,
            amount: bank.amount,
            note: bank.note
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        reset({ nameBank: "", amount: "", note: "" });
    };

    const onSubmit = async(data) => {
        if (editingId !== null) {
            const updatedBank = banks.map(bank => 
                bank.id === editingId ? {...bank, ...data} : bank
            );

            setBanks(updatedBank);
            setEditingId(null);
            reset({ nameBank: "", amount: "", note: "" });
        } else {
            try {
                await axios.post("https://jsonplaceholder.typicode.com/posts", data);

                const newBank = {
                    id: Date.now(),
                    ...data
                }

                setBanks([newBank, ...banks]);
                setShowModal(true);
                setLatestTransfer(newBank);
                reset();
            } catch (error) {
                alert("Giao dịch không thành công! Vui lòng kiểm tra lại kết nối.");
            }
        };
    };

    const removeBank = (id) => {
        setBanks(banks.filter(bank => bank.id !== id));
    };

    return (
        <div>
            <div>
                <h5>Giao dịch</h5>
                <div>
                    <BankingForm 
                        onSubmit={handleSubmit(onSubmit)}
                        isEditing={editingId !== null}
                        onCancel={handleCancel}
                        register={register}
                        errors={errors}
                    />
                </div>
            </div>

            <div>
                <h5>Lịch sử giao dịch</h5>
                <div>
                    {banks.length === 0 ? (
                        <p>Chưa có giao dịch nào ở đây</p>
                    ) : (
                        banks.map(bank => (
                            <div key={bank.id}>
                                <h4>Ngân hàng {bank.nameBank}</h4>
                                <p> -{bank.amount}VNĐ</p>
                                <p>{bank.note ? bank.note : "User chuyển khoản từ ngân hàng "}</p>
                                <button className="btn btn-danger" onClick={() => removeBank(bank.id)}>Xóa</button>
                                <button className="btn btn-secondary" onClick={() => handleEditClick(bank)}>Sửa</button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <CustomModal isOpen={showModal} title="Giao dịch thành công!" onClose={() => setShowModal(false)}>
                {latestTransfer && (
                    <div>
                        <h4>Ngân hàng {latestTransfer.nameBank}</h4>
                        <p> -{latestTransfer.amount}VNĐ</p>
                        <p>{latestTransfer.note ? latestTransfer.note : "User chuyển khoản từ ngân hàng "} {latestTransfer.nameBank}</p>
                    </div>
                )}
            </CustomModal>
        </div>
    )
}