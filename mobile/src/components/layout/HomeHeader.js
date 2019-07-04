import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { Letter } from "../../lib/styles";
const HomeHeader = () => {
  return (
    <Header>
      <Letter color="white" weight="700" size={20}>
        WARGA KITA
      </Letter>
      <Location>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Letter color="black" size={14} weight={400}>
            Lokasi Anda
          </Letter>
          <RoundButton>
            <Letter color="white" size={12}>
              Jl. Padjajaran
            </Letter>
            <RoundButtonIcon>
              <FontAwesome name="angle-down" size={16} color="white" />
            </RoundButtonIcon>
          </RoundButton>
        </View>
        <View>
          <PaymentWrapper>
            <PaymentIcon>
              <FontAwesome name="money" size={20} color="white" />
            </PaymentIcon>

            <View style={{ marginRight: 5 }}>
              <Letter color="black" size={10} weight={400}>
                Rp 800.000
              </Letter>
            </View>
          </PaymentWrapper>
        </View>
      </Location>
    </Header>
  );
};

const Header = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 120px;
  background-color: ${props => props.theme.colors.green};
  justify-content: space-around;
  align-items: center;
  padding-top: 25px;
`;

const Location = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
`;

const PaymentWrapper = styled.View`
  width: 130px;
  height: 30px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1px;
`;

const PaymentIcon = styled.View`
  background-color: ${props => props.theme.colors.green};
  width: 50px;
  height: 29px;
  display: flex;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

const RoundButton = styled.TouchableOpacity`
  border: 1px solid #fff;
  padding: 3px 6px;
  padding-right: 20px;
  border-radius: 18px;
  margin-left: 10px;
`;

const RoundButtonIcon = styled.View`
  position: absolute;
  top: 2;
  right: 6;
`;

export default HomeHeader;
