import React from "react";

const UserForm = ({ handleSubmit, handleChange, user, buttonFunction }) => {
  const passwordOption = buttonFunction
    ? "Change Password: "
    : "Desired Password: ";
  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-form">
          <h1>GET STARTED</h1>
          <h4>
            To get started with a new accout, please fill out the following
            information
          </h4>
          <label htmlFor="username"> User Name: </label>
          <input
            name="username"
            type="text"
            onChange={handleChange}
            value={user.username}
          />
          <label htmlFor="password">{passwordOption}</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={user.password}
          />
          <label htmlFor="email"> Preferred Email: </label>
          <input
            name="email"
            type="text"
            onChange={handleChange}
            value={user.email}
          />
          <label htmlFor="class">Class Type: </label>
          <select name="class" onChange={handleChange} value={user.class}>
            <option>adventurer</option>
            <option>villain</option>
          </select>
          <button
            type="submit"
            className={buttonFunction ? "update-button" : "create-button"}
            disabled={!user.username}
          >
            {buttonFunction || "Create"}
          </button>
          {!user.username ? (
            <p className="bad-submit">Missing field for User Name</p>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
