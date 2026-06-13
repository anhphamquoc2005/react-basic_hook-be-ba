import CustomInput from '../components/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup'

const schema = yup.object({
    itemName: yup
        .string()
        .trim()
        .required(""),
    theme: yup
        .string()
        .trim()
        .required(""),
    colorPalette: yup
        .string()
        .trim()
        .required(""),
    caption: yup
        .string()
        .trim()
        .required(""),
    price: yup
        .number()
        .typeError("")
        .positive("")
        .required(""),
});

export default function MarketingForm({ jewelrys, setJewelrys }) {
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
            const existingJewelrys = jewelrys.find(j => j.id.toString() === id);
            if (existingJewelrys) {
                reset(existingJewelrys);
            }
        }
    }, [id, jewelrys, reset]);

    const onSubmit = (data) => {
        if (id) {
            const updateJewelry = jewelrys.map(j => j.id.toString() === id ? { ...j, ...data} : j);
            setJewelrys(updateJewelry);
            alert("Cập nhật thành công!");
        } else {
            const newJewelry = {
                id: Date.now(),
                ...data
            }
            setJewelrys([newJewelry, ...jewelrys]);
            alert("Thêm mới thành công!");
        };
        navigate("/");
    };

    return (
        <div className='container-fluid mt-5'>
            <div className='card shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
                <h5 className='card-header'>{id ? "Cập nhật bài viết" : "Thêm mới bài viết"}</h5>
                <div className='card-body'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput 
                            label="Tên trang sức"
                            type="text"
                            name="itemName"
                            register={register}
                            error={errors.itemName}
                        />

                        <div className='row'>
                            <div className='col'>
                                <CustomInput 
                                    label="Chủ đề"
                                    type="text"
                                    name="theme"
                                    register={register}
                                    error={errors.theme}
                                />
                            </div>

                            <div className='col'>
                                <CustomInput 
                                    label="Màu sắc"
                                    type="text"
                                    name="colorPalette"
                                    register={register}
                                    error={errors.colorPalette}
                                />
                            </div>

                            <div className='col'>
                                <CustomInput 
                                    label="Giá"
                                    type="number"
                                    name="price"
                                    register={register}
                                    error={errors.price}
                                />
                            </div>
                        </div>

                        <CustomInput 
                            label="Nội dung"
                            type="text"
                            name="caption"
                            register={register}
                            error={errors.caption}
                        />
                        <button className='btn btn-primary'>{id ? "Cập nhật" : "Thêm mới"}</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}