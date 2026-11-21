import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
    size?: number;
    horizontal?: boolean;
}

//Empty view used to add space between components
export default function Spacer({ size = 8, horizontal = false }: SpacerProps) {
    return (
        <View
            style={{
                width: horizontal ? size : 'auto',
                height: !horizontal ? size : 'auto',
            }}
        />
    );
}
