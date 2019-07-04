import React from "react";
import ShopList from "../components/home/ShopList";
import { HomeFooter, HomeHeader } from "../components/layout";
import ShopContextProvider from "../contexts/ShopContext";
import { Row, Wrapper } from "../lib/styles";
const Home = props => {
  return (
    <ShopContextProvider>
      <Wrapper>
        <HomeHeader />
        <Row padding={10} marginBottom={55}>
          <ShopList />
        </Row>
        <HomeFooter path={props.match.path} />
      </Wrapper>
    </ShopContextProvider>
  );
};

export default Home;
