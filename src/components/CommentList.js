import React, { useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import CommentForm from './CommentForm';
import Icon from 'react-native-vector-icons/Ionicons';

const colors = {
  background: '#1E1E1E',
  surface: '#2C2C2C',
  primary: '#4D9DE0',
  secondary: '#E15554',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#3A3A3A',
};

const CommentList = () => {
  const comments = useSelector(state => state.comments);
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedComments = useCallback(() => {
    return comments.slice().sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [comments, sortOrder]);

  const renderComment = ({ item }) => (
    <View>
      <Comment {...item} />
      {item.replies && item.replies.map(reply => (
        <Comment key={reply.id} {...reply} isReply />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
        >
          <Icon name={sortOrder === 'desc' ? 'arrow-down' : 'arrow-up'} size={20} color={colors.text} />
          <Text style={styles.sortButtonText}>
            {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedComments()}
        renderItem={renderComment}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.commentList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  sortButton: {
    backgroundColor: colors.surface,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonText: {
    color: colors.text,
    marginLeft: 5,
  },
  commentList: {
    paddingBottom: 20,
  },
});

export default CommentList;