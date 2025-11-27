import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { getNotes } from '../storage/notesStorage';
import NoteItem from '../components/NoteItem';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
    const { colors, isDarkMode, toggleTheme } = useTheme();
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);

    const loadNotes = async () => {
        const loadedNotes = await getNotes();
        setNotes(loadedNotes);
        setFilteredNotes(loadedNotes);
    };

    useFocusEffect(
        useCallback(() => {
            loadNotes();
        }, [])
    );

    useEffect(() => {
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = notes.filter(
                (note) =>
                    note.title.toLowerCase().includes(lowerCaseQuery) ||
                    note.content.toLowerCase().includes(lowerCaseQuery) ||
                    (note.category && note.category.toLowerCase().includes(lowerCaseQuery))
            );
            setFilteredNotes(filtered);
        } else {
            setFilteredNotes(notes);
        }
    }, [searchQuery, notes]);

    const renderItem = ({ item }) => (
        <NoteItem
            note={item}
            onPress={() => navigation.navigate('EditNote', { note: item })}
        />
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>My Notes</Text>
                <TouchableOpacity onPress={toggleTheme}>
                    <Text style={{ fontSize: 24 }}>{isDarkMode ? '☀️' : '🌙'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={[
                        styles.searchInput,
                        {
                            backgroundColor: colors.card,
                            color: colors.text,
                            borderColor: colors.border,
                        },
                    ]}
                    placeholder="Search notes..."
                    placeholderTextColor={isDarkMode ? '#888' : '#666'}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={filteredNotes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={[styles.emptyText, { color: colors.text }]}>
                        No notes found. Create one!
                    </Text>
                }
            />

            <TouchableOpacity
                style={[styles.fab, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('CreateNote')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
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
        paddingBottom: 0,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchContainer: {
        padding: 15,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    listContent: {
        padding: 15,
        paddingTop: 0,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        opacity: 0.6,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    fabText: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -2, // Visual adjustment
    },
});

export default HomeScreen;
