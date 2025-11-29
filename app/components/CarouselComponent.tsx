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
      link: "https://images.pexels.com/photos/50594/sea-bay-waterfront-beach-50594.jpeg?_gl=1*w533c8*_ga*ODE2MDkwNTA1LjE3NjI2OTY1OTE.*_ga_8JE65Q40S6*czE3NjI2OTY1OTAkbzEkZzEkdDE3NjI2OTY2MTUkajM1JGwwJGgw",
      name: "Image1",
    },
    {
      id: 2,
      link: "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?_gl=1*1kgwoab*_ga*ODE2MDkwNTA1LjE3NjI2OTY1OTE.*_ga_8JE65Q40S6*czE3NjI2OTY1OTAkbzEkZzEkdDE3NjI2OTY2MTckajMzJGwwJGgw",
      name: "Image2",
    },
    {
      id: 3,
      link: "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?_gl=1*tymzmw*_ga*ODE2MDkwNTA1LjE3NjI2OTY1OTE.*_ga_8JE65Q40S6*czE3NjI2OTY1OTAkbzEkZzEkdDE3NjI2OTY3MjkkajU5JGwwJGgw",
      name: "Image3",
    },
    {
      id: 4,
      link: "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?_gl=1*122redp*_ga*ODE2MDkwNTA1LjE3NjI2OTY1OTE.*_ga_8JE65Q40S6*czE3NjI2OTY1OTAkbzEkZzEkdDE3NjI2OTY3NTMkajM1JGwwJGgw",
      name: "Image4",
    },
    {
      id: 5,
      link: "https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?_gl=1*14woa91*_ga*ODE2MDkwNTA1LjE3NjI2OTY1OTE.*_ga_8JE65Q40S6*czE3NjI2OTY1OTAkbzEkZzEkdDE3NjI2OTY3NTYkajMyJGwwJGgw",
      name: "Image5",
    },
    {
      id: 6,
      link: "https://images.pexels.com/photos/36487/above-adventure-aerial-air.jpg?_gl=1*1sjfb85*_ga*ODE2MDkwNTA1LjE3NjI2OTY1OTE.*_ga_8JE65Q40S6*czE3NjI2OTY1OTAkbzEkZzEkdDE3NjI2OTY3NTkkajI5JGwwJGgw",
      name: "Image6",
    },
    {
      id: 7,
      link: "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?_gl=1*1sjfb85*_ga*ODE2MDkwNTA1LjE3NjI2OTY1OTE.*_ga_8JE65Q40S6*czE3NjI2OTY1OTAkbzEkZzEkdDE3NjI2OTY3NTkkajI5JGwwJGgw",
      name: "Image7",
    },
  ];

  const { setShowBottomSheet, setUrl, setName } =
    useContext(BottomSheetContext);

  const handlePress = (name: string, link: string) => {
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
