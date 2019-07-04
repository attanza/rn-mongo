import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-native";
import styled from "styled-components";
import colors from "../../lib/colors";

const HomeFooter = ({ path }) => {
  return (
    <Wrapper>
      <Link to="/home">
        <IconButton>
          <AntDesign
            name="home"
            size={28}
            color={path === "/home" ? colors.green : colors.grey}
          />
        </IconButton>
      </Link>
      <Link to="/inbox">
        <IconButton>
          <AntDesign
            name="inbox"
            size={28}
            color={path === "/inbox" ? colors.green : colors.grey}
          />
        </IconButton>
      </Link>
      <Link to="/search">
        <IconButton>
          <Feather
            name="search"
            size={28}
            color={path === "/search" ? colors.green : colors.grey}
          />
        </IconButton>
      </Link>
      <Link to="/profile">
        <IconButton>
          <FontAwesome
            name="user-o"
            size={26}
            color={path === "/profile" ? colors.green : colors.grey}
          />
        </IconButton>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 0;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.greyLighten};
  border-radius: 20px;
  padding-bottom: 10px;
  background-color: white;
`;

const IconButton = styled.View`
  height: 40px;
  padding: 5px;
`;

HomeFooter.propTypes = {
  path: PropTypes.string.isRequired
};

export default HomeFooter;
