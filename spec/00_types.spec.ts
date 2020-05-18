describe('types in typescript', () => {
    describe('declaring variables and constants', () => {
        it('implicity any', () => {
            let x;
            // can also be written as let x: any;
            x = 'Butts';
            expect(typeof x).toBe('string');

            x = 3.14;
            expect(typeof x).toBe('number');

            x = function () { }
            expect(typeof x).toBe('function');

            x = ['dog', 'cat', 'mouse', 99, 'tacos'];
            expect(typeof x).toBe('object');
        });
        it('implicity typing', () => {
            let y: number | string; // Union Type
            // y.
            // intellisense will show the UNION of available methods
            y = 3.14159;
            // intellisense will show methods available to a number
            expect(typeof y).toBe('number');

            y = '[1, 6, 9]';
            // intellisense will show methods available to a number array
            expect(typeof y).toBe('string');
        });
        it('messing around', () => {
            let x = 'butts';
            expect(typeof x).toBe('string');

            let y;
            expect(typeof y).toBe('undefined');

            let z: any;
            expect(typeof z).toBe('undefined');
        });
        it('has const', () => {
            const x = 3; // must initialize

            const y = [16, 23, 666];
            // can't do y = [1, 2, 3]
            y[0] = 17;
            expect(y).toEqual([17, 23, 666]);

        });
        it('has interfaces', () => {
            interface Movie { title: string; yearReleased: number; director: string };
            let art: Movie | { title: string; singer: string; duration: number }; // "song" interface
            art = {
                title: 'Royal Tennenbaums',
                yearReleased: 2005,
                director: 'Wes Anderson'
            };
            expect(typeof art).toBe('object'); // why not Movie?
            expect(art.title).toEqual('Royal Tennenbaums');
            art = {
                title: 'Ronin',
                singer: 'Sturgill Simpson',
                duration: 3.5
            }
            expect(typeof art).toBe('object');
            expect(art.title).toEqual('Ronin');
        });
    });
    describe('literals in TS', () => {
        it('has string literals', () => {
            const n1 = 'Bob';
            // tslint:disable-next-line: quotemark
            const n2 = "Bob";
            expect(n1).toEqual(n2);
            // tslint:disable-next-line: quotemark
            const someHtml = "<h1 class=\"pretty\">Hello</h1>";
        });
        it('has template strings', () => {
            const n1 = `butts`;
            const n2 = `butts`;
            expect(n1).toEqual(n2);

            const multi = `this is a line
and so is this
and so is this also`;

            const name = 'Tina';
            const age = 13;

            const str1 = name + ' is age ' + age + ' and likes ' + n1;
            expect(str1).toEqual('Tina is age 13 and likes butts');

            const str2 = `${name} is age ${age} and likes ${n1}`;
            expect(str2).toEqual('Tina is age 13 and likes butts');
        });
    });
});