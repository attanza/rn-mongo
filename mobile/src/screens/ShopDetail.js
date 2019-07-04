import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import changeCase from "change-case";
import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import MapView from "react-native-maps";
import styled from "styled-components";
import BottomButton from "../components/BottomButton";
import Loader from "../components/layout/Loader";
import colors from "../lib/colors";
import shops from "../lib/shops";
import { Letter, Row, Wrapper } from "../lib/styles";
import useEffectAsync from "../lib/useEffectAsync";

const deviceHeight = Dimensions.get("window").height;

const ShopRender = ({ shop }) => {
  return (
    <>
      <MapView
        style={{ height: deviceHeight * 0.3 }}
        initialRegion={{
          latitude: -6.597147,
          longitude: 106.806038,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          marginTop: 15
        }}
      >
        <View>
          <Letter weight={500} size={16}>
            {changeCase.upperCase(shop.name)}
          </Letter>
          <Letter size={12} color={colors.greyDarken}>
            {`${shop.category} | ${shop.address.district}, ${
              shop.address.city
            }`}
          </Letter>
        </View>
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="chat-bubble-outline"
            size={20}
            color={colors.green}
          />
          <Text style={{ marginLeft: 5 }}>0</Text>
        </View>
      </View>
      <Row padding={15} direction="column">
        <List>
          <FontAwesome
            name="map-marker"
            size={20}
            color={colors.green}
            style={{ marginRight: 10 }}
          />
          <Letter size={14} color={colors.greyDarken}>
            {`${shop.address.street}, ${shop.address.city}`}
          </Letter>
        </List>
        <List>
          <Ionicons
            name="ios-stopwatch"
            size={18}
            color={colors.green}
            style={{ marginRight: 10 }}
          />
          <Letter size={14} color={colors.greyDarken}>{`Buka ${
            shop.open.opentime
          } - ${shop.open.closetime}`}</Letter>
        </List>
        <List>
          <FontAwesome
            name="globe"
            size={17}
            color={colors.green}
            style={{ marginRight: 10 }}
          />
          <NextIcon>
            <FontAwesome name="angle-right" size={20} color={colors.green} />
          </NextIcon>
          <Letter size={14} color={colors.greyDarken}>
            Website
          </Letter>
        </List>
        <BottomButton title="MULAI BELANJA" background={colors.orange} to="/" />
      </Row>
    </>
  );
};

const ShopDetail = props => {
  const [shop, setShop] = useState({});
  const [loading, setLoading] = useState(true);

  useEffectAsync(async () => {
    const id = props.match.params.id;
    shops.map(s => {
      if (s._id === id) {
        return setShop(s);
      }
    });
    setLoading(false);
  }, []);
  return <Wrapper>{loading ? <Loader /> : <ShopRender shop={shop} />}</Wrapper>;
};

const List = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
  width: 100%;
`;

const NextIcon = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
`;

export default ShopDetail;
