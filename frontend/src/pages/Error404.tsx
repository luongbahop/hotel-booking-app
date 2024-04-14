import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Error404: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to="/">Back Home</Link>}
  />
);

export default Error404;
