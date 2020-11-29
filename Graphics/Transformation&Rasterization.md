# Transformation & Rasterization



## Transformation



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

  
  
