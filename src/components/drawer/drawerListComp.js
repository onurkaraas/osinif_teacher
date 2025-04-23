import React from 'react';
import { COLORS, FONTS, SHADOWS, SIZES } from '../../constants/theme';
import { Text, TouchableOpacity, View } from 'react-native';
import { Badge, Icon } from '@rneui/base';
import { isTablet } from '../../helpers/deviceInfo';

const drawerListComp = props => {
  const { onPress, title, icon, iconType } = props;
  return (
    <TouchableOpacity
      style={{
        ...SHADOWS.shadowOne,
        backgroundColor: COLORS.white,
        backfaceVisibility: 'hidden',
        flexDirection: 'row',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 7.5,
        width: isTablet() ? 280 : SIZES.width * 0.6,
        alignItems: 'center',
        marginBottom: SIZES.base * 2,
      }}
      onPress={onPress}>
      <View
        style={{
          width: SIZES.width * 0.1,
          marginRight: SIZES.base / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon type={iconType} name={icon} color={COLORS.black} />
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'row',
          height: '100%',
        }}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={{
            ...FONTS.H3,
            maxWidth: SIZES.width * 0.55,
            fontSize: 15,
            color: COLORS.black,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default drawerListComp;
