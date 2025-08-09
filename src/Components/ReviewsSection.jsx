// components/ProductReviews.jsx
import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "react-toastify";
import StarRatings from "react-star-ratings";
import useUserInfo from "../Hooks/useUserInfo";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ReviewsSection = ({ marketName }) => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();
  const { userInfo } = useUserInfo();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: reviews = [] } = useQuery({
    queryKey: ["market-reviews", marketName],
    queryFn: async () => {
      const res = await axios.get(`/reviews/${marketName}`);
      return res.data;
    },
  });

  const addReview = useMutation({
    mutationFn: async (newReview) => {
      const res = await axios.post("/reviews", newReview);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review submitted!");
      queryClient.invalidateQueries(["market-reviews", marketName]);
      setRating(0);
      setComment("");
    },
    onError: () => toast.error("Failed to submit review."),
  });

  const handleSubmit = () => {
    if (!user) return toast.error("Please log in first!");
    if (!rating) return toast.error("Please provide a rating!");
    if (!comment) return toast.error("Please write a comment!");

    addReview.mutate({
      marketName,
      userEmail: user.email,
      userName: userInfo?.name || "Anonymous",
      rating,
      comment,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="mt-10 p-4 border rounded-lg bg-gray-50 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">🗣️ User Reviews</h2>

      {/* Review Form */}
      <div className="flex flex-col md:flex-col items-center gap-4 mb-6 w-full">
        <div>
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            changeRating={setRating}
            numberOfStars={5}
            name="rating"
            starDimension="30px"
            starSpacing="4px"
            isSelectable={true}
          />
        </div>
        <div className="flex w-full">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment"
            className="input input-bordered w-full h-10"
          />
          <button
            onClick={handleSubmit}
            className="btn btn-primary whitespace-nowrap"
            disabled={rating === 0}
            title={rating === 0 ? "Please select a rating first" : ""}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reviews.length === 0 && (
          <p className="text-gray-600 col-span-full text-center">No reviews yet.</p>
        )}
        {reviews.map((r) => (
          <div key={r._id} className="p-4 bg-white rounded border shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{r.userName}</span>
              <StarRatings
                rating={r.rating}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="2px"
                isSelectable={false}
              />
            </div>
            <p className="text-gray-700 mb-3 flex-grow">{r.comment}</p>
            <p className="text-xs text-gray-500 text-right">
              {r.date ? format(new Date(r.date), "PPpp") : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
