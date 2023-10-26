import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState();

  async function getSellers() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setSellers(data);
    setLoading(false);
  }

  useEffect(() => {
    getSellers();
  }, [loading]);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2
                data-aos="fade"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="true"
              >
                Top Sellers
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12"
          data-aos="fade-left"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true">
            <ol className="author_list"
            >
              {sellers.length > 0
                ? sellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((data) => (
                    <li key={data.id}>
                      <div className="author_list_pp">
                        <Skeleton width={50} height={50} borderRadius={50}>
                        </Skeleton>
                          <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <h4>
                          <Skeleton width={80}></Skeleton>
                        </h4>
                        <span>
                          <Skeleton width={30}></Skeleton>
                        </span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
