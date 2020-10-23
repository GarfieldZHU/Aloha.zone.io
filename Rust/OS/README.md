# An Operation System by Rust

Implementation repo: [ROS](https://github.com/GarfieldZHU/ROS)



### Concepts

##### ABI (application binary interface)
ABI is an interface between two binary program modules; often, one of these modules is a library or operating system facility, and the other is a program that is being run by a user.

- API vs. ABI
[![API_vs_ABI](https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Linux_kernel_interfaces.svg/2560px-Linux_kernel_interfaces.svg.png)]()

- [Wikipedia - ABI](https://en.wikipedia.org/wiki/Application_binary_interface)
- [Stackoverflow - What is an application binary interface (ABI)?
](https://stackoverflow.com/a/2456882/6732968)



### BIOS vs. UEFI

- [BIOS](https://en.wikipedia.org/wiki/BIOS)
- [UEFI](https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface)


### Target Specification

[Target triple](https://clang.llvm.org/docs/CrossCompilation.html#target-triple) is used to describe the CPU architecture, the vendor, the operating system, and the ABI.

<details>
  <summary>
    The triple has the general format &lt;arch&gt;&lt;sub&gt;-&lt;vendor&gt;-&lt;sys&gt;-&lt;abi&gt;:
  </summary>

- arch = x86_64, i386, arm, thumb, mips, etc.
- sub = for ex. on ARM: v5, v6m, v7a, v7m, etc.
- vendor = pc, apple, nvidia, ibm, etc.
- sys = none, linux, win32, darwin, cuda, etc.
- abi = eabi, gnu, android, macho, elf, etc.

</details>

### Reference

- Writing an OS in Rust: https://os.phil-opp.com/.    
  Github: https://github.com/phil-opp/blog_os

- MIT [course 6.828 - semester 2020](https://pdos.csail.mit.edu/6.828/2020/schedule.html)
- xv6, Unix-like teaching OS: https://pdos.csail.mit.edu/6.828/2018/xv6/book-rev11.pdf
- 6.828 homework sample: https://github.com/SmallPond/MIT6.828_OS
