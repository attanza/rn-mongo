import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components";
import colors from "../lib/colors";
import { ButtonFull, ButtonText, Letter, Row } from "../lib/styles";

const Register = props => {
  const [secure, setSecure] = useState(true);
  return (
    <Wrapper background={colors.green} behavior="padding">
      <Header>
        <IconRight onPress={() => props.history.push("/")}>
          <FontAwesome name="times" size={30} color={colors.white} />
        </IconRight>
      </Header>
      <Row>
        <ImageWrapper source={require("../../assets/img/bg_login.png")} />
      </Row>
      <Row padding={20} direction="column">
        <Letter color="white" size={32} weight={400}>
          Ayo! Buat akun,
        </Letter>
        <Letter color="white" size={32} weight={400}>
          WargaKita.
        </Letter>
        <View style={{ marginTop: 30 }}>
          <FormGroup>
            <Letter color="white" size={12}>
              EMAIL
            </Letter>

            <Input
              selectionColor="white"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </FormGroup>
          <FormGroup>
            <Letter color="white" size={12}>
              PASWORD
            </Letter>
            <Eye onPress={() => setSecure(!secure)}>
              {secure ? (
                <FontAwesome name="eye-slash" size={20} color={colors.white} />
              ) : (
                <FontAwesome name="eye" size={20} color={colors.white} />
              )}
            </Eye>
            <Input
              selectionColor="white"
              autoCapitalize="none"
              secureTextEntry={secure}
            />
          </FormGroup>
          <View style={{ marginTop: 20 }}>
            <FormGroup>
              <ButtonFull
                background={colors.white}
                onPress={() => props.history.push("/login")}
              >
                <ButtonText color="black">BUAT AKUN</ButtonText>
              </ButtonFull>
            </FormGroup>
            <FormGroup>
              <ButtonFull>
                <ButtonText color="white">
                  Dengan membuat akun, Anda menyutujui Syarat dan Ketentuan
                </ButtonText>
              </ButtonFull>
            </FormGroup>
          </View>
        </View>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.KeyboardAvoidingView`
  display: flex;
  flex: 1;
  background-color: ${props => (props.background ? props.background : "white")};
`;

const ImageWrapper = styled.Image`
  width: ${props => props.theme.deviceWidth};
  height: ${props => props.theme.deviceHeight * 0.5};
  margin-top: 20px;
`;

const FormGroup = styled.View`
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: ${props => props.theme.deviceWidth * 0.9};
  height: 40px;
  border-bottom-color: ${props => (props.color ? props.color : "white")};
  border-bottom-width: 1px;
  color: ${props => (props.color ? props.color : "white")};
`;

const Header = styled.View`
  display: flex;
  position: absolute;
  top: 40;
  left: 0;
  width: 100%;
  height: 40px;
  padding: 10px;
  z-index: 9;
`;

const IconRight = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 20;
`;

const Eye = styled.TouchableOpacity`
  position: absolute;
  top: 28;
  right: 0;
  z-index: 9;
`;

export default Register;
