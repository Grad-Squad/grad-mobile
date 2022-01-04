import React from 'react';
import Page from 'common/Page/Page';
import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import { navigationPropType } from 'proptypes';
import { Portal } from 'react-native-paper';
import { useSelector } from 'react-redux';
import PdfViewer from 'components/Home/CreatePost/AddMaterial/AddPDF/PdfViewer';
import { Alert, StyleSheet } from 'react-native';

const ViewPdf = ({ navigation }) => {
  const { data, title } = useSelector(
    (state) => state.material.openMaterialData
  );
  const pdf = data[0];
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

        <PdfViewer uri={pdf.uri} />
      </Portal>
    </Page>
  );
};

ViewPdf.propTypes = {
  navigation: navigationPropType.isRequired,
};
ViewPdf.defaultProps = {};

export default ViewPdf;

const styles = StyleSheet.create({});
