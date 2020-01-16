import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import x from './icons/x.svg';
import HelperText from './components/HelperText';
import MonthsPicker from './components/MonthsPicker';
import moment, { Moment } from 'moment';

const App: React.FC = () => {
    const [month, setMonth] = useState<Moment | null>(null);
    const [days, setDays] = useState<Moment[]>([]);
    const weekdays = useMemo(() => moment.weekdaysShort(), []);

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

    return (
        <Container>
            <DatePicker>
                <CloseButton src={x} />
                <Header>תאריך יציאה</Header>
                <MonthsPicker onMonthChange={setMonth} />
                <WeekdaysContainer>
                    {weekdays.map((day, index) => (
                        <Weekday key={index}>{day}</Weekday>
                    ))}
                </WeekdaysContainer>
                <DaysContainer>
                    {days.map((day, index) => (
                        <Day key={index}>{day.format('D')}</Day>
                    ))}
                </DaysContainer>
                <HelperText color="#d7eaea" text="תאריכי יציאה וחזרה אפשריים" />
                <HelperText
                    color="#ffe8f1"
                    text="אפשרית טיסת צ׳רטר בתאריכים אלו"
                />
            </DatePicker>
        </Container>
    );
};

export default App;

const Container = styled.div`
    background-color: #fafafa;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DatePicker = styled.div`
    position: absolute;
    background-color: #fff;
    height: 350px;
    width: 260px;
    box-shadow: 0 2.8px 20.2px rgba(0, 0, 0, 0.14),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
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

const WeekdaysContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
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
    margin: 20px 0;
`;

const Day = styled.span`
    height: 30px;
    width: 30px;
    display: flex;
    background-color: #d7eaea;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #539cad;
    font-size: 12px;
    font-family: 'Comic Sans MS';
`;
