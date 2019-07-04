import React from "react";
import { HomeFooter, HomeHeader } from "../components/layout";
import { Letter, Row, Wrapper } from "../lib/styles";
const Profile = props => {
  return (
    <Wrapper>
      <HomeHeader />
      <Row padding={10} justify="center" align="center">
        <Letter color="black" size={20} weight={400}>
          Profile
        </Letter>
      </Row>
      <HomeFooter path={props.match.path} />
    </Wrapper>
  );
};

export default Profile;
