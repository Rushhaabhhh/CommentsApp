import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment } from '../redux/actions';
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

const Comment = ({ id, name, text, date, isReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedText.trim()) {
      dispatch(editComment(id, editedText));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(id));
  };

  return (
    <View style={[styles.container, isReply && styles.reply]}>
      <View style={styles.header}>
        <View style={styles.avatarNameContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name[0].toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>
      </View>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedText}
          onChangeText={setEditedText}
          multiline
        />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
      <View style={styles.actions}>
        <View style={styles.editReplyContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
                <Icon name="checkmark-outline" size={18} color={colors.primary} />
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => setIsEditing(false)}>
                <Icon name="close-outline" size={18} color={colors.secondary} />
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.actionButton} onPress={() => setIsEditing(true)}>
                <Icon name="create-outline" size={18} color={colors.primary} />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => setShowReplyForm(!showReplyForm)}>
                <Icon name="chatbubble-outline" size={18} color={colors.primary} />
                <Text style={styles.actionText}>Reply</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Icon name="trash-outline" size={18} color={colors.secondary} />
        </TouchableOpacity>
      </View>
      {showReplyForm && (
        <CommentForm parentId={id} onCancel={() => setShowReplyForm(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reply: {
    marginLeft: 30,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  text: {
    color: colors.text,
    marginBottom: 10,
    fontSize: 15,
    lineHeight: 22,
  },
  input: {
    backgroundColor: colors.background,
    color: colors.text,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editReplyContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    color: colors.primary,
    marginLeft: 5,
    fontSize: 14,
  },
  deleteButton: {
    padding: 5,
  },
});

export default Comment;