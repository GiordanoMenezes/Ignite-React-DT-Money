import { Summary } from '../Summary';
import { TransactionTable } from '../TransactionsTable';
import { ContainerDashboard } from './styles';

export function Dashboard() {
  return (
    <ContainerDashboard>
      <Summary />
      <TransactionTable />
    </ContainerDashboard>
  );
}
