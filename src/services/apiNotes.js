import supabase from "./supaBase";

export async function addNote(climbId, userId, note) {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ climbId: climbId, userId: userId, note: note }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Note could not be added");
  }

  return data;
}

export async function deleteNote(id) {
  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Note could not be deleted");
  }
}

export async function updateNote(id, newNote) {
  const { error } = await supabase
    .from("notes")
    .update({ note: newNote })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Note could not be updated");
  }
}
