import React, { useEffect, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
import x from './icons/x.svg';
import MonthsPicker from './components/MonthsPicker';
import HelperText from './components/HelperText';
import styled from 'styled-components';
import DayPicker from './components/DayPicker';

interface DatePickerProps {
    upcomingMonthsLength: number;
}

const DatePicker: React.FC<DatePickerProps> = ({ upcomingMonthsLength }) => {
    const [month, setMonth] = useState<Moment | null>(null);
    const [days, setDays] = useState<Moment[]>([]);
    const [selectedDay, setSelectedDay] = useState<Moment | null>(null);

    useEffect(() => {
        if (month) {
            const daysCount = month.daysInMonth();
            let daysInMonth = [];
            for (let i = 0; i < daysCount; i++) {
                daysInMonth.push(moment(month).add(i, 'day'));
            }
            setDays(daysInMonth);
        }
    }, [month]);

    useEffect(() => {
        if (selectedDay) {
            console.log(selectedDay.toDate());
        }
    }, [selectedDay]);

    return (
        <Container>
            <CloseButton src={x} />
            <Header>תאריך יציאה</Header>
            <MonthsPicker onMonthChange={setMonth} upcomingMonthsLength={upcomingMonthsLength} />
            <DayPicker
                days={days}
                onDaySelected={setSelectedDay}
                selectedDay={selectedDay}
            />
            <HelperText color="#d7eaea" text="תאריכי יציאה וחזרה אפשריים" />
            <HelperText color="#ffe8f1" text="אפשרית טיסת צ׳רטר בתאריכים אלו" />
        </Container>
    );
};

export default DatePicker;

const Container = styled.div`
    position: absolute;
    background-color: #fff;
    min-height: 380px;
    width: 260px;
    box-shadow: 0 2.8px 20.2px rgba(0, 0, 0, 0.14),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const CloseButton = styled.img`
    position: absolute;
    top: 10px;
    left: 10px;
    transition: all 200ms;

    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`;

const Header = styled.p`
    font-weight: 700;
    font-size: 16px;
    color: #636365;
`;
