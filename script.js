// Ordered list of markdown files
const files = [
    "What_is_Git.md",
    "Git_Installation_and_basic_configuration.md",
    "Repository_basics.md",
    "Branching_&_Merging.md",
    "Remote,_Push,_Pull,.md",
    "Undoing_Changes.md",
    "Tracking_Branches_&_Upstream.md",
    "Fork_Syncing.md",
    "git_rebase.md",
    "Git_Stash.md",
    "Git_Reflog.md",
    "Git_Cherry-pick.md",
    "Git_Submodules.md",
    "git_worktree.md"
];

const list = document.getElementById("file-list");

files.forEach(file => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `view.html?file=${file}`;
    link.textContent = file.replace(".md", "").replace(/_/g, " ");
    li.appendChild(link);
    list.appendChild(li);
});
