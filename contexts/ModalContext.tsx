import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ModalType =
  | "login"
  | "signInToContinue"
  | "packageDetails"
  | "customizePackages"
  | null;

type ModalContextType = {
  isOpen: boolean;
  openModal: (type: ModalType) => void;
  modalType: ModalType;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const isOpen = modalType != null;

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => setModalType(null);

  return (
    <ModalContext.Provider value={{ isOpen, modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
