# File Manager (Node.js)

This is a minimal File Manager CLI project created for learning and development.

Usage:
```
npm run start -- --username=YourName
```

Available commands (MVP):
- Navigation: ls, cd <path>, up
- Files: cat <file>, add <file>, mkdir <dir>, rn <path> <newName>, cp <src> <destDir>, mv <src> <destDir>, rm <path>
- OS info: os --EOL, os --cpus, os --homedir, os --username, os --architecture
- Hash: hash <file>
- Compression: compress <src> <dest>, decompress <src> <dest>
- Exit: .exit or Ctrl + C
