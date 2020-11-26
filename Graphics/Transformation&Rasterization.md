# Transformation & Rasterization



## Transformation



## Rasterization


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

  
  
