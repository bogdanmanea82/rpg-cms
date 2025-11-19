# Git Workflow Reference

## Daily Development Cycle

1. **Before starting work**:
```bash
   git status          # See what state you're in
   git pull            # Get latest changes (when collaborating)
```

2. **Make changes**:
   - Edit files
   - Create new files
   - Delete obsolete files

3. **Stage changes atomically**:
```bash
   git status          # See what changed
   git add <file>      # Stage specific files
   # OR
   git add .           # Stage everything (use carefully)
```

4. **Commit with clear message**:
```bash
   git commit -m "Brief summary

   Detailed explanation of:
   - What changed
   - Why it changed
   - Any important context"
```

5. **Push to remote**:
```bash
   git push
```

6. **Repeat**

## Essential Commands

### Checking Status
- `git status` - Current state (use constantly!)
- `git log` - Commit history
- `git log --oneline -n 10` - Compact recent history
- `git diff` - See unstaged changes
- `git diff --staged` - See staged changes

### Making Changes
- `git add <file>` - Stage specific file
- `git add .` - Stage all changes in current directory
- `git commit -m "message"` - Commit staged changes
- `git push` - Send commits to remote

### Fixing Mistakes
- `git restore <file>` - Discard changes to file
- `git restore --staged <file>` - Unstage file
- `git commit --amend` - Modify last commit message
- `git reset HEAD~1` - Undo last commit (keep changes)

### Viewing History
- `git log` - Full commit history
- `git log --oneline` - Compact history
- `git log --oneline --graph` - Visual branch history
- `git show <commit-hash>` - See specific commit details

## Atomic Commit Pattern

Each commit should:
1. **Focus on one logical change**
2. **Have a clear, descriptive message**
3. **Leave the codebase in a working state**
4. **Be documented with why, not just what**

Examples of good atomic commits:
- "Add validation atom for email fields"
- "Configure ESLint for TypeScript strict mode"
- "Extract database connection into separate module"

Examples of bad commits:
- "WIP" (work in progress - too vague)
- "Fix stuff" (what stuff? why?)
- "Updates" (too generic)
- Commits mixing unrelated changes

## When to Commit

Commit when you've completed a self-contained unit of work:
- ✓ Finished a sub-atom implementation
- ✓ Added a test suite for a component
- ✓ Fixed a specific bug
- ✓ Refactored a single function
- ✓ Updated documentation for a feature

Don't commit:
- ✗ In the middle of a thought
- ✗ With broken tests (unless intentional TDD)
- ✗ Multiple unrelated changes together
- ✗ Work that's not yet functional

## Emergency Procedures

### "I staged the wrong file!"
```bash
git restore --staged <file>
```

### "I want to undo my last commit!"
```bash
# Keep the changes, just undo the commit:
git reset HEAD~1

# Completely discard the changes:
git reset --hard HEAD~1  # DESTRUCTIVE!
```

### "I committed to the wrong branch!"
```bash
# Create new branch from current position:
git branch correct-branch
# Reset current branch back:
git reset --hard HEAD~1
# Switch to correct branch:
git checkout correct-branch
```

### "I made a typo in my commit message!"
```bash
# If you haven't pushed yet:
git commit --amend

# If you've already pushed:
# Don't amend - just make a new commit clarifying
```

## Philosophy

Git is not just a backup system - it's documentation of your thinking process. 
Each commit tells a story. Make it a story worth reading.
