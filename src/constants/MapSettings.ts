import { EdgePadding, LatLng, Region } from 'react-native-maps';

//Shared settings used by the map screens

//Map center used when the user's location is not available (Calgary)
export const DEFAULT_POSITION: LatLng = {
    latitude: 51.03,
    longitude: -114.093,
};

//Zoom level of the map (smaller values zoom in more)
export const DEFAULT_DELTA = { latitudeDelta: 0.008, longitudeDelta: 0.008 };

//Default position and zoom level combined
export const DEFAULT_REGION: Region = {
    ...DEFAULT_POSITION,
    ...DEFAULT_DELTA,
};

//Space kept around the map edges so the markers are not hidden behind the buttons
export const EDGE_PADDING: EdgePadding = {
    top: 64,
    right: 16,
    bottom: 104,
    left: 16,
};
