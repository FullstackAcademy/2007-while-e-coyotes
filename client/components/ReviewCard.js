import React from "react";
import { Link } from "react-router-dom";

export const ReviewCard = ({ review, user }) => {
  const isUser = user.id && user.id === review.userId;
  console.log("user", user);
  console.log("review", review);
  return (
    <div className="review-card">
      <h3>Rating: {review.rating} stars</h3>
      <p>{review.content}</p>
      <p className="review-card__username">—{review.user.username}</p>
      {isUser ? (
        <Link to={`/items/${review.itemId}/reviews/${review.id}/updateReview`}>
          Update Review
        </Link>
      ) : null}
    </div>
  );
};
