import CustomInput from '../components/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup'

const schema = yup.object({
    serverName: yup
        .string()
        .trim()
        .required(),
    ipAddress: yup
        .string()
        .trim()
        .required(),
    os: yup
        .string()
        .trim()
        .required(),
    ram: yup
        .number()
        .typeError()
        .positive()
        .required(),
    cpuCores: yup
        .number()
        .typeError()
        .positive()
        .required(),
    status: yup
        .string()
        .trim()
        .required()
});

export default function ServerForm({ servers, setServers }) {
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
            const existingServer = servers.find(s => s.id.toString() === id);
            if (existingServer) {
                reset(existingServer);
            }
        }
    }, [id, reset, servers]);

    const onSubmit = (data) => {
        if (id) {
            const updatedServer = servers.map(s => s.id.toString() === id ? [...s, ...data] : s);
            setServers(updatedServer);
            alert("Updated success!");
        } else {
            const newServer = {
                id: Date.now(),
                ...data
            }
            setServers(newServer);
            alert("Add new success!");
        }
        navigate("/");
    }

    return (
        <div className='container-fluid'>
            <div className='card shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
                <h4 className='card-header'>{id ? "Update Server" : "Add new Server"}</h4>
                <div className='card-body'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput 
                            label="Server name"
                            type="text"
                            name="serverName"
                            register={register}
                            error={errors.serverName}
                        />

                        <CustomInput 
                            label="IP Address"
                            type="text"
                            name="ipAddress"
                            register={register}
                            error={errors.ipAddress}
                        />

                        <div className='row'>
                            <div className='col'>
                                <CustomInput 
                                    label="OS"
                                    type="text"
                                    name="os"
                                    register={register}
                                    error={errors.os}
                                />
                            </div>

                            <div className='col'>
                                <CustomInput 
                                    label="RAM"
                                    type="number"
                                    name="ram"
                                    register={register}
                                    error={errors.ram}
                                />
                            </div>

                            <div className='col'>
                                <CustomInput 
                                    label="CPU"
                                    type="number"
                                    name="cpuCores"
                                    register={register}
                                    error={errors.cpuCores}
                                />
                            </div>
                        </div>

                        <CustomInput 
                            label="Status"
                            type="text"
                            name="status"
                            register={register}
                            error={errors.status}
                        />

                        <button type='submit' className='btn btn-primary'>{id ? "Update" : "Add new"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}