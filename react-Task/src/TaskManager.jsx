import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import TaskForm from './components/TaskForm';
import CustomModal from './components/CustomModal';

const schema = yup.object({
    nameTask: yup
        .string()
        .trim()
        .required("Tên task không được bỏ trống."),
    status: yup
        .string()
        .trim()
        .required("Trạng thái task không được bỏ trống."),
    describe: yup
        .string()
        .trim(),
});

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [latestTask, setLatestTask] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handleEditClick = (task) => {
        setEditingId(task.id);
        reset({
            nameTask: task.nameTask,
            status: task.status,
            describe: task.describe
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        reset({ nameTask: "", status: "", describe: "" });
    };

    const onSubmit = async(data) => {
        if (editingId !== null) {
            const updatedTasks = tasks.map(task =>
                task.id === editingId ? {...task, ...data} : task
            );
            setTasks(updatedTasks);
            setEditingId(null);
            reset({ nameTask: "", status: "", describe: "" });
        } else {
            try {
                await axios.post("https://jsonplaceholder.typicode.com/posts", data);

                const newTask = {
                    id: Date.now(),
                    ...data
                };

                setTasks([newTask, ...tasks]);
                setShowModal(true);
                setLatestTask(newTask);
                reset();
            } catch (error) {
                alert("Kết nối thất bại. Vui lòng kiểm tra lại!");
            }
        }
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div>
            <div>
                <h5>Sổ tay công việc</h5>

                <div>
                    <TaskForm 
                        onSubmit={handleSubmit(onSubmit)}
                        register={register}
                        errors={errors}
                        isEditing={editingId !== null}
                        onCancel={handleCancelEdit}
                    />
                </div>
            </div>

            <div>
                <h5>Danh sách công việc</h5>

                <div>
                    {tasks.length === 0 ? (
                        <p>Chưa có công việc nào ở đây</p>
                    ) : (
                        tasks.map(task => (
                            <div key={task.id}>
                                <h4>{task.nameTask}</h4>
                                <p>Trạng thái: {task.status}</p>
                                <p>Mô tả công việc: {task.describe ? task.describe : "Không có mô tả"}</p>
                                <button onClick={() => removeTask(task.id)}>Xóa</button>
                                <button onClick={() => handleEditClick(task)}>Sửa</button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <CustomModal isOpen={showModal} title="Thêm task thành công!" onClose={() => setShowModal(false)}>
                {latestTask && (
                    <div>
                        <h4>{latestTask.nameTask} vừa được thêm.</h4>
                        <p>Trạng thái {latestTask.status}</p>
                        <p>Mô tả task: {latestTask.describe}</p>
                    </div>
                )}
            </CustomModal>
        </div>
    )
}