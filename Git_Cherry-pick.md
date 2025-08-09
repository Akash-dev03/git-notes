### 🔍 What is it?
`git cherry-pick` lets you **apply a specific commit** from one branch into your current branch — without merging everything.
```
git cherry-pick <commit-hash>

# This applies that exact commit to your current branch.
```
### 📘 Example:
You’re on `main` and want to apply a bugfix from `feature-a`:
```
git checkout main
git cherry-pick a1b2c3d
```
Now the commit `a1b2c3d` from `feature-a` is applied to `main`.
### 🔧 Common Flags
|Command / Flag|Description|
|---|---|
|`git cherry-pick <hash>`|Pick a single commit|
|`git cherry-pick A^..B`|Pick a **range** of commits from A (excluded) to B (included)|
|`-n` / `--no-commit`|Apply changes but **don’t commit** automatically|
|`--continue`|After resolving conflicts, **continue** cherry-pick|
|`--abort`|Abort cherry-pick if things go wrong|
## 🤯 Cherry-pick with Conflict?
Sometimes cherry-picking can result in a merge conflict. Fix the file(s), then:
```
git add .
git cherry-pick --continue
```
🚫 Abort if it's messy:
```
🚫 Abort if it's messy:
```
## 🧠 Use Cases
* Apply a **hotfix** from `dev` to `main`
* Reuse specific commits from experimental branches
* Avoid merging unnecessary changes
## 🛑 Pro Tip:
Avoid cherry-picking too many commits blindly—it can **cause duplication** or **confusion in history**.
