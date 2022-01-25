import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getCurrentTaskService } from '../../../services/work/getCurrentTaskService';
import { getTimestampsService } from '../../../services/work/getTimestampsService';
import { SuccessButton } from '../../atoms/Button/SuccessButton';
import { DangerButton } from '../../atoms/Button/DangerButton';
import { WarningButton } from '../../atoms/Button/WarningButton';
import { ClockingInput } from '../../atoms/Input/ClockingInput';
import { ITask } from '../../../types/index';
import { InfoButton } from '../../atoms/Button/InfoButton';
import { startTaskService } from '../../../services/work/startTaskService';
import { pauseTaskService } from '../../../services/work/pauseTaskService';

export const ClockingModel = () => {
    const [placeholder, setPlaceholder] = useState(
        'Provide short task description',
    );
    const [isDisabled, setIsDisabled] = useState(false);

    const dispatch = useDispatch();

    const currentTask: ITask[] = useSelector(
        (state: RootState) => state.currentTask,
    );

    useEffect(() => {
        getCurrentTaskService().then(task => {
            if (task.description) {
                setPlaceholder(task.description);
                setIsDisabled(true);
            }
            if (task.timeStamps.length > 0) {
                console.log('dispatching');
                dispatch({
                    type: 'SET_CURRENT_TASK',
                    payload: task.timeStamps,
                });
            }
        });
    }, []);

    const decideWhatButtonToShow = () => {
        if (currentTask.length > 0)
            switch (currentTask[currentTask.length - 1].type) {
                case 'start':
                    return (
                        <>
                            <div onClick={() => pauseHandler()}>
                                <WarningButton value='pause' />
                            </div>

                            <div className='ps-1'>
                                <DangerButton value='end' />
                            </div>
                        </>
                    );
                case 'pause':
                    return (
                        <>
                            <InfoButton value='resume' />
                            <div className='ps-1'>
                                <DangerButton value='end' />
                            </div>
                        </>
                    );
                case 'resume':
                    return (
                        <>
                            <div onClick={() => pauseHandler()}>
                                <WarningButton value='pause' />
                            </div>
                            <div className='ps-1'>
                                <DangerButton value='end' />
                            </div>
                        </>
                    );
                default:
                    return (
                        <div onClick={() => startHandler()}>
                            <SuccessButton value='start' />
                        </div>
                    );
            }
    };

    const startHandler = () => {
        console.log(placeholder);
        startTaskService({ description: placeholder }).then(task => {
            if (task) {
                getTimestampsService().then(timestamps => {
                    if (timestamps) {
                        dispatch({
                            type: 'SET_CURRENT_TASK',
                            payload: timestamps,
                        });
                    }
                });
            }
        });
    };

    const pauseHandler = () => {
        pauseTaskService().then(task => {
            if (task) {
                getTimestampsService().then(timestamps => {
                    if (timestamps) {
                        dispatch({
                            type: 'SET_CURRENT_TASK',
                            payload: timestamps,
                        });
                    }
                });
            }
        });
    };

    return (
        <div
            className='d-flex flex-row justify-content-center align-items-start'
            style={{ height: '90vh', paddingTop: '5vh' }}>
            <div className='w-50 me-1'>
                <ClockingInput
                    isDisabled={isDisabled}
                    inputType={'text'}
                    name={'description'}
                    placeholder={placeholder}
                    setPlaceholder={setPlaceholder}
                />
            </div>
            <div className='d-flex flex-row'>{decideWhatButtonToShow()}</div>
        </div>
    );
};
