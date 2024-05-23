import { useState } from "react";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../pages/ErrorPages";
import Head from "../components/Head";
import useRequestData from "../hooks/useRequestData";
import YoutubeDownloaderCard from "./YoutubeDownloaderCard";

const YoutubeDownloader = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const [videoID, setVideoID] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    let url = `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${videoID}`;

    makeRequest(url, "GET", {
      "x-rapidapi-key": import.meta.env.VITE_APP_RAPIDAPIKEY,
      "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Head title="YoutubeDownloader" description="API: https://rapidapi.com/DataFanatic/api/youtube-media-downloader" />
      {error && <Error statusCode={error} />}
      {isLoading && <Loader />}

      <Title titleText="Posts From YoutubeDownloader"></Title>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex justify-center w-full">
        <input
          className="m-2 input input-bordered"
          type="text"
          placeholder="URL to the youtube video"
          defaultValue={videoID}
          required
          onChange={(e) => {
            let value = e.target.value;
            try {
              let url = new URL(value);
              if (url.hostname === "www.youtube.com" || url.hostname === "youtu.be") {
                let params = new URLSearchParams(url.search);
                let v = params.get("v");
                if (v) value = v;
              }
            } catch (_) {
              // not a URL, ignore
            }
            setVideoID(value);
          }}
        />
        <button type="submit" disabled={!videoID} className="mx-2 my-2 w-20 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 hover:cursor-pointer">
          Search
        </button>
      </form>
      <div>{data && <YoutubeDownloaderCard data={data} />}</div>
      <div />
    </div>
  );
};

export default YoutubeDownloader;
