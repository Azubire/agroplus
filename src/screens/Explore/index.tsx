import { Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/CustomStatusBar";
import { Card, Heading, HStack, Text, View, VStack } from "native-base";

const Explore = () => {
  return (
    <SafeAreaView>
      <CustomStatusBar />
      <View style={styles.container} mt={4}>
        <Text fontSize="lg" textAlign="center">
          Get Exciting News From The World Of Agriculture
        </Text>

        <Heading>Latest Agric News</Heading>
        <Card>
          <HStack>
            <Text>How to nurse mango seedlings</Text>
            {/* <Image source={require("")} /> */}
            <VStack>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                nihil error deleniti alias aperiam delectus quibusdam quidem
                libero dicta molestias et nulla ad dignissimos neque
                consequuntur, illo similique eius. Nulla?
              </Text>
            </VStack>
          </HStack>
        </Card>
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
