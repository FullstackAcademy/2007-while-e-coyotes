import React from "react";

export const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <h3>Rating: {review.rating} stars</h3>
      <p>{review.content}</p>
      <p className="review-card__username">—{review.user.username}</p>
    </div>
  );
};
