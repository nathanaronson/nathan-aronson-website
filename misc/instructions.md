# Steps to Update Website on ENIAC

This guide is a personal reference because of how tedious it is to host the website on the ENIAC (there's no way I'd remember the workflow). Oh, what we do for free hosting...

---

## 1. Connect to ENIAC via SSH

```bash
ssh narons@eniac.seas.upenn.edu
```

## 2. Navigate to the `html/` folder (inside SSH)

```bash
cd ~/html
```

## 3. Remove all existing contents (inside SSH)

> Warning: This deletes all files in `html/`. Ensure you have backups if needed.

```bash
rm -r ./*
```

## 4. Build your website locally

On your local machine, run the build command (example using npm):

```bash
npm run build
```

## 5. Navigate to the build output folder (on local machine)

```bash
cd dist
```

## 6. Upload the new contents to ENIAC

```bash
scp -r . narons@eniac.seas.upenn.edu:html/
```

## 7. Set proper permissions for Apache (inside SSH)

Directories should be executable; files should be readable by all.

```bash
# Directories
find ~/html -type d -exec chmod 755 {} \;

# Files
find ~/html -type f -exec chmod 644 {} \;
```

## Notes

After these steps, your website should be up to date at:

```text
http://www.seas.upenn.edu/~narons/
```
