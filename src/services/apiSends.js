import supabase from "./supaBase";

export async function getSends(id) {
  let { data: sends, error } = await supabase
    .from("sends")
    .select("*")
    .eq("userId", String(id));

  if (error) {
    console.error(error);
    throw new Error("Sends could not be loaded");
  }

  const climbIds = sends.map((send) => send.climbId);

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
  const climbsWithSends = climbs.map((climb) => {
    const send = sends.find((send) => send.climbId === climb.id);
    return { ...climb, sent_at: send ? send.created_at : null };
  });

  // return climbs;
  return climbsWithSends;
}

export async function addToSends(climbId, userId) {
  const { data, error } = await supabase
    .from("sends")
    .insert([{ climbId: climbId, userId: userId }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Send could not be added");
  }

  return data;
}

export async function removeSend(climbId, userId) {
  const { error } = await supabase
    .from("sends")
    .delete()
    .eq("climbId", climbId)
    .eq("userId", userId);

  if (error) {
    console.error(error);
    throw new Error("Send could not removed");
  }
}
