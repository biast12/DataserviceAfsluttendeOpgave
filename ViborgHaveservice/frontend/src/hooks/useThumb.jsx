import { useState } from "react";

const useThumb = () => {
  const [thumb, setThumb] = useState(null);
  const makeThumb = (file) => {
    if (file) {
      let reader = new FileReader();

      reader.onload = (r) => {
        setThumb(r.target.result);
      };

      reader.readAsDataURL(file);
    } else {
        setThumb(null);
    }
  };
  return [thumb, makeThumb];
};

export default useThumb;
