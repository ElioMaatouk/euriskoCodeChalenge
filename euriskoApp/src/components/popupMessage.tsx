import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const styles = StyleSheet.create({
    errorView: {
        padding: 10,
        paddingTop: 50,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        minHeight: 52,
        justifyContent: "center",
        zIndex: 99999999999,
        elevation: 100,
    },
    errorMessage: {
        color: "white", fontSize: 12,
    },
});

type ErrorModalProps = {
    modalVisible: boolean,
    errorMessage: string,
    type: PopupAlertType,
    withTimeout: boolean,
    insets?: { top: "always" | "never" },
    onCloseCallback: () => void,
};

export enum PopupAlertType {
    success = 0,
    error = 1,
    default = 2,
}

export interface IPopupCallback {
    message: string;
    isError: boolean;
}

class PopupMessage extends React.Component<ErrorModalProps> {
    private visibilityTimeout: any = undefined;


    public closeModal = () => {
        this.props.onCloseCallback();
    }

    public componentDidUpdate() {
        if (this.visibilityTimeout) {
            clearTimeout(this.visibilityTimeout);
        }

        // if (this.props.withTimeout) {
        this.visibilityTimeout = setTimeout(() => {
            this.closeModal();
            clearTimeout(this.visibilityTimeout);
        }, this.props.withTimeout ? 4000 : 3000);
        // }
    }

    public render() {
        if (!this.props.modalVisible) {
            return null;
        }
        let paddingTop = 50;
        if (this.props.insets
            && this.props.insets.top === "never") {
            paddingTop = 20;
        }
        return (
            <TouchableOpacity style={[styles.errorView, { paddingTop: paddingTop },
            { backgroundColor: this.props.type === PopupAlertType.error ? "#EF5350" : "#43A047", elevation: 100 }]} onPress={this.closeModal}>
                <View style={{ alignSelf: "center" }}>
                    <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default PopupMessage;
