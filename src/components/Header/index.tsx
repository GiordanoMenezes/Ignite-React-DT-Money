import logo from '../../assets/logo.svg';
import { ContainerHeader, ContentHeader } from './styles';

interface HeaderProps {
  onTransactionRequest: () => void;
}

export function Header({ onTransactionRequest }: HeaderProps) {
  return (
    <ContainerHeader>
      <ContentHeader>
        <img src={logo} alt="dt money" />
        <button type="button" onClick={onTransactionRequest}>
          Nova Transação
        </button>
      </ContentHeader>
    </ContainerHeader>
  );
}
