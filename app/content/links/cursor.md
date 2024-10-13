---
title: Cursor setup
description: How to setup Cursor IDE on Ubuntu 24.04
---

Since Cursor IDE is not available on Ubuntu 24.04 via snap, we need to install it manually. The download link only offers a `.AppImage` file, so we need to make it executable and run it.

There is a bash script available on [Github](https://gist.github.com/jorcelinojunior/131748e12a039c02148a6f66e1fb312c) that helps with the installation.

::external-code{url="https://gist.githubusercontent.com/jorcelinojunior/131748e12a039c02148a6f66e1fb312c/raw/a5762c07545f068d83f40d82c5491c24f55a5439/cursor_appimage_manager.sh" language="bash" filename="install-cursor.sh"}