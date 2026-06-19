import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminForgotPassword() {
const [email, setEmail] = useState("");

const handleResetPassword = async () => {
const { error } = await supabase.auth.resetPasswordForEmail(email, {
redirectTo: `${window.location.origin}/admin/reset-password`,
});


if (error) {
  alert(error.message);
} else {
  alert("Password reset link sent to your email.");
}


};

return ( <div className="min-h-screen flex items-center justify-center"> <div className="w-full max-w-sm p-6 border rounded-lg"> <h2 className="text-xl font-semibold mb-4">
Forgot Password </h2>


    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border p-2 rounded mb-4"
    />
    <button
      onClick={handleResetPassword}
      className="w-full bg-blue-600 text-white p-2 rounded"
    >
      Send Reset Link
    </button>
  </div>
</div>


);
}
