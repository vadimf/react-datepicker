import React from 'react';
import styled from 'styled-components';
import x from './icons/x.svg'
import left from './icons/chevron-left.svg'
import right from './icons/chevron-right.svg'

const App: React.FC = () => {
    return (
        <Container>
            <DatePicker>
                <CloseButton src={x} />
                <Header>תאריך יציאה</Header>
                <MonthsContainer>
                    <ArrowIcon src={left} />
                    <ArrowIcon src={right} />
                </MonthsContainer>
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
  height: 400px;
  width: 300px;
  box-shadow:
  0 2.8px 20.2px rgba(0, 0, 0, 0.14),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072);
  border-radius: 5px;
  justify-content: center;
  display: flex;
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
`;

const MonthsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ArrowIcon = styled.img`
  border: 1px solid black;
  height: 30px;
  width: 30px;
`;
