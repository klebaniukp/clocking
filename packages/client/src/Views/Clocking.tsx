import React from 'react';
import { ClockingModel } from '../components/organisms/Clocking/ClockingModel';
import { UserTaskTimeStamps } from '../components/molecules/Clocking/UserTaskTimeStamps';

export const Clocking = () => {
    return (
        <div>
            <ClockingModel />
            <UserTaskTimeStamps />
        </div>
    );
};
