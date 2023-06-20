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

## **Lighting**

Lighting plays a crucial role in the visual perception of objects in a 3D environment. By manipulating light properties such as direction, intensity, and color, we can simulate different lighting conditions and add realism to our creations.

In p5.js, there are several types of lighting that can be used to enhance the visual appearance of 3D scenes. Here are some of the lighting types commonly used in p5.js:

1. **Ambient Light:**
Ambient light simulates the overall illumination in a scene by evenly lighting all objects. It doesn't have a specific direction or source but provides a base level of light that helps to eliminate pure darkness. The ambientLight() function in p5.js allows you to set the color and intensity of the ambient light.

2. **Directional Light:**
Directional light represents a distant light source, such as the sun, that emits light rays in parallel. It has a specific direction and illuminates objects uniformly from one side. The directionalLight() function in p5.js lets you define the direction, color, and intensity of the directional light.

3. **Point Light:**
Point light simulates a light source that radiates light uniformly in all directions from a specific point in space. It creates smooth shading on objects, with the intensity decreasing as the distance from the light source increases. The pointLight() function in p5.js allows you to specify the position, color, and intensity of the point light.

4. **Spot Light:**
Spot light represents a cone-shaped light source that illuminates objects within a defined cone angle. It has a position, direction, and a narrow beam of light. The intensity of the spot light decreases as objects move away from the cone's center. The spotLight() function in p5.js enables you to set the position, direction, cone angle, and other parameters for the spot light.

## **Transformation Trees**

Transformation trees are hierarchical structures used to manage multiple transformations efficiently. They enable the combination and application of transformations in a specific order, resulting in more complex visual effects.

In p5.js, transformation trees can be implemented using a technique known as the push-pop matrix stack. This stack-based approach allows you to define a series of transformations and manage them in a hierarchical manner.

Here's how you can use transformation trees in p5.js:

1. **Begin a Transformation Tree:**
To start a transformation tree, you use the ``push()`` function in p5.js. This function saves the current state of transformations and pushes it onto the transformation stack.

2. **Apply Transformations:**
Within the transformation tree, you can apply various transformations such as translations, rotations, and scalings. These transformations alter the coordinate system, allowing you to manipulate objects in different ways. For example, you can use the ``translate()``, ``rotate()``, and ``scale()`` functions in p5.js to apply these transformations.

3. **Nesting Transformation Trees:**
You can create more complex transformations by nesting transformation trees within each other. By using additional ``push()`` and ``pop()`` function calls, you can create a hierarchical structure where transformations at each level affect their child nodes.

4. **End a Transformation Tree:**
To conclude a transformation tree, you use the ``pop()`` function. This function pops the most recently saved state of transformations from the stack, reverting to the previous state.

By organizing transformations in a hierarchical structure, transformation trees allow you to create animations and complex visual effects. For example, you can animate an object's position, scale, and rotation over time by combining translation, scaling, and rotation transformations within a transformation tree. Furthermore, you can apply transformation trees to create intricate scenes with multiple objects. By nesting transformation trees, you can create parent-child relationships between objects, enabling transformations relative to their parent's coordinate system.