When you **fork a repository** (e.g. on GitHub), your copy can become **outdated** as the **original repo** gets updated.
To keep your fork fresh, you need to **sync** it with the **upstream** repo.
* `origin`: Your fork (your GitHub copy)
* `upstream`: The original repo you forked from
🔧 Step-by-Step Guide to Sync a Fork:
1. Only need to do this **once**:
```
git remote add upstream https://github.com/original-user/repo.git
# to confirm
git remote -v
```
2. Fetch Latest Changes from Upstream
```
git fetch upstream
# This pulls all branches from the original repo (but doesn’t merge them yet).
```
3. Checkout the Branch You Want to Sync
```
git checkout main
#  branch you’re syncing
```
4. Merge or Rebase Upstream into Your Branch
```
# Merge (Safer)
git merge upstream/main

# Rebase (Cleaner History)
git rebase upstream/main
```
5. Push Changes to Your Fork (Origin)
```
git push origin main
# Now GitHub fork is in sync with the original repo.
```