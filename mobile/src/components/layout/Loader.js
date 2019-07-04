import React from "react";
import { ActivityIndicator } from "react-native";
import colors from "../../lib/colors";
import { Row, Wrapper } from "../../lib/styles";
const Loader = () => {
  return (
    <Wrapper>
      <Row justify="center" align="center">
        <ActivityIndicator size="large" color={colors.green} />
      </Row>
    </Wrapper>
  );
};

export default Loader;
