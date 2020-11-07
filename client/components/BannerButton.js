import React from "react";
import { Link } from "react-router-dom";

export const BannerButton = ({ func, path }) => {
  return (
    <div>
      <Link className="asd" to={path}>
        <h1>{func}</h1>
      </Link>
    </div>
  );
};
