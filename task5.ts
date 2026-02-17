type StringFormatter = (str: string, uppercase?: boolean) => string;

const firstUp: StringFormatter = (str: string, uppercase: boolean = false): string => {
    if (str.length === 0) return str;

    return str.charAt(0).toUpperCase() + str.slice(1);
};

const delSpaceAnduppercase: StringFormatter = (str: string, uppercase: boolean = false): string => {
    const trimmed = str.trim();
    
    if (uppercase) {
        return trimmed.toUpperCase();
    }
    
    return trimmed;
};

console.log(`'делает' -> '${firstUp('делает')}'`);
console.log(`'первую' -> '${firstUp('первую')}'`);
console.log(`'букву' -> '${firstUp('букву')}'`);
console.log(`заглавной'${firstUp('заглавной')}'`);

console.log(`'  обрезает пробелы  ' -> '${delSpaceAnduppercase('  обрезает пробелы  ')}'`);
console.log(`'  по краям  ' (uppercase=true) -> '${delSpaceAnduppercase('  по краям  ', true)}'`);
console.log(`'  и, если uppercase is true  ' -> '${delSpaceAnduppercase('  и, если uppercase is true  ')}'`);
console.log(`'  приводит всю строку к верхнему регистру  ' (uppercase=true) -> '${delSpaceAnduppercase('  приводит всю строку к верхнему регистру  ', true)}'`);
