import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { TransactionModal } from "./components/TransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";
import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

export function App() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  function handleOpenTransactionModal() {
    setIsTransactionModalOpen(true);
  }

  function handleCloseTransactionModal() {
    setIsTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onTransactionRequest={handleOpenTransactionModal} />
      <Dashboard />
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onRequestClose={handleCloseTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}

export default App;
