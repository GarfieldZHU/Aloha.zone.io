# Transformation & Rasterization



## Transformation

### Basic 2D transformations

- Scaling
  <details>
    <summary>Scale an image at x axis </summary>
    <img src="./.assets/scale.png" />
    
    <p>Each point (x0, y0) becomes (x1, y1) after scaling, then we define scaling matrix S(x,y): </p>
    
    <img src="./.assets/scale_matrix.png" />
  </details>


- Rotation
  <details>
    <summary>Rotate an image (origin point as center) </summary>
    <img src="./.assets/rotate.png" />
    <p>Suppose the rotate matrix R(θ) has: </p>
    <img src="./.assets/rotate_condition.png" />
  
    <p><b>Prove: </b></p>
    <p>(1, 0) becomes (cosθ, sinθ)</p>
    <img src="./.assets/rotate_prove_1.png" />
    <p>(0, 1) becomes (-sinθ, cosθ)</p>
    <img src="./.assets/rotate_prove_2.png" />
    
    <p>Then, we have the definition of R </p>
    <img src="./.assets/rotate_matrix.png" />
  </details>

- Linear transformation

  Scaling and rotation are both shown as a linear form of matrix. 
  <details>
    <summary>Linear transformation</summary>
    <img src="./.assets/linear_1.png" />
    <img src="./.assets/linear_2.png" />
  </details>

- Translation

  <details>
    <summary>Translation is just the simple movement of the object in coordinate. </summary>
    <img src="./.assets/translate.png" />
    <img src="./.assets/translate_matrix.png" />
  </details>

### Homogeneous coordinates 

A translation is different from linear transformation. Now it must be two matrix for combining them:

<details>
  <summary>A matrix with both linear transformation and translation.</summary>
  <img src="./.assets/combined.png" />
  <img src="./.assets/translate_matrix.png" />
</details>

