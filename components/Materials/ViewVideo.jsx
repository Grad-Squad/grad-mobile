import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { Portal } from 'react-native-paper';
import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import VideoPlayer from 'common/VideoPlayer';

const ViewVideo = () => {
  const navigation = useNavigation();
  const { data, title } = useSelector(
    (state) => state.material.openMaterialData
  );
  const video = data[0];
  const materialOwner = useSelector((state) => state.material.materialOwner);
  return (
    <Page>
      <Portal>
        <MaterialViewHeader
          onBackPress={() => navigation.goBack()}
          author={materialOwner?.name}
          title={title}
          contextMenuItems={[
            {
              titleKey: 'ContextMenu/Save',
              onPress: () => Alert.alert('WIP'),
              iconName: 'bookmark',
            },
          ]}
        />

        <VideoPlayer uri={video.uri} />
      </Portal>
    </Page>
  );
};

ViewVideo.propTypes = {};
ViewVideo.defaultProps = {};

export default ViewVideo;

const styles = StyleSheet.create({});
