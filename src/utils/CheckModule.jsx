import { useContext } from "react";
import { ModuleContext } from "../store/ModuleContext";
import { Navigate } from "react-router";

export default function CheckModule({ module }) {
  const { currentModule } = useContext(ModuleContext);
  if (module !== currentModule) {
    return <Navigate to="/"></Navigate>;
  }
}
