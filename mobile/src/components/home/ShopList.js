import changeCase from "change-case";
import React, { useContext } from "react";
import { Link } from "react-router-native";
import styled from "styled-components";
import { ShopContext } from "../../contexts/ShopContext";
import colors from "../../lib/colors";
import { Letter } from "../../lib/styles";
const ShopList = () => {
  const context = useContext(ShopContext);
  return (
    <Wrapper>
      {context.shops.map(shop => {
        return (
          <Card key={shop._id}>
            <Link to={`/shops/${shop._id}`}>
              <CardImage
                source={{ uri: shop.picThumbnail }}
                resizeMode="cover"
              />
            </Link>
            <Spacing />
            <Letter weight={500} size={14}>
              {changeCase.upperCase(shop.name)}
            </Letter>
            <Spacing />
            <Letter size={12} color={colors.greyDarken}>
              {`${shop.category} | ${shop.address.district}, ${
                shop.address.city
              }`}
            </Letter>
          </Card>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.ScrollView`
  flex: 1;
`;
const Card = styled.View`
  width: 100%;
  display: flex;
  height: ${props => props.theme.deviceHeight * 0.25};
  margin-bottom: 3px;
`;

const CardImage = styled.Image`
  height: ${props => props.theme.deviceHeight * 0.18};
  width: 100%;
  border-radius: 20px;
  margin-bottom: 3px;
`;

const Spacing = styled.View`
  margin: 3px 0;
`;

export default ShopList;
