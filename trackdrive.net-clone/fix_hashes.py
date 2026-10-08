import os
import re

def process_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filepath}: {e}")
        return

    # Fix links with hashes (e.g. /features#ai -> /features.html#ai)
    # Match href="/something#hash" where something does not contain a dot
    def replace_hashed_href(match):
        path = match.group(1)
        hash_part = match.group(2)
        if '.' not in path.split('/')[-1]:
            return f'href="{path}.html{hash_part}"'
        return match.group(0)

    content = re.sub(r'href="(/[^"#\.]+)(#[^"]+)"', replace_hashed_href, content)
    
    # Also fix any remaining trackdrive.com absolute links to relative
    content = content.replace('href="https://trackdrive.com/', 'href="/')
    content = content.replace('href="https://trackdrive.net/', 'href="/')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Process root index.html
process_html_file('index.html')

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            process_html_file(filepath)

print("Finished fixing hashed links.")
