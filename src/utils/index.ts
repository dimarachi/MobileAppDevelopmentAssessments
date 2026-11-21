import Constants from 'expo-constants';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Platform } from 'react-native';
import { LatLng } from 'react-native-maps';

//Converts a size in bytes to a readable text (e.g. 1536 -> '1.5 KB')
//'decimals' is how many decimal places to show
export const formatBytes = (bytes: number, decimals = 2): string => {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

//Returns the time of a date in 12-hour format (e.g. '2:05 pm')
export const formatAMPM = (date: Date): string => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const newHours = hours % 12 ? hours : 12; // the hour '0' should be '12'
    const newMinutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = newHours + ':' + newMinutes + ' ' + ampm;
    return strTime;
};

//Returns a new date with the given number of hours added
export const addHours = (dateTime: Date, hoursToAdd: number) => {
    const milisecondsToAdd = hoursToAdd * 60 * 60 * 1000;
    const newDate = new Date(dateTime);
    return new Date(newDate.setTime(newDate.getTime() + milisecondsToAdd));
};

//Returns a new date that keeps the day of 'existingDate' and uses the hours and minutes of 'newTime'
export const updateDateWithNewTime = (existingDate: Date, newTime: Date): Date => {
    const newDate = new Date(new Date(existingDate).setHours(newTime.getHours(), newTime.getMinutes(), 0, 0));
    return newDate;
};

//Removes the spaces around an email and makes it lowercase
export const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
};

//Returns true when the email has a valid format, false otherwise
export const validateEmail = (email: string): boolean => {
    if (!email) return false;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    const sanitizedEmail = email.trim().toLowerCase();
    const result = sanitizedEmail.match(regex);
    return !!result?.[0];
};

//Converts a text field into a Date for every item of the list
//(dates come from the API as text)
export const parseDateFieldFromJSONResponse = (array: [], fieldName: string): any[] => {
    return array.map((x: any) => {
        x[fieldName] = new Date(x[fieldName]);
        return x;
    });
};

//Converts a text into a number
export const castToNumber = (text: string) => {
    return Number(text);
};

//Returns the value of an environment variable set in the 'extra' section of app.config.ts
//Shows a warning and returns undefined when the variable is not found
export const getEnvironentVariable = (variableName: string) => {
    try {
        const value = Constants.expoConfig?.extra?.[variableName];
        if (value != null) {
            return value;
        } else {
            throw new Error(`${variableName} not found.`);
        }
    } catch (e) {
        console.warn(e);
    }
};

//Returns a link that opens the given location in the phone's maps app (Apple Maps on iOS, Google Maps on Android)
//'customLabel' is the name shown on the map pin
export const getMapsUrl = (coordinates: LatLng, customLabel = 'Custom Label'): string => {
    const { latitude, longitude } = coordinates;
    const latLng = `${latitude},${longitude}`;
    const label = encodeURIComponent(customLabel);
    return Platform.OS === 'ios' ? `maps:0,0?q=${label}@${latLng}` : `geo:0,0?q=${latLng}(${label})`;
};

//Returns true when the JWT access token has expired, false otherwise
export const isTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token) as JwtPayload;
    const currentDate = Date.now();
    if ((decodedToken.exp as number) * 1000 < currentDate) {
        return true;
    } else {
        return false;
    }
};
