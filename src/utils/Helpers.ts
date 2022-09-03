import * as secureStore from "expo-secure-store";

type SetStoreTypes = {
  key: "SETUSERTOKEN";
  options: {
    userToken: string;
    email: string;
  };
};

// set item to secureStore
export const setUserToSecureStore = async ({ key, options }: SetStoreTypes) => {
  const data = await secureStore.setItemAsync(key, JSON.stringify(options));

  return data;
};

// get item from secureStore
export const getUserFromSecureStore = async (key: string) => {
  const data = await secureStore.getItemAsync(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
};
