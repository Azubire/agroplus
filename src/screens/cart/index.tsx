import { View, Text } from "react-native";
import React from "react";
import { Actionsheet, Button, HStack } from "native-base";

const Cart = () => {
  return (
    <View>
      <Actionsheet isOpen={true}>
        <Actionsheet.Content>
          <Text>Checkout mf</Text>
          <HStack>
            <Button>continue</Button>
            <Button>checkout</Button>
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default Cart;
