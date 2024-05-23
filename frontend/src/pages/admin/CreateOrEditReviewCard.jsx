import { useState, useEffect } from "react";

const CreateOrEditReviewCard = ({ selectedReview, buttonText }) => {
  const [author, setAuthor] = useState(selectedReview ? selectedReview.author : "");
  const [content, setContent] = useState(selectedReview ? selectedReview.content : "");

  useEffect(() => {
    if (selectedReview) {
      setAuthor(selectedReview.author);
      setContent(selectedReview.content);
    } else {
      setAuthor("");
      setContent("");
    }
  }, [selectedReview]);

  return (
    <>
      <label className="block text-sm font-medium text-gray-300">
        <input required className="block w-full px-3 py-2 mt-1 bg-gray-900 border border-gray-300 rounded-md" defaultValue={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" name="author"></input>
      </label>
      <label className="block text-sm font-medium text-gray-300">
        <input required className="block w-full px-3 py-2 mt-1 bg-gray-900 border border-gray-300 rounded-md" defaultValue={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" name="content"></input>
      </label>
      <button type="submit" className="w-full px-3 py-2 mt-4 text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-500">
        {buttonText}
      </button>
    </>
  );
};

export default CreateOrEditReviewCard;
