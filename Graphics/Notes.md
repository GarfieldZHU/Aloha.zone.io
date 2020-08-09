# Graphics 

Some notes or materials of key concepts and points in graphics learning.

### Euler angle & Gimbal Lock

##### Euler angle

From [Wikipedia](https://en.wikipedia.org/wiki/Euler_angles), it has a gif which describes:

![Euler angle](https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Euler2a.gif/340px-Euler2a.gif).

Euler angle intuitively describes a series of rotations to make a object rotated to expected angle in 3D dimensino.
A [gyroscope](https://en.wikipedia.org/wiki/Gyroscope) is a typical way using Euler angle keeps rotation axis constant: 

![gyroscope rotation](https://upload.wikimedia.org/wikipedia/commons/d/d5/Gyroscope_operation.gif)

Aircraft could be a most common example for a spatial rotation, which are described with Euler angles by three axes: Pitch, Roll, Yaw.

- The angles:

![plane angles](https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Plane_with_ENU_embedded_axes.svg/440px-Plane_with_ENU_embedded_axes.svg.png)

- The axes:

![plane axes](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Yaw_Axis_Corrected.svg/500px-Yaw_Axis_Corrected.svg.png)

- The rotation:

![plane rotation](./.assets/aircraft.gif)

<br />

##### Gimbal Lock

However, using three axes gimbal which describe Euler angle for rotation will reach a ambiguity when the gimbals (coordinate planes) are mounted together.

![Gimbal Lock](https://upload.wikimedia.org/wikipedia/commons/5/5a/Gimbal_3_axes_rotation.gif)

It is called _**Loss of a degree of freedom with Euler angles**_.

We can resolve it by [quaternions](https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation) in a real spatial rotation. 
But we can still use Euler angle to describe spatial rotation in a human readable way, when we are aware of the existence of the lock.
