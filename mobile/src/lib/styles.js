import styled from "styled-components";

export const Wrapper = styled.View`
  display: flex;
  flex: 1;
  background-color: ${props => (props.background ? props.background : "white")};
`;
export const Row = styled.View`
  flex: ${props => (props.flex ? props.flex : 1)};
  justify-content: ${props => (props.justify ? props.justify : "flex-start")};
  align-items: ${props => (props.align ? props.align : "flex-start")};
  flex-direction: ${props => (props.direction ? props.direction : "row")};
  background-color: ${props =>
    props.background ? props.background : "transparent"};
  padding: ${props => (props.padding ? props.padding : 0)}px;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)}px;
`;

export const ButtonFull = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${props =>
    props.background ? props.background : "transparent"};
`;

export const ButtonText = styled.Text`
  color: ${props => (props.color ? props.color : "black")};
  font-size: ${props => (props.size ? props.size : 12)};
  font-weight: ${props => (props.weight ? props.weight : 500)};
  text-align: center;
`;

export const Letter = styled.Text`
  color: ${props => (props.color ? props.color : "black")};
  font-size: ${props => (props.size ? props.size : 16)};
  font-weight: ${props => (props.weight ? props.weight : 200)};
`;

export const Spacing = styled.View`
  margin: ${props => (props.margin ? props.margin : 0)}px;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)}px;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)}px;
  margin-right: ${props => (props.marginRight ? props.marginRight : 0)}px;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)}px;
`;
