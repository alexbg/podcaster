import { NavLink } from "react-router";
import type { Route } from "./+types/detail";


export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {resolve(); console.log(params)}, 5000);
  });
  return '';
}

export default function Detail({loaderData}: Route.ComponentProps) {
  console.log(loaderData);
  return (
    <NavLink to={'/'}>Back</NavLink>
  )
}