import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@notes_app_data';

export const getNotes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error reading notes:', e);
    return [];
  }
};

export const saveNote = async (note) => {
  try {
    const existingNotes = await getNotes();
    const newNotes = [note, ...existingNotes];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
    return newNotes;
  } catch (e) {
    console.error('Error saving note:', e);
    return [];
  }
};

export const updateNote = async (updatedNote) => {
  try {
    const existingNotes = await getNotes();
    const newNotes = existingNotes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
    return newNotes;
  } catch (e) {
    console.error('Error updating note:', e);
    return [];
  }
};

export const deleteNote = async (id) => {
  try {
    const existingNotes = await getNotes();
    const newNotes = existingNotes.filter((note) => note.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
    return newNotes;
  } catch (e) {
    console.error('Error deleting note:', e);
    return [];
  }
};
