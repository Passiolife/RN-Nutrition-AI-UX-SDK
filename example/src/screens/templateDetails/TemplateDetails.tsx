import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from 'react-native';

import { Button } from '@app/components';
import templateDetailsStyles from './TemplateDetails.style';
import { Templates, feature } from '../template/useTemplate';

const TemplateDetailsScreen = (props: Templates) => {
  const styles = templateDetailsStyles();

  const back = require('../../../assets/image/back.png');
  const bg_image = require('../../../assets/image/bg_image.png');
  const engineering = require('../../../assets/image/engineering-cover.png');

  const renderTemplatesDetails = ({ item }: { item: feature }) => {
    return (
      <Pressable style={styles.templateDetailsCard}>
        <Text style={styles.listDesc} numberOfLines={3} ellipsizeMode="tail">
          ✓&nbsp;&nbsp;{item.title}
        </Text>
      </Pressable>
    );
  };

  return (
    <ImageBackground
      style={styles.mainContainer}
      resizeMode="stretch"
      source={bg_image}
    >
      <ImageBackground
        style={styles.bgImage}
        source={engineering}
        resizeMode="center"
        imageStyle={styles.cardbgImg}
      >
        <View style={styles.templateCard}>
          <Pressable>
            <Image source={back} style={styles.back} />
          </Pressable>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {props.sdk_name}
          </Text>
          <Text style={styles.desc} numberOfLines={3} ellipsizeMode="tail">
            {props.description}
          </Text>
        </View>
      </ImageBackground>
      <Text style={styles.keyHeader}>Key Features</Text>
      <FlatList
        data={props.feature}
        renderItem={renderTemplatesDetails}
        contentContainerStyle={styles.list}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
      <Button
        title="Try it now"
        buttonContainerStyle={styles.bottomBtn}
        titleStyle={styles.btnTitle}
      />
    </ImageBackground>
  );
};

export default TemplateDetailsScreen;
