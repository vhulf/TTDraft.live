import type { Route } from "./+types/home";
import Dashboard  from "../dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TTDraft.live" },
    { name: "description", content: "WE ARE TT!" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Dashboard />;
}
