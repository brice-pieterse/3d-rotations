export declare class Vector3D {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    normalize(): this;
    dot(v: Vector3D): number;
    cross(v: Vector3D): Vector3D;
    add(v: Vector3D): Vector3D;
    copy(v: Vector3D): this;
    clone(): Vector3D;
    multiplyByScalar(k: number): this;
}
export declare class Matrix3d {
    columns: (Vector3D)[];
    axis: Vector3D | undefined;
    angle: number | undefined;
    constructor();
    makeArbitraryAxis(axis: Vector3D, angleRadians: number): void;
    transform(target: Vector3D): void;
}
export declare class Quaternion {
    real: number;
    x: number;
    y: number;
    z: number;
    constructor(real: number | null, imaginary: Vector3D | null);
    setFromAxisAngle(axis: Vector3D, angleRadians: number): void;
    rotate(v: Quaternion): Quaternion;
    rightMultiply(v: Quaternion): Quaternion;
    leftMultiply(v: Quaternion): Quaternion;
    getCongugate(): Quaternion;
}
export declare class Rotation3D {
    target: Vector3D;
    matrix: Matrix3d;
    axis: Vector3D | undefined;
    angle: number | undefined;
    constructor(target: Vector3D);
    applyRotation(): void;
    setFromAxisAngle(axis: Vector3D, angleRadians: number): void;
    toQuaternion(): Quaternion | undefined;
    fromQuaternion(q: Quaternion): void;
}
