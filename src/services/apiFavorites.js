import supabase from "./supaBase";

export async function getFavorites(id) {
  let { data: favorites, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("userId", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Favorites could not be loaded");
  }

  const climbIds = favorites.map((fav) => fav.climbId);

  if (climbIds.length === 0) return [];

  const { data: climbs, error: climbError } = await supabase
    .from("climbs")
    .select("*")
    .in("id", climbIds)
    .order("name");

  if (climbError) {
    console.error("Error fetching climbs:", climbError);
    return [];
  }

  //added
  const climbsWithFavorites = climbs.map((climb) => {
    const favorite = favorites.find(
      (favorite) => favorite.climbId === climb.id
    );
    return { ...climb, sent_at: favorite ? favorite.created_at : null };
  });

  // return climbs;
  return climbsWithFavorites;
}

export async function addToFavorites(climbId, userId) {
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ climbId: climbId, userId: userId }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Favorite could not be added");
  }

  return data;
}

export async function removeFavorite(climbId, userId) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("climbId", climbId)
    .eq("userId", userId);

  if (error) {
    console.error(error);
    throw new Error("Favorite could not removed");
  }
}
