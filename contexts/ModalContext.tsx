import { createContext, ReactNode, useContext, useState } from "react";

type ModalType =
  | "login"
  | "signInToContinue"
  | "packageDetails"
  | "customizePackage"
  | "rate"
  | "loginGate"
  | null;
type ModalProps = Record<string, any>;

type ModalContextType = {
  isOpen: boolean;
  openModal: (type: ModalType, props?: ModalProps) => void;
  closeModal: () => void;
  modalType: ModalType;
  modalProps: ModalProps;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalProps, setModalProps] = useState<ModalProps>({});
  const isOpen = modalType != null;

  const openModal = (type: ModalType, props: ModalProps = {}) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => setModalType(null);

  return (
    <ModalContext.Provider
      value={{ isOpen, modalType, modalProps, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
