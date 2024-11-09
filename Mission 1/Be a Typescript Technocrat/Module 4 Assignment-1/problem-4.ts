type Circle = { shape: "circle", radius: number };
type Rectangle = { shape: "rectangle", width: number, height: number };


function calculateShapeArea(shape: Circle | Rectangle): number {
    if (shape.shape === "circle") {
        return Math.PI * shape.radius ** 2;
    } else {
        return shape.width * shape.height;
    }
}