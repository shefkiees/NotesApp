import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const NoteItem = ({ note, onPress }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={onPress}
        >
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                    {note.title}
                </Text>
                <Text style={[styles.date, { color: colors.text }]}>
                    {new Date(note.date).toLocaleDateString()}
                </Text>
            </View>
            {note.category ? (
                <Text style={[styles.category, { color: colors.primary }]}>{note.category}</Text>
            ) : null}
            <Text style={[styles.content, { color: colors.text }]} numberOfLines={2}>
                {note.content}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    date: {
        fontSize: 12,
        opacity: 0.7,
        alignSelf: 'center',
    },
    category: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    content: {
        fontSize: 14,
        opacity: 0.8,
    },
});

export default NoteItem;
