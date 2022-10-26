import React from 'react';
import { View } from 'react-native';
import { scale, verticalScale } from '../utils/scale';

type SpaceProps = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    fillParent?: boolean;
};

class Space extends React.PureComponent<SpaceProps> {
    render() {
        return (
            <View
                style={{
                    width: 1,
                    height: 1,
                    marginTop: this.props.top ? verticalScale(this.props.top) : undefined,
                    marginStart: this.props.left ? scale(this.props.left) : undefined,
                    marginLeft: this.props.left ? scale(this.props.left) : undefined,
                    marginEnd: this.props.right ? scale(this.props.right) : undefined,
                    marginRight: this.props.right ? scale(this.props.right) : undefined,
                    marginBottom: this.props.bottom
                        ? verticalScale(this.props.bottom)
                        : 0,
                    flex: this.props.fillParent ? 1 : undefined,
                }}
            ></View>
        );
    }
}

export default Space;
