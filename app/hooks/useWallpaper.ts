import { useEffect, useState } from "react";

export default function useWallpaper() {
  const list1 = [
    {
      id: 1,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/rrwSyTWrR7Gucj6kRHP3Hw",
      name: "Buildings",
    },
    {
      id: 2,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/GE8SAcIpRwOuj_MkHyh-nw",
      name: "Restaurant",
    },
    {
      id: 3,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/UkmAdBeMS7eDf7fkVdRT-Q",
      name: "Football",
    },
    {
      id: 4,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/P1phF_xhTNOSDvuP_8DX4A",
      name: "Nature",
    },
    {
      id: 5,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/jR1hNGngRv2hzq9uqWVmTQ",
      name: "Lion",
    },
    {
      id: 6,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/EWJZQOcrS_KTA8qE-FwuEg",
      name: "Girl",
    },
    {
      id: 7,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/FZrc8WzLTZe3xppLpVf3YQ",
      name: "Girl",
    },
    {
      id: 8,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/Ep_6XE09SH61YKZ3Rb737g",
      name: "Girl",
    },
    {
      id: 9,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/v0_y25KTRE6be-2RgTpDzQ",
      name: "Girl",
    },
    {
      id: 10,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/XgnYvIn_Qq2U-tF2U8HsQg",
      name: "Nature",
    },
  ];

  const list2 = [
    {
      id: 11,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/rrwSyTWrR7Gucj6kRHP3Hw",
      name: "Buildings",
    },
    {
      id: 12,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/GE8SAcIpRwOuj_MkHyh-nw",
      name: "Restaurant",
    },
    {
      id: 13,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/UkmAdBeMS7eDf7fkVdRT-Q",
      name: "Football",
    },
    {
      id: 14,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/P1phF_xhTNOSDvuP_8DX4A",
      name: "Nature",
    },
    {
      id: 15,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/jR1hNGngRv2hzq9uqWVmTQ",
      name: "Lion",
    },
    {
      id: 16,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/EWJZQOcrS_KTA8qE-FwuEg",
      name: "Girl",
    },
    {
      id: 17,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/FZrc8WzLTZe3xppLpVf3YQ",
      name: "Girl",
    },
    {
      id: 18,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/Ep_6XE09SH61YKZ3Rb737g",
      name: "Girl",
    },
    {
      id: 19,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/v0_y25KTRE6be-2RgTpDzQ",
      name: "Girl",
    },
    {
      id: 20,
      link: "https://ideogram.ai/assets/progressive-image/balanced/response/XgnYvIn_Qq2U-tF2U8HsQg",
      name: "Nature",
    },
  ];

  const [wallpaper1, setWallpaper1] = useState(list1);
  const [wallpaper2, setWallpaper2] = useState(list2);

  return [wallpaper1, wallpaper2];
}
