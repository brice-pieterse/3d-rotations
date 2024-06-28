### 3D Rotations

While the notion of "Rotation" can be extended to general vector spaces, they're used most practically in $R^2$ and $R^3$. This project focuses on the latter, and specifically two interesting methods of performing these transformations:


#### Arbitrary Axis Rotation Matrices

To rotate some vector $\vec{v}$ around an arbitrary axis $\vec{n} = (a, b, c)$, we can use the following transformation matrix:

$\ [T] = \begin{bmatrix} a^2(1-\cos\theta) + \cos\theta & ab(1-\cos\theta) - c\sin\theta & ac(1-\cos\theta) + b\sin\theta \\ ab(1-\cos\theta) + c\sin\theta & b^2(1-\cos\theta) + \cos\theta & bc(1-\cos\theta) - a\sin\theta \\ ac(1-\cos\theta) - b\sin\theta & bc(1-\cos\theta) + a\sin\theta & c^2(1-\cos\theta) + \cos\theta \end{bmatrix}$

A derivation of this is possible by applying the following formula, known as Rodrigues rotation, for rotating a vector around an axis:

> $\cos\theta * \vec{v} + (1-\cos\theta)(\vec{v} \cdot \vec{n})\vec{n} + \sin\theta * (\vec{n} \times \vec{v})$


#### Quaternions

Without diving into the nitty gritty of quaternion algebra, we'll show the connection between the Rodriguez rotation formula above and quaternion rotation.

A quaternion is composed a real scalar part and an imaginary vector part: $q = q_0 + \vec{q}$

When the real part is 0, we call it a pure quaternion.

Multiplying two quaternions is simple, although the result is a bit ugly:

$q_1​q_2​=(a_1​+b_1​i+c_1​j+d_1​k)(a_2​+b_2​i+c_2​j+d_2​k)$

$q_1 q_2 =(a_1 a_2 - b_1 b_2 - c_1 c_2 - d_1 d_2)\;+$
$(a_1 b_2 + b_1 a_2 + c_1 d_2 - d_1 c_2) i\;+$
$(a_1 c_2 - b_1 d_2 + c_1 a_2 + d_1 b_2) j\;+$
$(a_1 d_2 + b_1 c_2 - c_1 b_2 + d_1 a_2) k$

But using the familiar dot and cross product notation we can consolidate this into the following:

$q_1q_2 = a_1a_2 − \vec{u_1} · \vec{u_2} + a_1\vec{u_2} + a_2\vec{u_1} + \vec{u_1} × \vec{u_2}$

The quaternion conjugate of $q$ is defined to be:

$\hat{q} = q_0 - \vec{q} = q_0 - q_1i - q_2j - q_3k$ 


It turns out that for some quaternion defined as $q = \cos\frac{\theta}{2} + \sin\frac{\theta}{2}\vec{u}$ and it's congugate $q = \cos\frac{\theta}{2} - \sin\frac{\theta}{2}\vec{u}$, we can prove that the product $qv\hat{q}$ with pure quaternion $v = 0 + \vec{v}$ results in the following expression:

$qv\hat{q} =$

$(q_0^2 − |\vec{q}|^2 )\vec{v} + 2(\vec{q} · \vec{v})\vec{q} + 2q_0(\vec{q} × \vec{v}) =$

$(\cos\frac{\theta}{2}^2 − \sin\frac{\theta}{2}^2 )\vec{v} + 2(\sin\frac{\theta}{2}\vec{u} · \vec{v})\sin\frac{\theta}{2}\vec{u} + 2\cos\frac{\theta}{2}(\sin\frac{\theta}{2}\vec{u} × \vec{v}) =$

$\cos\theta * \vec{v} + (1 − \cos\theta)(\vec{u} · \vec{v})\vec{u} + \sin\theta * (\vec{u} × \vec{v})$

Notice this is exactly the Rodriguez rotation formula for rotation a vector $\vec{v}$ about an arbitrary axis given by a unit vector $\vec{u}$!


#### Using this library

This library was meant to be an exploration of the implementation of these two methods.

To perform rotation using an arbitrary axis rotation matrix:

```
const target = new Vector3D(1, 0, 0)
const axis = new Vector3D(0, 0, 1)
const rot = new Rotation3D(target)
rot.setFromAxisAngle(axis, Math.PI/4)
rot.applyRotation()
```

To perform rotation using quaternion rotation:

```
const target = new Vector3D(1, 0, 0)
const axis = new Vector3D(0, 0, 1)
const quat = new Quaternion()
quat.setFromAxisAngle(axis, Math.PI/4)
const resultingVector = quat.rotate( new Quaternion(0, target) )
```

