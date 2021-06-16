npm run build
git commit -m "Building for deploy"
git push
git subtree push --prefix dist origin gh-pages
