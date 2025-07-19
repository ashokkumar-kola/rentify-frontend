import React, { useState } from 'react';

import { View, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/Colors';
import { TextSizes } from '../../constants/TextSizes';
import { Spacing } from '../../constants/Spacing';

const SearchBar = () => {
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation();

    return (
        <Pressable
            // onPressIn={() => setIsPressed(true)}
            // onPressOut={() => setIsPressed(false)}
            // onPress={() => navigation.navigate('Filter')}
            style={({ pressed }) => [
                styles.searchBar,
                pressed || isPressed ? styles.activeBackground : null,
            ]}
        >
            <LinearGradient
                colors={[Colors.blue100, Colors.blue300]}
                style={styles.searchButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <FontAwesome name="search" size={20} color={Colors.white100} />
            </LinearGradient>

            <TextInput
                placeholder="Search by City, Location, ..."
                placeholderTextColor={Colors.textGrey}
                style={styles.searchInput}
            />

            {/* <LinearGradient
                colors={[Colors.blue100, Colors.blue300]}
                style={styles.searchButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <FontAwesome name="search" size={20} color={Colors.white100} />
            </LinearGradient> */}

        <LinearGradient
            colors={[Colors.blue100, Colors.blue300]}
            style={styles.filterButton}
            // style={styles.nextButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <TouchableOpacity
                // style={styles.filterButton}
                onPress={() => navigation.navigate('Filters')}
            >

                <FontAwesome name="sliders" size={20} color="#fff" />
            </TouchableOpacity>
        </LinearGradient>
        </Pressable>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    searchBar: {
        width: '90%',
        height: 56,
        backgroundColor: Colors.white,
        margin: Spacing.base,
        // borderRadius: 28,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 8,
        borderWidth: 2,
        borderColor: Colors.primary,
        paddingLeft:8,
        paddingRight: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 6 },
        // shadowOpacity: 0.15,
        // shadowRadius: 10,
        // elevation: 6,
    },

    searchContainer: {
        flex: 1,
    },

    activeBackground: {
        backgroundColor: Colors.white100,
    },

    searchInput: {
        flex: 1,
        fontSize: TextSizes.base,
        color: Colors.textGrey,
    },

    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    filterButton: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
});
