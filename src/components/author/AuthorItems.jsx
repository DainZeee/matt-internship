import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import NftCard from "../UI/NftCard";

const AuthorItems = ({ data, authorImage, authorId }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])


  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {data?.map((data) => (
            <NftCard
              key={data.id}
              data={data}
              authorId={authorId}
              authorImage={authorImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;