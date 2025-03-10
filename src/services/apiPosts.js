import { PAGE_SIZE } from "../utils/constants";
import { addImagesToPost, addImageToPost } from "./apiImages";
import supabase from "./supaBase";

export async function getPosts({ pageParam }) {
  let query = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (pageParam) {
    const from = (pageParam - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Posts could not be found");
  }

  return data;
}

export async function createPost(post) {
  const { data, error } = await supabase
    .from("posts")
    .insert(post.data)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Post could not be created");
  }

  const images = Array.from(post.images);
  const postId = data[0].id;

  if (post.images && post.addImagesFrom === "device") {
    // const images = Array.from(post.images);
    // const postId = data[0].id;
    // images?.map((image) => addImageToPost(postId, image));
    await Promise.all(images.map((image) => addImageToPost(postId, image)));
  }

  if (post.images && post.addImagesFrom === "db") {
    //do something
    await addImagesToPost(postId, images);
  }
}

export async function deletePost(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Post could not be deleted");
  }
}

export async function updatePost(id, newPost) {
  console.log("in api", newPost, id);
  const { error } = await supabase
    .from("posts")
    .update({ ...newPost })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Post could not be updated");
  }
}
