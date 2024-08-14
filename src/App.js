import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import store from './redux/store';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import { loadComments } from './redux/actions';

const App = () => {
  useEffect(() => {
    store.dispatch(loadComments());
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <CommentForm />
        <CommentList />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;