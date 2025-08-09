### `git remote`
### ✅ Purpose:
To manage the remote repositories (like GitHub URLs) that your local Git project is connected to.
### 📌 Default Remote: `origin`
When you clone a repo or push one to GitHub, it usually names the remote as `origin`
|Command|Description|
|---|---|
|`git remote -v`|View all remotes with their URLs (fetch + push)|
|`git remote add <name> <url>`|Add a new remote (commonly: `origin`, `upstream`)|
|`git remote remove <name>`|Remove a remote|
|`git remote rename <old> <new>`|Rename a remote|
|`git remote set-url <name> <new-url>`|Change the URL of an existing remote|
🧠 Examples:
```
# See current remotes (usually shows origin)
git remote -v

# Add a remote named origin
git remote add origin https://github.com/username/repo.git

# Add an upstream (if you forked a repo)
git remote add upstream https://github.com/original-author/repo.git

# Change remote URL (for example, if you switch HTTPS to SSH)
git remote set-url origin git@github.com:username/repo.git

# Remove a remote
git remote remove upstream
```
---
|Command|Purpose|
|---|---|
|`git push`|Sends your local commits to a remote repository (e.g., GitHub)|
|`git pull`|Fetches + merges remote changes into your current branch|
|`git fetch`|Downloads changes from remote but **doesn’t merge**|
* Push Current Branch to Remote (First Time)
```
git push -u origin main
```
`-u` sets the upstream tracking so you can use `git push` next time without specifying branch.
* Push Later Updates
```
git push
```
* Push a Specific Branch
```
git push origin feature-branch
```
* Force Push (⚠️ Use with caution)
```
# Overwrites remote history
git push --force
# or
git push -f
```
### Important Flags
|Flag|Use|
|---|---|
|`-u` / `--set-upstream`|Links your local branch with the remote (so future pushes can just use `git push`)|
|`--force`|Forces the push, even if it will overwrite others' work|
|`--force-with-lease`|Safer force-push, fails if remote was updated since last pull|
|`--delete`|Deletes a branch from the remote|
### Pulling Changes from Remote
Fetches and merges changes from the tracked branch (usually `origin/main`).
```
git pull
```
Pull with Rebase (cleaner history)
```
git pull --rebase
```
* Puts your changes **on top** of the remote changes.
* Avoids unnecessary merge commits.
### Fetching Changes Without Merging
```
git fetch
```
* Downloads remote changes but doesn't apply them.
* Useful when you want to inspect changes first.
* Then manually merge or rebase:
```
git merge origin/main
# or
git rebase origin/main
```
### Syncing Forked Repositories
```
git remote add upstream https://github.com/original/repo.git
git fetch upstream
git merge upstream/main
```
Tip: Always `git pull` or `git fetch` before starting new work to avoid conflicts.
