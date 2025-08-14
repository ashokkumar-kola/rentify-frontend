import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants';
import AppText from '../AppTheme/AppText';

const EmptyListView = ({ message = 'No items found', icon = 'home', iconSize = 48, iconColor = Colors.primary }) => {
    return (
        <View style={styles.container}>
            <FontAwesome name={icon} size={iconSize} color={iconColor} style={styles.icon} />
            <AppText style={styles.message}>{message}</AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    icon: {
        marginBottom: 12,
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default EmptyListView;
