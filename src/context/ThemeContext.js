import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const theme = {
        isDarkMode,
        toggleTheme,
        colors: isDarkMode
            ? {
                background: '#121212',
                text: '#FFFFFF',
                card: '#1E1E1E',
                primary: '#BB86FC',
                secondary: '#03DAC6',
                border: '#333333',
            }
            : {
                background: '#FFFFFF',
                text: '#000000',
                card: '#F5F5F5',
                primary: '#6200EE',
                secondary: '#03DAC6',
                border: '#E0E0E0',
            },
    };

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
