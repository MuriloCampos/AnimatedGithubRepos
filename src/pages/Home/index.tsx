import * as React from 'react';
import { StatusBar, Text, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import CustomIcons from '../../components/CustomIcons';

import Animation from '../../assets/animation.json';
import loadingAnimation from '../../assets/loading.json';

import RepositoryList from '../../components/ReposContainer';

const SPACING = 20;

const items = [
  {
    name: 'Linguagens',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'JavaScript',
        id: 1,
        icon: 'javascript',
      },
      {
        name: 'Python',
        id: 2,
        icon: 'python',
      },
      {
        name: 'Java',
        id: 3,
        icon: 'java',
      },
      {
        name: 'C#',
        id: 4,
        icon: 'csharp',
      },
      {
        name: 'PHP',
        id: 5,
        icon: 'php',
      },
      {
        name: 'TypeScript',
        id: 6,
        icon: 'typescript',
      },
      {
        name: 'C++',
        id: 7,
        icon: 'cplusplus',
      },
      {
        name: 'C',
        id: 8,
        icon: 'c',
      },
      {
        name: 'Go',
        id: 9,
        icon: 'go',
      },
      {
        name: 'Kotlin',
        id: 10,
        icon: 'kotlin',
      },
      {
        name: 'Ruby',
        id: 11,
        icon: 'ruby',
      },
      {
        name: 'Swift',
        id: 14,
        icon: 'swift',
      },
      {
        name: 'Rust',
        id: 16,
        icon: 'rust',
      },
      {
        name: 'Objective-C',
        id: 17,
        icon: 'objectivec',
      },
    ],
  },
];

export default () => {
  const animationRef = React.useRef(null);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [language, setLanguage] = React.useState('');
  const [languageIcon, setLanguageIcon] = React.useState('');
  const [listStyle, setListStyle] = React.useState<'card' | 'list'>('card');
  const [loading, setLoading] = React.useState();

  React.useEffect(() => {
    if (language !== '') {
      animationRef.current.play();
    }
  }, [language]);

  const onLanguageChange = () => {
    console.log('');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#121212',
        padding: SPACING,
        paddingBottom: 0,
      }}>
      <StatusBar hidden />
      <LottieView
        ref={animationRef}
        source={Animation}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        autoPlay={language !== ''}
      />
      <SectionedMultiSelect
        items={items}
        searchPlaceholderText="Pesquisar"
        IconRenderer={(stuff) => (
          <CustomIcons name={stuff.name} size={40} color="#627d98" />
        )}
        subItemFontFamily={{ fontSize: 30 }}
        hideConfirm
        selectedIconComponent={<Icon name="check" />}
        searchIconComponent={
          <Icon
            name="search"
            size={30}
            color="#999"
            style={{ marginLeft: 5 }}
          />
        }
        selectToggleIconComponent={
          <Icon name="keyboard-arrow-down" size={30} color="#fff" />
        }
        dropDownToggleIconUpComponent={<Icon name="keyboard-arrow-up" />}
        dropDownToggleIconDownComponent={<Icon name="keyboard-arrow-down" />}
        uniqueKey="id"
        expandDropDowns
        subKey="children"
        iconKey="icon"
        renderSelectText={() => (
          <>
            {language === '' ? (
              <Text
                style={{
                  color: '#fff',
                  marginRight: 'auto',
                  fontWeight: '700',
                  fontSize: 24,
                }}>
                Escolha uma linguagem
              </Text>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 'auto',
                }}>
                <CustomIcons
                  name={languageIcon}
                  color="#fff"
                  style={{ marginRight: 15 }}
                  size={40}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: 24,
                  }}>
                  {language}
                </Text>
              </View>
            )}
          </>
        )}
        showDropDowns={true}
        single
        readOnlyHeadings={true}
        onSelectedItemsChange={(newItems) => setSelectedItems(newItems)}
        onSelectedItemObjectsChange={(item) => {
          setLanguage(item[0].name);
          setLanguageIcon(item[0].icon);
        }}
        selectedItems={selectedItems}
      />
      {language !== '' && (
        <RepositoryList language={language} listStyle={listStyle} />
      )}
      {/* <LottieView
        source={loadingAnimation}
        autoPlay
        style={{
          position: 'absolute',
          bottom: 0,
          width: 200,
          height: 200,
          alignSelf: 'center',
        }}
      /> */}
    </View>
  );
};
