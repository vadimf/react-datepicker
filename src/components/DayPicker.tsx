import React, { useMemo } from 'react';
import moment, { Moment } from 'moment';
import styled from 'styled-components';

interface DayPickerProps {
    days: Moment[];
    selectedDay: Moment | null;
    onDaySelected: (day: Moment) => void;
}

const DayPicker: React.FC<DayPickerProps> = ({
    days,
    selectedDay,
    onDaySelected
}) => {
    const weekdays = useMemo(() => moment.weekdaysShort(), []);

    return (
        <>
            <WeekdaysContainer>
                {weekdays.map((day, index) => (
                    <Weekday key={index}>{day}</Weekday>
                ))}
            </WeekdaysContainer>
            <DaysContainer>
                {days.map((day, index) => {
                    const selected = !!selectedDay && day.isSame(selectedDay);
                    const disabled = day.isBefore(moment());

                    return (
                        <Day
                            key={index}
                            isSelected={selected}
                            isDisabled={disabled}
                            firstOffset={index === 0 ? day.weekday() : null}
                            onClick={() => !disabled && onDaySelected(day)}
                        >
                            {day.format('D')}
                        </Day>
                    );
                })}
            </DaysContainer>
        </>
    );
};

export default DayPicker;

const WeekdaysContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    width: 100%;
`;

const Weekday = styled.span`
    font-weight: 700;
    font-size: 12px;
    color: #787c80;
`;

const DaysContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    width: 100%;
    margin: 20px 20px 20px 0;
`;

interface DayProps {
    isSelected: boolean;
    isDisabled: boolean;
    firstOffset: number | null;
}

const Day = styled.span<DayProps>`
    height: 30px;
    width: 30px;
    display: flex;
    background-color: #d7eaea;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    color: #539cad;
    font-size: 12px;
    font-family: 'Comic Sans MS';
    margin: 2px;

    &:hover {
        cursor: pointer;
        background-color: #25867d;
        color: #fff;
        transition: all 200ms;
    }

    ${props =>
        props.isSelected &&
        `
            background-color: #25867d;
            color: #fff;
        `};
    ${props =>
        props.isDisabled &&
        `
            background-color: #fff;
            color: #d4d4d5;
            
            &:hover {
            cursor: default;
            background-color: #fff;
            color: #d4d4d5;
            }
        `};
    ${props =>
        props.firstOffset &&
        `
            margin-right: ${props.firstOffset * 34 + 2}px;
        `};
`;
