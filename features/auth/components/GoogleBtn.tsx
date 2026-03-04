"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
  const router = useRouter()
  
  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              token: credentialResponse.credential, // ID TOKEN
            }),
          });

          const data = await res.json();
          console.log(data);

          if(res.ok) {
            router.push('/')
            router.refresh()
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}