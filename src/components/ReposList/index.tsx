import React from 'react';

import {
  Image,
  Animated,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RepositoryInterface from '../../interfaces/Repository';

interface ReposListProps {
  repositories: RepositoryInterface[];
}

const SPACING = 20;
const AVATAR_SIZE = 90;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const ReposList: React.FC<ReposListProps> = (props) => {
  const { repositories } = props;
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      {repositories.length > 0 && (
        <Animated.FlatList
          data={repositories}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];

            const opacityInputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 1),
            ];

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });

            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });

            return (
              <Animated.View
                style={{
                  padding: SPACING,
                  marginBottom: index !== 9 ? SPACING : ITEM_SIZE,
                  backgroundColor: '#102A43',
                  borderRadius: 12,
                  elevation: 2,
                  transform: [{ scale }],
                  opacity,
                }}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => Linking.openURL(item.html_url)}>
                  <Image
                    source={{ uri: item.owner.avatar_url }}
                    style={{
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE,
                      borderRadius: AVATAR_SIZE,
                      marginRight: SPACING / 2,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: '700',
                        color: '#f3f3f3',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        maxWidth: '80%',
                        color: '#f3f3f3',
                        opacity: 0.7,
                        marginBottom: 10,
                      }}
                      numberOfLines={1}>
                      {item.description}
                    </Text>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon
                        name="stars"
                        color="#9fb3c8"
                        size={14}
                        style={{ marginRight: 5 }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          opacity: 0.8,
                          color: '#9fb3c8',
                        }}>
                        {item.stargazers_count}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />
      )}
    </>
  );
};

export default ReposList;
