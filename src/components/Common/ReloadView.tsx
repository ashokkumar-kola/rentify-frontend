import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from '../AppTheme/AppText';

const ReloadView = ({ message = 'Something went wrong', onReload }: any) => {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.message}>{message}</Text> */}
            <TouchableOpacity style={styles.button} onPress={onReload}>
                <AppText weight="SemiBold" style={styles.buttonText}>Reload</AppText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    message: {
        fontSize: 16,
        color: '#555',
        marginBottom: 12,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ReloadView;
