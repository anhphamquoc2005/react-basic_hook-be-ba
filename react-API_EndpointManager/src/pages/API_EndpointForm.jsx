import CustomInput from '../components/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup'

const schema = yup.object({
    endpoint: yup
        .string()
        .trim()
        .required(),
    method: yup
        .string()
        .trim()
        .required(),
    status: yup
        .string()
        .trim()
        .required(),
    responseTime: yup
        .number()
        .typeError()
        .positive()
        .required(),
    description: yup
        .string()
        .trim()
        .required()
});

export default function API_EndpointForm({ apiendpoints, setApiendpoints }) {
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
        const existingAPI = apiendpoints.find(a => a.id.toString() === id);
        if (existingAPI) {
            reset(existingAPI);
        }
    }, [id, reset, apiendpoints]);

    const onSubmit = (data) => {
        if (id) {
            const update = apiendpoints.map(a => a.id.toString() === id ? { ...a, ...data} : a);
            setApiendpoints(update);
            alert("Cập nhật thành công!!!");
        } else {
            const newAPI = {
                id: Date.now(),
                ...data
            };
            setApiendpoints([newAPI, ...apiendpoints]);
            alert("Thêm API mới thành công!!!");
        }
        navigate("/");
    };

    return (
        <div className='card shadow p-3 mb-5 bg-body-tertiary rounded'>
            <div className='card-body'>
                <h4 className='card-title'>{id ? "Cập nhật API" : "Thêm API mới"}</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CustomInput 
                        label="End Point"
                        type="text"
                        name="endpoint"
                        register={register}
                        error={errors.endpoint}    
                    />

                    <div className='row'>
                        <div className='col'>
                            <CustomInput 
                                label="Method"
                                type="text"
                                name="method"
                                register={register}
                                error={errors.method}    
                            />
                        </div>
                        <div className='col'>
                            <CustomInput 
                                label="Status"
                                type="text"
                                name="status"
                                register={register}
                                error={errors.status}    
                            />
                        </div>

                        <div className='col'>
                            <CustomInput 
                                label="Response Time"
                                type="number"
                                name="responseTime"
                                register={register}
                                error={errors.responseTime}    
                            />
                        </div>
                    </div>


                    <CustomInput 
                        label="Description"
                        type="text"
                        name="description"
                        register={register}
                        error={errors.description}    
                    />

                    <button type="submit" className='btn btn-primary'>{id ? "Cập nhật" : "Thêm mới"}</button>
                </form>
            </div>
        </div>
    )
}