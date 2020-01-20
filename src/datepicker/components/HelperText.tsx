import React from 'react';
import styled from 'styled-components';

interface HelperProps {
    color: string;
    text: string;
}

const HelperText: React.FC<HelperProps> = ({ color, text }) => {
    return (
        <Container>
            <ColorDot color={color} />
            <Text>{text}</Text>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    align-items: center;
    padding: 2px 0;
`;

const ColorDot = styled.div<{ color: string }>`
    height: 16px;
    width: 16px;
    border-radius: 8px;
    background-color: ${props => props.color};
    margin-left: 10px;
`;

const Text = styled.span`
    font-size: 12px;
    font-weight: 700;
    color: #787c80;
`;

export default HelperText;
