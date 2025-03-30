import React, { createContext, useContext, useState, ReactNode } from "react";
import { Toast } from "react-native-ui-lib";
import { View, StyleSheet } from "react-native";

interface ToastContextType {
  showToast: (message: string, color?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [bgColor, setBgColor] = useState("black");

  const showToast = (msg: string, color: string = "black") => {
    setMessage(msg);
    setBgColor(color);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000); // Cierra el toast después de 3s
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <View style={styles.toastContainer}>
          <Toast
            visible={visible}
            message={message}
            backgroundColor={bgColor}
            position={"bottom"}
            autoDismiss={3000}
          />
        </View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Asegura que esté sobre el Modal
    elevation: 10, // Para Android
  },
});

export const TOAST_COLOR = {
  primary: "#007AFF",
  secondary: "#607D8B",
  success: "#4CAF50",
  danger: "#FF5252",
  warning: "#FFC107",
  info: "#1E88E5",
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
};
