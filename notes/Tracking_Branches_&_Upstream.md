### 🧠 What is a Tracking Branch?
A **tracking branch** is a local branch that is set to follow (track) a remote branch.
```
# main → tracks → origin/main
# This means when you run:
git pull
# or
git push
# Git knows where to fetch from or push to—without needing extra info.
```
### Setting a Tracking Branch
When pushing a new branch:
```
git push -u origin feature-xyz
```
The `-u` (or `--set-upstream`) flag links:
```
# local/feature-xyz → origin/feature-xyz
# So next time you can just:
git pull
git push
```
### Check Tracking Info
To view what your current branch is tracking:
```
git status
# Or more detailed:
git branch -vv
```
### Change the Upstream Manually
```
git branch --set-upstream-to=origin/dev dev
```
This sets the **local ****`dev`** branch to track **`remote origin/dev`**.
### 🚫 Remove Tracking
```
git branch --unset-upstream
```
### 📌 Why Tracking Branches Matter
* Simplifies `git push` / `git pull`
* Helps avoid pushing/pulling to wrong branches
* Essential for team collaboration

```
git checkout -b feature/navbar
git push -u origin feature/navbar
# Now tracking is set

# Then later:
git push      # No need to mention origin/branch again
```