import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';

function LoadingIndicator(props: {
    visible: boolean;
    color?: string;
    style?: ViewStyle;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(props.visible);
    });

    if (visible) {
        return (
            <View
                style={{
                    width: '100%',
                    position: 'absolute',
                    backgroundColor: '#EAEAEA',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 99,
                    opacity: 0.5,
                    flex: 1,
                    ...props.style,
                }}
            >
                <ActivityIndicator
                    style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                    color={props.color || '#9AD1CD'}
                    size={'large'}
                />
            </View>
        );
    } else {
        return null;
    }
}

export default LoadingIndicator;
