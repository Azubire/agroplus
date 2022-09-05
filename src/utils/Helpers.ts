import * as secureStore from "expo-secure-store";

type ISetStore = {
  key: "USERTOKEN";
  options: {
    userToken: string;
    email: string;
  };
};

// set item to secureStore
export const setUserToSecureStore = async ({ key, options }: ISetStore) => {
  const data = await secureStore.setItemAsync(key, JSON.stringify(options));

  return data;
};

// get item from secureStore
/**
 * @param  {"USERTOKEN"} key
 */
export const getUserFromSecureStore = async (
  key: "USERTOKEN"
): Promise<{ userToken: string; email: string } | null> => {
  const data = await secureStore.getItemAsync(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
};
