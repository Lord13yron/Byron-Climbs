import supabase, { supabaseUrl } from "./supaBase";

export async function getImages() {
  let { data: images, error } = await supabase.from("images").select("*");

  if (error) {
    console.error(error);
    throw new Error("Images not found");
  }

  const uniqueImages = images.reduce((acc, current) => {
    if (!acc.some((obj) => obj.name === current.name)) {
      acc.push(current);
    }
    return acc;
  }, []);

  return uniqueImages;
}

export async function getImageByClimb(climbId) {
  let { data: images, error } = await supabase
    .from("images")
    .select("*")
    .eq("climbId", climbId);

  if (error) {
    console.error(error);
    throw new Error("Images not found");
  }

  return images;
}

export async function addImageToClimb(climbId, image) {
  if (image.length === 0) {
    throw new Error("No Image Selected");
  }
  const imageName = `${Date.now()}-${image.name}`;
  const url = `${supabaseUrl}/storage/v1/object/public/climb-images/${imageName}`;

  // Upload Image
  const { error: storageError } = await supabase.storage
    .from("climb-images")
    .upload(imageName, image);

  if (storageError) {
    console.error(storageError);
    throw new Error("Climb image could not be uploaded");
  }

  // Add image to database
  const { data, error } = await supabase
    .from("images")
    // .insert([{ climbId: climbId, url: url }])
    .insert([{ climbId: climbId, url: url, name: image.name.split(".")[0] }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Image could not be added");
  }

  return data;
}

export async function addImageToPost(postId, image) {
  if (!image) return;

  const imageName = `${Date.now()}-${image.name}`;
  const url = `${supabaseUrl}/storage/v1/object/public/climb-images/${imageName}`;

  // Upload Image
  const { error: storageError } = await supabase.storage
    .from("climb-images")
    .upload(imageName, image);

  if (storageError) {
    console.error(storageError);
    throw new Error("Climb image could not be uploaded");
  }

  // Add image to database
  const { data, error } = await supabase
    .from("images")
    .insert([{ postId: postId, url: url, name: image.name.split(".")[0] }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Image could not be added");
  }

  return data;
}

export async function addImagesToPost(postId, images) {
  if (images.length === 0) return;
  const promises = images.map(async (image) => {
    const { data, error } = await supabase
      .from("images")
      .insert([{ postId: postId, url: image.url, name: image.name }])
      .select();

    if (error) {
      console.error(error);
      throw new Error("Image could not be added");
    }

    return data;
  });
  return Promise.all(promises);
}

export async function getImageByPost(postId) {
  let { data: images, error } = await supabase
    .from("images")
    .select("*")
    .eq("postId", postId);

  if (error) {
    console.error(error);
    throw new Error("Images not found");
  }

  return images;
}

// export async function deleteImageByPost(id) {
//   const { error } = await supabase.from("images").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Image could not be deleted");
//   }
// }

// export async function deleteImageByClimb(id) {
//   const { error } = await supabase.from("images").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Image could not be deleted");
//   }
// }
export async function deleteImageByPost(media) {
  const { data: existingImages, error: searchError } = await supabase
    .from("images")
    .select("*")
    .eq("name", media.name)
    .not("climbId", "is", null);

  if (searchError) {
    console.error(searchError);
    throw new Error("Error checking for existing images");
  }
  if (existingImages.length < 1) {
    const imagePath = media.url.split("/").pop();
    console.log("imagePath", imagePath);
    const { error } = await supabase.storage
      .from("climb-images")
      .remove([imagePath]);

    if (error) {
      console.error("Error deleting image:", error);
    } else {
      console.log("Image deleted successfully!");
    }
  }
  const { error } = await supabase.from("images").delete().eq("id", media.id);

  if (error) {
    console.error(error);
    throw new Error("Image could not be deleted");
  }
}

export async function deleteImageByClimb(media) {
  const { data: existingImages, error: searchError } = await supabase
    .from("images")
    .select("*")
    .eq("name", media.name)
    .not("postId", "is", null);

  if (searchError) {
    console.error(searchError);
    throw new Error("Error checking for existing images");
  }
  if (existingImages.length < 1) {
    const imagePath = media.url.split("/").pop();
    console.log("imagePath", imagePath);
    const { error } = await supabase.storage
      .from("climb-images")
      .remove([imagePath]);

    if (error) {
      console.error("Error deleting image:", error);
    } else {
      console.log("Image deleted successfully!");
    }
  }

  const { error } = await supabase.from("images").delete().eq("id", media.id);

  if (error) {
    console.error(error);
    throw new Error("Image could not be deleted");
  }
}

export async function getImageById(id) {
  let { data: image, error } = await supabase
    .from("images")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Image not found");
  }

  return image;
}
