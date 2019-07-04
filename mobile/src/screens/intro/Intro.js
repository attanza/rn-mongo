import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components";
import helpers from "../../lib/helpers";
import banner from "./banner";
import Dots from "./Dots";
import NextButton from "./NextButton";
const bannerImageArray = [
  require("../../../assets/img/intro_1.png"),
  require("../../../assets/img/intro_2.png"),
  require("../../../assets/img/intro_3.png")
];

const Intro = props => {
  const [bannerText, setBannerText] = useState({});
  const [bannerImage, setBannerImage] = useState(bannerImageArray[0]);
  const { id } = props.match.params;
  const intId = parseInt(id);

  useEffect(() => {
    setBannerText(banner[intId - 1]);
    setBannerImage(bannerImageArray[intId - 1]);
  }, [id, bannerImage]);

  const handlePress = async () => {
    await helpers.setSkipIntro(props.history, "/");
  };
  return (
    <Wrapper>
      <Row>
        <BannerImage source={bannerImage} />
      </Row>
      <Row>
        <Row>
          <BannerText>{bannerText.title}</BannerText>
          <View style={{ marginHorizontal: 35 }}>
            <SubTitle>{bannerText.subtitle}</SubTitle>
          </View>
        </Row>
        <Row2>
          <Dots id={intId} />
          <Button onPress={handlePress}>
            <LewatiText>LEWATI</LewatiText>
          </Button>
          <NextButton to={`/intro/${intId + 1}`} history={props.history} />
        </Row2>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  display: flex;
  flex: 1;
`;

const Row = styled.View`
  flex: 1;
`;

const Row2 = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 50px;
`;

const BannerImage = styled.Image`
  width: ${props => props.theme.deviceWidth};
  height: ${props => props.theme.deviceHeight * 0.5};
  margin-top: 20px;
`;

const BannerText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 20px;
`;

const SubTitle = styled.Text`
  font-size: 14px;
  text-align: center;
  color: ${props => props.theme.colors.greyDarken};
  margin-bottom: 5px;
  line-height: 25;
`;

const Button = styled.TouchableOpacity``;

const LewatiText = styled.Text`
  color: ${props => props.theme.colors.grey};
`;

export default Intro;
