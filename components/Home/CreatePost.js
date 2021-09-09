import React from 'react';
import { StyleSheet, View } from 'react-native';
import Page from 'common/Page/Page';
import PressableIcon from 'common/PressableIcon';
import { navigationPropType } from 'proptypes';

const CreatePost = ({ navigation }) => {
  return (
    <Page>
      <View style={styles.header}>
        <PressableIcon name="close" onPress={() => navigation.goBack()} />
      </View>
      <View style={[{ flex: 1, backgroundColor: 'purple' }]} />
    </Page>
  );
};

CreatePost.propTypes = { navigation: navigationPropType.isRequired };
CreatePost.defaultProps = {};

export default CreatePost;

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center' },
});
