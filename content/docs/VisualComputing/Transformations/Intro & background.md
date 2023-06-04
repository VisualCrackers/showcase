---
title: Intro & Background
weight: 1
type: docs
---

# **Intro & Background**

# **Transformations in Space**

In the field of Visual Computing, transformations play a key role in creating and manipulating images and objects in 2D and 3D environments. These operations allow us to alter the position, orientation, scale, and lighting of visual elements, providing a wide range of creative possibilities.

## **2D and 3D Space**
Before delving into transformations, it's important to understand the spaces we work in.

- **2D Space:** This refers to a two-dimensional space, where objects are represented on a horizontal plane. Coordinates (x, y) are used to specify the position of elements. You can imagine it as a sheet of paper where we draw our creations.

- **3D Space:** In this space, we add an additional dimension to the visual representation, allowing us to create and manipulate three-dimensional objects. We use coordinates (x, y, z) to locate elements in space. Think of it as a three-dimensional world where we can move objects in different directions.

### **Translations**

Translations allow us to move an object in space while maintaining its original shape and orientation. We can think of this as moving an object from one place to another without changing its appearance.

In 2D, translation is performed by displacing the (x, y) coordinates of an object in a specific direction. For example, if we want to move an object to the right, we increase the value of x by a certain amount. This can be represented by the following formula:
 ```
x' = x + dx
y' = y + dy
 ```
In 3D, we apply the same principle by shifting the (x, y, z) coordinates of the object in a specific direction. The displacement is achieved by adding constant values to each coordinate.

### **Scaling**

Scaling allows us to change the size of an object in space, either by enlarging or reducing it in all dimensions. This transformation is useful for adjusting the scale of an object according to our needs.

In 2D, scaling is performed by multiplying the (x, y) coordinates of the object by scale factors. For example, if we want to enlarge an object by a scale factor of 2, we multiply both the x and y coordinates by 2.

In 3D, the same principle applies by multiplying the (x, y, z) coordinates by scale factors to adjust the size of the object in all directions.

### **Rotations**

Rotations allow us to rotate an object around a reference point, changing its relative position and orientation in space. This type of transformation is essential for creating dynamic visual effects and changing the perspective of objects.

In 2D, rotation is performed by applying a rotation matrix to the (x, y) coordinates of the object. The rotation matrix is defined using a rotation angle and applied as follows:
```
x' = x * cos(theta) - y * sin(theta)
y' = x * sin(theta) + y * cos(theta)
```
In 3D, rotations can be performed around a specific axis, such as the x, y, or z axis. 3x3 rotation matrices or quaternions are used to perform rotations in three-dimensional space.

### **Lighting**

Lighting plays a crucial role in the visual perception of objects in a 3D environment. By manipulating light properties such as direction, intensity, and color, we can simulate different lighting conditions and add realism to our creations.

There are different lighting models, such as the Phong lighting model, that take into account the interaction of light with objects and their surfaces to calculate how it reflects and diffuses.

In addition to lighting models, special effects such as shadows, reflections, and textures can be applied to achieve even more realistic results.

### **Transformation Trees**

To efficiently manage multiple transformations, transformation trees are used. These hierarchical structures allow us to combine and apply transformations in a specific order, creating more complex visual effects.

A transformation tree is like following a series of steps to achieve a final transformation. Each node in the tree represents an individual transformation, and the nodes are organized in a hierarchical structure that determines the order in which transformations are applied.

This hierarchical organization allows us to create animations and complex visual effects by combining different transformations sequentially.