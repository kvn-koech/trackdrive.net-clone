import os
import re

def process_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filepath}: {e}")
        return

    # Center the navbar links now that right-side actions are gone
    content = content.replace('class="navbar-nav ms-auto align-items-lg-center"', 'class="navbar-nav mx-auto align-items-lg-center"')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Process root index.html
process_html_file('index.html')

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            process_html_file(filepath)

print("Finished fixing positionings.")
