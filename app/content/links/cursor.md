---
title: Cursor setup
description: How to setup Cursor IDE on Ubuntu 24.04
---

Since Cursor IDE is not available on Ubuntu 24.04 via snap, we need to install it manually. The download link only offers a `.AppImage` file, so we need to make it executable and run it.

## External script

There is a bash script available on [Github](https://gist.github.com/jorcelinojunior/131748e12a039c02148a6f66e1fb312c) that helps with the installation.

::external-code{url="https://gist.githubusercontent.com/jorcelinojunior/131748e12a039c02148a6f66e1fb312c/raw/a5762c07545f068d83f40d82c5491c24f55a5439/cursor_appimage_manager.sh" language="bash" filename="install-cursor.sh"}


## Current version

Same as the external script, but with some changes to the variables for using a different logo.

```bash
#!/bin/bash

set -euo pipefail

# Definition of colors for terminal output
readonly RED_COLOR="\e[31m"
readonly GREEN_COLOR="\e[32m"
readonly YELLOW_COLOR="\e[33m"
readonly BLUE_COLOR="\e[34m"
readonly MAGENTA_COLOR="\e[35m"
readonly RESET_COLOR="\e[0m"

# General settings
readonly DOWNLOAD_APP_DIR="$HOME/Downloads/.AppImage"
readonly ICON_DIR="$HOME/.local/share/icons"
readonly ICON_URL="https://mintlify.s3-us-west-1.amazonaws.com/cursor/images/logo/app-logo.svg"
readonly DESKTOP_FILE_PATH="$HOME/.local/share/applications/cursor.desktop"
readonly APPARMOR_PROFILE="/etc/apparmor.d/cursor-appimage"
readonly DOWNLOAD_URL="https://downloader.cursor.sh/linux/appImage/x64"
readonly TEMP_DIR="/tmp/AppImage"
readonly VERSION_CHECK_TIMEOUT=10

cursor_appimage_path=""
cursor_icon_path=""

# Support function to print steps
print_step() {
  echo -e "${YELLOW_COLOR}$1${RESET_COLOR}"
}

# Support function to print success
print_success() {
  echo -e "${GREEN_COLOR}$1${RESET_COLOR}"
}

# Support function for error handling
error_exit() {
  echo -e "${RED_COLOR}$1${RESET_COLOR}" >&2
  kill $$
}

# Check necessary dependencies
check_dependencies() {
  print_step "Checking necessary dependencies..."
  for cmd in curl chmod find mkdir wget; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
      error_exit "This script requires $cmd, but it is not installed.\nPlease install it with 'sudo apt install $cmd' and try again."
    fi
  done
  print_success "All necessary dependencies are installed."
}

# Function to get the name of the latest version available for download
fetch_online_version() {
  local HEADERS=$(timeout $VERSION_CHECK_TIMEOUT wget -S "$DOWNLOAD_URL" -q -O /dev/null 2>&1)
  local FILENAME=$(echo "$HEADERS" | grep -o -E 'filename="[^"]+"' | sed 's/filename="//;s/"//')

  if [[ -n "$FILENAME" ]]; then
    echo "$FILENAME"
  else
    error_exit "Failed to fetch the latest version. If your connection is slow, try increasing \"VERSION_CHECK_TIMEOUT\"."
  fi
}

# Function to get the path of latest version of the AppImage in the local directory
get_path_local_version() {
  mkdir -p "$DOWNLOAD_APP_DIR" # Ensure the directory exists
  local appimage_files
  mapfile -t appimage_files < <(find "$DOWNLOAD_APP_DIR" -name 'cursor-*.AppImage' -printf '%T@ %p\n' | sort -nr | cut -d' ' -f2-)
  if [ "${#appimage_files[@]}" -eq 0 ]; then
    return 0
  fi
  echo "${appimage_files[0]}"
}

# Search for the most recent AppImage file path
fetch_app_path() {
  print_step "Searching for the most recent AppImage path of cursor.sh"
  local appimage_files
  mapfile -t appimage_files < <(find "$DOWNLOAD_APP_DIR" -name "cursor-*.AppImage" -printf '%T@ %p\n' | sort -rn | cut -d' ' -f2-)
  if [ "${#appimage_files[@]}" -eq 0 ]; then
    echo -e "${RED_COLOR}No cursor.sh AppImage files found in $DOWNLOAD_APP_DIR/${RESET_COLOR}"
    error_exit "You need to download the latest version first (OPTION 1) and run this script again."
  fi
  cursor_appimage_path=${appimage_files[0]}
  print_success "Path found: $cursor_appimage_path"
}

# Download the application icon
download_logo() {
  print_step "Downloading the logo"
  cursor_icon_path="$ICON_DIR/cursor-icon.svg"
  mkdir -p "$ICON_DIR"
  if ! curl -s -o "$cursor_icon_path" "$ICON_URL"; then
    error_exit "Failed to download the logo from $ICON_URL"
  fi
  print_success "Logo downloaded: $ICON_DIR/cursor-icon.svg"
}

# Create the .desktop file for the application
create_desktop_file() {
  print_step "Creating the .desktop file"
  cat <<-EOF >"$DESKTOP_FILE_PATH"
[Desktop Entry]
Type=Application
Name=Cursor
Exec=$cursor_appimage_path
Icon=$cursor_icon_path
Categories=Utility;Development
Terminal=false
StartupWMClass=Cursor
X-AppImage-Version=latest
Comment=Cursor is an AI-first coding environment.
MimeType=x-scheme-handler/cursor;
EOF
  print_success "Desktop file created: $DESKTOP_FILE_PATH"
}

# Configure the AppArmor profile for the application
create_apparmor_profile() {
  local appimage_path=${1-""}
  if [[ -z $appimage_path ]]; then
    appimage_path=$(get_path_local_version)
    if [[ -z "$appimage_path" ]]; then
      error_exit "No local version found. Please download the latest version first (OPTION 1) and run this script again."
    fi
  fi
  print_step "Configuring the AppArmor profile..."
  cat <<-EOF | sudo tee $APPARMOR_PROFILE >/dev/null
# This profile allows everything and only exists to give the
# application a name instead of having the label "unconfined"

abi <abi/4.0>,
include <tunables/global>
profile cursor $appimage_path flags=(unconfined) {
  userns,
  # Site-specific additions and overrides. See local/README for details.
  include if exists <local/cursor>
}
EOF
  sudo apparmor_parser -r $APPARMOR_PROFILE || error_exit "Failed to apply the AppArmor profile."
  print_success "AppArmor profile successfully configured for $appimage_path"
}

# Main function that checks and downloads the latest version if it is not yet locally present
check_and_download_version() {
  print_step "Checking for updates and downloading if a newer version is available"
  check_dependencies
  mkdir -p "$DOWNLOAD_APP_DIR" # Ensure the directory exists

  local filename_local_version
  local path_local_version=$(get_path_local_version)

  if [[ -z "$path_local_version" ]]; then
    echo -e "${YELLOW_COLOR}No local version found. A new version will be downloaded.${RESET_COLOR}"
  else
    filename_local_version=$(basename "$path_local_version")
    echo -e "${BLUE_COLOR}Latest local version: ${filename_local_version}${RESET_COLOR}"
  fi

  # Gets the name of the latest online version
  echo -e "${YELLOW_COLOR}Searching for the latest version. Please wait...${RESET_COLOR}"
  local filename_online_version=$(fetch_online_version)
  local path_online_version="$DOWNLOAD_APP_DIR/$filename_online_version"

  # Compares versions and downloads if necessary
  if [[ -z "$path_local_version" ]] || [[ "$filename_local_version" != "$filename_online_version" ]]; then
    echo -e "${YELLOW_COLOR}A new version is available: ${RESET_COLOR}${GREEN_COLOR}$filename_online_version${RESET_COLOR}"
    echo -e "${YELLOW_COLOR}Downloading the newest version...${RESET_COLOR}"
    wget --quiet --show-progress --content-disposition -P "$DOWNLOAD_APP_DIR" --trust-server-names "$DOWNLOAD_URL"
    echo -e "${GREEN_COLOR}Download completed: ${path_online_version}${RESET_COLOR}"

    if [[ -f "${path_online_version}" ]]; then
      chmod +x "${path_online_version}"
      echo -e "${GREEN_COLOR}Made the AppImage executable: ${path_online_version}${RESET_COLOR}"
      echo -e "${MAGENTA_COLOR}Now run the script again and choose option 2 to install the latest version.${RESET_COLOR}"
    else
      error_exit "Downloaded AppImage file not found at ${path_online_version}"
    fi
  else
    echo -e "${GREEN_COLOR}No download needed — your local version ($filename_online_version) is the most current.${RESET_COLOR}"
  fi
}

# Function to search and prepare the AppImage
fetch_and_prepare_appimage() {
  check_dependencies
  fetch_app_path
  download_logo
  create_desktop_file
  create_apparmor_profile
  echo -e "${GREEN_COLOR}Application installed and ready to use.${RESET_COLOR}"
}

# Function to create the AppArmor profile
setup_apparmor_profile() {
  check_dependencies
  fetch_app_path
  create_apparmor_profile
}

# Interactive menu
PS3='Please choose an option: '
options=(
  "Fetch the latest version and download (if not already present)"
  "Re/Install the latest downloaded version"
  "Just configure AppArmor (Required for Ubuntu 24.04)"
  "Exit"
)
select opt in "${options[@]}"; do
  case $opt in
  "Fetch the latest version and download (if not already present)")
    check_and_download_version
    ;;
  "Re/Install the latest downloaded version")
    fetch_and_prepare_appimage
    ;;
  "Just configure AppArmor (Required for Ubuntu 24.04)")
    setup_apparmor_profile
    ;;
  "Exit")
    break
    ;;
  *) echo "Invalid option $REPLY" ;;
  esac
done
```
