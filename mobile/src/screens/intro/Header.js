import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-native";
import styled from "styled-components";
import colors from "../../lib/colors";
const Wrapper = styled.View`
  display: flex;
  position: absolute;
  top: 40;
  left: 0;
  width: 100%;
  height: 40px;
  padding: 10px;
  z-index: 9;
`;

const IconWrapper = styled.View`
  width: 40px;
  height: 60px;
`;
const Header = ({ to }) => {
  return (
    <Wrapper>
      <Link to={to}>
        <IconWrapper>
          <FontAwesome name="angle-left" size={40} color={colors.green} />
        </IconWrapper>
      </Link>
    </Wrapper>
  );
};

Header.propTypes = {
  to: PropTypes.string.isRequired
};

export default Header;
