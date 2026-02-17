function calculateArea(shape: 'circle', radius: number): number;
function calculateArea(shape: 'square', side: number): number;

function calculateArea(shape: 'circle' | 'square', param: number): number {
    if (shape === 'circle') {
        return Math.PI * param * param;
    } else {
        return param * param;
    }
}

const circleArea = calculateArea('circle', 5);
const squareArea = calculateArea('square', 4);

console.log(`Площадь круга с радиусом 5: ${circleArea.toFixed(2)}`);
console.log(`Площадь квадрата со стороной 4: ${squareArea}`);
