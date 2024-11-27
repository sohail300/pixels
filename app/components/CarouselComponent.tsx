import { View, Text, Image, Dimensions } from "react-native";
import React, { useContext } from "react";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomSheetContext } from "@/context/BottomSheetContext";

const CarouselComponent = () => {
  const width = Dimensions.get("window").width;

  const imageList = [
    {
      id: 1,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/I7cS64S2QLWrJHObfMe01g",
      name: "Buildings",
    },
    {
      id: 2,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/VRkrf2kiSuWQRvvsU_cLJw",
      name: "Buildings",
    },
    {
      id: 3,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/ns8meBmTTEm-J-j-xYadQA",
      name: "Buildings",
    },
    {
      id: 4,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/mto4ESyTTOyvJgZK0-tp_w",
      name: "Buildings",
    },
    {
      id: 5,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/I81ZtZT7SWiAYCMDHC8zkg",
      name: "Buildings",
    },
  ];

  const { setShowBottomSheet, setUrl, setName } =
    useContext(BottomSheetContext);

  const handlePress = (name, link) => {
    console.log("Pressed", name, link);
    setShowBottomSheet(true);
    setUrl(link);
    setName(name);
  };

  return (
    <Carousel
      loop
      width={width}
      height={(width * 3) / 4}
      autoPlay={true}
      data={imageList}
      scrollAnimationDuration={1000}
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
            <TouchableOpacity onPress={() => handlePress(item.name, item.link)}>
              {/* Image as background */}
              <Image
                source={{ uri: item.link }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </TouchableOpacity>

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
                pointerEvents: "none",
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
