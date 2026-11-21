/**
 * Applies the global liked state to a fetched wallpaper list.
 *
 * When an item's liked state changes, its `likes` count is adjusted by one so the
 * count stays consistent with the heart. Items whose state is unchanged are
 * returned as-is, so they keep their identity and don't re-render.
 */
export function applyLikedState<
  T extends { id: string | number; has_liked?: boolean; likes?: number }
>(items: T[], likedIds: Set<string>): T[] {
  return items.map((item) => {
    const nowLiked = likedIds.has(String(item.id));
    if (nowLiked === Boolean(item.has_liked)) return item;
    return {
      ...item,
      has_liked: nowLiked,
      likes: Math.max(0, (item.likes ?? 0) + (nowLiked ? 1 : -1)),
    };
  });
}
