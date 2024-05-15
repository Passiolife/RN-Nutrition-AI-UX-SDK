import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
} from 'react-native';

import { Header } from '@app/components';

import templateStyles from './Template.style';
import { Templates, useTemplate } from './useTemplate';

export interface TemplateScreenProps {}

const TemplateScreen = () => {
  const { data, onPressTemplate } = useTemplate();

  const styles = templateStyles();

  const back = require('../../../assets/image/back.png');
  const bg_image = require('../../../assets/image/bg_image.png');

  const renderTemplates = ({ item }: { item: Templates }) => {
    return (
      <ImageBackground
        style={styles.bgImage}
        source={item.image}
        resizeMode="center"
        imageStyle={styles.cardbgImg}
      >
        <Pressable
          style={styles.templateCard}
          onPress={() => onPressTemplate(item)}
        >
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.sdk_name}
          </Text>
          <Text style={styles.desc} numberOfLines={3} ellipsizeMode="tail">
            {item.description}
          </Text>
        </Pressable>
      </ImageBackground>
    );
  };

  return (
    <ImageBackground style={{ flex: 1 }} resizeMode="stretch" source={bg_image}>
      <SafeAreaView style={styles.bodyContainer}>
        <Header
          leftSide={
            <Image
              source={back}
              resizeMode="contain"
              style={{ height: 20, width: 20 }}
            />
          }
          body={<Text style={styles.headertText}>Nutrition AI Framework</Text>}
        />
        <Text style={styles.acknowledge}>
          Add Nutrition-AI to your app or build{'\n'}a new app with our SDK.
        </Text>
        <FlatList
          data={data}
          renderItem={renderTemplates}
          style={styles.list}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default TemplateScreen;
