# Graphics Processing Unit

The infrastructure of modern technology topics (AI, Machine Learning, Blockchain, etc.)

---
> @Author: [Garfield Zhu](https://github.com/GarfieldZHU/)


## Story about NVidia

<br><img width="512" src="https://raw.githubusercontent.com/GarfieldZHU/Aloha.zone.io/master/Graphics/.assets/nvidia.png" />


### History

#### 0. Stock - [Nasdaq: NVDA](https://www.google.com/finance/quote/NVDA:NASDAQ?window=MAX)
See the history of the stock [Nvidia](https://www.google.com/finance/quote/NVDA:NASDAQ?window=MAX) first.
<br> 🌊 The tide of cutting-edge technologies bring NVIDIA where it is today.


#### 1. Begining
* 1993: Founded in Santa Clara, California, USA.
<br><img width="240" src="https://www.nvidia.com/content/nvidiaGDC/us/en_US/about-nvidia/corporate-timeline/_jcr_content/root/responsivegrid/copy_of_nv_carousel__292630713/item_1669209935575.coreimg.100.850.jpeg/1688446141198/nvidia-timeline-3d-graphics-1993.jpeg" />
* Founders: Jensen Huang, Chris Malachowsky, Curtis Priem.
* Produce Graphic Cards for bussiness customers.
* 3D Graphics for gaming and multimedia markets.

#### 2. Developing

* ***1999: GeForce 256, the first GPU.***
<br><img width="240" src="https://www.nvidia.com/content/nvidiaGDC/us/en_US/about-nvidia/corporate-timeline/_jcr_content/root/responsivegrid/copy_of_nv_carousel__292630713/item_1669209940663.coreimg.100.850.jpeg/1688446141218/nvidia-timeline-gpu-1999.jpeg" />
* 1999: Nasdaq IPO.
* 2000: 3DFX (Voodoo, first customer-facing graphic card), the competitor, went bankrupt.
  <br> Nvidia acquired 3DFX.
* As OEM, Nvidia produced GPUs for PC manufacturers.

#### 3. New Vision

* Facing to gaming market. (GeForce)
* Decoupling the GPU from the PC. Face to customers directly.
* ***2008: CUDA, the first GPU computing platform.***
<br><img width="240" src="https://www.nvidia.com/content/nvidiaGDC/us/en_US/about-nvidia/corporate-timeline/_jcr_content/root/responsivegrid/copy_of_nv_carousel__292630713/item_1669209938611.coreimg.100.850.jpeg/1688446141370/nvidia-timeline-cuda-2006.jpeg" />
* Iterate GPU every 2-year. Keeping optimize the performance.
* 2010: General Purpose GPU (GPGPU) concept for scientific computing supported by CUDA API.

#### 4. AI, Auto-pilot, Blockchain, Cloud

* 2015: CUDA enforced the Deep Learning neural network.
* 2016: Nvidia Drive PX, the first AI Auto-pilot platform.
* 2018: Nvidia announced Nvidia RTX™ for real-time ray tracing.
<br><img width="240" src="https://www.nvidia.com/content/nvidiaGDC/us/en_US/about-nvidia/corporate-timeline/_jcr_content/root/responsivegrid/copy_of_nv_carousel__292630713/nv_teaser_copy.coreimg.100.850.jpeg/1690308833559/nvidia-rtx-professional.jpeg" />
* The raising of Blockchain and Cloud Computing make Nvidia widely adopted.

#### 5. Bitcoin, Mining age

* 2020: Bitcoin price raised to $20,000. The RTX 30 series was released.
* The mining age makes the GPU price doubled, trippled and even higher. 30 series are almost all mining cards.
<br><img width="240" src="https://media.istockphoto.com/id/1248674191/photo/bitcoin-gold-cryptocurrency-trading-chart.jpg?s=612x612&w=0&k=20&c=Zj-t9bYp9FChMLXGMRqt2l41KGjYp1jZaehbCKjJWcw=" />

#### 6. AI, Big Language Model, Metaverse

* 2021: GPT-3, the first big language model, was released.
* 2022: The ChatGPT is publicly announce. The big language model is popular.
* 2022: NVIDIA Omniverse™ platform is released as fundational role of building metaverse.
* As the core infrastructure of training LLM, Nvidia is again on the top of the tide.
<br><img width="240" src="https://raw.githubusercontent.com/GarfieldZHU/Aloha.zone.io/master/Graphics/.assets/chatgpt.webp"/>

### Product Series

Nvidia had many product series, now it has 3 main series:

- GeForce: Desktop, Gaming
  e.g. GeForce RTX 3090, GeForce RTX 4090.
- Quadro: Workstation
- Tesla: Data Center
  - See [Nvidia Tesla](https://www.nvidia.com/en-us/data-center/tesla/). e.g. H100, A100, V100, etc.
  - AWS Deep Learning instances are based on Tesla. See [AWS GPU Instances](https://docs.aws.amazon.com/dlami/latest/devguide/gpu.html)
- Others: Jetson, Ada, Tegra, etc.

<br/>
<br/>

## Introduce GPU

### Architecture

Let's tear down a GTX 4080 GPU to see what's inside.

<details>
<summary>GTX 4080 - Full card</summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/4080_outside.jpeg?raw=true"/>
</details>

<details>
<summary>GTX 4080 - Board part </summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/4080_part.jpeg?raw=true"/>
</details>

<details>
<summary>Open the panel </summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/4080_inner.jpeg?raw=true"/>
</details>

<details>
<summary>Focus the core</summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/4080_main.jpeg?raw=true"/>
</details>

<br/>

Other views:

<details>
<summary>Other card</summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/other_card.png?raw=true"/>
</details>

<details>
<summary>Move closer</summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/focus.png?raw=true"/>
</details>

<details>
<summary>Low-end cards</summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/low_end.png?raw=true"/>
</details>


<br/>
<br/>


Now, let's focus on the core chip (Nvidia):

<details>
<summary>Exploded view (Tesla V100)</summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/exploded.png?raw=true"/>
</details>

<details>
<summary>Abstract view</summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/simple.png?raw=true"/>
</details>

<details>
<summary>Fermi - with SM (Streaming Multiprocessor) </summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/fermi.webp?raw=true"/>
<details>
<summary>Streaming Multiprocessor from Cuda Cores </summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/fermi_unit.webp?raw=true"/>
</details>
</details>

<details>
<summary>Kepler - open SM </summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/kepler.webp?raw=true"/>
</details>

<details>
<summary>Pascal - more SM </summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/pascal.webp?raw=true"/>
</details>

<details>
<summary>Volta - Tensor core </summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/volta.png?raw=true"/>

<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/tensor_volda.gif?raw=true"/>
</details>

<details>
<summary>Ampere - RT core </summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/ampere.jpeg?raw=true"/>

<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/ampere_more.png?raw=true"/>
</details>


### ⚖️ Compare with CPU

[CPU vs. GPU](https://www.intel.com/content/www/us/en/products/docs/processors/cpu-vs-gpu.html)

> The CPU is suited to a wide variety of workloads, especially those for which latency or per-core performance are important. A powerful execution engine, the CPU focuses its smaller number of cores on individual tasks and on getting things done quickly. This makes it uniquely well equipped for jobs ranging from serial computing to running databases.

> GPUs began as specialized ASICs developed to accelerate specific 3D rendering tasks. Over time, these fixed-function engines became more programmable and more flexible. While graphics and the increasingly lifelike visuals of today’s top games remain their principal function, GPUs have evolved to become more general-purpose parallel processors as well, handling a growing range of applications.

| CPU | GPU |
| ------ | ------ |
| General purpose | Specialized-purpose |
| Task parallelism | Data parallelism |
| A few heavyweight cores | Many lightweight cores |
| High memory size | High memory throughput |
| Many diverse instruction sets | A few highly optimized instruction sets |
| Explicit thread management | Threads are managed by hardware |

<br><img width="480" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/compare.png?raw=true" />

<br/>

### 🔖 Read GPU Spec

To better understand how the GPU performs, we should learn to read the spec of GPU of the core metrics.

We can find the centralized parameter specs of GPUs at the 3rd party: https://www.techpowerup.com/gpu-specs/

Or the details in the official website of the GPU manufacturer (NVidia, AMD, and Intel), e.g.

- [Intel Arc A770](https://www.intel.com/content/www/us/en/products/sku/229151/intel-arc-a770-graphics-16gb/specifications.html)
- [AMD Radeon RX 7900 XTX](https://www.amd.com/en/products/graphics/amd-radeon-rx-7900xtx)
- [Nvidia Geforce RTX 4090](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/)
- [Nvidia Tesla H100](https://www.nvidia.com/en-us/data-center/h100/)

<br/>

#### Cores

> Similar as the CPU, the GPU has cores. The cores is used for parallel computing.
> Different from the CPU which has up-to 48 cores, the GPU has up-to 10,000 cores.

| Chip | Cores | Clock |
| ------ | ------ | ------ |
| [Intel Core i9-13900K](https://www.intel.com/content/www/us/en/products/sku/230496/intel-core-i913900k-processor-36m-cache-up-to-5-80-ghz/specifications.html) | 24 | 5.8 GHz (Turbo) |
| [AMD Ryzen 9 7950X3D](https://www.amd.com/en/products/apu/amd-ryzen-9-7950x3d) | 16 | 5.7 GHz (Boost) |
| [AMD 7900XTX](https://www.amd.com/en/products/graphics/amd-radeon-rx-7900xtx) | 6144 | 2.5 GHz (Boost) |
| [RTX 4070Ti](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4070-4070ti/) | 7680 | 2.61 GHz (Boost) |
| [RTX 4090](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/) | 16384 | 2.52 GHz (Boost) |
| [Tesla H100](https://www.nvidia.com/en-us/data-center/h100/) | 14592 | 1.845 GHz (Boost) |


##### [CUDA Cores](https://www.nvidia.com/en-us/geforce/technologies/cuda/) (Nvidia)

Generally, The GPU cores are the shading units for rendering pipeline. But for Nvidia, it is called `CUDA Cores` with the strength of parallel computing with cores.

- They are highly parallel, meaning they can work on multiple tasks simultaneously.
- They have a high memory bandwidth, meaning they can quickly and easily access large amounts of data.
- They are designed specifically for algorithms that can be parallelized.

##### [Tensor Cores](https://www.nvidia.com/en-us/geforce/technologies/cuda/) (Nvidia)

> Essentially, Tensor cores are processing units that accelerate the process of matrix multiplication.

The computational complexity increases multifold as the size and dimensions of the matrix (tensor) go up. Machine Learning, Deep learning, Ray Tracing are tasks that involve an excessive amount of multiplication.

<br><img width="480" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/tensor.jpeg?raw=true"/>

<details>
<summary>Ampere - Tensor core </summary>
<img width="1024" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/tensor_core.gif?raw=true"/>
</details>


##### [RT Cores](https://developer.nvidia.com/rtx/ray-tracing)

Known as "Ray Tracing Cores". It is a hardware implementation of the ray tracing technique.

Ray tracing calculation is a specific rendering pattern with ray related vector calcutions, refer to [Ray Tracing notes](https://garfieldzhu.github.io/Aloha.zone.io/Graphics/RayTracing/)
<br><img width="480" src="https://d29g4g2dyqv443.cloudfront.net/sites/default/files/akamai/Ampere/ampere-innovation-RT-cores-2c50-D@2x.jpg"/>

In short, RT cores add extra circuits to the more general purpose CUDA cores that can be included in the rendering pipeline when a ray-tracing calculation comes along.

<br/>

#### Bus, Clock & Memory

<details>
<summary>The specs of bus, clock & memory</summary>
<img width="640" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/RTX40.png?raw=true"/>
<img width="640" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/Hooper.png?raw=true"/>

</details>


##### Bus

The bus is the connection between the GPU and the motherboard. It is the data highway between the GPU and the CPU.

- Bus type: PCIe 4.0, PCIe 5.0, etc.
  <br/> See [PCIe 4.0 vs 5.0](https://www.intel.cn/content/www/cn/zh/gaming/resources/what-is-pcie-4-and-why-does-it-matter.html)
- Bus channel: x16, x8, x4, etc.

- Bus width: 128-bit, 192-bit, 256-bit, 384-bit, etc.



##### Clock Speed

The clock speed is the speed of the GPU. (in MHz)

Just like the CPU. It contains the core clock speed and the memory clock speed.



##### Memory

The memory of GPU is called **VRAM** (Video RAM).

- Memory type & size
  - Type: GDDR5, GDDR6, GDDR6X, etc.
  - Size: Nowaday, the mainstream is 8GB, 12GB, 16GB, 24GB etc.
          <br/> Just like the RAM. The larger, the better. 🤣
          <br/> The larger VRAM support:
    - [Graphics] Higher quality textures (4K, 8K, etc.)
    - [Graphics] More complex geometry (higher poly count, tessellation, etc.)
    - [Deep Learning] Larger dataset and batch sizes
    - [Deep Learning] More complex and larger models

- Memory Bus Width & BandWidth
  - Bus Width: Or `Bit Width`, `Memory Interface Width`.
    It is the number of bits that can be transferred simultaneously.
  - Bandwidth: The overall width of the memory bus. It is the product of the bus width and the clock speed.
    - Formula: `Bandwidth = Bus Width * Clock Frequency * Architecture Multiplier`
    - Unit: GB/s, e.g. 320 GB/s


<br/>

#### Shader & TMU & ROP

For rendering pipeline:

- GPU shadering unit for the shader programs on-GPU computation, which are the regular cores of GPU.

- TMU stands for Texture Mapping Unit. It is a component of the video card or GPU that is responsible for mapping textures to polygons.

- ROP stands for Render Output Unit. It is a component of the video card or GPU that is responsible for writing the final pixel data to the frame buffer.

<br/>

#### TFLOPS

TFLOPS (teraFLOPS) is the tera (10^12) **FL**oating point **O**perations **P**er **S**econd.

Generally, we say in 32-bit floating point.

> GFLOPS, as we can guess, is the giga (10^9) of FLOPS. It was used in years ago and now we are in TFLOPS era.

##### Cross-platform's battle of TFLOPS in their graphics core:

| Platform | TFLOPS |
| ------ | ------ |
| PS5    |  10.28 |
| XBOX Series X |  12.00 |
| Nintendo Switch | 0.4 / 0.5 (Docked) |
| Apple A17 Pro | 2.15 |
| Apple M2 Ultra (76 core) | 27.2 |
| Intel UHD Graphics 770 | 0.794 |
| Intel Iris Xe Graphics G7 96RUs | 1.690  |
| Intel Arc A770 | 19.66 |
| AMD Radeon RX 7800 XT | 37.32 |
| AMD Radeon RX 7900 XTX | 61.42 |
| GeForce RTX 2080 Ti | 13.45 |
| GeForce RTX 3090 | 35.58 |
| GeForce RTX 4070 Ti | 40.09 |
| GeForce RTX 4090 | 82.58 |
| Tesla H100 | 67 |


<br/>

### How GPU runs

#### CPU runs code

<img width="480" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/cpu.png?raw=true"/>


#### Traditional GPU runs code

<img width="480" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/gpu.png?raw=true"/>


#### GPGPU

In general purpose GPU architecture, Nvidia leverages the CUDA cores (typically 128 cores) to constructs SM (Streaming Multiprocessor) to run the code.

<img width="480" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/gpgpu.png?raw=true"/>

<details>
<summary>GTX 980 (2014 - Maxwell)</summary>
<img width="480" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/SMM.png?raw=true"/>
<img width="480" src="https://github.com/GarfieldZHU/Aloha.zone.io/blob/master/Graphics/.assets/RTX980.png?raw=true"/>

</details>


<br/>
<br/>

## Program with GPU

### OpenGL & GLSL

OpenGL (Open Graphics Library) is a cross-language, cross-platform API for rendering 2D and 3D vector graphics.

GLSL(OpenGL Shading Language), is a high-level shading language based on the C programming language.

### WebGL

WebGL (Web Graphics Library) is a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins.


### CUDA

CUDA is a parallel computing platform and programming model developed by Nvidia for general computing on its own GPUs (graphics processing units).

Different from the OpenGL, CUDA is a general-purpose parallel computing platform and programming model.
OpenGL focuses on the graphic rendering, while CUDA is for parallel computing. (e.g. Deep Learning, Crypto Mining)

