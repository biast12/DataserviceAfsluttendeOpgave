import { FaArrowDownLong } from "react-icons/fa6";

const Post = ({ data }) => {
  return (
    <div className="m-3 border border-gray-600 shadow-xl card w-96 bg-base-100 card-bordered">
      <div className="card-body">
        <figure>
          <img
            src={
              "https://openweathermap.org/img/wn/" +
              data.weather[0].icon +
              ".png"
            }
          ></img>
        </figure>
        <p className="text-xl text-center">{data.weather[0].description}</p>
        <p>Tid: {data.dt_txt}</p>
        <p>Temperature: {Math.round(data.main.temp)}&deg;C</p>
        <p>Feels like: {Math.round(data.main.feels_like)}&deg;C</p>
        <p>Min Temp: {Math.round(data.main.temp_min)}&deg;C</p>
        <p>Max Temp: {Math.round(data.main.temp_max)}&deg;C</p>
        <h3 className="text-2xl"> Vind</h3>
        <p>Vindhastighed: {data.main.temp} m/s</p>
        <p>Vindretning: {data.wind.deg} grader</p>
        <div className="p-5">
          <span
            style={{
              display: "inline-block",
              transform: "rotate(" + data.wind.deg + "deg)",
            }}
            className="p-5 text-5xl text-center rounded-full bg-slate-50/10"
          >
            {/* <img src={Arror} alt="" width="50"></img> */}
            {/* ↓ */}
            <FaArrowDownLong />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
