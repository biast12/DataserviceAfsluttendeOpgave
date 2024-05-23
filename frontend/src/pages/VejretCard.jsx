import { FaArrowDownLong } from "react-icons/fa6";

const Post = ({ data }) => {
  return (
    <div className="m-3 border border-gray-600 shadow-xl card w-96 bg-base-100 card-bordered">
      <div className="card-body">
        <figure>
          <img src={"https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"}></img>
        </figure>
        <p className="text-3xl text-center m-1">{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</p>
        <p className="m-1">Tid: {data.dt_txt}</p>
        <div className="w-full h-1 bg-white/70 rounded"></div>
        <p className="m-1">Temperatur: {Math.round(data.main.temp)}&deg;C</p>
        <p className="m-1">Føles som: {Math.round(data.main.feels_like)}&deg;C</p>
        <p className="m-1">Min Temp: {Math.round(data.main.temp_min)}&deg;C</p>
        <p className="m-1">Max Temp: {Math.round(data.main.temp_max)}&deg;C</p>
        <div className="w-full h-1 bg-white/70 rounded"></div>
        <p className="m-1">Fugtighed: {data.main.humidity} g/m³</p>
        <div className="w-full h-1 bg-white/70 rounded"></div>
        <p className="m-1">Vindhastighed: {data.main.temp} m/s</p>
        <p className="m-1">Vindretning: {data.wind.deg} grader</p>
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
