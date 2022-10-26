import { PopupAlertType } from "../../constants";


let listeners: any[] = []; // { name: string, callback: (payload: PopupMessagePayload) => void }

const registerListener = (listener: any) => {
    const existingListenerIndex = listeners.findIndex(
        x => x.name === listener.name,
    );
    if (existingListenerIndex === -1) {
        listeners.push(listener);
    }
};

const unregisterListner = (listenerName: any) => {
    listeners = listeners.filter(x => x.name !== listenerName);
};

const broadcastMessage = (payload: any) => {
    listeners.forEach(listener => {
        try {
            if (listener.callback) {
                listener.callback(payload);
            }
        } catch (e) { }
    });
};

const broadcastSuccess = (message: string, autoHide = true) => {
    console.log(message, "message")
    broadcastMessage({
        type: PopupAlertType.Success,
        autoHide: autoHide,
        content: message,
        visible: true,
    });
};

const broadcastFailure = (error: string) => {
    console.log(error, "error")
    broadcastMessage({
        type: PopupAlertType.Error,
        autoHide: true,
        content: `${error}`,
        visible: true,
    });
};

const dismissMessage = () => {
    listeners.forEach(listener => {
        try {
            if (listener.callback) {
                listener.callback({
                    visible: false,
                    autoHide: false,
                    content: '',
                    type: PopupAlertType.Default,
                });
            }
        } catch (e) { }
    });
};

export default {
    registerListener,
    unregisterListner,
    broadcastMessage,
    broadcastSuccess,
    broadcastFailure,
    dismissMessage,
};
