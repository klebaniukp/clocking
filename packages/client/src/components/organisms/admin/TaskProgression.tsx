import React, { useEffect, useState } from 'react';
import { taskProgressionService } from '../../../services/admin/taskProgressionService';

interface ITask {
    taskId: string;
    maker: string;
    description: string;
    taskProgression: ITaskProgression[];
}

interface ITaskProgression {
    date: string;
    time: string;
    type: string;
    makerId: string;
}

export const TaskProgression = () => {
    const [taskProgression, setTaskProgression] = useState([]);

    useEffect(() => {
        taskProgressionService().then(data => {
            setTaskProgression(data);
            console.log(taskProgression);
        });
    }, []);

    const generateTimeStamps = () => {
        return taskProgression.map((task: ITask) => {
            return (
                <div key={task.taskId}>
                    <h3>{task.maker}</h3>
                    <h5>{task.description}</h5>
                    <h6>{task.taskId}</h6>

                    <div>
                        <div className='w-25 '>
                            {task.taskProgression.map(
                                (taskProgression: ITaskProgression) => {
                                    const key =
                                        taskProgression.time +
                                        taskProgression.makerId;
                                    return (
                                        <div
                                            className='container bg-light m-2'
                                            key={key}>
                                            <div className='row border border-2 border-bottom-0'>
                                                <div className='col'>Date</div>
                                                <div className='col'>
                                                    {taskProgression.date}
                                                </div>
                                            </div>
                                            <div className='row border border-2'>
                                                <div className='col'>Time</div>
                                                <div className='col'>
                                                    {taskProgression.time}
                                                </div>
                                            </div>
                                            <div className='row border border-2 border-top-0'>
                                                <div className='col'>Type</div>
                                                <div className='col'>
                                                    {taskProgression.type}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return <div className='container m-2 '>{generateTimeStamps()}</div>;
};
