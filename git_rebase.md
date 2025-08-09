### 🔍 What Is Rebase?
Rebase **moves** or **reapplies commits** from one branch _on top of_ another. It creates a **linear history** and avoids unnecessary merge commits.
"Think of it as “replaying” your changes on top of another branch."
```
git rebase <base-branch>
```
This takes all your commits from your current branch and _reapplies_ them on top of `<base-branch>`.
### ✅ Example:
You are on `feature` and want to rebase it onto the latest `main`.
```
git checkout feature
git rebase main
```
This reapplies your `feature` branch commits on top of `main`’s latest commits.
### Workflow
1. ✅ Switch to the feature branch
2. 🔄 `git fetch origin`
3. ✅ `git rebase origin/main`
4. 🧹 Resolve conflicts (if any)
5. 🏁 `git rebase --continue`
### ⚠️ Conflicts During Rebase?
* Fix files manually
* `git add .`
* Continue rebase:
```
git rebase --continue
# abort if things go south:
git rebase --abort
```
|✅ Use Rebase When…|🚫 Avoid If…|
|---|---|
|You want a **clean commit history**|You’re rebasing **shared branches**|
|Before merging into `main`|Others already pulled the old history|
|For personal feature branches|Collaborative work is happening on the same branch|
## Flags:
|Command / Flag|Description|
|---|---|
|`git rebase <branch>`|Rebase current branch onto given branch|
|`--continue`|Continue rebase after fixing conflicts|
|`--abort`|Stop and restore original branch|
|`--skip`|Skip the problematic commit|
|`-i` / `--interactive`|Interactive rebase (edit, squash, etc.)|
`git rebase -i`
This opens an interactive UI to:
* Reorder commits
* Squash multiple commits into one
* Edit commit messages
Example:
```
git rebase -i HEAD~3

# output

pick 123abc first commit
pick 456def second commit
pick 789ghi third commit

# then pck to
# squash – combine commits
# edit – stop and allow changes
# reword – change commit message
```