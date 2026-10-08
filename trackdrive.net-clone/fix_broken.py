import os
import re

def process_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filepath}: {e}")
        return

    # Fix specific broken links
    content = content.replace('href="/api/docs.html"', 'href="https://trackdrive.com/api/docs"')
    content = content.replace('href="/features/consent_opt_out.html"', 'href="/features.html"')
    content = content.replace('href="/features/verified_identity.html"', 'href="/features.html"')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Process root index.html
process_html_file('index.html')

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            process_html_file(filepath)

print("Finished fixing broken links.")
