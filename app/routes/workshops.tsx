import { Link } from "@remix-run/react";
import { render } from "react-dom";

export default function WorkshopsRoute() {
  return (
    <div>
      <Link className="link" to="./add">
        New Workshop
      </Link>
    </div>
  );
}
