import { useEffect, useState } from "react";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../pages/ErrorPages";
import useRequestData from "../hooks/useRequestData";
import YoutubeDownloaderCard from "./YoutubeDownloaderCard";

const YoutubeDownloader = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const [videoID, setVideoID] = useState(null);

  const handleSearch = () => {
    let url = `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${videoID}`;

    makeRequest(url, "GET", {
      "x-rapidapi-key": import.meta.env.VITE_APP_RAPIDAPI_KEY,
      "x-rapidapi-host": import.meta.env.VITE_APP_RAPIDAPI_HOST,
    });
  };

  return (
    <div className="flex flex-col items-center">
      {error && <Error statusCode={error} />}
      {isLoading && <Loader />}

      <Title titleText="Posts fra YoutubeDownloader"></Title>

      {/* Search */}
      <div className="flex justify-center w-full">
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
              if (
                url.hostname === "www.youtube.com" ||
                url.hostname === "youtu.be"
              ) {
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
        <button disabled={!videoID} onClick={() => handleSearch()}>SØG</button>
      </div>
      <div className="flex flex-wrap">
        {data && <YoutubeDownloaderCard data={data} />}
      </div>
      <div />
    </div>
  );
};

export default YoutubeDownloader;
