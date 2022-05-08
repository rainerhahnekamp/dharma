import { Outlet } from "@remix-run/react";

export default function LabsRoute() {
  return (
    <main>
      <h1>Labs</h1>
      <Outlet />
    </main>
  );
}
