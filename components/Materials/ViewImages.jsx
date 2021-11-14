import React, { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import { navigationPropType } from 'proptypes';
import ResponsiveImage from 'common/ResponsiveImage';
import { Modal, Portal } from 'react-native-paper';
import ImageViewer from 'react-native-image-zoom-viewer';

const ViewImages = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const data = [
    'https://placekitten.com/500/800',
    'https://placekitten.com/600/400',
    'https://placekitten.com/800/400',
    'https://placekitten.com/800/500',
    'https://placekitten.com/600/600',
    'https://placekitten.com/800/200',
    'https://placekitten.com/800/300',
  ];
  return (
    <Page>
      <Portal>
        <MaterialViewHeader
          onBackPress={() => navigation.goBack()}
          author="Ramez"
          title="When the potato took over"
          contextMenuItems={[
            {
              titleKey: 'ContextMenu/Save',
              onPress: () => Alert.alert('WIP'),
              iconName: 'bookmark',
            },
          ]}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                setIsModalVisible(true);
                setModalIndex(index);
              }}
            >
              <ResponsiveImage
                imageURI={item}
                maxWidthRatio={1}
                canMaximize={false}
              />
            </Pressable>
          )}
        />
        <Modal
          contentContainerStyle={styles.modalContainer}
          onDismiss={() => setIsModalVisible(false)}
          visible={isModalVisible}
        >
          <ImageViewer
            enableSwipeDown
            onSwipeDown={() => setIsModalVisible(false)}
            imageUrls={data.map((item) => ({ url: item }))}
            index={modalIndex}
          />
        </Modal>
      </Portal>
    </Page>
  );
};

ViewImages.propTypes = {
  navigation: navigationPropType.isRequired,
};
ViewImages.defaultProps = {};

export default ViewImages;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
});
