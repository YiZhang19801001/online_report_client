import React, { useReducer, useEffect } from "react";
import { uniqueId } from "lodash";
import { history } from "../history";

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const initState = { shopId: undefined, prefixPath: "daily" };

const makeNewPath = path => {
  switch (path) {
    case "/weekly":
    case "/weekly/:shopId":
      return "weekly";
    case "/daily":
    case "/daily/:shopId":
      return "daily";

    case "/customize":
    case "/customize/:shopId":
      return "customize";
    case "/all":
    case "/all/:shopId":
      return "all";
    default:
      return path;
  }
};

export default ({ path, shop_id }) => {
  const shops = JSON.parse(localStorage.getItem("aupos_online_report_user"))
    .shops;
  if (path === "/total") {
    return null;
  }
  useEffect(() => {
    const newPath = makeNewPath(path);
    dispatch({ type: "setState", payload: { prefixPath: newPath } });
  }, [path]);

  useEffect(() => {
    dispatch({ type: "setState", payload: { shopId: shop_id } });
  }, [shop_id]);

  const [state, dispatch] = useReducer(reducer, initState);
  const { shopId, prefixPath } = state;

  useEffect(() => {
    if (shopId) {
      history.push(`${process.env.PUBLIC_URL}/${prefixPath}/${shopId}`);
    }
  }, [shopId]);

  const renderOptions = () => {
    return shops.map(shop => {
      return (
        <option key={uniqueId("shopOption")} value={shop.shop_id}>
          {shop.shop_name}
        </option>
      );
    });
  };
  return (
    <div className="shop-selector">
      <select
        value={shopId}
        className="selector"
        onChange={e => {
          dispatch({ type: "setState", payload: { shopId: e.target.value } });
        }}
      >
        {renderOptions()}
      </select>
    </div>
  );
};
