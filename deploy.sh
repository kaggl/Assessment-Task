npm run build
git add -A
git commit -m "Building for deploy"
git push
git subtree push --prefix dist origin gh-pages
