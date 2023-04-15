import { useParams } from "react-router-dom";
import Proposal from "./Proposal";
import { useEffect, useState } from "react";

export default function Body() {
  const params = useParams();
  const [content, setContent] = useState(<Proposal />);

  useEffect(
    () =>
      setContent(
        {
          proposal: <Proposal />,
        }[params.selectedDrawer || "dashboard"]
      ),
    [params]
  );

  return <div>{content}</div>;
}
