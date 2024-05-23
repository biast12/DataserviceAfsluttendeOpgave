import { useEffect, useState } from "react";
import Error from "../../pages/ErrorPages";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";

const Services = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    makeRequest("http://localhost:8081/reviews");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % (data ? data.length : 1)
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  const selectSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 bg-image">
      <div className="w-full h-full bg-lime-500/70">
        {error && <Error statusCode={error} />}
        {isLoading && <Loader />}
        <div className="flex flex-col items-center relative w-full overflow-hidden mt-14">
          <h2 className="text-4xl text-white">Kundeudtalelser</h2>
          <div className="w-16 h-1 mt-1 bg-green-700 rounded mb-14"></div>
          <div className="relative w-full mb-36 text-white">
            {data &&
              data.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center absolute top-0 left-0 w-full transform transition-transform duration-1000 ease-in-out ${
                    index === currentSlide
                      ? "translate-x-0"
                      : "translate-x-full"
                  }`}
                  style={{
                    transform: `translateX(${100 * (index - currentSlide)}%)`,
                  }}
                >
                  <p className="text-center">"{item.content}"</p>
                  <p>{"- " + item.author}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="flex space-x-2 my-10 items-center justify-center">
          {data &&
            data.map((_, index) => (
              <button
                key={index}
                onClick={() => selectSlide(index)}
                className={`h-4 w-4 rounded-full bg-white border border-black ${
                  index === currentSlide ? "opacity-100" : "opacity-50"
                }`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
