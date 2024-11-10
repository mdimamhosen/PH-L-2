{
    //

    // Encapsulation In TypeScript with OOP Concept
    // BankAccount class
    class BankAccount {
        // Public property: Accessible from anywhere
        public accountNumber: string;
    
        // Private property: Accessible only within the class
        private balance: number;
    
        // Protected property: Accessible within the class and its subclasses
        protected accountHolderName: string;
    
        constructor(accountNumber: string, accountHolderName: string, initialBalance: number) {
            this.accountNumber = accountNumber;
            this.accountHolderName = accountHolderName;
            this.balance = initialBalance;
        }
    
        // Public method: Accessible from anywhere
        public deposit(amount: number): void {
            if (amount > 0) {
                this.balance += amount;
                console.log(`Deposited: $${amount}`);
            }
        }
    
        // Public method: Accessible from anywhere
        public withdraw(amount: number): void {
            if (amount > 0 && this.balance >= amount) {
                this.balance -= amount;
                console.log(`Withdrew: $${amount}`);
            } else {
                console.log("Insufficient funds");
            }
        }
    
        // Public method: Accessible from anywhere
        public getBalance(): number {
            return this.balance;
        }
    
        // Protected method: Accessible within the class and its subclasses
        protected printAccountDetails(): void {
            console.log(`Account Number: ${this.accountNumber}`);
            console.log(`Account Holder: ${this.accountHolderName}`);
            console.log(`Balance: $${this.balance}`);
        }
    }
    
    // Create an instance of BankAccount
    let account = new BankAccount("123456789", "John Doe", 1000);
    
    // Accessing public property
    console.log(account.accountNumber);  // Accessible because it's public
    
    // Accessing public method
    account.deposit(500);   // Accessible because it's public
    account.withdraw(200);  // Accessible because it's public
    console.log(account.getBalance());  // Accessible because it's public
    
    // Accessing private property directly would result in an error
    // console.log(account.balance);  // Error: Property 'balance' is private and only accessible within class 'BankAccount'
    
    // Accessing protected property directly would result in an error
    // console.log(account.accountHolderName);  // Error: Property 'accountHolderName' is protected and only accessible within class 'BankAccount' and its subclasses
    
    // Example of subclass using protected method and property
    class PremiumAccount extends BankAccount {
        constructor(accountNumber: string, accountHolderName: string, initialBalance: number) {
            super(accountNumber, accountHolderName, initialBalance);
        }
    
        // Method in subclass that calls the protected method of the parent class
        public printPremiumAccountDetails(): void {
            this.printAccountDetails();  // Accessing the protected method from the parent class
        }
    }
    
    // Create an instance of PremiumAccount
    let premiumAccount = new PremiumAccount("987654321", "Jane Smith", 2000);
    premiumAccount.printPremiumAccountDetails();  // Can access protected method from subclass
    


    //
}