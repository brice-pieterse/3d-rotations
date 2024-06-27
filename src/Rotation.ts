/*

 *  Rotation3D.js
 *  Project: 3D Transformations Helpers
 *  
 *  Description:
 *  This file contains helper functions for performing 3D rotations using arbitrary
 *  axes and quaternions. The functions are designed to facilitate various rotation
 *  operations required in 3D graphics, simulations, and other applications involving
 *  3D transformations.

*/


export class Vector3D {
    x: number = 0
    y: number = 0
    z: number = 0

    constructor(x?: number, y?: number, z?: number){
        if(typeof(x) == "number" && typeof(y) == "number" && typeof(z) == "number"){
            this.x = x
            this.y = y
            this.z = z
        }
    }

    normalize(){
        if(!(this.x || this.y || this.z)){
            throw new Error("zero vector cannot be normalized")
        }

        const n = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2))

        this.x *= 1/n
        this.y *= 1/n
        this.z *= 1/n

        return this
    }

    dot(v: Vector3D){
        return this.x * v.x + this.y * v.y + this.z * v.z
    }

    cross(v: Vector3D): Vector3D{
        return new Vector3D(
            this.y * v.z - this.z * v.y, 
            this.z * v.x - this.x * v.z, 
            this.x * v.y - this.y * v.x
        )
    }

    add(v: Vector3D){
        return new Vector3D(this.x + v.x, this.y + v.y, this.z + v.z)
    }

    copy(v: Vector3D){
        this.x = v.x
        this.y = v.y
        this.z = v.z

        return this
    }

    clone(){
        return new Vector3D(this.x, this.y, this.z)
    }

    multiplyByScalar(k: number){
        this.x *= k
        this.y *= k
        this.z *= k

        return this
    }
}


export class Matrix3d {
    columns: (Vector3D)[]
    axis: Vector3D | undefined
    angle: number | undefined

    constructor(){
        this.columns = [
            new Vector3D(1, 0, 0),
            new Vector3D(0, 1, 0),
            new Vector3D(0, 0, 1),
        ]
    }

    makeArbitraryAxis(axis: Vector3D, angleRadians: number){

        this.axis = axis
        this.angle = angleRadians

        // transformed basis e_1

        this.columns[0].x = Math.pow(this.axis.x, 2) * (1 - Math.cos(angleRadians)) + Math.cos(angleRadians)

        this.columns[0].y = this.axis.x * this.axis.y * (1 - Math.cos(angleRadians)) + this.axis.z * Math.sin(angleRadians)

        this.columns[0].z = this.axis.x * this.axis.z * (1 - Math.cos(angleRadians)) - this.axis.y * Math.sin(angleRadians)

        // transformed basis e_2

        this.columns[1].x = this.axis.x * this.axis.y * (1 - Math.cos(angleRadians)) - this.axis.z * Math.sin(angleRadians)

        this.columns[1].y = Math.pow(this.axis.y, 2) * (1 - Math.cos(angleRadians)) + Math.cos(angleRadians)

        this.columns[1].z = this.axis.y * this.axis.z * (1 - Math.cos(angleRadians)) + this.axis.x * Math.sin(angleRadians)

        // transformed basis e_3

        this.columns[2].x = this.axis.x * this.axis.z * (1 - Math.cos(angleRadians)) + this.axis.y * Math.sin(angleRadians)

        this.columns[2].y = this.axis.y * this.axis.z * (1 - Math.cos(angleRadians)) - this.axis.x * Math.sin(angleRadians)

        this.columns[2].z = Math.pow(this.axis.z, 2) * (1 - Math.cos(angleRadians)) + Math.cos(angleRadians)
    }


    transform(target: Vector3D) {
       target.copy(new Vector3D(
            target.x*this.columns[0].x + 
            target.y*this.columns[1].x + 
            target.z*this.columns[2].x,

            target.x*this.columns[0].y + 
            target.y*this.columns[1].y + 
            target.z*this.columns[2].y,

            target.x*this.columns[0].z + 
            target.y*this.columns[1].z + 
            target.z*this.columns[2].z
        ))
    }
}


export class Quaternion {

    // real part
    real: number = 0

    // imaginary vector components
    x: number = 0
    y: number = 0
    z: number = 0


    constructor(real: number | null, imaginary: Vector3D | null) {
        if(real){
            this.real = real
        }
        if(imaginary){
            this.x = imaginary.x
            this.y = imaginary.y
            this.z = imaginary.z
        }
    }

    setFromAxisAngle(axis: Vector3D, angleRadians: number){
        axis.normalize()
        this.real = Math.cos(angleRadians/2)
        const imaginary = axis.clone().normalize()
        imaginary.multiplyByScalar(Math.sin(angleRadians/2))
        this.x = imaginary.x
        this.y = imaginary.y
        this.z = imaginary.z
    }

    rotate(v: Quaternion): Quaternion {
        const cong = this.getCongugate()
        return this.leftMultiply(cong.rightMultiply(v))
    }

    rightMultiply(v: Quaternion): Quaternion {

        let real = this.real * v.real - new Vector3D(this.x, this.y, this.z).dot(new Vector3D(v.x, v.y, v.z))

        let c1 = new Vector3D(this.x, this.y, this.z).multiplyByScalar(v.real)
        let c2 = new Vector3D(v.x, v.y, v.z).multiplyByScalar(this.real)
        let c3 = new Vector3D(v.x, v.y, v.z).cross(new Vector3D(this.x, this.y, this.z))

        // console.log("c1: ", c1)
        // console.log("c2: ",c2)
        // console.log("c3: ",c3)

        let imag = new Vector3D().copy(c1).add(c2).add(c3)

        return new Quaternion(real, imag)

    }

    leftMultiply(v: Quaternion): Quaternion {

        let real = this.real * v.real - new Vector3D(this.x, this.y, this.z).dot(new Vector3D(v.x, v.y, v.z))

        let imag = new Vector3D(v.x, v.y, v.z).multiplyByScalar(this.real)
        .add(
            new Vector3D(this.x, this.y, this.z).multiplyByScalar(v.real)
        )
        .add(
            new Vector3D(this.x, this.y, this.z).cross(new Vector3D(v.x, v.y, v.z))
        )

        return new Quaternion(real, imag)

    }

    getCongugate(){
        return new Quaternion(
            this.real, 
            new Vector3D(this.x, this.y, this.z)
                .multiplyByScalar(-1)
        )
    }

}



export class Rotation3D {
    target: Vector3D
    matrix: Matrix3d
    axis: Vector3D | undefined
    angle: number | undefined

    constructor(target: Vector3D){
        this.target = target
        this.matrix = new Matrix3d()
    }

    applyRotation(){
        this.matrix.transform(this.target)
    }


    setFromAxisAngle(axis: Vector3D, angleRadians: number){
        this.matrix.makeArbitraryAxis(axis, angleRadians)
        this.axis = axis
        this.angle = angleRadians
    }


    toQuaternion(){
        if(this.axis && this.angle){
            return new Quaternion(
                Math.cos(this.angle/2), 
                this.axis.clone().normalize().multiplyByScalar(Math.sin(this.angle/2)) 
            )
        }
    }


    fromQuaternion(q: Quaternion){
        this.setFromAxisAngle(
            new Vector3D(q.x, q.y, q.z),
            Math.acos(q.real) * 2
        )
    }

}