import { auth, signOut } from "../../auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <h1>Hola!</h1>
      {JSON.stringify(session?.user.token)}

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
