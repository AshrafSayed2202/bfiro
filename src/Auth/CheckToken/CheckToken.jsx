import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieService";

export default function CheckToken(props) {
  const token = getCookie("token");
  if (token) {
    return props.children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}

export function CheckLoginNaviagte(props) {
  if (getCookie("token")) {
    return <Navigate to="/"></Navigate>;
  } else {
    return props.children;
  }
}
