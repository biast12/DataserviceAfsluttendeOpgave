import { useEffect } from "react";
import Error from "../ErrorPages";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import Title from "../../components/Title";
import Head from "../../components/Head";

const EditReview = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();
  const { makeRequest: makeRequestEdit, isLoading: isLoadingEdit, data: dataEdit, error: errorEdit } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:8081/aboutus");
  }, [dataEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target);
    console.log(data._id);
    makeRequestEdit("http://localhost:8081/aboutus/admin/", "PUT", null, e.target);
  };

  return (
    <div className="p-6">
      <Head title="Edit About Us Text" description="This page is for editing about us text" />
      <Title titleText={"Edit About Us"} />
      {isLoading || isLoadingEdit ? (
        <Loader />
      ) : error || errorEdit ? (
        <Error />
      ) : (
        <div className="flex flex-wrap justify-center gap-2 my-10">
          {data && (
            <div className="m-3 border border-gray-600 shadow-xl card w-full bg-base-100 card-bordered">
              <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    <textarea required className="block w-full px-3 py-2 mt-1 bg-gray-900 border border-gray-300 rounded-md h-48" defaultValue={data.content} placeholder="Content" name="content"></textarea>
                  </label>
                  <button type="submit" className="w-30 px-3 py-2 mt-4 text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-500 justify-center">
                    Edit About Us
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditReview;
