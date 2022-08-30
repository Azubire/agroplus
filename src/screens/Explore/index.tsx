import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import { Text, View } from "native-base";

const Explore = () => {
  return (
    <SafeAreaView>
      <CustomStatusBar />
      <View style={styles.container} mt={4}>
        <Text fontSize="lg" textAlign="center">
          Get Exciting News From The World Of Agriculture
        </Text>
        <Text px={2} mt={4}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          libero, quisquam sit vero nemo eum animi quibusdam ullam, velit
          voluptatibus, nulla vitae assumenda. Quaerat impedit est expedita
          sapiente dolorem corporis?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
});
