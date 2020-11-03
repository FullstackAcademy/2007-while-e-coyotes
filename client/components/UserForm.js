import React from "react";

const RobotForm = ({
  handleSubmit,
  handleChange,
  robot,
  projects,
  buttonFunction,
}) => {
  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-form">
          <label htmlFor="name">Robot Name: </label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={robot.name}
          />
          <label htmlFor="imageUrl">Robot Image: </label>
          <input
            name="imageUrl"
            type="text"
            onChange={handleChange}
            value={robot.imageUrl}
          />
          <label htmlFor="fuelType">Fuel Type: </label>
          <select
            name="fuelType"
            onChange={handleChange}
            value={robot.fuelType}
          >
            <option>gas</option>
            <option>diesel</option>
            <option>electric</option>
          </select>
          <label htmlFor="fuelLevel">
            Starting Fuel Level: {robot.fuelLevel}%
          </label>
          <input
            name="fuelLevel"
            type="range"
            min="1"
            max="100"
            onChange={handleChange}
            value={robot.fuelLevel}
          />
          <button
            type="submit"
            className={buttonFunction ? "update-button" : "create-button"}
            disabled={!robot.name}
          >
            {buttonFunction || "Create"}
          </button>
          {!robot.name ? (
            <p className="bad-submit">Missing field for Robot Name</p>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default RobotForm;
