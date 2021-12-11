import React, { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import { navigationPropType } from 'proptypes';
import ResponsiveImage from 'common/ResponsiveImage';
import { Modal, Portal } from 'react-native-paper';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSelector } from 'react-redux';

const ViewImages = ({ navigation }) => {
  const images = useSelector((state) => state.material.openMaterialData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

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
          data={images}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                setIsModalVisible(true);
                setModalIndex(index);
              }}
            >
              <ResponsiveImage
                imageURI={item.uri}
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
            imageUrls={images.map((image) => ({ url: image.uri }))}
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
