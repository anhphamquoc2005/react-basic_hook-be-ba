import CustomInput from '../components/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup'

const schema = yup.object({
    teamName: yup
        .string()
        .trim()
        .required(),
    captain: yup
        .string()
        .trim()
        .required(),
    memberCount: yup
        .number()
        .typeError()
        .positive()
        .required(),
    pcNumber: yup
        .number()
        .typeError()
        .positive()
        .required(),
    status: yup
        .string()
        .trim()
        .required()
});

export default function TeamForm({ tournaments, setTournaments }) {
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
            const existingTeam = tournaments.find(t => t.id.toString() === id);
            if (existingTeam) {
                reset(existingTeam);
            }
        }
    }, [id, reset, tournaments]);

    const onSubmit = (data) => {
        if (id) {
            const updatedTeam = tournaments.map(t => t.id.toString() === id ? {...t, ...data} : t);
            setTournaments(updatedTeam);
            alert("Cập nhật thông tin thành công!");
        } else {
            const maxId = tournaments.length > 0 ? Math.max(...tournaments.map(t => t.id)) : 0;

            const newTeam = {
                id: maxId + 1,
                ...data
            }
            setTournaments([...tournaments, newTeam]);
            alert("Đăng ký đội thành công!");
        }
        navigate("/");
    }

    return (
        <div className='container-fluid'>
            <div className='card shadow-lg p-3 mb-5 bg-body-tertiary rounded mt-2'>
                <h3 className='card-header'>{id ? "Cập nhật thông tin" : "Đăng ký đội"}</h3>
                <div className='card-body'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput 
                            label="Tên đội"
                            type="text"
                            name="teamName"
                            register={register}
                            error={errors.teamName}
                        />

                        <CustomInput 
                            label="Đội trưởng"
                            type="text"
                            name="captain"
                            register={register}
                            error={errors.captain}
                        />

                        <div className='row'>
                            <div className='col'>
                                <CustomInput 
                                    label="Số lượng thành viên"
                                    type="number"
                                    name="memberCount"
                                    register={register}
                                    error={errors.memberCount}
                                />
                            </div>

                            <div className='col'>
                                <CustomInput 
                                    label="Số máy"
                                    type="number"
                                    name="pcNumber"
                                    register={register}
                                    error={errors.pcNumber}
                                />
                            </div>
                        </div>

                        <CustomInput 
                            label="Trạng thái"
                            type="text"
                            name="status"
                            register={register}
                            error={errors.status}
                        />

                        <button className='btn btn-primary' type='submit'>{id ? "Cập nhật thông tin" : "Đăng ký ngay!"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}