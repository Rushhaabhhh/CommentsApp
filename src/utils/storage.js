import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@comments';

export const saveToStorage = async (comments) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch (error) {
    console.error('Error saving comments:', error);
  }
};

export const loadFromStorage = async () => {
  try {
    const commentsJson = await AsyncStorage.getItem(STORAGE_KEY);
    return commentsJson ? JSON.parse(commentsJson) : [];
  } catch (error) {
    console.error('Error loading comments:', error);
    return [];
  }
};