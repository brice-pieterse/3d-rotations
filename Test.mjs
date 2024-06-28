import { Vector3D, Matrix3d, Quaternion, Rotation3D } from "./build/rotation.module.js";


// Arbitrary axis rotation
const target = new Vector3D(1, 0, 0)
const targetCopy = target.clone()

const rot = new Rotation3D(target)
rot.setFromAxisAngle(new Vector3D(0, 0, 1), Math.PI/4)
rot.applyRotation()


// Quaternion rotation
const quat = new Quaternion()
quat.setFromAxisAngle(new Vector3D(0, 0, 1), Math.PI/4)
let rotatedTargCopy = quat.rotate( new Quaternion(0, targetCopy) )


console.log("copy", target, rotatedTargCopy)
