export function isEven(num: number): boolean {
    return num % 2 === 0;
}

export function add(a: number, b: number): number {
    return a + b;
}

function hidden(): void {
    console.log('can\'t touch this');
}