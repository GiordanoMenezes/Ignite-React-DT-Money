import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionDTO {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

type TransactionInputDTO = Omit<TransactionDTO, "id" | "createdAt">;

interface TransactionsContextData {
  transactions: TransactionDTO[];
  createTransaction: (transaction: TransactionInputDTO) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

interface ChildrenProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: ChildrenProps) {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

  useEffect(() => {
    api.get("transactions").then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInputDTO) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;
    setTransactions((old) => [...old, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
