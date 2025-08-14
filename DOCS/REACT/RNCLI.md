# -----------------------------------------------------------------------------

## ROUTES

import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
const route = useRoute<RouteProp<RootStackParamList, 'PropertyDetails'>>();
const { propertyId } = route.params;

Using any for navigation and route works, but it's not type-safe — meaning you lose autocomplete and type checking

# -----------------------------------------------------------------------------

## ASSETS

## IMAGES

import images from '../../assets/images';

# -----------------------------------------------------------------------------

## STACK VS NATIVE STACK

import { StackScreenProps, } from '@react-navigation/stack';
import { NativeStackScreenProps, } from '@react-navigation/native-stack';

## CompositeScreenProps

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { AppDrawerParamList } from './AppDrawerParamList';
import { RootStackParamList } from './RootStackParamList';

type AppDrawerProps = NativeStackScreenProps<AppDrawerParamList, 'PropertyDetails'>;

type RootProps = NativeStackScreenProps<RootStackParamList, 'AppDrawer'>;

export type PropertyDetailsScreenProps = CompositeScreenProps<AppDrawerProps, RootProps>;

const PropertyDetailsScreen: React.FC<PropertyDetailsScreenProps> = ({ navigation, route }) => {
const { propertyId } = route.params;
// ...
};

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { ExploreStackParamList, MainTabParamList, AppDrawerParamList, RootStackParamList } from '../../navigation/types';

type ExploreProps = NativeStackScreenProps<ExploreStackParamList, 'PropertyDetails'>;
type MainTabProps = BottomTabScreenProps<MainTabParamList>;
type DrawerProps = NativeStackScreenProps<AppDrawerParamList, 'MainTab'>;
type RootProps = NativeStackScreenProps<RootStackParamList, 'AppDrawer'>;

export type PropertyDetailsScreenProps = CompositeScreenProps<
ExploreProps,
CompositeScreenProps<
MainTabProps,
CompositeScreenProps<DrawerProps, RootProps>

> ;

const PropertyDetailsScreen: React.FC<PropertyDetailsScreenProps> = ({ navigation, route }) => {
const { propertyId } = route.params;
// ...
};

navigation.navigate('AppDrawer', {
screen: 'MainTab',
params: {
screen: 'ExploreStack',
params: {
screen: 'PropertyDetails',
params: { propertyId: 'abc123' },
},
},
});
