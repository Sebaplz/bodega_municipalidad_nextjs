import React from "react";
import { auth, signOut } from "@/../auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <>
      <h1>Hola!</h1>
      {JSON.stringify(session?.user.token)}
      <br />
      <h2>Role: {session?.user.role}</h2>
      <h2>Email: {session?.user.email}</h2>
      <h2>ID: {session?.user.id}</h2>

      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/login",
          });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
}
