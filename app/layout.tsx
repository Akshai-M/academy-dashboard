import BackendEditModal from "./components/BackendEditModal";
import CandidateEditModal from "./components/CandidateEditModal";
import FrontendEditModal from "./components/FrontendEditModal";
import { ModalProvider } from "./modalContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>
          {children}
          <CandidateEditModal />
          <FrontendEditModal />
          <BackendEditModal />
        </ModalProvider>
      </body>
    </html>
  );
}
