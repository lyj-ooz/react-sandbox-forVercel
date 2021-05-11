import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

function SkeletonCoin() {
  return (
    <div className="skeleton-wrapper">
      <SkeletonElement type="coin-img-h1" />
      <SkeletonElement type="coin-symbol" />
      <SkeletonElement type="coin-price" />
      <SkeletonElement type="coin-volume" />
      <SkeletonElement type="coin-percent" />
      <SkeletonElement type="coin-marketcap" />
      <Shimmer />
    </div>
  );
}

export default SkeletonCoin;
