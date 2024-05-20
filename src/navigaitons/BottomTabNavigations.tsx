import React, { useRef } from 'react';
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useBranding, type Branding } from '../contexts';
import { scaleHeight, scaleWidth, scaledSize } from '../utils';
import { LogOptions, Text, type FloatingOptionRef } from '../components';
import { FloatingOption } from '../components';

export type MenuType = 'Home' | 'Diary' | 'Blank' | 'MealPlan' | 'Progress';

export interface BottomNavTab {
  title: string;
  icon: number;
  selectedIcon: number;
  type: MenuType;
}

interface TabBarProps extends BottomTabBarProps {
  items: BottomNavTab[];
  onFoodScanner: () => void;
  onTextSearch: () => void;
  onFavorite: () => void;
}

export const TabBar = React.memo((props: TabBarProps) => {
  const { navigation, state } = props;
  const branding = useBranding();
  const styles = bottomTabStyle(branding);
  const floatingRef = useRef<FloatingOptionRef>(null);

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const menu: BottomNavTab = props.items[index] as BottomNavTab;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            canPreventDefault: true,
            target: route.key,
            type: 'tabPress',
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // navigation.navigate({merge: true, name: route.name});
            navigation.navigate(route.name);
          }
        };

        if (menu.title === 'Blank') {
          return (
            <FloatingOption
              ref={floatingRef}
              options={
                <LogOptions
                  onClose={function (): void {}}
                  onFoodScanner={() => {
                    floatingRef.current?.onClose();
                    props.onFoodScanner();
                  }}
                  onTextSearch={() => {
                    floatingRef.current?.onClose();
                    props.onTextSearch();
                  }}
                  onFavorite={() => {
                    floatingRef.current?.onClose();
                    props.onFavorite();
                  }}
                />
              }
            />
          );
        }
        return (
          <Pressable
            key={`${route.name}-${index}-TabBar`}
            accessibilityRole="button"
            onPress={onPress}
            accessibilityState={isFocused ? { selected: true } : {}}
            style={styles.tabBarItemStyle}
          >
            {renderTabBarIcons(menu.icon, isFocused, branding)}
            <Text
              weight="400"
              size="_12px"
              style={styles.tabItemText}
              color={isFocused ? 'primaryColor' : 'gray300'}
            >
              {menu.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});

const renderTabBarIcons = (
  icon: number,
  isFocused: boolean,
  color: Branding
) => {
  const styles = bottomTabStyle(color);
  return (
    <Image
      source={icon}
      style={isFocused ? styles.tabSelctedIcon : styles.tabIcon}
    />
  );
};

const bottomTabStyle = ({ white, primaryColor, border }: Branding) => {
  const styles = StyleSheet.create({
    tabBarContainer: {
      alignItems: 'center',
      backgroundColor: white,
      borderColor: border,
      borderWidth: Platform.OS === 'android' ? 0.2 : 0,
      borderTopColor: border,
      elevation: 16,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingBottom: scaleHeight(10),
      paddingHorizontal: scaleWidth(8),
      shadowColor: '#00000029',
      shadowOffset: {
        height: -10,
        width: 0,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8.0,
    },
    tabBarItemStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    tabIcon: {
      backgroundColor: 'transparent',
      borderRadius: 16,
      marginBottom: scaleHeight(8),
      marginTop: scaleHeight(8),
      paddingHorizontal: 8,
      height: scaleHeight(24),
      width: scaleWidth(24),
      tintColor: border,
    },
    tabItemText: {},
    addPlusContainer: {
      height: scaleHeight(52),
      borderRadius: scaleWidth(52),
      width: scaleWidth(52),
      justifyContent: 'center',
      backgroundColor: primaryColor,
      transform: [
        {
          translateY: -scaledSize(30),
        },
      ],
    },
    addPlus: {
      tintColor: white,
      height: scaleHeight(24),
      width: scaleWidth(24),
      alignSelf: 'center',
      justifyContent: 'center',
    },
    tabSelctedIcon: {
      borderRadius: 16,
      tintColor: primaryColor,
      marginBottom: scaleHeight(8),
      marginTop: scaleHeight(8),
      paddingHorizontal: 8,
      height: scaleHeight(24),
      width: scaleWidth(24),
    },
  });
  return styles;
};
