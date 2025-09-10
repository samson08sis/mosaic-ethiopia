import LoginModal from "../LoginModal";
import CustomizePackageModal from "./modals/PackageCustomizationModal";
import PackageDetailsModal from "./modals/PackageDetailsModal";

export default function ModalContainer() {
  return (
    <>
      <LoginModal />
      <PackageDetailsModal />
      <CustomizePackageModal />
    </>
  );
}
