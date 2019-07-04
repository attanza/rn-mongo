import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import helpers from "../../lib/helpers";

const buttonWidth = 50;

const Wrapper = styled.View`
  position: absolute;
  right: 20;
  bottom: 0;
`;

const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${buttonWidth}px;
  height: ${buttonWidth}px;
  border: 1px solid ${props => props.theme.colors.green};
  background-color: ${props => props.theme.colors.green};
  border-radius: ${buttonWidth / 2};
`;

const NextButton = ({ to, history }) => {
  const handlePress = async () => {
    if (to === "/intro/4") {
      return await helpers.setSkipIntro(history, to);
    }
    history.push(to);
  };
  return (
    <Wrapper>
      <Button onPress={handlePress}>
        <FontAwesome name="angle-right" size={32} color="white" />
      </Button>
    </Wrapper>
  );
};

NextButton.propTypes = {
  to: PropTypes.string.isRequired
};

export default NextButton;
