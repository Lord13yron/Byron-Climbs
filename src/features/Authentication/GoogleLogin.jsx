import { useEffect, useState } from "react";
import supabase from "../../services/supaBase";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function GoogleLogin() {
  const { user } = useUser();
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        // Add user to custom users table if they don't exist
        const { data: existingUser, error: checkError } = await supabase
          .from("users")
          .select()
          .eq("user_id", session.user.id)
          .single();

        if (!existingUser && !checkError) {
          // Insert new user into custom users table
          const { error: insertError } = await supabase.from("users").insert([
            {
              user_id: session.user.id,
              userRole: "user", // default role
            },
          ]);

          if (insertError) {
            console.error("Error creating user profile:", insertError);
          }
        }

        await queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate("/", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, queryClient]);

  console.log("session", session);
  console.log("user", user);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return null;
  }
}

export default GoogleLogin;
