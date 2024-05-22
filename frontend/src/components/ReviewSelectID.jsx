const ReviewSelectID = ({ reviews, onSelect }) => {
    return (
      <select onChange={(e) => onSelect(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-900">
        {reviews.map((item, i) => (
          <option key={i} value={item._id}>
            {item._id}
          </option>
        ))}
      </select>
    );
  };
  
  export default ReviewSelectID;