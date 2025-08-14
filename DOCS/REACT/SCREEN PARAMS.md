

# ROUTE PARAMS

{ navigation, route }: any

import { useRoute } from '@react-navigation/native';
const route = useRoute();
const res = route.params?.variable_name;