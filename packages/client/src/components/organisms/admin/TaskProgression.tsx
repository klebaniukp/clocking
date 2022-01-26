import React, { useEffect, useRef, useState } from 'react';
import { taskProgressionService } from '../../../services/admin/taskProgressionService';

export const TaskProgression = () => {
    // let taskProgression: any = useRef([]);
    const [taskProgression, setTaskProgression] = useState([]);

    useEffect(() => {
        taskProgressionService().then(data => {
            // if (data) {
            setTaskProgression(data);
            console.log(taskProgression);
            // }
        });
    }, []);

    return (
        <div>
            <div>{JSON.stringify(taskProgression[0])}</div>
        </div>
    );
};
