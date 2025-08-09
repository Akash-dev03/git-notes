### 🧠 Why Use Branches?
Branches allow you to:
* Work on **features**, **fixes**, or **experiments** independently.
* Avoid breaking the main project (usually `main` or `master`).
* Collaborate without conflict.
* Switch contexts quickly.
### 🌱 Creating and Managing Branches
```
#  Creates the branch but does not switch to it.
git branch feature-login
```
```
# Create and Switch to a Branch
git checkout -b feature-login
```
```
# List All Branches
git branch
```
```
# Shows local branches.
git branch -r
```
```
# Shows remote branches.
git branch -a
```
```
# Switch Between Branches
git checkout main
```
```
git branch -d feature-login    # Safe delete (only if fully merged)
git branch -D feature-login    # Force delete (dangerous!)
```
```
# Merge a Branch into Current Branch
git checkout main
git merge feature-login

# Combines changes from feature-login into main
```
### ⚔️ Merge Conflicts
If Git can't automatically combine the branches
* **conflict markers** in the files:
```
<<<<<<< HEAD
Current branch changes
=======
Incoming branch changes
>>>>>>> feature-branch
```
* Manually edit the file to resolve conflicts.
* Then:
```
git add conflicted-file.js
git commit -m "Resolve merge conflict"
```
```
# Aborting a Merge
git merge --abort
```
```
# Pull the latest changes before merging
git pull origin main

# Always merge into the branch you're on.
```