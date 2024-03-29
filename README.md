Machines interactive
===============

This is the “machines interactive” for the _Living with Machines_ exhibit at Leeds City Museum 2022–23.

See also the [“accidents interactive”](https://github.com/Living-with-machines/accidents-interactive) for the same exhibition.

To run the kiosk using Python
---------------

_Prerequisites:_ Note that for this option, you need to have Python 3.7 or above installed, you must have made the correct settings to run `python3` using the `python` command in the PATH (otherwise, you could just switch `python` for `python3` above). If you need installation instructions for how to install and setup Python 3 this way, Lisa Tagliaferri’s instructions are recommended, whether you work on [macOS](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-macos), [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-programming-environment-on-an-ubuntu-20-04-server) or [Windows 10](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-windows-10).

_Windows users:_ If you can, choose the option to set the PATH during installation. But if you need to set the PATH after installation, a helpful resource to help with adding `python` to the PATH on a Windows machine is [“How to add Python to Windows PATH”](https://datatofish.com/add-python-to-windows-path/).


### 1. Run the build command:

```sh
$ bash build.sh
```

_Note: If you do not have a `bash` command (for instance, you are on a Windows machine), you can also just download the build directory as a `.zip` file from the [`build` branch on this repository](https://github.com/Living-with-machines/machines-interactive/tree/build). Instructions on how to download the entire interactive as one runnable file is available in the `build` branch._

### 2. Run the following command to get a local web server running on port 80:

```sh
$ python -m http.server 80 --directory build
```

_Note: If you run into problem with a busy or blocked port, you can change the port (80) to any random number here._

### 3. Navigate to `http://localhost` (or `127.0.0.1`) in your browser.

_Note: If you changed the port above, you will need to follow “localhost” with `:PORT` for whichever port number you chose above, such as localhost:8000._

To run the kiosk using NodeJS
---------------

You can also opt to run the kiosk using NodeJS if you would like. First, make sure you have NodeJS installed. Then, follow these steps:

1. Run the command:

```
$ bash build.sh
```

2. Navigate into the `build` folder:

```sh
$ cd build
```

3. Run the command:

```
$ npx http-server --port 80
```

4. Navigate to [localhost](http://localhost) (or 127.0.0.1) in your browser.
