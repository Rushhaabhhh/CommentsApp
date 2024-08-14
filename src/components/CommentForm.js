import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/actions';
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

const CommentForm = ({ parentId }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (name.trim() && text.trim()) {
      dispatch(addComment(name, text, parentId));
      setName('');
      setText('');
      // onCancel();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Comment"
        placeholderTextColor={colors.textSecondary}
        value={text}
        onChangeText={setText}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Icon name="send-outline" size={20} color={colors.text} />
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} >
          <Icon name="close-outline" size={20} color={colors.text} />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
  },
  input: {
    backgroundColor: colors.background,
    color: colors.text,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default CommentForm;