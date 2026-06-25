import CustomInput from '../components/CustomInput';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup'
const schema = yup.object({
    transactionName: yup
        .string()
        .trim()
        .required(),
    type: yup
        .string()
        .trim()
        .required(),
    category: yup
        .string()
        .trim()
        .required(),
    amount: yup
        .number()
        .typeError()
        .positive()
        .required(),
    date: yup
        .string()
        .trim()
        .required(),
});

export default function FinanceForm({ finances, setFinances }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (id) {
            const existingFinances = finances.find(f => f.id.toString() === id);
            if (existingFinances) {
                reset(existingFinances);
            }
        }
    }, [id, reset, finances]);

    const onSubmit = (data) => {
        if (id) {
            const updatedFinance = finances.map(f => f.id.toString() === id ? {...f, ...data} : f);
            setFinances(updatedFinance);
            alert("Cập nhật thành công!");
        } else {
            const maxId = finances.length > 0 ? Math.max(...finances.map(f => f.id)) : 0;
            const newFinance = {
                id: maxId + 1,
                ...data
            }
            setFinances([...finances, newFinance]);
            alert("Thêm mới thành công!");
        }

        navigate("/")
    };

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header">
                    <h3>{id ? "Cập nhật" : "Thêm mới"}</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput 
                            label="Tên giao dịch"
                            type="text"
                            name="transactionName"
                            register={register}
                            error={errors.transactionName}
                        />

                        <div className='row'>
                            <div className='col'>
                                <CustomInput 
                                    label="Kiểu chi tiêu"
                                    type="text"
                                    name="type"
                                    register={register}
                                    error={errors.type}
                                />
                            </div>

                            <div className='col'>
                                <CustomInput 
                                    label="Loại chi tiêu"
                                    type="text"
                                    name="category"
                                    register={register}
                                    error={errors.category}
                                />
                            </div>

                            <div className='col'>
                                <CustomInput 
                                    label="Số tiền"
                                    type="number"
                                    name="amount"
                                    register={register}
                                    error={errors.amount}
                                />
                            </div>
                        </div>

                        <CustomInput 
                            label="Thời gian"
                            type="text"
                            name="date"
                            register={register}
                            error={errors.date}
                        />

                        <button type='submit' className='btn btn-primary'>{id ? "Cập nhật" : "Thêm mới"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}