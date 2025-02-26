// import Signup from "./auth/signup/page";
import { redirect } from "next/navigation";


export default function Home() {
  return (
    redirect("/auth/signin")
  );
}
