# 🏷️ Git Branch and Commit Vocabulary

This project follows the **Conventional Commits** standard and structured branch naming conventions. Use this guide to determine the correct prefix for branches and commit messages.

## 📐 Anatomy of a Branch Name

`prefix/short-description`
_Example: `feat/dark-mode` or `fix/navbar-overlap`_

## 📝 Anatomy of a Commit Message

`prefix(optional-scope): description`
_Example: `feat(auth): add google oauth` or `chore(deps): update pnpm packages`_

---

## 📊 Vocabulary Table

| Prefix         | What it Means          | When to Use It                                                                                                                          | Real-World Example     |
| :------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| **`feat`**     | Feature                | When you are adding a **brand-new capability** or page to the app that the user can interact with.                                      | `feat/payment-gateway` |
| **`fix`**      | Bug Fix                | When you are **repairing broken code** or an error that is causing the app to fail or look wrong.                                       | `fix/login-crash`      |
| **`chore`**    | Chore / Routine        | For routine tasks that **do not change production code**. Things like updating packages, moving files around, or managing `.gitignore`. | `chore/update-pnpm`    |
| **`docs`**     | Documentation          | When you are only changing text files meant for humans to read, like the `README.md` file or internal guides.                           | `docs/api-setup`       |
| **`style`**    | Styling / Formatting   | When you change the **formatting** of the code (spacing, semicolons, missing brackets) without changing what the code actually does.    | `style/eslint-fix`     |
| **`refactor`** | Refactoring            | Rewriting a piece of code to make it **cleaner, faster, or better**, without changing its external behavior or adding features.         | `refactor/auth-loop`   |
| **`test`**     | Testing                | When you are strictly adding or updating automated tests (like Vitest, Jest, or Cypress) to check if your code works.                   | `test/user-login`      |
| **`ci`**       | Continuous Integration | When you are changing files that control automated builds and deployments (like GitHub Actions workflows).                              | `ci/github-actions`    |

---

> 💡 **Pro-Tip:** Using this vocabulary allows automated tools to read your commit history and auto-generate release logs for your software!
