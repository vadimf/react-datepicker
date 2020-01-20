import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import left from '../../icons/chevron-left.svg';
import right from '../../icons/chevron-right.svg';
import Select, { ValueType } from 'react-select';

interface MonthsPickerProps {
    onMonthChange: (month: Moment) => void;
    upcomingMonthsLength: number;
}

type OptionType = { label: string; value: number };

const MonthPicker: React.FC<MonthsPickerProps> = ({
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
    }, [upcomingMonthsLength]);
    const options: OptionType[] = useMemo(() => {
        return upcomingMonths.map((month, index) => ({
            value: index,
            label: month.format('MMMM YYYY')
        }));
    }, [upcomingMonths]);

    useEffect(() => {
        onMonthChange(upcomingMonths[selectedOption]);
    }, [selectedOption, upcomingMonths, onMonthChange]);

    return (
        <>
            <MonthsContainer>
                <ArrowIcon
                    src={left}
                    disabled={selectedOption + 1 === upcomingMonthsLength}
                    onClick={() =>
                        selectedOption + 1 < upcomingMonthsLength &&
                        setSelectedOption(selectedOption + 1)
                    }
                />
                <StyledSelect
                    classNamePrefix="react-select"
                    options={options}
                    value={options.find(
                        option => option.value === selectedOption
                    )}
                    onChange={(option: ValueType<OptionType>) => {
                        const { value } = option as OptionType;
                        setSelectedOption(value);
                    }}
                />
                <ArrowIcon
                    src={right}
                    disabled={selectedOption === 0}
                    onClick={() =>
                        selectedOption > 0 &&
                        setSelectedOption(selectedOption - 1)
                    }
                />
            </MonthsContainer>
        </>
    );
};

const StyledSelect = styled(Select)`
    direction: rtl;
    color: #787c80;
    width: 150px;
    height: 30px;
    font-weight: 700;
    font-size: 16px;
    margin: 0 10px;
    padding: 0 5px;

    .react-select__single-value {
        color: #787c80;
    }

    .react-select__control {
        border: none;
        border-bottom: 1px solid #f7f7f7;
        height: 30px;
        min-height: 30px;
        box-shadow: none;

        &:hover {
            border-color: #f7f7f7;
        }

        &:active {
        }
    }

    .react-select__indicator-separator {
        display: none;
    }

    .react-select__option {
        background-color: #fafafa;
        cursor: pointer;

        &:hover {
            color: #25867d;
            background-color: #e9f3f2;
        }
    }

    .react-select__option--is-selected {
        color: #25867d;
        background-color: #e9f3f2;
    }
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

export default MonthPicker;
