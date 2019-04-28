import React, { useState } from "react";
import { uniqueId } from 'lodash';
export default ({ shops }) => {

  if (!shops) {
    return null;
  }

  const renderOptions = () => {
    return shops.map((shop, index) => {
      return <option key={uniqueId('shopOption')} value={index}>
        {shop.shop_name}
      </option>
    })
  }
  const [index, setIndex] = useState(0);
  return (
    <div className="shop-selector">
      <select value={index} className="selector" onChange={(e) => { setIndex(e.target.value) }}>
        {renderOptions()}
      </select>
    </div>
  )
};
