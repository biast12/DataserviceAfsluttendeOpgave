import { useEffect } from "react";
import { Link } from "react-router-dom";
import Error from "../../pages/ErrorPages";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";

const AboutUs = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();
  const {
    makeRequest: makeRequestImage,
    isLoading: isLoadingImage,
    data: dataImage,
    error: errorImage,
  } = useRequestData();
  useEffect(() => {
    makeRequest("http://localhost:8081/aboutus");
    makeRequestImage("http://localhost:8081/galleryitems");
  }, []);

  let index1, index2;

  if (dataImage) {
    do {
      index1 = Math.floor(Math.random() * dataImage.length);
      index2 = Math.floor(Math.random() * dataImage.length);
    } while (index1 === index2);
  }

  const indexes = dataImage ? [index1, index2] : [];

  return (
    <div className="flex flex-col items-center">
      {error || (errorImage && <Error statusCode={error || errorImage} />)}
      {isLoading || (isLoadingImage && <Loader />)}
      {data && dataImage && (
        <>
          <div className="flex mb-4">
            <div className="w-1/2">
              <h2 className="text-5xl">
                <span className="text-white">
                  {data.title.split(" ").slice(0, 2).join(" ")}{" "}
                </span>
                <span className="text-green-700">
                  {data.title.split(" ").slice(2).join(" ")}
                </span>
              </h2>
              <div className="w-16 h-1 mt-3 bg-green-700 rounded"></div>
              <p dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
            <div className="w-1/2">
              <div className="flex mb-4">
                {indexes.map((i) => (
                  <div className="w-1/2" key={i}>
                    <figure>
                      <img
                        src={
                          "http://localhost:8081/public/images/" +
                          dataImage[i].image
                        }
                        alt={dataImage[i].service.title}
                        className="w-full h-auto p-4 rounded-lg"
                      />
                    </figure>
                    <h2 className="px-4 text-2xl">
                      {dataImage[i].service.title}
                    </h2>
                    <p className="px-4">{dataImage[i].service.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link to="/viborghaveservice/services">
            <button className="bg-green-700 text-white py-2 px-4 rounded">
              Go to Services
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AboutUs;
