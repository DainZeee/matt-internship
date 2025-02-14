import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const ItemDetails = () => {
  const [loading, setLoading] = useState();
  const [nftItems, setNftItems] = useState([]);
  const { id } = useParams();

  async function fetchItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setNftItems(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading === false ? (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nftItems.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {nftItems.title} #{nftItems.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nftItems.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nftItems.likes}
                      </div>
                    </div>
                    <p>{nftItems.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nftItems.ownerId}`}>
                              <img
                                className="lazy"
                                src={nftItems.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nftItems.ownerId}`}>
                              {nftItems.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nftItems.creatorId}`}>
                              <img
                                className="lazy"
                                src={nftItems.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nftItems.creatorId}`}>
                              {nftItems.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{nftItems.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width={546} height={546}></Skeleton>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width={300} height={40} />
                    <div className="item_info_counts">
                      <Skeleton width={160} height={30} />
                    </div>
                    <Skeleton width={526} height={100} borderRadius={40} />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <Skeleton width={60} height={16} borderRadius={40} />
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              width={50}
                              height={50}
                              borderRadius={50}
                            ></Skeleton>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={100} height={24} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              width={50}
                              height={50}
                              borderRadius={50}
                            ></Skeleton>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width={100} height={24} />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <Skeleton width={100} height={24} />
                      <div className="nft-item-price">
                          <Skeleton width={100} height={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
