import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";

const CarouselComponent = () => {
  const width = Dimensions.get("window").width;
  const imageList = [
    "https://ideogram.ai/assets/progressive-image/balanced/response/I7cS64S2QLWrJHObfMe01g",
    "https://ideogram.ai/assets/progressive-image/balanced/response/VRkrf2kiSuWQRvvsU_cLJw",
    "https://ideogram.ai/assets/progressive-image/balanced/response/ns8meBmTTEm-J-j-xYadQA",
    "https://ideogram.ai/assets/progressive-image/balanced/response/mto4ESyTTOyvJgZK0-tp_w",
    "https://ideogram.ai/assets/progressive-image/balanced/response/I81ZtZT7SWiAYCMDHC8zkg",
  ];

  return (
    <Carousel
      loop
      width={width}
      height={(width * 3) / 4}
      autoPlay={true}
      data={imageList}
      scrollAnimationDuration={1000}
      onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            justifyContent: "center",
          }}
        >
          {/* Container with relative positioning */}
          <View
            style={{
              width: width,
              height: (width * 3) / 4,
              position: "relative",
            }}
          >
            {/* Image as background */}
            <Image
              source={{ uri: item }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />

            {/* Gradient overlay */}
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
              locations={[0, 1]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                opacity: 0.8, // Adjust opacity as needed
              }}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0, y: 0.85 }} // Try different values like { x: 0, y: 1 } for vertical
            />
          </View>
        </View>
      )}
    />
  );
};

export default CarouselComponent;
