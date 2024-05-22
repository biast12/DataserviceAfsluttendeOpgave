import { useEffect } from "react";
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

  return (
    <div className="flex flex-col items-center">
      {error || (errorImage && <Error statusCode={error || errorImage} />)}
      {isLoading || (isLoadingImage && <Loader />)}
      {data && dataImage && (
        <div className="flex mb-4">
          <div className="w-1/2">
            <h2 className="text-4xl">{data.title}</h2>
            <div className="w-16 h-1 mt-3 bg-green-700 rounded"></div>
            <p dangerouslySetInnerHTML={{ __html: data.content }} />
            <button></button>
          </div>
          <div className="w-1/2">
            <div className="flex mb-4">
              <div className="w-1/2">
                <figure>
                  <img
                    src={
                      "http://localhost:8081/public/images/" +
                      dataImage[0].image
                    }
                    alt={dataImage[0].service.title}
                    className="w-full h-auto p-4 rounded-lg"
                  />
                </figure>
                <h2 className="px-4 text-2xl">{dataImage[0].service.title}</h2>
                <p className="px-4">{dataImage[0].service.content}</p>
              </div>
              <div className="w-1/2">
                <figure>
                  <img
                    src={
                      "http://localhost:8081/public/images/" +
                      dataImage[1].image
                    }
                    alt={dataImage[1].service.title}
                    className="w-full h-auto p-4 rounded-lg"
                  />
                </figure>
                <h2 className="px-4 text-2xl">{dataImage[1].service.title}</h2>
                <p className="px-4">{dataImage[1].service.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
