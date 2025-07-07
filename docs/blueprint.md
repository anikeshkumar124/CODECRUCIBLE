# **App Name**: Code Crucible

## Core Features:

- Code Editor: Embedded code editor with syntax highlighting (Monaco Editor or Ace Editor) to allow users to input and edit code directly in the browser.
- Language Selection: Language selector dropdown to choose the programming language (e.g., Python, C++, Java) for code compilation and execution.
- Custom Input: Input field for users to provide custom input values to the code during runtime.
- Code Execution: "Run Code" button to execute the code against the provided input.
- Test Case Submission: "Submit" button to run the code against a suite of predefined test cases, to check for correctness and edge cases.
- Results Display: A well-organized result panel to display code output (stdout), compilation errors (stderr), execution time, and a summary of test case results (pass/fail).
- Code Quality Check: AI-powered code quality checker tool: suggest improvements to the code based on best practices, performance, or security vulnerabilities, improving code readability and reliability. The LLM should decide if any particular comment will be of benefit to the user. The LLM will have access to the programming language, problem statement (if available) and test case coverage info. Add a "Why?" button next to each AI suggestion for clarity.
- Live Output Preview: An auto-run on typing toggle, so users can instantly see output as they type (limited to interpreted languages like Python, JS). Debounce the run call (e.g., 800ms) to avoid API spam.
- Enhanced Test Case Management: Allow test cases to be tagged (easy/edge/boundary) and optionally hidden. Enable JSON upload/download of test cases for problem setters. Add support for custom exit code validation (e.g., 0 for pass, others for fail).
- Usability & Accessibility: Keyboard shortcuts for Run (e.g., Ctrl+Enter), Submit (e.g., Ctrl+Shift+Enter). ARIA roles for screen readers (accessibility). Use toast notifications for errors or long executions.
- Session & Persistence: Store code autosaves in local storage, execution history per language. Optionally sync with backend/user account for permanent save.
- Analytics + Performance: Track most run language, frequent error types, average code length / quality score. Use for user feedback and improving code checker suggestions.
- Security Checks: For code execution sandbox (via Judge0 / Docker etc), add resource limits (CPU, time, memory), prevent infinite loops, and validate inputs (no shell injection). For code quality, let Gemini also flag potential SQL injections, insecure file access and hardcoded secrets.

## Style Guidelines:

- Primary color: Electric Indigo (#6F00FF) for a modern and sophisticated feel.
- Background color: Light grey (#E0E0E0) provides a clean and neutral backdrop.
- Accent color: Cyan (#00FFFF) to highlight important actions and interactive elements.
- Body and headline font: 'Inter' sans-serif for a clean, modern, and easily readable interface.
- Code font: 'Source Code Pro' monospace font for clear and legible code display within the editor.
- Simple, clear icons for actions (run, submit) and status (pass, fail) to improve usability.
- Split-screen layout with code editor on one side and result panel on the other for easy code editing and result viewing.