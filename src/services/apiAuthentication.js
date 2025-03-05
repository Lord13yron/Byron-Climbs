import supabase from "./supaBase";

export async function signup({ email, password }) {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (signUpError) {
    console.error(signUpError);
    throw new Error("Signup failed");
  }

  const user = signUpData.user;
  console.log("user", user);

  if (!user) {
    throw new Error("No user returned from signup");
  }

  const { data, error } = await supabase
    .from("users")
    .insert([{ userRole: "user", user_id: user.id }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("User could not be signed up");
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  // Step 1: Fetch data from auth.users
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const userId = user.id;

    // Step 2: Fetch data from the custom users table
    let { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("*, userRole") // Ensure the column names are correct
      .eq("user_id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching user profile:", profileError.message);
      return null;
    }

    // Step 3: Combine data from both sources
    const combinedData = {
      ...user,
      ...userProfile,
    };

    return combinedData;
  }
}
