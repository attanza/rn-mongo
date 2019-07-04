import React, { useState } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components";
import colors from "../lib/colors";
import { WARGAKU_SKIP_INTRO } from "../lib/contants";
import helpers from "../lib/helpers";
import useEffectAsync from "../lib/useEffectAsync";

const Welcome = props => {
  const toIntro = () => props.history.push("/intro/1");
  const checkSkipIntro = async () => {
    // await helpers.removeAsyncStorage(WARGAKU_SKIP_INTRO);
    const isSkipIntro = await helpers.getAsyncStorage(WARGAKU_SKIP_INTRO);
    if (isSkipIntro != null && isSkipIntro === "yes") {
      return true;
    }
    return false;
  };

  const [yPosition] = useState(new Animated.Value(100));
  const [opacity] = useState(new Animated.Value(0));

  const animationStyle = {
    transform: [{ translateY: yPosition }],
    opacity
  };

  const animateButton = () => {
    Animated.parallel([
      Animated.timing(yPosition, {
        toValue: 0,
        duration: 500
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500
      })
    ]).start();
  };

  useEffectAsync(async () => {
    // props.history.push("/home");
    if (!(await checkSkipIntro())) {
      toIntro();
    }

    animateButton();
  }, []);

  return (
    <Wrapper source={require("../../assets/img/bg_welcome.png")}>
      <Row size={2}>
        <BannerImageWrapper>
          <BannerImage source={require("../../assets/img/splash.png")} />
        </BannerImageWrapper>
      </Row>
      <Row size={1} justify="center">
        <BannerText>Selamat Datang</BannerText>
        <View style={{ marginHorizontal: 35 }}>
          <SubTitle>
            Membeli produk favorit anda ? WargaKita akan mengirimkannya
            dimanapun anda berada.
          </SubTitle>
        </View>
      </Row>
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: colors.green,
            borderRadius: 15,
            justifyContent: "space-around",
            alignItems: "center",
            padding: 20
          },
          animationStyle
        ]}
      >
        <Button
          background={colors.orange}
          onPress={() => props.history.push("/login")}
        >
          <ButtonText color="white">MASUK</ButtonText>
        </Button>
        <Button
          background={colors.white}
          onPress={() => props.history.push("/register")}
        >
          <ButtonText>BUAT AKUN</ButtonText>
        </Button>
        <Button onPress={() => props.history.push("/home")}>
          <ButtonText color="white">LEWATI SEJENAK</ButtonText>
        </Button>
      </Animated.View>
    </Wrapper>
  );
};

const Wrapper = styled.ImageBackground`
  display: flex;
  flex: 1;
`;
const Row = styled.View`
  flex: ${props => (props.size ? props.size : 1)};
  justify-content: ${props => (props.justify ? props.justify : "flex-start")};

  background-color: ${props =>
    props.background ? props.background : "transparent"};
`;

const BannerImageWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const BannerImage = styled.Image`
  width: 200px;
  height: 200px;
`;

const BannerText = styled.Text`
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.Text`
  font-size: 14px;
  text-align: center;
  color: ${props => props.theme.colors.greyDarken};
  margin-bottom: 5px;
  line-height: 25;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${props =>
    props.background ? props.background : "transparent"};
`;

const ButtonText = styled.Text`
  color: ${props => (props.color ? props.color : "black")};
  font-size: 12;
  font-weight: 400;
`;

export default Welcome;
