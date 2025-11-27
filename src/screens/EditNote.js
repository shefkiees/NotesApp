import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { updateNote, deleteNote } from '../storage/notesStorage';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditNote = ({ route, navigation }) => {
    const { note } = route.params;
    const { colors, isDarkMode } = useTheme();
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [category, setCategory] = useState(note.category || '');

    const handleSave = async () => {
        const updatedNote = {
            ...note,
            title: title.trim() || 'Untitled',
            content: content.trim(),
            category: category.trim(),
            date: new Date().toISOString(),
        };

        await updateNote(updatedNote);
        navigation.goBack();
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteNote(note.id);
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.headerButton, { color: colors.primary }]}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                    <Text style={[styles.headerButton, { color: '#FF3B30' }]}>Delete</Text>
                </TouchableOpacity>
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

export default EditNote;
