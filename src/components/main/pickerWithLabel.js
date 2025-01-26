import React, { useState } from 'react';
import { COLORS, FONTS, longScreen, SHADOWS, SIZES } from '../../constants/theme';
import { Platform, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const PickerWithLabel = props => {
  const {
    label,
    placeholder,
    searchPlaceholder,
    itemKey,
    value,
    setValue,
    selectedValue,
    items,
    setItems,
    onValueChange,
    style,
    shadow,
  } = props;
  const { pickerItemContainer, pickerContainer } = styles;

  const [open, setOpen] = useState(false);
  return (
    <View>
      {label ? (
        <Text
          style={{
            ...FONTS.BODY3,
            zIndex: 1,
            color: COLORS.darkGray,
            marginLeft: 4,
          }}>
          {label}
        </Text>
      ) : null}
      <DropDownPicker
        dropDownDirection={props.dropDownDirection ?? 'AUTO'}
        nestedScrollEnabled={true}
        searchPlaceholder={searchPlaceholder}
        textStyle={{
          ...FONTS.BODY3,
          fontSize: props.fontSize ?? 14,
          color: COLORS.black,
        }}
        searchable={props.searchable ?? false}
        placeholderStyle={{
          paddingLeft: 12,
          ...FONTS.BODY2,
          fontSize: SIZES.body1,
          color: COLORS.black,
        }}
        containerStyle={[
          shadow ? SHADOWS.shadowOne : {},
          {
            width: props?.width ?? SIZES.width * 0.86,
            marginTop: 3,
            zIndex: 1,
            marginBottom: 12,
          },
        ]}
        flatListProps={{
          nestedScrollEnabled: true,
          scrollEnabled: true,
        }}
        scrollViewProps={{
          nestedScrollEnabled: true,
          scrollEnabled: true,
        }}
        listMode={props.type ?? 'FLATLIST'}
        listItemContainerStyle={[
          pickerItemContainer,
          {
            flex: 1,
            zIndex: 4,
            width: props.type === 'MODAL' ? '100%' : props.width,
          },
        ]}
        style={[
          pickerContainer,
          {
            height: props?.height ?? 50,
            width: props?.width ?? SIZES.width * 0.86,
            borderRadius: style?.borderRadius ?? 8,
            borderWidth: style?.borderWidth ?? 0,
            zIndex: 4,
            backgroundColor: style?.backgroundColor ?? '#fff',
          },
        ]}
        dropDownContainerStyle={{
          borderWidth: 0,
          borderTopWidth: 1,
          zIndex: 99999,
          position: Platform.OS === 'android' ? 'relative' : null,
          top: 0,
        }}
        itemKey={itemKey}
        placeholder={placeholder}
        schema={{
          label: itemKey,
          value: value,
        }}
        open={open}
        value={selectedValue}
        items={items}
        setOpen={() => setOpen(!open)}
        setValue={setValue}
        onChangeValue={onValueChange}
        disabled={props?.disabled ?? false}
        setItems={items => setItems(items)}
        multiple={props?.multiple ?? false}
        multipleText={props?.multipleText}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  pickerItemContainer: {
    borderRadius: 10,
    alignItems: 'center',
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0,
  },
  pickerContainer: {
    borderColor: COLORS.darkBlue,
  },
});

export default PickerWithLabel;
