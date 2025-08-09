### Why Undoing Matters
In Git, you often make mistakes — wrong commits, bad merges, or even wrong files added. Git provides powerful tools to undo them cleanly.
We’ll cover:
* `git reset` → Go back to a previous commit (can alter history)
* `git revert` → Create a new commit that undoes another
* `git restore` → Discard changes to working directory or staging area
### `git reset` (Changes commit history)
|Command|Scope|Effect|
|---|---|---|
|`--soft`|Commit level|Moves HEAD, keeps staging & working dir|
|`--mixed` _(default)_|Commit + Staging|Moves HEAD, unstages files|
|`--hard`|Everything|Moves HEAD, **deletes all changes**|
### 📌 Examples
#### Go back 1 commit (but keep your changes staged)
```
git reset --soft HEAD~1
```
#### Unstage files (keep working directory changes)
```
git reset 
# or 
git reset --mixed HEAD
```
#### Danger Zone: Discard all changes
```
git reset --hard
# WARNING: Cannot be undone unless you backed up refs!
```
---
## `git revert` (Safe way to undo)
> Reverts **a commit** by creating a new commit that undoes its changes
```
git revert <commit-hash>
```
*   Safe for public/shared branches
*   Keeps history clean
### Example:
```
git revert a0446d0
```
---
## `git restore` (Working/staging area cleanup)
### Discard file changes in working directory:
```
git restore <file>
```
### Unstage file (from staging area):
```
git restore --staged <file>
```
### Restore file from a previous commit:
```
git restore --source=<commit> <file>
```

---
