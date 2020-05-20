import { Person } from './person';
import { IProvideInformation } from './interfaces';

export class Employee extends Person implements IProvideInformation {
    public department: string;

    // the private field 'salary' is implicit
    constructor(private salary: number) {
        super();
    }

    getInfo() {
        return `${this.firstName} ${this.lastName} is a ${this.department}`;
    }

    get currentSalary() {
        return this.salary;
    }

    giveRaise(amount: number) {
        this.salary += amount;
    }
}