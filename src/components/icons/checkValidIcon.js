import {Icon} from "@rneui/base";
import { COLORS, SIZES } from "../../constants/theme";
import React from "react";

const checkValidIcon = (props) => {
  const { checkedItem, check } = props;

  return (
    <Icon
      style={{
        backgroundColor: check(checkedItem) ? COLORS.success : COLORS.error,
        borderRadius: 999,
        padding: SIZES.width * 0.0075,
      }}
      status={check(checkedItem) ? "success" : "error"}
      size={14}
      type={"material-community"}
      name={check(checkedItem) ? "check" : "close"}
      color={COLORS.white}
    />
  );
};

export default checkValidIcon;
