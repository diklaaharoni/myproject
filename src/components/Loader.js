import React from 'react';
// import firebase from 'firebase';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';


const Loader = ({ size }) => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={size || 'small'} />
    </View>
  )
}

export default Loader;
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
