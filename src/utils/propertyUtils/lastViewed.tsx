import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_VIEWED_KEY = 'last_viewed_property';

export async function saveLastViewedProperty(property: any) {
  try {
    await AsyncStorage.setItem(LAST_VIEWED_KEY, JSON.stringify(property));
  } catch (e) {
    console.log('Error saving last viewed property:', e);
  }
}

export async function getLastViewedProperty() {
  try {
    const jsonValue = await AsyncStorage.getItem(LAST_VIEWED_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error loading last viewed property:', e);
    return null;
  }
}

export async function clearLastViewedProperty() {
  try {
    await AsyncStorage.removeItem(LAST_VIEWED_KEY);
  } catch (e) {
    console.log('Error clearing last viewed property:', e);
  }
}
