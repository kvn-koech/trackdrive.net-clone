import os
import re
from posixpath import normpath, join, dirname

def make_links_absolute(filepath, base_dir):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    original = content
    
    # Path relative to public/
    # e.g., if filepath is public/features/ai_sms_bots.html, rel_file is features/ai_sms_bots.html
    rel_file = os.path.relpath(filepath, base_dir)
    file_dir = '/' + dirname(rel_file) if dirname(rel_file) else '/'
    
    def replacer(match):
        href = match.group(1)
        
        # Ignore external, fragment, and already absolute links
        if href.startswith(('http', 'mailto:', 'tel:', '#', '/')):
            return match.group(0)
            
        # Parse out hash if present
        hash_part = ''
        if '#' in href:
            href, hash_part = href.split('#', 1)
            hash_part = '#' + hash_part
            
        # If href is empty (was just a hash), skip
        if not href:
            return match.group(0)
            
        # Resolve path
        resolved_path = normpath(join(file_dir, href))
        
        return f'href="{resolved_path}{hash_part}"'

    # Match href="..."
    content = re.sub(r'href="([^"]+)"', replacer, content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed relative links in {filepath}")

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            make_links_absolute(os.path.join(root, file), 'public')
            
# Also fix root index.html (treat as if it's in public/)
make_links_absolute('index.html', '.')

print("Finished making all internal links absolute.")
