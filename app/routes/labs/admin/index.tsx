import { Outlet } from "@remix-run/react";

export default function LabEdit() {
  return (
    <div>
      <h1>Edit</h1>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
