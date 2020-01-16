import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import left from '../icons/chevron-left.svg';
import right from '../icons/chevron-right.svg';

const upcomingMonthsLength = 12;

interface MonthsPickerProps {
    onMonthChange: (month: Moment) => void;
}

const MonthsPicker: React.FC<MonthsPickerProps> = ({ onMonthChange }) => {
    const [selectedOption, setSelectedOption] = useState(0);

    const upcomingMonths = useMemo(() => {
        let months = [];

        for (let i = 0; i < upcomingMonthsLength; i++) {
            months.push(
                moment()
                    .add(i, 'months')
                    .startOf('month')
            );
        }

        return months;
    }, []);

    useEffect(() => {
        onMonthChange(upcomingMonths[selectedOption]);
    }, [selectedOption, upcomingMonths, onMonthChange]);

    return (
        <MonthsContainer>
            <ArrowIcon
                src={left}
                disabled={selectedOption === upcomingMonthsLength}
                onClick={() =>
                    selectedOption < upcomingMonthsLength &&
                    setSelectedOption(selectedOption + 1)
                }
            />
            <Select
                value={selectedOption}
                onChange={event =>
                    setSelectedOption(Number(event.target.value))
                }
            >
                {upcomingMonths.map((month, index) => (
                    <Option key={index} value={index}>
                        {month.format('MMMM YYYY')}
                    </Option>
                ))}
            </Select>
            <ArrowIcon
                src={right}
                disabled={selectedOption === 0}
                onClick={() =>
                    selectedOption > 0 && setSelectedOption(selectedOption - 1)
                }
            />
        </MonthsContainer>
    );
};

const Select = styled.select`
    direction: rtl;
    appearance: none;
    width: 150px;
    height: 30px;
    border: none;
    background-color: #fff;
    border-bottom: 1px solid #f7f7f7;
    margin: 0 10px;
    padding: 0 10px;
    font-weight: 700;
    color: #787c80;
    font-size: 12px;
`;

const Option = styled.option`
    direction: rtl;
`;

interface ArrowIconProps {
    disabled?: boolean;
}

const ArrowIcon = styled.img<ArrowIconProps>`
    border: 1px solid #e8e8e8;
    height: 30px;
    width: 30px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    ${props =>
        props.disabled &&
        `
    opacity: 0.4;
    cursor: default;
    
    &:hover {
    opacity: 0.4;
    }
  `}
`;

const MonthsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`;

export default MonthsPicker;
