import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable, SectionList, StyleSheet, View } from 'react-native';
import Post from 'components/Post/Post';
import EduText from 'common/EduText';
import { Constants } from 'styles';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import Folder from './Folder';
import ProfileContext from '../ProfileContext';
import TEMP_DATA from './TEMP_DATA';

const createDirectory = (parent, directory = {}) => {
  const folders = parent?.folders;
  if (folders.length === 0) {
    return directory;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const folder of folders) {
    folder.parent = parent;
    // eslint-disable-next-line no-param-reassign
    directory[folder.id] = folder;
    // eslint-disable-next-line no-param-reassign
    directory = {
      ...directory,
      ...createDirectory(folder, directory),
    };
  }
  return directory;
};

const Bookmarks = () => {
  const { offset } = useContext(ProfileContext);
  const [path, setPath] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(TEMP_DATA);
  const directory = useMemo(() => createDirectory(TEMP_DATA), []);

  const folderWrapper = ({ item }) => (
    <Folder
      name={item.title}
      onPress={() => {
        setPath((prev) => [...prev, item.title]);
        setCurrentFolder(item);
      }}
    />
  );

  const postWrapper = ({
    item: { title, author, rating, createdAt, id, commentCount, materials },
  }) => (
    <Post
      title={title}
      author={author}
      rating={rating}
      createdAt={createdAt}
      id={id}
      style={styles.post}
      commentCount={commentCount}
      materials={materials}
    />
  );

  const sections = [
    {
      id: 'folders',
      title: 'Folders',
      data: currentFolder.folders,
      renderItem: folderWrapper,
      ItemSeparatorComponent: () => <View style={styles.foldersSepartor} />,
    },
    {
      id: 'posts',
      title: 'Posts',
      data: currentFolder.posts,
      renderItem: postWrapper,
    },
  ];

  return (
    <SectionList
      style={styles.container}
      sections={sections}
      ListHeaderComponent={
        <View style={[styles.header]}>
          {path.length === 0 && <EduText>{sections[0].title}</EduText>}
          {path.length !== 0 && (
            <View>
              <EduText>{path.join('/')}/</EduText>
              {path && (
                <View style={styles.row}>
                  <Pressable
                    android_ripple={pressableAndroidRipple}
                    onPress={() => {
                      setCurrentFolder(currentFolder.parent);
                      setPath((prev) => prev.slice(0, -1));
                    }}
                  >
                    <Icon name={IconNames.keyboardArrowLeft} size={32} />
                  </Pressable>
                  <EduText style={styles.currentFolder}>
                    {path[path.length - 1]}
                  </EduText>
                </View>
              )}
            </View>
          )}
        </View>
      }
      renderSectionHeader={({ section }) => (
        <View
          style={[styles.header, section.id === 'posts' && styles.postsHeader]}
        >
          {section.id === 'posts' && <EduText>{section.title}</EduText>}
        </View>
      )}
      // ItemSeparatorComponent={() => <EduText>text</EduText>}
      SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      keyExtractor={(item) => item.id}
    />
  );
};

Bookmarks.propTypes = {};
Bookmarks.defaultProps = {};

export default Bookmarks;

const styles = StyleSheet.create({
  header: {
    marginTop: Constants.commonMargin,
    marginLeft: Constants.commonMargin,
  },
  post: {
    width: '90%',
    alignSelf: 'center',
  },
  postsHeader: {
    marginBottom: Constants.commonMargin * 1.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentFolder: {
    fontSize: 20,
  },
  foldersSepartor: {
    marginTop: (Constants.commonMargin * 2) / 3,
  },
  // sectionSeparator: { padding: Constants.commonMargin },
});
