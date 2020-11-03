import React from "react";

const RobotForm = ({ handleSubmit, handleChange, user, buttonFunction }) => {
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
          <label htmlFor="password"> Desired Password: </label>
          <input
            name="password"
            type="text"
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
          <label htmlFor="fuelType">Class Type: </label>
          <select name="fuelType" onChange={handleChange} value={user.class}>
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

export default RobotForm;
