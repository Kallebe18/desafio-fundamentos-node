import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.forEach(transaction => {
      switch (transaction.type) {
        default:
          break;
        case 'income':
          balance.income += transaction.value;
          break;
        case 'outcome':
          balance.outcome += transaction.value;
          break;
      }
    });

    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const balance = this.getBalance();
    if (type === 'outcome' && value > balance.total)
      throw Error('You dont have enough money for this transaction');
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
