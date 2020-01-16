import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import left from '../icons/chevron-left.svg';
import right from '../icons/chevron-right.svg';

interface MonthsPickerProps {
    onMonthChange: (month: Moment) => void;
    upcomingMonthsLength: number;
}

const MonthsPicker: React.FC<MonthsPickerProps> = ({
    onMonthChange,
    upcomingMonthsLength
}) => {
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
    margin: 0 15px;
    padding: 0 5px;
    font-weight: 700;
    color: #787c80;
    font-size: 13px;

    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23777777%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat, repeat;
    background-size: 0.65em auto, 100%;
    background-position: left 0.7em top 50%, 0 0;

    line-height: 1.3;
    &:focus {
        box-shadow: none;
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        outline: none;
    }
`;

const Option = styled.option`
    direction: rtl;
    font-weight: normal;
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
        transition: all 300ms;
        opacity: 0.8;
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
