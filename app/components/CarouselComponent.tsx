import { View, Image, StyleSheet, Dimensions } from "react-native";
import React, { useContext, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomSheetContext } from "@/context/BottomSheetContext";

const CarouselComponent = () => {
  const width = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

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

  const {
    setShowBottomSheet,
    setUrl,
    setName,
    setId,
    setDownloads,
    setLikes,
    setCategories,
    setUploaderName,
    setUploaderImage,
    setHasLiked,
  } = useContext(BottomSheetContext);

  const handlePress = (name: string, link: string) => {
    // Carousel images aren't backend wallpapers, so clear any stale
    // id/stats left over from a previously viewed card.
    setId("");
    setDownloads(0);
    setLikes(0);
    setCategories([]);
    setUploaderName("");
    setUploaderImage("");
    setHasLiked(false);
    setShowBottomSheet(true);
    setUrl(link);
    setName(name);
  };

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={(width * 3) / 4}
        autoPlay={true}
        data={imageList}
        scrollAnimationDuration={1000}
        onSnapToItem={setActiveIndex}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() => handlePress(item.name, item.link)}
            style={{ width, height: (width * 3) / 4 }}
          >
            <Image
              source={{ uri: item.link }}
              style={{ width: "100%", height: "100%" }}
            />
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"]}
              locations={[0, 1]}
              style={StyleSheet.absoluteFillObject}
              pointerEvents="none"
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0, y: 1 }}
            />
          </TouchableOpacity>
        )}
      />

      <View style={styles.dotsRow} pointerEvents="none">
        {imageList.map((item, index) => (
          <View
            key={item.id}
            style={[styles.dot, index === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  dotsRow: {
    position: "absolute",
    bottom: 14,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: {
    width: 18,
    backgroundColor: "#fdd700",
  },
});
