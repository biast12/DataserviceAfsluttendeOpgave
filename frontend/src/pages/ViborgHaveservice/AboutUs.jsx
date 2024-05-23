import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Error from "../../pages/ErrorPages";
import Head from "../../components/Head";
import useRequestData from "../../hooks/useRequestData";

const AboutUs = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();
  const { makeRequest: makeRequestGallery, isLoading: isLoadingGallery, data: dataGallery, error: errorGallery } = useRequestData();
  useEffect(() => {
    makeRequest("http://localhost:8081/aboutus");
    makeRequestGallery("http://localhost:8081/services");
  }, []);

  let index1, index2;

  if (dataGallery) {
    do {
      index1 = Math.floor(Math.random() * dataGallery.length);
      index2 = Math.floor(Math.random() * dataGallery.length);
    } while (index1 === index2);
  }

  const indexes = dataGallery && [index1, index2];

  return (
    <div className="flex flex-col items-center">
      <Head title="Viborghaveservice" description="Om Viborghaveservice" />
      {error || (errorGallery && <Error statusCode={error || errorGallery} />)}
      {isLoading || (isLoadingGallery && <Loader />)}
      {data && dataGallery && (
        <div className="p-6">
          <div className="flex">
            <div className="w-1/2">
              <h2 className="text-5xl">
                <span className="text-white">{data.title.split(" ").slice(0, 2).join(" ")} </span>
                <span className="text-green-700">{data.title.split(" ").slice(2).join(" ")}</span>
              </h2>
              <div className="w-16 h-1 mt-3 bg-green-700 rounded"></div>
              <p dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
            <div className="w-1/2">
              <div className="flex">
                {indexes.map((i) => (
                  <div className="w-1/2" key={i}>
                    <figure>
                      <img src={"http://localhost:8081/public/images/" + dataGallery[i].image} alt={dataGallery[i].title} className="w-full h-auto p-4 rounded-lg" />
                    </figure>
                    <h2 className="px-4 text-2xl text-slate-500">{dataGallery[i].title}</h2>
                    <p className="px-4">{dataGallery[i].content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full text-left mb-6">
            <Link to="/viborghaveservice/reviews">
              <button className="bg-green-700 text-white py-2 px-4 rounded">SE ALLE YDELSER</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
