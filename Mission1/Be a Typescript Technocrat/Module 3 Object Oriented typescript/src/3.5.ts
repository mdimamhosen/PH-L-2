{
    // Access Modifiers in OOP (Public, Private, Protected) in TypeScript

    // BankAccount Class
class BankAccount {
    // Public members can be accessed from anywhere
    public accountNumber: string;

    // Private members can only be accessed within the class
    private balance: number;

    // Protected members can be accessed within the class and by subclasses
    protected accountHolderName: string;

    constructor(accountNumber: string, accountHolderName: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = initialBalance;
    }

    // Public method to access private balance
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited: $${amount}`);
        }
    }

    // Public method to access private balance
    public withdraw(amount: number): void {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrew: $${amount}`);
        } else {
            console.log("Insufficient funds");
        }
    }

    // Public method to view the balance
    public getBalance(): number {
        return this.balance;
    }

    // Protected method, can be accessed by subclasses
    protected printAccountDetails(): void {
        console.log(`Account Number: ${this.accountNumber}`);
        console.log(`Account Holder: ${this.accountHolderName}`);
        console.log(`Balance: $${this.balance}`);
    }
}

// Create an instance of BankAccount
let myAccount = new BankAccount("123456789", "John Doe", 500);

// Accessing public members directly
console.log(myAccount.accountNumber);  // Accessible because it's public
myAccount.deposit(200);                // Accessible because it's public
console.log(myAccount.getBalance());   // Accessible because it's public

// Accessing private members directly would result in an error
// console.log(myAccount.balance); // Error: Property 'balance' is private and only accessible within class 'BankAccount'

// Accessing protected members directly would result in an error
// console.log(myAccount.accountHolderName); // Error: Property 'accountHolderName' is protected and only accessible within class 'BankAccount' and its subclasses

// Example of subclass using protected member
class PremiumAccount extends BankAccount {
    constructor(accountNumber: string, accountHolderName: string, initialBalance: number) {
        super(accountNumber, accountHolderName, initialBalance);
    }

    public printPremiumAccountDetails(): void {
        // Accessing protected member in subclass
        this.printAccountDetails();
    }
}

let premiumAccount = new PremiumAccount("987654321", "Jane Smith", 1000);
premiumAccount.printPremiumAccountDetails();  // Can access protected method from subclass




    //
}