import os
import re

def check_links(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Failed to read {filepath}: {e}")
        return

    # Find all hrefs
    hrefs = re.findall(r'href="([^"]+)"', content)
    broken_links = []
    
    for href in hrefs:
        # Ignore external links
        if href.startswith('http') or href.startswith('mailto:') or href.startswith('tel:'):
            continue
        
        # Ignore purely fragment links
        if href.startswith('#'):
            continue
            
        # Extract path
        path = href.split('#')[0].split('?')[0]
        
        if not path:
            continue
            
        # Assume path is relative to root
        if path.startswith('/'):
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
                    pass # Valid
                elif os.path.exists(os.path.join(rel_path, 'index.html')):
                    pass # Valid
                else:
                    broken_links.append((href, disk_path))

    if broken_links:
        print(f"Found {len(broken_links)} broken links in {filepath}:")
        broken_links = list(set(broken_links))
        for href, disk_path in broken_links:
            print(f"  - {href} (Expected file: {disk_path})")
        return False
    return True

all_valid = True
if not check_links('index.html'):
    all_valid = False

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            if not check_links(filepath):
                all_valid = False

if all_valid:
    print("All internal links across ALL pages are perfectly valid!")
