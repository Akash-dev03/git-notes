# 📁 Creating & Cloning Repositories
### 🆕 Creating a New Repository
####  **Initialize a New Git Repo Locally**
```
mkdir my-project
cd my-project
git init
```
* Creates a `.git` directory that starts tracking changes.
* Use `git status` to check the current state.
---
### **Create on GitHub**
1. Go to [GitHub](https://github.com)
1. Click `New Repository`.
1. Set name, description (optional), and choose visibility (public/private).
1. Choose to add README / .gitignore / license (optional).
1. Click **Create Repository**.
---
### **Push local repository to GitHub**
```
cd my-project
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```
⚠️ Make sure the repo exists on GitHub before pushing.
---
### 📥 Cloning a Repository
* Clone Using HTTPS
```
git clone https://github.com/username/repo-name.git
```
* Clone Using SSH (Recommended if you’ve set up SSH keys)
```
git clone git@github.com:username/repo-name.git
```
* Clone a Specific Branch
```
git clone -b branch-name https://github.com/username/repo-name.git
```
* Shallow Clone (For large repos, faster clone)
```
git clone --depth=1 https://github.com/username/repo-name.git
```
---
### 📌 Git Directory Structure (after cloning or init)
```
my-project/
├── .git/           # Git metadata folder (invisible in `ls` unless using `ls -a`)
├── README.md       # Your actual project files
├── index.html
└── ...
```
---
## Staging
### 🧃 What is the Staging Area?
The **staging area** (also called the index) is like a buffer between your working directory and the repository.
* Files you **edit** are in the **working directory**.
* Files you **stage** with `git add` are in the **staging area**.
* Files you **commit** with `git commit` are saved to the **repository (history)**.
---
### 🧰 Commands Used 
### `git init`
---
Initializes a new Git repository in the current directory.
```
git init
```
📌 **Creates a ****`.git/`**** folder** that tracks your project's history.
---
### `git clone`
Clones (downloads) an entire repository from a remote source (GitHub, GitLab, etc.).
```
git clone <repo-url>
```
📌 **Creates a new local directory** with full project and commit history.
🔧 **Common Flags**:
|Flag|Description|
|---|---|
|`-b <branch>`|Clone a specific branch.|
|`--depth=1`|Perform a **shallow clone** – only grabs the latest snapshot, not full history. Great for large repos.|
🧠 **Examples**:
```
git clone -b dev https://github.com/user/repo.git
git clone --depth=1 https://github.com/user/huge-repo.git
```
---
### `git remote`
Manages connections to remote repositories.
```
git remote -v
```
🔍 Shows the current remotes (usually `origin`) with fetch/push URLs.
```
git remote add origin <repo-url>
```
🔗 Adds a remote repository and names it `origin`.
🧠 Common usage:
|Command|Description|
|---|---|
|`add`|Adds a remote.|
|`remove`|Removes a remote.|
|`set-url`|Changes a remote’s URL.|
|`-v`|Verbose – shows fetch and push URLs.|
---
### `git status`
Displays the current state of the working directory and staging area.
```
git status
```
📌 Shows:
*   Untracked files
*   Staged files
*   Modified but not staged files
---
### `git add`
Stages changes for the next commit.
```
git add .
git add README.md
```
🔧 Common usage:
|Command|Description|
|---|---|
|`git add .`|Adds all modified and new files (excluding ignored ones).|
|`git add -A`|Adds all changes, including deletions.|
|`git add -u`|Adds modified and deleted files (not new).|
---
### `git commit`
Saves staged changes to the local repository.
```
git commit -m "Initial commit"
```
🔧 Common flags:
|Flag|Description|
|---|---|
|`-m "msg"`|Adds commit message inline.|
|`--amend`|Modify the last commit (e.g., change message or add missed files). ⚠️ Don't amend commits that are already pushed — it rewrites history.|
|`--no-edit`|Use the same commit message when amending.|
### `git commit -am "msg"`
Shortcut to **add & commit modified tracked files** in one go.
* Equivalent to `git add -u && git commit -m "msg"`
* ⚠️ **Does not include new/untracked files**
---
### `git push`
Sends local commits to a remote repository.
```
git push -u origin main
```
🔧 Common flags:
|Flag|Description|
|---|---|
|`-u`|Sets upstream tracking (so future `git push` doesn’t need branch name).|
|`--force` or `-f`|Force push (overwrites history) – ⚠️ dangerous, use with caution.|
---
## `git log`
Shows commit history.
|Flag|Description|
|---|---|
|`--oneline`|One commit per line (short hash + message)|
|`--graph`|ASCII graph of commits (for branching/merging)|
|`--decorate`|Shows branch and tag names|
|`--all`|Shows all branches (not just current)|
🧠 **Examples**:
```
# Detailed commit history
git log

# One-line commit history 
git log --oneline

# Log with graph and branches  
git log --oneline --graph --decorate --all
```
---
### `git show <commit-hash>`
Shows the **details of a specific commit**:
* Commit message
* Author
* Date
* File changes (diff)
```
# Show file changes for a commit
git show <commit-hash>
```
### `git diff`
**Compare changes** between files, commits, branches, or stages.
|Command|Description|
|---|---|
|`git diff`|Working directory vs staging area (unstaged changes)|
|`git diff --cached`|Staging area vs last commit (staged changes)|
|`git diff main feature-branch`|Compare two branches|
|`git diff <commit1> <commit2>`|Compare two specific commit|
|`git diff --name-only`|Shows only the filenames that differ|
