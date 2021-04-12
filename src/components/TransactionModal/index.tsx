import Modal from "react-modal";
import { ContainerTransactionModal, ContainerTypeButtons, TypeButton } from "./styles";

import entradaImg from "../../assets/income.svg";
import saidaImg from "../../assets/outcome.svg";

import closeImg from "../../assets/close.svg";
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface TransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function TransactionModal({ isOpen, onRequestClose }: TransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <button type="button" className="modal-close">
        <img src={closeImg} alt="fechar" />
      </button>

      <ContainerTransactionModal onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <ContainerTypeButtons>
          <TypeButton
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="#33CC95"
          >
            <img src={entradaImg} alt="Entrada" />
            <span>Entrada</span>
          </TypeButton>
          <TypeButton
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="#E52E4D"
          >
            <img src={saidaImg} alt="Saída" />
            <span>Saída</span>
          </TypeButton>
        </ContainerTypeButtons>
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </ContainerTransactionModal>
    </Modal>
  );
}
