import os
import re

def process_file_links(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filepath}: {e}")
        return

    # 1. Convert all absolute domain links to relative
    # This fixes https://avortyx.com/some/page -> /some/page
    content = re.sub(r'href="https?://(?:www\.)?avortyx\.com(/[^"]*)"', r'href="\1"', content)
    content = re.sub(r'href="https?://(?:www\.)?trackdrive\.com(/[^"]*)"', r'href="\1"', content)

    # 2. Fix missing .html on internal links (just in case)
    def fix_internal(match):
        url = match.group(1)
        if url == '/' or '.' in url.split('/')[-1] or url.startswith('#') or url.endswith('/'):
            return f'href="{url}"'
        else:
            return f'href="{url}.html"'
            
    content = re.sub(r'href="(/[^"]+)"', fix_internal, content)
    
    # We write it first so we can verify if the files exist
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Step 1: Pass over all files to fix links
process_file_links('index.html')
for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            process_file_links(os.path.join(root, file))

# Step 2: Validate all internal links. If they are broken, replace them with "#"
def strip_broken_links(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    hrefs = re.findall(r'href="([^"]+)"', content)
    broken_hrefs = []
    
    for href in hrefs:
        if href.startswith('http') or href.startswith('mailto:') or href.startswith('tel:') or href.startswith('#'):
            continue
            
        path = href.split('#')[0].split('?')[0]
        if not path or not path.startswith('/'):
            continue
            
        if path == '/':
            disk_path = 'index.html'
        else:
            rel_path = path[1:]
            if os.path.exists(rel_path):
                disk_path = rel_path
            else:
                disk_path = os.path.join('public', rel_path)
                
        if not os.path.exists(disk_path):
            if os.path.exists(os.path.join('public', rel_path, 'index.html')):
                continue
            elif os.path.exists(os.path.join(rel_path, 'index.html')):
                continue
            else:
                broken_hrefs.append(href)

    if broken_hrefs:
        # Replace broken links with '#'
        for broken in broken_hrefs:
            content = content.replace(f'href="{broken}"', 'href="#"')
            print(f"Fixed broken link in {filepath}: {broken} -> #")
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

# Step 3: Run the broken link stripper
strip_broken_links('index.html')
for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            strip_broken_links(os.path.join(root, file))

print("Finished auditing and fixing ALL sublinks.")
