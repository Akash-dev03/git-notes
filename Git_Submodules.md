### 🧠 What is a Submodule?
A **submodule** is a Git repository **embedded** inside another Git repository.
This is useful when:
* You want to include an external library that lives in its own repo.
* You have a shared codebase between multiple projects.
* Example: You’re building a portfolio website and want to include a theme stored in a separate Git repo. Instead of copy-pasting, you add it as a submodule — so it tracks changes and can be updated.
```
# Add a submodule:
git submodule add <repo-url> <target-folder>
```
```
# Example:
git submodule add https://github.com/user/theme.git themes/my-theme
```
```
# clone
git clone --recurse-submodules <repo-url>

# if already cloned:
git submodule update --init --recursive
```
```
# Update all submodules:
git submodule update --remote --merge
```
```
# Remove a submodule:
git rm --cached <path-to-submodule>
rm -rf .git/modules/<path-to-submodule>
rm -rf <path-to-submodule>
```
### 🧨 Gotchas & Tips:
* Submodules are **fixed to a specific commit**. They don’t auto-update unless you tell them to.
* You have to **manually commit submodule changes** in the parent repo.
* If working with teams, **always run** `git submodule update --init --recursive` after pulling.
