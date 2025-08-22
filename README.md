# OpenSCAD Multi-Platform CLI

This tool allows you to export OpenSCAD files to various formats, such as STL (for 3D models) and SVG (for 2D drawings), using a WebAssembly-based version of OpenSCAD. This makes it a portable solution that can run in any environment with Node.js.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/user/openscad-cli.git
    cd openscad-cli
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Install the CLI globally (optional but recommended for ease of use):**

    ```bash
    npm install -g .
    ```

    This will make the `openscad-cli` command available in your system's path.

## Usage

The primary script to use is `openscad-cli`, which simplifies the execution of the underlying Node.js script.

```bash
openscad-cli <input-file.scad | openscad-text> <output-file | output-format>
```

- `<input-file.scad | openscad-text>`: You can either provide the path to an OpenSCAD file (`.scad`) or pass the OpenSCAD code directly as a string.
- `<output-file | output-format>`: Specify the desired output file name with its extension (e.g., `model.stl`, `drawing.svg`). Alternatively, you can just provide the format (e.g., `stl`, `svg`), and the output will be printed to the standard output.

### 3D Example (STL Output)

Let's create a simple 3D cube and export it to an STL file.

1.  **Create an OpenSCAD file named `cube.scad`:**

    ```scad
    cube(10);
    ```

2.  **Run the export script:**

    ```bash
    openscad-cli cube.scad cube.stl
    ```

    This will generate a `cube.stl` file in the same directory.

3.  **Alternatively, you can pass the OpenSCAD code directly:**

    ```bash
    openscad-cli "cube(10);" cube.stl
    ```

4.  **To get the STL content on the command line, just specify the format:**

    ```bash
    openscad-cli "cube(10);" stl
    ```

### 2D Example (SVG Output)

Now, let's create a 2D circle and export it to an SVG file.

1.  **Create an OpenSCAD file named `circle.scad`:**

    ```scad
    circle(10);
    ```

2.  **Run the export script:**

    ```bash
    openscad-cli circle.scad circle.svg
    ```

    This will generate a `circle.svg` file.

3.  **Alternatively, you can pass the OpenSCAD code directly:**

    ```bash
    openscad-cli "circle(10);" circle.svg
    ```

4.  **To get the SVG content on the command line, just specify the format:**

    ```bash
    openscad-cli "circle(10);" svg
    ```

## How It Works

This tool uses a WebAssembly version of OpenSCAD (`openscad.wasm`) and a JavaScript wrapper (`openscad.wasm.js`) to execute OpenSCAD code without needing a native installation of the OpenSCAD software. The `openscad-cli.js` script handles the file I/O and passes the arguments to the WebAssembly module.

## Building and Updating OpenSCAD WASM

To build the latest version of the OpenSCAD WebAssembly files and update the ones in this project, follow these steps:

1.  **Clone the `openscad-wasm` repository:**

    ```bash
    git clone https://github.com/openscad/openscad-wasm.git
    ```

2.  **Navigate to the cloned directory:**

    ```bash
    cd openscad-wasm
    ```

3.  **Follow the build instructions in the `openscad-wasm` repository to build the WASM files.** This typically involves running a build script or a set of commands.

4.  **Once the build is complete, you will find the generated `openscad.wasm` and `openscad.wasm.js` files in the `build` directory within the `openscad-wasm` project.**

5.  **Copy the new `openscad.wasm` and `openscad.wasm.js` files to the root of this project, replacing the existing files.**

    ```bash
    cp openscad.wasm /path/to/openscad-node/
    cp openscad.wasm.js /path/to/openscad-node/
    ```

By following these steps, you can ensure that you are using the latest version of the OpenSCAD WASM module with this tool.

## Acknowledgments

This project is based on the great work of the OpenSCAD and openscad-wasm teams.

- [OpenSCAD](https://github.com/openscad/openscad)
- [openscad-wasm](https://github.com/openscad/openscad-wasm)
