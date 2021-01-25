import React from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Dimensions, Text } from 'react-native';
import { snapPoint } from 'react-native-redash';
import LottieView from 'lottie-react-native';

import useRepositories from '../../hooks/useRepositories';
import RepoList from '../ReposList';
import loadingAnimation from '../../assets/loading.json';

interface ReposContainerProps {
  language: string;
  listStyle: 'card' | 'list';
}

const { width } = Dimensions.get('screen');

const snapPoints = [-width, 0, width];

type Offset = {
  x: number;
};

const ReposContainer: React.FC<ReposContainerProps> = ({ language }) => {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(100);
  const { data, isFetching } = useRepositories(language, page);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-100);

  React.useEffect(() => {
    if (data && page === 1) {
      setTotalPages(data.totalPages);
    }
  }, [data, page]);

  React.useEffect(() => {
    if (data && !isFetching) {
      translateX.value = 0;
    }
  }, [data, isFetching, translateX.value]);

  const onSwipe = React.useCallback(
    (destination) => {
      if (destination > 0) {
        setPage((current) => {
          return current - 1 > 0 ? current - 1 : current;
        });
      } else {
        setPage((current) => {
          return current + 1 <= totalPages ? current + 1 : current;
        });
      }
    },
    [totalPages],
  );

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Offset
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, { x }) => {
      translateX.value = x + translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);

      translateX.value = withSpring(
        dest,
        {
          velocity: velocityX,
          restSpeedThreshold: dest === 0 ? 0.01 : 100,
          restDisplacementThreshold: dest === 0 ? 0.01 : 100,
        },
        () => {
          if (dest !== 0) {
            runOnJS(onSwipe)(dest);
          }
        },
      );
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        activeOffsetX={[-20, 20]}>
        <Animated.View style={[style]}>
          {data && !isFetching && data.items.length > 0 && (
            <RepoList repositories={data.items} />
          )}
        </Animated.View>
      </PanGestureHandler>
      {isFetching && (
        <LottieView
          source={loadingAnimation}
          style={{
            position: 'absolute',
            top: 0,
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
          autoPlay
        />
      )}
    </>
  );
};

export default ReposContainer;
