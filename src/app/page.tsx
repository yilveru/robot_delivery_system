import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
}

// export default function Home() {
//   return <h1>Hello from Render!</h1>;
// }