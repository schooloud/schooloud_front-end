import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Quota from "./Quota";
import Proposal from "./Proposal";
import Project from "./Project";
import Proxy from "./Proxy";
import User from "./User";
import { useEffect, useState } from "react";

export default function Body() {
  const params = useParams();
  const [content, setContent] = useState(<Dashboard />);

  useEffect(
    () =>
      setContent(
        {
          dashboard: <Dashboard />,
          quota: <Quota />,
          proposal: <Proposal />,
          project: <Project />,
          proxy: <Proxy />,
          user: <User />,
        }[params.selectedDrawer || "dashboard"]
      ),
    [params]
  );

  return <div>{content}</div>;
}
