import React, { useEffect, useState } from "react";
import axios from "axios";
import NftCard from "../UI/NftCard";
import Skeleton from "react-loading-skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();
  const [itemsToShow, setItemsToShow] = useState(8);

  async function fetchExplore() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    setItems(data);
    setLoading(false);
  }

  const loadMoreItems = () => {
    setItemsToShow(itemsToShow + 4);
  };

  async function filterNfts(filter) {
    setLoading(false);

    if (filter === "sort") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setItems(data);
    }
    if (filter === "price_low_to_high") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
      );
      setItems(data);
    }
    if (filter === "price_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
      );
      setItems(data);
    }
    if (filter === "likes_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
      );
      setItems(data);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchExplore();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => filterNfts(event.target.value)}>
          <option value="">Default</option>
          <option  value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {!loading
        ? items?.slice(0, itemsToShow).map((data) => <NftCard data={data} />)
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width={"100%"} height={400} borderRadius={12} />
            </div>
          ))}

      {itemsToShow < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMoreItems} className="btn-main lead">
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
