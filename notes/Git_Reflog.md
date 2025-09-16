When you're lost in Git—maybe you reset, deleted a branch, or messed up a rebase—`git reflog` can save your life.
### 🔍 What is `git reflog`?
`git reflog` keeps a **log of every HEAD change** — commits, resets, checkouts, rebases, merges — even those Git history tools like `git log` _don’t_ show.
### 🛠️ Common Uses
* Recover deleted commits
* Undo a reset or rebase
* Find where a branch pointed earlier
* Roll back to a lost state
```
git reflog
# output:
# a0446d0 HEAD@{0}: reset: moving to a0446d0
# f3c210b HEAD@{1}: commit: fixed login bug
# 9ab13ff HEAD@{2}: commit: added signup API
```
### ⏪ Restore from Reflog
If you want to go back to a previous state:
```
git checkout HEAD@{2}
# or
git checkout -b restore-branch HEAD@{2}
```
### 🚨 Warning:
Reflog entries expire over time (default is 90 days), so don't wait forever to recover lost work.
