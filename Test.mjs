import { Vector3D, Matrix3d, Quaternion, Rotation3D } from "./build/rotation.module.js";



const target = new Vector3D(1, 0, 0)
const targetCopy = target.clone()

const rot = new Rotation3D(target)
rot.setFromAxisAngle(new Vector3D(0, 0, 1), Math.PI/4)
rot.applyRotation()

const quat = new Quaternion()
quat.setFromAxisAngle(new Vector3D(0, 0, 1), Math.PI/4)
let rotatedTargCopy = quat.rotate( new Quaternion(0, targetCopy) )

// const p = new Quaternion(3, new Vector3D(1, -2, 1))
// const q = new Quaternion(2, new Vector3D(-1, 2, 3))

// console.log(q.rightMultiply(p))


console.log("copy", target, rotatedTargCopy)
// console.log(new Vector3D(0, 0, 1).cross(new Vector3D(1, 0, 0)))