import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully");
      window.location.href = "/admin/login";
    }
  };

  return (
    <div>
      <h2>Set New Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={updatePassword}>
        Update Password
      </button>
    </div>
  );
}