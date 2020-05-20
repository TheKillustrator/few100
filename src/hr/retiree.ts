import { Person } from './person';

export class Retiree extends Person {

    constructor(private pension: number) {
        super();
    }

    get currentPension() {
        return this.pension;
    }

    // implicitly implements IProvideInformation!!! "duck typing"
    getInfo() {
        return `${this.firstName} ${this.lastName} is a retiree`;
    }
}