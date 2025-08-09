## Installation
### Windows
**Option 1: Download from Git Website**
```bash
Download installer from https://git-scm.com/download/win
Run the .exe installer and follow the setup wizard
```
**Option 2: Using Winget**
```bash
Open powershell and run

winget install --id Git.Git -e --source winget
```
### macOS
**Option 1: Using Homebrew (Recommended)**
```bash
brew install git
```
**Option 2: Using MacPorts**
```bash
sudo port install git
```
**Option 3: Download from Git Website**
```bash
Download installer from https://git-scm.com/download/mac
Run the .pkg installer
```
**Option 4: Install via Xcode Command Line Tools**
```bash
xcode-select --install
```
### Debian-based Linux (Ubuntu, Debian, Mint, etc.)
```bash
# Update package list
sudo apt update

# Install git
sudo apt install git

# For the latest version, add Git PPA (Ubuntu)
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git
```
### Arch Linux
```bash
# Using pacman
sudo pacman -S git

# Using yay (AUR helper)
yay -S git
```

## Initial Configuration
### Essential Configuration
```bash
# Set your name and email (required for commits)
git config --global user.name "Akash"
git config --global user.email "a03akash@gmail.com"

# Set default branch name
git config --global init.defaultBranch main

# Set default editor (choose any one)
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "nano"        # Nano
git config --global core.editor "vim"         # Vim
```

### Line Ending Configuration
```bash
# Windows
git config --global core.autocrlf true

# macOS/Linux
git config --global core.autocrlf input
```
### Credential Management
```bash
# Windows (Git Credential Manager)
git config --global credential.helper manager

# macOS (Keychain)
git config --global credential.helper osxkeychain

# Linux (Cache credentials for 1 hour)
git config --global credential.helper cache
git config --global credential.helper 'cache --timeout=3600'
```
### Useful Aliases
```bash
# Status shortcuts
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit

# Log aliases
git config --global alias.lg "log --oneline --decorate --graph"
git config --global alias.ll "log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short"

# Diff aliases
git config --global alias.df diff
git config --global alias.dc "diff --cached"

# Undo aliases
git config --global alias.unstage "reset HEAD --"
git config --global alias.undo "reset --soft HEAD^"
```
### Additional Useful Settings
```bash
# Colorize output
git config --global color.ui auto

# Push current branch to same name on remote
git config --global push.default current

# Automatically setup remote tracking
git config --global push.autoSetupRemote true

# Rebase by default when pulling
git config --global pull.rebase true

# Show original conflict markers
git config --global merge.conflictstyle diff3

# Ignore file permissions (useful for Windows)
git config --global core.filemode false
```
## Verification
```bash
# Check Git version
git --version

# View all configurations
git config --list

# View global configurations only
git config --global --list

# Check specific configuration
git config user.name
git config user.email
```
## SSH Key Setup (Optional but Recommended)
### Generate SSH Key
```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# For older systems that don't support Ed25519
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
```
### Add SSH Key to SSH Agent
```bash
# Start ssh-agent
eval "$(ssh-agent -s)"

# Add SSH key to agent
ssh-add ~/.ssh/id_ed25519
```
### Add SSH Key to GitHub/GitLab
```bash
# Copy public key to clipboard
# Linux
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard

# macOS  
cat ~/.ssh/id_ed25519.pub | pbcopy

# Windows (Git Bash)
cat ~/.ssh/id_ed25519.pub | clip
```