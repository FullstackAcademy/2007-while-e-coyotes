import React from "react";
import { Link } from "react-router-dom";
import AdminItem from "./AdminItem";

const AdminOrder = () => {
  return true ? (
    <div className="admin admin__orders">Orders</div>
  ) : (
    <div>Sorry, you are not an admin.</div>
  );
};

export default AdminOrder;
