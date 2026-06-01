import glob
for file in glob.glob('c:/Users/seyit/Desktop/MAGANDA/*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'js/catalog.js' not in content:
        content = content.replace('js/main.js', 'js/catalog.js"></script>\n  <script src="js/main.js')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
print('Updated HTML files.')
