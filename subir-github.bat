@echo off
cd /d "%~dp0"
(
echo === git rm gitlink
git rm --cached -q appclients-react
echo === git add
git add .
git status --short
echo === commit
git commit -m "Reto 1-3: conexion Supabase, navbar, About, gitignore con .env"
echo === push
git push origin main
echo === fin
) > subir-log.txt 2>&1
