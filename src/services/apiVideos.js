import supabase from "./supaBase";

export async function getVideos() {
  let { data: videos, error } = await supabase.from("videos").select("*");

  if (error) {
    console.error(error);
    throw new Error("Videos not found");
  }

  const uniqueVideos = videos.reduce((acc, current) => {
    if (!acc.some((obj) => obj.url === current.url)) {
      acc.push(current);
    }
    return acc;
  }, []);

  return uniqueVideos;
}

export async function getVideoByClimb(climbId) {
  let { data: videos, error } = await supabase
    .from("videos")
    .select("*")
    .eq("climbId", climbId);

  if (error) {
    console.error(error);
    throw new Error("Videos not found");
  }

  return videos;
}

export async function addVideoToClimb(climbId, url) {
  if (!url) {
    throw new Error("No Video Selected");
  }

  // Add image to database
  const { data, error } = await supabase
    .from("videos")
    .insert([{ climbId: climbId, url: url }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("video could not be added");
  }

  return data;
}

export async function deleteVideoByClimb(id) {
  const { error } = await supabase.from("videos").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Video could not be deleted");
  }
}

export async function getVideoByPost(postId) {
  let { data: videos, error } = await supabase
    .from("videos")
    .select("*")
    .eq("postId", postId);

  if (error) {
    console.error(error);
    throw new Error("Videos not found");
  }

  return videos;
}

export async function addVideoToPost(postId, url) {
  if (!url) {
    throw new Error("No Video Selected");
  }

  // Add image to database
  const { data, error } = await supabase
    .from("videos")
    .insert([{ postId: postId, url: url }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("video could not be added");
  }

  return data;
}

export async function deleteVideoByPost(id) {
  const { error } = await supabase.from("videos").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Video could not be deleted");
  }
}
