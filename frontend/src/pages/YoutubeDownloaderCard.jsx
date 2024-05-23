import React from "react";

const YoutubeDownloaderCard = ({ data }) => {
  let indicesWithAudio = [];
  let highestQualityIndex = -1;
  let highestQuality = -1;

  data.videos.items.forEach((item, index) => {
    if (item.hasAudio) {
      indicesWithAudio.push(index);
      let quality = parseInt(item.quality);
      if (quality > highestQuality) {
        highestQuality = quality;
        highestQualityIndex = index;
      }
    }
  });

  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (hours === "00") {
      if (minutes === "00") {
        return seconds + "s";
      }
      return minutes + ":" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  }
  return (
    <>
      <a href={"https://www.youtube.com/watch?v=" + data.id} target="_blank" className="w-full text-center">
        <h2 className="text-4xl m-5">{data.title}</h2>
      </a>
      <video className="w-full" src={data.videos.items[highestQualityIndex].url} controls="controls" poster={data.thumbnails[data.channel.avatar.length - 1].url} />
      <p className="m-1">Length: {msToTime(data.videos.items[highestQualityIndex].lengthMs)}</p>
      <p className="m-1">
        <a href={`https://www.youtube.com/channel/${data.channel.id}`}>Channel: {data.channel.name}</a>
        <figure>
          <img src={data.channel.avatar[data.channel.avatar.length - 1].url} alt={data.title}></img>
        </figure>
      </p>
      <p className="m-1">
        Description:
        <br />
        {data.description}
      </p>
    </>
  );
};

export default YoutubeDownloaderCard;
