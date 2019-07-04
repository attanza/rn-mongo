import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-native";
import styled from "styled-components";
import { Letter } from "../lib/styles";
const BottomButton = ({ background, color, to, title }) => {
  return (
    <Wrapper>
      <Link to={to}>
        <Button background={background}>
          <Letter color={color || "white"} weight={500} size={14}>
            {title}
          </Letter>
        </Button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${props => props.theme.deviceWidth};
  height: 70px;
  padding: 0 15px;
  padding-bottom: 30px;
`;

const Button = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: ${props => (props.background ? props.background : "white")};
  border-radius: 12px;
`;

BottomButton.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default BottomButton;
