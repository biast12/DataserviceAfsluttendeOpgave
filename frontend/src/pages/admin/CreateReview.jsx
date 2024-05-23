import Error from "../ErrorPages";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import Title from "../../components/Title";
import Head from "../../components/Head";
import CreateOrEditReviewCard from "./CreateOrEditReviewCard";

const CreateReview = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const handleSubmit = (e) => {
    e.preventDefault();

    makeRequest("http://localhost:8081/reviews/admin", "POST", null, e.target);
  };

  return (
    <div className="p-6">
      <Head title="Create Review" description="This page is for creating reviews" />
      <Title titleText={"Create Review"} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="flex flex-wrap justify-center gap-2 my-10">
          <div className="m-3 border border-gray-600 shadow-xl card w-96 bg-base-100 card-bordered">
            <div className="card-body">
              <h2 className="text-2xl font-bold card-title">Create a new Review</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <CreateOrEditReviewCard buttonText="Create a Review" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateReview;
