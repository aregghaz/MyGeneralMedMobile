import {Animated} from "react-native";
import {ALERT_TYPE, Dialog, Toast} from "react-native-alert-notification";

export const getFeatureViewAnimation = (animatedValue: Animated.Value, outputX: number) => {
    const TRANSLATE_X_INPUT_RANGE = [0, 80];
    const translateY = {
        translateY: animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        }),
    };
    return {
        transform: [
            {
                translateX: animatedValue.interpolate({
                    inputRange: TRANSLATE_X_INPUT_RANGE,
                    outputRange: [0, outputX],
                    extrapolate: 'clamp',
                }),
            },
            translateY,
        ],
    };
};


export const openNotification = (clientData: any, navigation: any, action: number) => {
    let message = '';
    if (action === 1) {
        message = 'You can\'t start a new trip until you have not completed a previous trip';
    } else {
        message = 'You can\'t done this trip until you have not completed a previous trip';
    }
    Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: clientData.tripId,
        textBody: message,
        button: 'Go',
        onPressButton: () => {
            navigation.navigate('Modal', {'clientId': clientData.clientId})
            Dialog.hide()
        }
    })
}
export const openSimpleNotification = () => {
    Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'WARNING',
        textBody: 'First, you need to start trip',
    })
}
export const timestampToDate = (date: Date | string) => {
    const year = new Date(date).getFullYear();
    const monthRaw = new Date(date).getMonth();
    const monthFormatted = monthRaw > 8 ? monthRaw + 1 : `0${monthRaw + 1}`;
    const dayRaw = new Date(date).getDate();
    const day = dayRaw > 9 ? dayRaw : `0${dayRaw}`;

    return `${monthFormatted}/${day}/${year}`;
};

// export default timestampToDate;
