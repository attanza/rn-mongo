import React from "react";
import { Dimensions } from "react-native";
import { NativeRouter, Route, Switch } from "react-router-native";
import { ThemeProvider } from "styled-components";
import colors from "./lib/colors";
import {
  Home,
  Inbox,
  Login,
  Profile,
  Register,
  Search,
  ShopDetail,
  Welcome
} from "./screens";
import Intro from "./screens/intro/Intro";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Navigation = () => {
  return (
    <ThemeProvider theme={{ colors, deviceHeight, deviceWidth }}>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/shops/:id" component={ShopDetail} />
          <Route exact path="/inbox" component={Inbox} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/intro/:id" component={Intro} />
        </Switch>
      </NativeRouter>
    </ThemeProvider>
  );
};

export default Navigation;
