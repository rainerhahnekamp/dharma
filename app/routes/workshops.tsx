import { Link, Outlet } from "@remix-run/react";
import { render } from "react-dom";

export default function WorkshopsRoute() {
  return (
    <div className="flex gap-4">
      <div>
        <Link className="link" to="./add">
          Add Workshop
        </Link>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
