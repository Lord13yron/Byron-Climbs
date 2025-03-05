import { addImageToClimb } from "./apiImages";
import { addVideoToClimb } from "./apiVideos";
import supabase from "./supaBase";

export async function getClimbs() {
  let { data: climbs, error } = await supabase
    .from("climbs")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Climbs not found");
  }

  return climbs;
}

export async function getClimb(climbId, userId) {
  let query = supabase.from("climbs").select("*, images(*), videos(*)");
  if (userId) {
    query = query
      .select("*, notes(*), images(*), videos(*)")
      .filter("notes.userId", "eq", userId);
  }

  const { data: climb, error } = await query.eq("id", climbId).single();

  if (error) {
    console.error(error);
    throw new Error("Climb not found");
  }

  return climb;
}

export async function createClimb(climb) {
  //Add climb to database
  const { data: newClimb, error } = await supabase
    .from("climbs")
    .insert(climb.climb)
    .select();

  if (error) {
    console.error(error);
    if (error.message.startsWith("duplicate"))
      throw new Error("Problem already exists");
    else throw new Error("Climb could not be created, It might already exist");
  }

  // Add images to database
  const hasImages = climb.images && climb.images.length > 0;
  if (hasImages) {
    const images = Array.from(climb.images);
    const promises = images.map(async (image) => {
      try {
        await addImageToClimb(newClimb[0]?.id, image);
      } catch (imageError) {
        console.error("Error adding image:", imageError);
        throw new Error("Image could not be added");
      }
    });
    await Promise.all(promises);
  }

  // Add video to database
  const video = climb.video;
  const hasVideo = video && video.trim().length > 0;

  if (hasVideo) {
    try {
      await addVideoToClimb(newClimb[0]?.id, video);
    } catch (videoError) {
      console.error("Error adding video:", videoError);
      throw new Error("Video could not be added");
    }
  }

  return newClimb;
}

export async function updateClimb(id, newClimb) {
  const { error } = await supabase
    .from("climbs")
    .update({ ...newClimb })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Climb could not be updated");
  }
}

export async function deleteClimb(id) {
  const { error } = await supabase.from("climbs").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Climb could not be deleted");
  }
}
