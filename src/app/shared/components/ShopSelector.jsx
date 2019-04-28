import React, { useState } from "react";
import { uniqueId } from 'lodash';
export default ({ shop }) => {
  const shops = ['豆捞', '有米酸奶'];
  const renderOptions = () => {
    return shops.map((shopName, index) => {
      return <option key={uniqueId('shopOption')} value={index}>
        {shopName}
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
