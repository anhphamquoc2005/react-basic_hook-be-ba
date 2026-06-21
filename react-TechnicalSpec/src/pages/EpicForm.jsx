import CustomInput from '../components/CustomInput';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup'

const schema = yup.object({
    gameName: yup
        .string()
        .trim()
        .required(),
    platform: yup
        .string()
        .trim()
        .required(),
    genre: yup
        .string()
        .trim()
        .required(),
    hoursPlayed: yup
        .number()
        .typeError()
        .positive()
        .required(),
    status: yup
        .string()
        .trim()
        .required()
})

export default function EpicForm({ games, setGames }) {
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
            const existingGame = games.find(g => g.id.toString() === id);
            if (existingGame) {
                reset(existingGame);
            }
        }
    }, [id, reset, games]);

    const onSubmit = (data) => {
        if (id) {
            const updatedGame = games.map(g => g.id.toString() === id ? {...g, ...data} : g);
            setGames(updatedGame);
            alert("Cập nhật thông tin game thành công!");
        } else {
            const maxId = games.length > 0 ? Math.max(...games.map(g => g.id)) : 0;

            const newGame = {
                id: maxId + 1,
                ...data
            }
            setGames([...games, newGame])
            alert("Thêm game mới thành công!");
        }
        navigate("/")
    }

    return (
        <div className="container-fluid">
            <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded mt-3">
                <div className="card-header">
                    <h3>{id ? "Cập nhật" : "Thêm mới"}</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput 
                            label="Tên game"
                            type="text"
                            name="gameName"
                            register={register}
                            error={errors.gameName}
                        />

                        <div className='row'>
                            <div className='col'>
                                <CustomInput 
                                    label="Nền tảng"
                                    type="text"
                                    name="platform"
                                    register={register}
                                    error={errors.platform}
                                />
                            </div>

                            <div className='col'>
                                <CustomInput 
                                    label="Thể loại"
                                    type="text"
                                    name="genre"
                                    register={register}
                                    error={errors.genre}
                                />
                            </div>

                            <div className='col'>
                                <CustomInput 
                                    label="Thời gian đã chơi"
                                    type="number"
                                    name="hoursPlayed"
                                    register={register}
                                    error={errors.hoursPlayed}
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

                        <button type='submit' className='btn btn-primary'>{id ? "Cập nhật" : "Thêm mới"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}