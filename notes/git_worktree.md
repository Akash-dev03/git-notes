### 🧠 What is `git worktree`?
`git worktree` lets you **check out multiple branches at the same time**, each in its own separate folder — **from a single Git repository**.
This is useful when:
* You want to **work on a feature** branch while keeping the **main branch running**.
* You're testing changes without switching branches constantly.
* You're deploying from a clean branch while still coding.
```
# Create a new worktree:
git worktree add <path> <branch>

# If the branch doesn’t exist:
git worktree add -b <new-branch> <path> <start-point>

# Example:
git worktree add -b feature-v2 ../feature-v2 main
```
This:
* Creates a new folder `../feature-v2`
* Checks out a new branch `feature-v2` from `main` into that folder
```
# List all worktrees:
git worktree list
```
```
# Remove a worktree:
git worktree remove <path>
```
### 📌 Important Notes:
* All worktrees **share the same Git history**, but **each has its own working directory**.
* You **can’t check out the same branch in two worktrees** at once.
* Git tracks worktrees in `.git/worktrees/`.

### 🧪 Real-world Use Case:
You're developing a new version of your app (`v2`) on a separate branch.
Instead of switching back and forth with `git checkout`, you use:
```
git worktree add -b v2 ../v2 main
```
Now you can edit `main` and `v2` in parallel in two folders.
