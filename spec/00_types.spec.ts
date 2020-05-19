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
            const x = 'butts';
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
        it('has various ways to express numeric literals', () => {
            let age: number;
            age = 51;

            const n2 = 1.2;
            const n3 = 0xff; // Base 16 (Hex)
            const n4 = 0b010101; // base 2 (binary)
            const reallyBigNumber = 1_000_382;
            expect(reallyBigNumber).toBe(1000382);
        });
        describe('arrays and array literals', () => {
            it('has two ways t odeclare an array', () => {
                let stuff: (number | string)[];
                stuff = ['dog', 'cat', 99];
                expect(stuff[0]).toBe('dog');
                expect(stuff[999]).toBeUndefined();

                let otherstuff: Array<number | string>;
                otherstuff = [1, 'bird', 99];
            });
            it('has array destructuring and a rest operator', () => {
                const friends = ['ilona', 'eric', 'josh', 'jake'];
                // const friend1 = friends[0];
                // const friend2 = friends[2];
                const [friend1, , friend3] = friends;
                expect(friend1).toBe('ilona');
                expect(friend3).toBe('josh');

                // rest operator = prelipses
                const [birthdayGirl, ...others] = friends;
                expect(birthdayGirl).toBe('ilona');
                expect(others).toEqual(['eric', 'josh', 'jake']);

                // spread operator = prelipses
                const extendedFriends = ['lindsay', ...friends, 'amy'];
                expect(extendedFriends).toEqual(['lindsay', 'ilona', 'eric', 'josh', 'jake', 'amy']);

                // rest operator in the arguments
                function addThemAll(...numbers: number[]) {
                    return numbers.reduce((s, n) => s + n);
                }
                expect(addThemAll(1)).toBe(1);
                expect(addThemAll(2, 2)).toBe(4);
                expect(addThemAll(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
            });
            it('tuples', () => {
                // typed arrays
                const stuff: [string, number, string] = ['bob', 666, 'dobbs'];
                const first = stuff[0]; // always type string
                const second = stuff[1]; // always type number

                // tuples
                let b: [string, string, number] = ['a', 'b', 3];
                b = ['d', 'e', 5];
                // b = [2, 'e', '5']; can't do this

                // as opposed to
                let a: (string | number)[] = ['a', 'b', 1];
                a = [3, 4];
                a = ['c', 'd', 'e'];

                // type alias
                type QuoteMarkRule = [boolean, 'single' | 'double']; // union literal type
                const myQuoteRule: QuoteMarkRule = [true, 'double'];
                if (myQuoteRule[0]) {
                    console.log(`You are enforcing quote marks and using ${myQuoteRule[1]} quotes`);
                }
            });
            describe('a practical example of what you might use a tuple for (but probably would not)', () => {
                it('an oop approach', () => {
                    // string FormatName(string first, string last)
                    interface FormattedName { formattedName: string; numberOfLettersInName: number; }
                    function formatName(first: string, last: string): FormattedName {
                        const formattedName = `${last}, ${first}`
                        return {
                            formattedName,
                            numberOfLettersInName: formattedName.length
                        }
                    }
                    function formatNameCasually(first: string, last: string): FormattedName {
                        const formattedName = `${first} ${last}`;
                        return {
                            formattedName,
                            numberOfLettersInName: formattedName.length
                        }
                    }
                    const result = formatName('Han', 'Solo');
                    expect(result.formattedName).toBe('Solo, Han');
                    expect(result.numberOfLettersInName).toBe(9);
                    // const result2 = formatNameCasually('Luke', 'Skywalker');
                    // expect(result2.formattedName).toBe('Luke Skywalker');
                    const { formattedName: n } = formatNameCasually('Luke', 'Skywalker');
                    expect(n).toBe('Luke Skywalker');
                });
                it('if that wasn\'t confusing enough, here is tuples', () => {
                    function formatName(first: string, last: string): [string, number] {
                        const formattedName = `${last}, ${first}`;
                        return [formattedName, formattedName.length]
                    }
                    const results = formatName('Han', 'Solo');
                    expect(results[0]).toBe('Solo, Han');
                    expect(results[1]).toBe(9);
                    // but wait! We have destructuring
                    const [fullName] = formatName('Luke', 'Skywalker');
                    expect(fullName).toBe('Skywalker, Luke');
                });
            });
            it('destructuring an object', () => {
                const movie = { title: 'A New Hope', director: 'Lucas', yearReleased: 1977 };
                // Old Skool
                const t1 = movie.title;
                const y1 = movie.yearReleased;
                expect(t1).toBe('A New Hope');
                expect(y1).toBe(1977);
                // new Skool
                const { title: t2, yearReleased: y2 } = movie;
                expect(t2).toBe('A New Hope');
                expect(y2).toBe(1977);
            });
            it('anonymous types are implicitly defined by an interface', () => {
                const thor: any = {
                    title: 'Thor: Ragnarok',
                    director: 'Taika Waititi',
                    yearReleased: 2017
                };
                thor.title = 'Thor Ragnorok';
                expect(thor.title).toBe('Thor Ragnorok');
                // tslint:disable-next-line: no-string-literal
                expect(thor['title']).toBe('Thor Ragnorok');
                thor.yearreleased = 2017;
                thor.nicehair = true;
            });
            it('truth table', () => {
                expect('').toBeFalsy(); // empty strings are false
                expect('tacos').toBeTruthy(); // any other strings are true
                expect(0).toBeFalsy(); // any string other than zero is truthy
                expect(1).toBeTruthy();
                expect(-1).toBeTruthy();
                expect(undefined).toBeFalsy();
                expect(null).toBeFalsy();
                expect(NaN).toBeFalsy(); // Not a number. like if you try to subtract a 'cat' from 10.
            });
            it('you can make extensible objects', () => {
                interface Book {
                    title: string;
                    author: { firstName: string, lastName: string };
                    numberOfPages: number;
                    publisher?: string;
                }
                const highWeirdness: Book = {
                    title: 'High Weirdness',
                    author: {
                        firstName: 'Erik',
                        lastName: 'Davis'
                    },
                    numberOfPages: 545
                };
                expect(highWeirdness.author.lastName).toBe('Davis');
                const theBrokeHorses: Book = {
                    title: 'The Broke Horses',
                    author: { firstName: 'Jannette', lastName: 'Walls' },
                    numberOfPages: 265,
                    publisher: 'Penguin'
                }
                function doSomethingWithABook(book: Book): string {
                    let result = `Book ${book.title} by ${book.author.lastName} has ${book.numberOfPages}`;
                    if (book.publisher) {
                        result += ` and was published by ${book.publisher}`;
                    }
                    return result;
                }
            });
            it('has duck typing (aka structural typing)', () => {
                interface MessageHaver { message: string }
                function logMessage(item: MessageHaver) {
                    console.log(`At ${new Date().toLocaleTimeString()} you got the message ${item.message}`);
                }
                logMessage({ message: 'Call your mom' });
                const phoneCall = {
                    from: 'Jenny',
                    number: '867-5309',
                    message: 'For a good time...'
                };
                logMessage(phoneCall);
            });
            it('a weird way to make an expando object', () => {
                interface AtLeastHasAMessage {
                    message: string;
                    [key: string]: any; // can have any other properties.
                }
                const phoneCall: AtLeastHasAMessage = {
                    message: 'Call your mom',
                    from: 'Your Mom',
                    time: 'Noon',
                    number: '999-999-9999'
                }
                // expect(phoneCall['number']).toBe('999-999-9999');
                // 'Dictionary'
                // Dictionary<string, int> bowlingScores;
                // bowlingScores['craig'] = 127;
                // bowlingScores['joe'] = 288;
                interface BowlingScores {
                    [key: string]: number;
                }
                interface Dictionary<T> {
                    [key: string]: T
                }
                const scores: Dictionary<number> = {
                    craig: 127,
                    joe: 288,
                    'mary ann': 300
                }
                expect(scores.craig).toBe(127);
                expect(scores['mary ann']).toBe(300);
                scores['jimmy jo bob'] = 145;
                const nickNames: Dictionary<string> = {
                    bill: 'Billarama!',
                    kevin: 'kev'
                }
                expect(nickNames.kevin).toBe('kev');
            });
        });
    });
});