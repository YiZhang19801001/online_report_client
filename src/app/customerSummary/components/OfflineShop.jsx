import React from 'react';
import disconnectIcon from "../../../images/disconnect.png"
import offlineIcon from "../../../images/Offline.png";

export default ({ shop }) => {

    const { shop_name } = shop;

    return (
        <div className={`shop-summary-card`}>
            <div className="row shop-name">
                {shop_name}
            </div>
            <div className="row disconnect">
                <img src={disconnectIcon} alt="" />
                <img src={offlineIcon} alt="" />
            </div>
        </div>
    )
}