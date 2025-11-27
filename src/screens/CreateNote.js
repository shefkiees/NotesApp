import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { saveNote } from '../storage/notesStorage';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateNote = ({ navigation }) => {
    const { colors, isDarkMode } = useTheme();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handleSave = async () => {
        if (!title.trim() && !content.trim()) {
            Alert.alert('Empty Note', 'Please enter a title or content.');
            return;
        }

        const newNote = {
            id: Date.now().toString(),
            title: title.trim() || 'Untitled',
            content: content.trim(),
            category: category.trim(),
            date: new Date().toISOString(),
        };

        await saveNote(newNote);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.headerButton, { color: colors.primary }]}>Cancel</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>New Note</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={[styles.headerButton, { color: colors.primary, fontWeight: 'bold' }]}>Save</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={[styles.titleInput, { color: colors.text }]}
                placeholder="Title"
                placeholderTextColor={isDarkMode ? '#888' : '#666'}
                value={title}
                onChangeText={setTitle}
                selectionColor={colors.primary}
            />
            <TextInput
                style={[styles.categoryInput, { color: colors.primary, borderColor: colors.border }]}
                placeholder="Category (optional)"
                placeholderTextColor={isDarkMode ? '#888' : '#666'}
                value={category}
                onChangeText={setCategory}
                selectionColor={colors.primary}
            />
            <TextInput
                style={[styles.contentInput, { color: colors.text }]}
                placeholder="Start typing..."
                placeholderTextColor={isDarkMode ? '#888' : '#666'}
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
                selectionColor={colors.primary}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerButton: {
        fontSize: 16,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 15,
        paddingBottom: 5,
    },
    categoryInput: {
        fontSize: 14,
        padding: 15,
        paddingTop: 5,
        paddingBottom: 5,
        fontStyle: 'italic',
    },
    contentInput: {
        flex: 1,
        fontSize: 16,
        padding: 15,
        paddingTop: 5,
    },
});

export default CreateNote;
