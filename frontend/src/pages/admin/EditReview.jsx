import { useState, useEffect } from "react";
import Error from "../ErrorPages";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import Title from "../../components/Title";
import ReviewSelectID from "../../components/ReviewSelectID";
import CreateOrEditReviewCard from "./CreateOrEditReviewCard";

const EditReview = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();
  const { makeRequest: makeRequestEdit, isLoading: isLoadingEdit, data: dataEdit, error: errorEdit } = useRequestData();

  const [selectedReview, setSelectedReview] = useState();

  useEffect(() => {
    makeRequest("http://localhost:8081/reviews");
  }, [dataEdit]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedReview(data[0]);
    }
  }, [data]);

  const handleSelect = (ReviewID) => {
    const selected = data.find((Review) => Review._id === ReviewID);
    setSelectedReview(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedReview = {
      ...selectedReview,
    };

    makeRequestEdit("http://localhost:8081/reviews/admin/" + updatedReview._id, "PUT", e.target);
  };

  return (
    <div className="p-6">
      <Title titleText={"Edit Review"} />
      {isLoading || isLoadingEdit ? (
        <Loader />
      ) : error || errorEdit ? (
        <Error />
      ) : (
        <div className="flex flex-wrap justify-center gap-2 my-10">
          {(data && data.length > 0 && (
            <div className="m-3 border border-gray-600 shadow-xl card w-96 bg-base-100 card-bordered">
              <div className="card-body">
                <h2 className="text-2xl font-bold card-title">Edit Review</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p>Select an ID:</p>
                  <ReviewSelectID reviews={data} onSelect={handleSelect} />
                  <CreateOrEditReviewCard selectedReview={selectedReview} buttonText="Edit Review" />
                </form>
              </div>
            </div>
          )) || <p>No Reviews found</p>}
        </div>
      )}
    </div>
  );
};

export default EditReview;
