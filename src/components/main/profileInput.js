import React from "react";
import { BODY6, COLORS, FONTS, SHADOWS, SIZES } from "../../constants/theme";
import { Input } from "@rneui/base";

const profileInput = (props) => {
  const {
    width,
    height,
    value,
    secureTextEntry,
    keyboardType,
    onChangeText,
    rightIcon,
    errorMessage,
    placeholder,
    leftIcon,
    shadow,
    error,
    disabled,
  } = props;
  return (
    <Input
      onSubmitEditing={props.onSubmitEditing}
      onKeyPress={props.onKeyPress}
      returnKeyType={props?.returnKeyType ?? "default"}
      errorProps={{
        style: {
          ...BODY6,
          color: COLORS.error,
          marginLeft: 4,
        },
        errorMessage: errorMessage,
      }}
      placeholderTextColor={COLORS.gray}
      placeholder={placeholder}
      style={{
        ...FONTS.BODY2,
        backgroundColor: disabled ? COLORS.lightGray2 : COLORS.white,
        borderColor: COLORS.primary,
        borderBottomWidth: 0,
      }}
      maxLength={props.maxLength ?? 999}
      inputContainerStyle={{
        ...SHADOWS.shadowOne,
        borderRadius: 8,
        width: width ?? SIZES.width * 0.86,
        height: height ?? 50,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 12,
        backgroundColor: disabled ? COLORS.lightGray2 : COLORS.white,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
      }}
      leftIcon={leftIcon ?? null}
      rightIcon={value?.length > 0 && rightIcon ? rightIcon : null}
      inputStyle={{
        ...FONTS.BODY3,
        color: COLORS.black,
        marginLeft: 4,
        paddingTop: props.multiline ? 10 : 0,
      }}
      containerStyle={{
        width: width ? width : SIZES.width * 0.9,
        justifyContent: "space-around",
        marginBottom: props.marginBottom ? props.marginBottom : SIZES.base,
      }}
      multiline={props.multiline}
      label={props.label}
      labelStyle={{
        ...FONTS.BODY3,
        zIndex: 1,
        marginBottom: 4,
        color: COLORS.darkGray,
        marginLeft: 4,
      }}
      errorStyle={{
        ...BODY6,
        color: COLORS.error,
        marginLeft: 4,
      }}
      errorMessage={errorMessage}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      value={value}
      defaultValue={value}
      renderErrorMessage={false}
      onChangeText={onChangeText}
      onBlur={props.onBlur}
      {...props}
    />
  );
};

export default profileInput;
