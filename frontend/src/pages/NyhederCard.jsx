import React from "react";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";

const NyhederCard = ({ post, key }) => {
  return (
    <div className="border border-solid border-gray-300 w-300 p-2.5 m-2.5 shadow-xl card w-96 bg-base-100 card-bordered grow" key={key}>
      <div className="card-body">
        <h2>{post.title}</h2>
        <p className="m-1">{post.description}</p>
        <p className="m-1">
          {new Date(post.publishedAt).toLocaleString("da-dk", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "numeric",
          })}
        </p>
        <p className="m-1">
          {formatDistanceToNow(new Date(post.publishedAt), {
            locale: da,
            addSuffix: true,
          })}
        </p>
        <p className="m-1">Author: {post.author}</p>
        <figure>{post.urlToImage ? <img src={post.urlToImage} alt={post.title} className="w-96 h-48" /> : null}</figure>
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NyhederCard;
