const DeleteReviewCard = ({ review, onDelete }) => {
  return (
    <>
      <p className="mb-1">
        <span className="card-title">Author:</span> {review.author}
      </p>
      <p className="mt-1">
        <span className="card-title">Content:</span>
        {review.content}
      </p>
      <div className="flex items-center justify-center">
        <button className="w-full btn btn-warning" onClick={() => onDelete(review._id)}>
          Delete
        </button>
      </div>
    </>
  );
};

export default DeleteReviewCard;
