# Color Science 101

### 1. Color basic 

What is color? How we describe color?

- Color display spectrum

![Visible color in radiant spectrum](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/EM_spectrum.svg/2560px-EM_spectrum.svg.png)

![Color display spectrum](https://upload.wikimedia.org/wikipedia/commons/c/c4/Rendered_Spectrum.png)


- [Trichromacy](https://en.wikipedia.org/wiki/Trichromacy)

  The Human's retina contains three types of color receptors (called cone cells in vertebrates) with different absorption spectra.
  
  We say S-cone, M-cone, L-cone, and they are activated by blue, green and red.
  
  ![wave length of color receptors](../.assets/colorcell.jpg)
  
  They just like filter for lights.

- [Metamerism(同色异谱)](https://en.wikipedia.org/wiki/Metamerism_(color))

  Color is a biological phenominon. Now that human has only three color filters for nature lights, it means that some different combinations of lights could result in the same received waves in human's brains. 
  
  It is like this:
  
  <details>
    <summary>Metamerism spectrum example sample</summary>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Metamerism_spectrum_example.svg/600px-Metamerism_spectrum_example.svg.png" />
  </details>


- The color *Purple (magenta)* does not exist?

  We see the color wave length is linear, increasing from blue to red. But there are some colors exist between blue and red. Why?
  
  Theoretically, magenta between purple and red does not exist in nature color. It's a "imagine color" by our brain. It makes hue a ring. 
  
  <details>
    <summary>Hue ring</summary>
    <img src="../.assets/huering.png" />
  </details>
  
  See more in [color space](#42-color-space) section.

### 2. Color Vision 

#### Color relativeness

Color is relative. Our eyes is simple to be cheated.
<details>
  <summary>Is A and B same? </summary>
  <img src="../.assets/color_relative.png" />
</details>

<details>
  <summary>Now we hide the black and white blocks. </summary>
  <img src="../.assets/color_relative.png" />
</details>

### 3. Color Model 

#### 3.1 RGB

Red, Green, Blue.

- Additive color (mixing)

  ![RGB mixing](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/AdditiveColor.svg/330px-AdditiveColor.svg.png)

  Additive color models are applied in the design and testing of electronic displays that are used to render realistic images containing diverse sets of color using phosphors that emit light of a limited set of primary colors. 

#### 3.2 CYMK 

Cyan, Yellow, Magenta, **blacK**.

![cmyk](../.assets/cmyk.PNG)

The more you mix, the darker it will be. 

Widely used in printing.

- Subtractive color (mixing)
  
  ![CMY mixing](https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/SubtractiveColor.svg/330px-SubtractiveColor.svg.png)

  This idealized model is the essential principle of how dyes and inks are used in color printing and photography where the perception of color is elicited after white light passes through microscopic "stacks" of partially absorbing media allowing some wavelengths of light to reach the eye and not others.

- Why black? 

For cheapness. Mixing C, M, Y, we can get black. But in printing, we typically use black, always mixing CMY is too expensive and it introduces black in this system for a cheap printing for non colorful contents.

### 4. Color Space and Gamut 

#### 4.1 CIE 1931

[CIE 1931 color space](https://en.wikipedia.org/wiki/CIE_1931_color_space) are the first defined quantitative links between distributions of wavelengths in the electromagnetic visible spectrum, and physiologically perceived colors in human color vision. The mathematical relationships that define these color spaces are essential tools for color management, important when dealing with color inks, illuminated displays, and recording devices such as digital cameras. 

<details>
  <summary>CIE 1931 RGB color matching functions </summary>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/CIE1931_RGBCMF.svg/488px-CIE1931_RGBCMF.svg.png" />
  
  <p>It describes the how to mix up the visible colors in different wave length using RGB, to match what human can see.</p>
  <p>The negative value means that mixing RGB could not present the target color at postive values. Then we mix color to target color to match back the test color and we subtract the value added to target color from the tested one.</p>
</details>

<details>
  <summary>The CIE 1931 color space chromaticity diagram </summary>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/CIE1931xy_blank.svg/450px-CIE1931xy_blank.svg.png" />
</details>
 
#### 4.2 Color Space

###### Reading color space

- Tooltips and wave length
<details>
  <summary>Tooltips of reading colorspace graph:</summary>
  <img src="../.assets/colorspace_tooltips.PNG" />
  
  <img src="../.assets/colorspace_wavelength.PNG" />
</details>



- Line of purples
<details>
  <summary><a href="https://en.wikipedia.org/wiki/Line_of_purples">Purple line</a>: </summary>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Line_of_purples.png/300px-Line_of_purples.png" />
  <p>As discussed above, purples like magenta does not exist on </p>
</details>

- White balance
<details>
  <summary>Color temprature: </summary>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/PlanckianLocus.png/450px-PlanckianLocus.png" />
  
  <p>Hues of the Planckian locus on a linear scale (values in kelvin) </p>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Color_temperature_black_body_800-12200K.svg/768px-Color_temperature_black_body_800-12200K.svg.png" />

</details>

`White & gold, or blue & black ? `

![White balance](../.assets/white_balance.jpg)

<details>
  <summary>White balance: </summary>
  <img src="https://pic1.zhimg.com/80/v2-392c0561d35f056b10fb2ca5b0835fa4_1440w.png" />
  <p>Adjust white balance requires two dimensions: temprature (for blue to yellow) and tint (from green to red)</p>
  
  <img src="https://pic4.zhimg.com/80/v2-f6e517ba429e6464a32786b4ba007513_1440w.png" />
</details>


##### HSL/HSV

HSV cylinder

![HSV](https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/HSV_color_solid_cylinder_saturation_gray.png/296px-HSV_color_solid_cylinder_saturation_gray.png)

###### a. Hue

- The "kind" of color, regardless of attributes
- Colorimetric correlate: dominant wavelength
- Artist's correlate: the chosen pigment color

- Newton's color circle:

![Newton's color circle](https://upload.wikimedia.org/wikipedia/commons/c/c0/Newton%27s_color_circle.png)

- Hue ring

![Hue ring](../.assets/hue_rgb.jpg)

###### b. Saturation

- The "colorfulness"
- Colorimetric correlate: purity
- Artist's correlate: fraction of paint from the colored tube

###### c. Lightness (or value)

- The overall amount of light
- Colorimetric correlate: luminance
- Artist's correlate: tints are lighter, shades are darker


Common color pickers are based on HSV/HSL. 

<details>
  <summary>Color picker: </summary>
  <img src="../.assets/color_picker.png" />
</details>

It is actually a section view of the cylinder. 


#### 4.3 Gamut

[Gamut](https://en.wikipedia.org/wiki/Gamut) is the set of chromaticities generated by a set of color primaries, 

Different color spaces represent different ranges of color.

###### sRGB
  
  sRBG, AKA standard RGB is the most widely adopted color space today. 
  
  - Common moditor RGB standard. Other color devices simulate that monitor by calibration.
  - Morden browser standard now support sRGB only. 
  - Gamut is limited. Tag "&lt;canvas&gt;" are discussed to support more wild gamut

###### AdobeRGB



- Delta E

### References

- [The basics of color and color management](https://www.youtube.com/watch?v=fq-kNtwifFk&list=PLMsVycIbp_YsQVHP0CSjNDSBuaznyGC6l&index=3) @ [ColorPlaza TV](https://www.youtube.com/channel/UCIwTmFi6wFyHee9JNQ6YbTw)
- [Color WorkSpace: Using sRGB or AdobeRGB?](https://www.youtube.com/watch?v=UKfg8GtT75k) @ [ColorPlaza TV](https://www.youtube.com/channel/UCIwTmFi6wFyHee9JNQ6YbTw)
