**Git** is a **distributed version control system (VCS)** used to track changes in source code during software development. It allows multiple developers to work on a project at the same time, manage code history, collaborate efficiently, and roll back to previous versions if something goes wrong.

### 📌 Why Git?
* Tracks every change in code.
* Allows collaboration without overwriting each other's work.
* Supports branching and merging to experiment safely.
* Enables working **offline** since it's distributed.

🧠 Version Control Basics
|Concept|Explanation|
|---|---|
|**Version Control**|A system that records changes to files over time so you can recall specific versions later.|
|**Repository (Repo)**|A directory or storage space where your project lives. It contains all your code and the history of changes.|
|**Commit**|A snapshot of your changes. It saves the current state of your files to the Git history.|
|**Branch**|A separate line of development. Useful for working on features or fixes independently.|
|**Merge**|Combining changes from one branch into another (usually from a feature branch into the main branch).|
|**Clone**|Downloading a remote repository to your local machine.|
|**Pull**|Fetching and merging changes from a remote repository to your local one.|
|**Push**|Uploading your local changes to a remote repository.|

### 🔁 Types of Version Control Systems
|Type|Description|
|---|---|
|**Local VCS**|Stores versions on a local system. Example: RCS|
|**Centralized VCS (CVCS)**|One central server, all clients pull and push from/to it. Example: **SVN, CVS**|
|**Distributed VCS (DVCS)**|Every user has a full copy of the repository. Example: **Git, Mercurial**|

### 🔍 Git vs Other VCS (like SVN)
|Feature|Git (DVCS)|SVN (CVCS)|
|---|---|---|
|**Repository Type**|Distributed|Centralized|
|**Network Dependency**|Works offline|Needs internet for most operations|
|**Speed**|Fast (local commits, diffs, logs)|Slower due to server communication|
|**Branching**|Lightweight and fast|Heavy and slower|
|**Merging**|Powerful merge tools|Basic merge support|
|**Data Integrity**|Uses SHA-1 to track changes|Less robust|
|**Staging Area**|Yes (index before commit)|No staging area|
|**History**|Entire history on every machine|History only on the central server|
|**Popularity**|Industry standard, used by GitHub, GitLab, etc.|Still used in some legacy projects|
