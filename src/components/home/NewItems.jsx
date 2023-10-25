import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Countdown from "../UI/Countdown";

AOS.init();

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();

  async function getNew() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setItems(data);
  }

  useEffect(() => {
    getNew();
    setLoading(false);
  }, [loading]);

  const options = {
    loop: true,
    margin: 10,
    items: 4,
    dots: false,
    nav: true,
    className: "owl-theme",
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
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
                New Items
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {items.length > 0 ? (
            <OwlCarousel {...options}>
              {items.map((data) => (
                <div
                  key={data.id}
                  data-aos="fade"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-once="true"
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${data.authorId}`}>
                        <img className="lazy" src={data.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {data.expiryDate && (
                      <div className="de_countdown">
                        <Countdown time={data.expiryDate}></Countdown>
                      </div>
                    )}

                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${data.nftId}`}>
                        <img
                          src={data.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{data.title}</h4>
                      </Link>
                      <div className="nft__item_price">{data.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{data.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel {...options}>
              {new Array(1).fill(0).map((data) => (
                <div className="" key={data.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius={50} />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="de_countdown">
                      <Skeleton width={90} height={10} borderRadius={8} />
                    </div>

                    <div className="nft__item_wrap">
                      <Skeleton width={500} height={260} borderRadius={8} />
                    </div>
                    <div className="nft__item_info">
                      <h4>
                        <Skeleton width={150} />
                      </h4>

                      <div className="nft__item_price">
                        <Skeleton width={75} />
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>
                          <Skeleton width={25} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
