import { useState, useEffect } from "react";
import Error from "../ErrorPages";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import Title from "../../components/Title";
import DeleteReviewCard from "./DeleteReviewCard";
import ReviewSelectID from "../../components/ReviewSelectID";

const DeleteReview = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();
  const { makeRequest: makeRequestDelete, isLoading: isLoadingDelete, data: dataDelete, error: errorDelete } = useRequestData();

  const [selectedReview, setSelectedReview] = useState();

  useEffect(() => {
    makeRequest("http://localhost:8081/reviews");
  }, [dataDelete]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedReview(data[0]);
    }
  }, [data]);

  const handleSelect = (ReviewID) => {
    const selected = data.find((Review) => Review._id === ReviewID);
    setSelectedReview(selected);
  };

  const handleDelete = (ReviewID) => {
    if (window.confirm("Are you sure you want to delete this Review?")) {
      makeRequestDelete("http://localhost:8081/reviews/admin/" + ReviewID, "DELETE");
    }
  };

  return (
    <div className="p-6">
      <Title titleText={"Delete Review"} />
      {isLoading || isLoadingDelete ? (
        <Loader />
      ) : error || errorDelete ? (
        <Error />
      ) : (
        <div className="flex flex-wrap justify-center gap-2 my-10">
          {(data && data.length > 0 && (
            <>
              <div className="m-3 border border-gray-600 shadow-xl card w-96 bg-base-100 card-bordered">
                <div className="card-body">
                  <ReviewSelectID reviews={data} onSelect={handleSelect} />
                  {selectedReview && <DeleteReviewCard review={selectedReview} onDelete={handleDelete} />}
                </div>
              </div>
            </>
          )) || <p>No Reviews found</p>}
        </div>
      )}
    </div>
  );
};

export default DeleteReview;
