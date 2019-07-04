import React from "react";
import styled from "styled-components";

const circleWidth = 8;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 50px;
  width: ${props => props.theme.deviceWidth * 0.3};
`;

const Dot = styled.View`
  display: flex;
  height: ${circleWidth}px;
  width: ${circleWidth}px;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: ${circleWidth / 2}px;
  background-color: ${props =>
    props.active ? props.theme.colors.grey : props.theme.colors.white};
`;
const Dots = ({ id }) => {
  const repeat = [1, 2, 3];
  return (
    <Wrapper>
      {repeat.map(r => {
        let active = false;
        if (id == r) active = true;
        return <Dot key={r} active={active} />;
      })}
    </Wrapper>
  );
};

export default Dots;
