import * as SecureStore from "expo-secure-store";
import { AsyncStorage } from "react-native";
import { WARGAKU_SKIP_INTRO } from "./contants";
class Helpers {
  async setSecureStorage(key, value) {
    return await SecureStore.setItemAsync(key, value);
  }

  async getSecureStorage(key) {
    return await SecureStore.getItemAsync(key);
  }

  async removeSecureStorage(key) {
    return await SecureStore.deleteItemAsync(key);
  }

  async setAsyncStorage(key, value) {
    return await AsyncStorage.setItem(key, value);
  }

  async getAsyncStorage(key) {
    return await AsyncStorage.getItem(key);
  }

  async removeAsyncStorage(key) {
    return await AsyncStorage.removeItem(key);
  }

  async setSkipIntro(history) {
    await this.setAsyncStorage(WARGAKU_SKIP_INTRO, "yes");
    history.push("/");
  }
}

export default new Helpers();
