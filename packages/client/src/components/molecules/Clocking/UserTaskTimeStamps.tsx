import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ITask } from '../../../types';

export const UserTaskTimeStamps = () => {
    const currentTask: ITask[] = useSelector(
        (state: RootState) => state.currentTask,
    );

    return (
        <div className='d-flex justify-content-center '>
            <div className='d-flex flex-column w-25'>
                {currentTask.map(task => {
                    return (
                        <div className='container bg-light m-2'>
                            <div className='row border border-2 border-bottom-0'>
                                <div className='col'>Date</div>
                                <div className='col'>{task.date}</div>
                            </div>

                            <div className='row border border-2'>
                                <div className='col'>Time</div>
                                <div className='col'>{task.time}</div>
                            </div>

                            <div className='row border border-2 border-top-0'>
                                <div className='col'>Type</div>
                                <div className='col'>{task.type}</div>
                            </div>
                        </div>
                    );
                })}

                {/* <div className='container bg-light'>
                    <div className='row border border-2 border-bottom-0'>
                        <div className='col'>Date</div>
                        <div className='col'>{currentTask[0].date}</div>
                    </div>

                    <div className='row border border-2'>
                        <div className='col'>Time</div>
                        <div className='col'>{currentTask[0].time}</div>
                    </div>

                    <div className='row border border-2 border-top-0'>
                        <div className='col'>Type</div>
                        <div className='col'>{currentTask[0].type}</div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};
