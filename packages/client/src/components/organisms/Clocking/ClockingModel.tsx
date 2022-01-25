import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getCurrentTaskService } from '../../../services/work/getCurrentTaskService';
import { SuccessButton } from '../../atoms/Button/SuccessButton';
import { DangerButton } from '../../atoms/Button/DangerButton';
import { WarningButton } from '../../atoms/Button/WarningButton';
import { ClockingInput } from '../../atoms/Input/ClockingInput';
import { ITask } from '../../../types/index';
import { InfoButton } from '../../atoms/Button/InfoButton';
import { startTaskService } from '../../../services/work/startTaskService';

export const ClockingModel = () => {
    const [placeholder, setPlaceholder] = useState(
        'Provide short task description',
    );
    const dispatch = useDispatch();

    const currentTask: ITask[] = useSelector(
        (state: RootState) => state.currentTask,
    );

    useEffect(() => {
        getCurrentTaskService().then(task => {
            if (task) {
                setPlaceholder(task.description);
            }
        });
    }, []);

    const decideWhatButtonToShow = () => {
        if (currentTask.length > 0)
            switch (currentTask[currentTask.length - 1].type) {
                case 'start':
                    return (
                        <>
                            <WarningButton value='pause' />
                            <DangerButton value='end' />
                        </>
                    );
                case 'pause':
                    return (
                        <>
                            <InfoButton value='resume' />
                            <DangerButton value='end' />
                        </>
                    );
                case 'resume':
                    return (
                        <>
                            <WarningButton value='pause' />
                            <DangerButton value='end' />
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
                dispatch({ type: 'SET_CURRENT_TASK', payload: task });
            }
        });
    };

    return (
        <div
            className='d-flex flex-row justify-content-center align-items-start'
            style={{ height: '90vh', paddingTop: '5vh' }}>
            <div className='w-50 me-1'>
                <ClockingInput
                    isDisabled={false}
                    inputType={'text'}
                    name={'description'}
                    placeholder={placeholder}
                    setPlaceholder={setPlaceholder}
                />
            </div>
            <div>
                {/* <SuccessButton value='start' /> */}
                {decideWhatButtonToShow()}
            </div>
        </div>
    );
};
