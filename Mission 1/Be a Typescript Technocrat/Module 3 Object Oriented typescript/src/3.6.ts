{
    //
        //  Getter and Setter in TypeScript with OOP Concept
    // BankAccount class
    class BankAccount {
        // Properties
        private accountNumber: number;
        private holderName: string;
        private balance: number;
        // Constructor
        constructor(accountNumber: number, holderName: string, balance: number) {
            this.accountNumber = accountNumber;
            this.holderName = holderName;
            this.balance = balance;
        }

        // Getter and Setter
        get getAccountNumber(): number {
            return this.accountNumber;
        }
        set setAccountNumber(accountNumber: number) {
            this.accountNumber = accountNumber;
        }
        get getHolderName(): string {
            return this.holderName;
        }
        set setHolderName(holderName: string) {
            this.holderName = holderName;
        }
        get getBalance(): number {
            return this.balance;
        }
        set setBalance(balance: number) {
            this.balance = this.balance + balance;
        }
    }	// End of BankAccount class
    // Create an object of BankAccount class
    let account = new BankAccount(123456, 'John Doe', 5000);
    // Display the details
    console.log('Account Number:', account.getAccountNumber);
    console.log("Previous Balance:", account.getBalance);
    console.log('Balance Deposit:', account.setBalance = 5000);
    console.log("New Balance:", account.getBalance);

    // By using setter method and getter method we can set and get the value of the private properties of the class. And also we can use the getter and setter method as a property of the class.

    //
}