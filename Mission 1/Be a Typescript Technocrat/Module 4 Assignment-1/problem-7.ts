class Car {
    private name: string;
    private model: string;
    private year: number;

    constructor(name: string, model: string, year: number) {
        this.name = name;
        this.model = model;
        this.year = year;
    }

    public getCarAge(): number{
        const currentYear = new Date().getFullYear();
         return currentYear - this.year;
    }
}
