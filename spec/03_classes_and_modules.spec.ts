import { Employee, Retiree, IProvideInformation } from '../src/hr';

describe('using classes and stuff', () => {
    it('is an example employee', () => {
        const bob = new Employee(90_000);
        bob.firstName = 'Robert';
        bob.lastName = 'Smith';
        bob.department = 'DEV';

        expect(bob.firstName).toBe('Robert');
        expect(bob.getInfo()).toBe('Robert Smith is a DEV');
        expect(bob.currentSalary).toBe(90_000);
        bob.giveRaise(10_000);
        expect(bob.currentSalary).toBe(100_000);
    });
    it('a retiree', () => {
        const sue = new Retiree(50_000);
        sue.firstName = 'Susan';
        sue.lastName = 'Homer';
        expect(sue.currentPension).toBe(50_000);
        // expect(sue.pension).toBe(50_000); also passes because there's no privacy in JS
        showInformation(sue);
        function showInformation(thing: IProvideInformation) {
            console.log(thing.getInfo());
        }
    });
});