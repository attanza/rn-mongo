import React, { Component, createContext } from "react";
import shops from "../lib/shops";
export const ShopContext = createContext();

class ShopContextProvider extends Component {
  state = {
    shops: shops
  };

  render() {
    return (
      <ShopContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

export default ShopContextProvider;
