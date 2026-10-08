import os
import re

def process_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filepath}: {e}")
        return

    # Change Logo href to #
    content = content.replace('href="https://avortyx.com/"', 'href="#"')

    # Fix all internal links that don't end in .html to end in .html so Vite dev server works.
    # Exclude links that have extensions, or fragments, or end with slash.
    
    # We can use a regex to find all href="/..." and append .html if it doesn't have an extension.
    def replace_href(match):
        url = match.group(1)
        # if it's just / or has an extension, leave it
        if url == '/' or '.' in url.split('/')[-1] or '#' in url or url.endswith('/'):
            return f'href="{url}"'
        else:
            return f'href="{url}.html"'

    content = re.sub(r'href="(/[^"]+)"', replace_href, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Processed {filepath}")

# Process root index.html
process_html_file('index.html')

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            process_html_file(filepath)

print("Finished processing all HTML files.")
