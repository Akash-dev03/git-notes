### ⚙️ Git Stash Commands (with Flags)
|Command|Description|
|---|---|
|`git stash`|Stash all tracked modified files|
|`git stash -u` or `--include-untracked`|Also stash **untracked** files|
|`git stash -a` or `--all`|Stash **untracked + ignored** files|
|`git stash list`|Show all stashed items|
|`git stash show`|Show summary of latest stash|
|`git stash show -p`|Show full diff of latest stash|
|`git stash apply stash@{1}`|Apply a specific stash (without deleting it)|
|`git stash pop stash@{2}`|Apply and remove a specific stash|
|`git stash drop stash@{0}`|Delete a specific stash|
|`git stash clear`|Delete all stashes (⚠️ irreversible!)|
### Example:
```
# Make changes in files
git stash          # Save changes
git checkout main  # Switch safely
# do some work...
git checkout dev
git stash pop      # Bring back changes
```
### 📦 Stash Naming (Optional but Handy)
```
# You can label your stashes:
git stash save "WIP: navbar redesign"

Later you’ll see:
stash@{0}: On dev: WIP: navbar redesign
```

```
git stash pop
```
Sometimes you're mid-way through changes, but need to:
* Switch branches
* Pull latest changes
* Test something quickly
…but you're **not ready to commit** yet. That’s where `git stash` comes in!
### 🧠 What Is Git Stash?
`git stash` temporarily shelves (or stashes) **modified tracked files** so you can work on something else, and then come back to them later.
##  Common Use Cases
* You're halfway coding a feature but need to checkout another branch
* You're waiting for a code review but want to test a bugfix
### Basic Stash Workflow
1. Save your changes:
```
git stash
```
2. View your stash list:
```
git stash list
```
3. Apply the last stashed work:
```
git stash apply
```

