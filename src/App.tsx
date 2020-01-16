import React from 'react';
import styled from 'styled-components';
import DatePicker from './DatePicker';

const App: React.FC = () => {
    return (
        <Container>
            <DatePicker upcomingMonthsLength={12} />
        </Container>
    );
};

export default App;

const Container = styled.div`
    background-color: #fafafa;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    padding-top: 50px;
`;