But we want one matrix to express them together. Now we introduce a new tool: [homogeneous coordinates](https://en.wikipedia.org/wiki/Homogeneous_coordinates).

##### Defintion

To be simply, homogeneous coordinate works by adding an extra dimention to matrix, for describing higher dimention caused transformation, like projection. 
In other word, an n-dimention space will be described by n+1-dimention matrices. 

We are discussing 2D transformation, so we express them in ternary form:

- 2D point: (x, y, 1)
- 2D vector: (x, y, 0)

Accordingly, the transformation matrix will be 3D matrix as well: 

<details>
  <summary>Transform matrix in homogeneous coordinates:</summary>
  <img src="./.assets/homogeneous.png" />
</details>

The homogeneous transform grants us the characteristics below: 

1. "w" value will not be changed for vectors.
  <details>
    <summary>Translate vector :</summary>
    <img src="./.assets/translate_vector.png" />
  </details>

2. Vector + Vector = Vector
  - [x1, y1, 0] + [x2, y2, 0] = [x1 + x2, y1 + y2, 0]

3. Point - Point = Vector
  - [x1, y1, 1] - [x2, y2, 1] = [x1 - x2, y1 - y2, 0]

3. Point + Vector = Point
  - [x1, y1, 1] + [x2, y2, 0] = [x1 - x2, y1 - y2, 1]


##### Affine transformation

Applied homogeneous matrix, we have a transformation named "[Affine transformation](https://en.wikipedia.org/wiki/Affine_transformation)".

<details>
  <summary>Affine transformation:</summary>
  <img src="./.assets/affine.png" />
</details>

<details>
  <summary>With this utility, we can have expression the above three transformations in homogeneous style: </summary>
  <img src="./.assets/transform_in_affine.png" />
  
  <p>Of cource, the three transformations can be combined in one. </p>
</details>



### In practise

Affine transformation matrix for 2D transformation is useful. In UI interface for drawing element, we typically pass this matrix for apply trasformation.

In the 3D transformation matrix, the 3rd row will always be [0, 0, 1], it does not need to be told as parameter.

So the transformation matrix in 2D drawing functions will typically be like:

[A, B, C, D, Tx, Ty]




### For 3D

Affine transformation in 3D is just similar with 2D. Just make the transformation matrix to be 4D.

#### Viewing transformation

#### Viewport transformation

#### Project transformation

#### Perspective transformation

TBD

## Rasterization

### Resolution

- Images resolution
  <details>
    <summary>An image rendered in different resolution </summary>
    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Resolution_illustration.png" />
  </details>

- Display resolution
  <details>
    <summary>The display devices resolution standard</summary>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Vector_Video_Standards8.svg/750px-Vector_Video_Standards8.svg.png" />
  </details>

- Screen space
  <details>
    <summary>The digital screen space are described as a 2-dimension matrix. One unit is shown as one pixel. </summary>
    <img src="https://scarletsky.github.io/2020/06/10/games101-notes-rasterization/screen_space.png" />
  </details>

- Subpixel layout
  <details>
    <summary>One pixel is consist of RGB subpixels. It has different stripes layout in different display devices. </summary>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Pixel_geometry_01_Pengo.jpg/330px-Pixel_geometry_01_Pengo.jpg" />

    <p>P30 Pro</p>
    <img src="./.assets/subpixels.png" />

    <p>Google Nexus One</p>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Nexus_one_screen_microscope.jpg/330px-Nexus_one_screen_microscope.jpg" />
  </details>


### Basic rasterization

What is [rasterization](https://en.wikipedia.org/wiki/Rasterisation)?  It is kind of a sampling.

An simple example: just imagine some colorful ink float on water, which show as a painting. Now we have a screen window, sink it under the water and slowly take it out.
Then we'll have a painted screen window, which is similar to rasterization.

[Bresenham's line algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) is the most basic rasterization algorithm for drawing lines (primitive, vector) as bitmaps.

  <details>
    <summary>Illustration of the result of Bresenham's line algorithm. </summary>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Bresenham.svg/450px-Bresenham.svg.png" />
  </details>

- Step 1:
  <details>
    <summary>Put a geometric figure (like triangle) in the screen space. </summary>
    <img src="./.assets/rasterize_01.png" />
  </details>

- Step 2:
  <details>
    <summary>Sampling: consider each pixel (center of pixel space) is inside or outside the triangle. </summary>
    <img src="./.assets/rasterize_02.png" />
  </details>

- Step 3:
  <details>
    <summary>Use bounding box to reduce sampling area. </summary>
    <img src="./.assets/rasterize_03.png" />
  </details>

- Step 4:
  <details>
    <summary>Get the pixels inside the triangle. </summary>
    <img src="./.assets/rasterize_04.png" />
  </details>

- Step 5:
  <details>
    <summary>Display the color in those pixels to show the triangle. </summary>
    <img src="./.assets/rasterize_05.png" />
  </details>

- Now we get a rasterized figure. But it is really jaggy. It could be improved by a higher resolutions. (See `MSPaint`)

### Antialiasing

#### Theory

- Bad "Sampling":
  <details>
    <summary>Antialising is just a sampling, a low frequency sampling on sharp images will get jaggy or [Moiré pattern](https://en.wikipedia.org/wiki/Moir%C3%A9_pattern) </summary>
    <img src="./.assets/AA_08.png" />
  </details>

- How sampling frequency losses the original signal:
  <details>
    <summary>If your resolution is not that high, you should see a 'blurred' image. </summary>
    <img src="./.assets/AA_01.png" />
    <img src="./.assets/AA_02.png" />
  </details>


- Blurr image before sampling:
  <details>
    <summary>If your resolution is not that high, you should see a 'blurred' image. </summary>
    <img src="./.assets/AA_00_a.png" />
    <img src="./.assets/AA_00_b.png" />
  </details>

#### Antialisaing

- Use [low-pass filter](https://en.wikipedia.org/wiki/Low-pass_filter) to blur the filter the high frequency signals:
  <details>
    <summary>Use convolution (or average color in the unit). </summary>
    <img src="./.assets/AA_03.png" />
  </details>

- SSAA/MSAA (Super/Multi-Sampling Anti-Aliasing):
  <details>
    <summary>Use a higher sampling ratio in single pixel.</summary>
    <img src="./.assets/AA_04.png" />
  </details>

  <details>
    <summary>Compare the different sampling effect. </summary>
    <p>Use single sampling in pixel: </p>
    <img src="./.assets/AA_05.png" />
    <p>Use multi-sampling in pixel: </p>
    <img src="./.assets/AA_06.png" />
  </details>

  <details>
    <summary>Convolution/Average to low resolution.</summary>
    <img src="./.assets/AA_07.png" />
  </details>

### Font rasterization

Refer to [Font rasterization on Wiki](https://en.wikipedia.org/wiki/Font_rasterization).

Fonts are now vectors, then they could be scaled from extreme small to very large. Rasterization for fonts are map a vector path to a pixel matrix.

![rasterization](./.assets/font_rasterize.webp)

Raw rasterized font without antialiasing:

<details>
  <summary>Sample</summary>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Rasterization-simple.png/200px-Rasterization-simple.png" />
</details>


#### Antialiasing in font

- Different antialias level

  - Basic antialias without hint
      <details>
        <summary>Sample</summary>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Rasterization-antialiasing-without-hinting-2.png/200px-Rasterization-antialiasing-without-hinting-2.png" />
      </details>

  - Antialias with hint
      <details>
        <summary>Sample</summary>
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Rasterization-antialiasing.png/200px-Rasterization-antialiasing.png" />
      </details>

  - Subpixel rendering for an RGB flat panel
      <details>
        <summary>Sample</summary>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Rasterization-subpixel-RGB.png/200px-Rasterization-subpixel-RGB.png" />
      </details>


- [Font Hinting](https://en.wikipedia.org/wiki/Font_hinting)
  
  For the purpose of on-screen text display, font hinting designates which primary pixels are interpolated to more clearly render a font. 
  
  -> Font editors are able to do automatic hinting.
  
  -> High-quality commercial fonts are often manually hinted to provide the sharpest appearance.
  
    <details>
      <summary>Sample</summary>
      <img src="./.assets/fonthinting.png" />
    </details>

  
- Subpixel rendering making white
      <details>
        <summary>Sample</summary>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Subpixel-rendering-RGB.png/300px-Subpixel-rendering-RGB.png" />
      </details>



- Morden font rasterization 

Nowadays, the most popular font rasterization library which supports both Windows and macOS is [FreeType](https://en.wikipedia.org/wiki/FreeType)


- Character 'e' in FreeType as small size with subpixel rendering.

  <details>
    <summary>Subpixel renered 'e'</summary>
  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Subpixel_e.png" />
  </details>

  
  
