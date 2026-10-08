import os
import re

def remove_navbar(filepath):
    # Don't remove from the main features.html or features/index.html
    if filepath.endswith('features.html') or filepath.endswith('features/index.html'):
        return
        
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    original = content
    
    # Remove the entire <nav> block
    content = re.sub(r'<nav class="navbar.*?</nav>', '', content, flags=re.DOTALL)
    
    # Check if there is also a secondary sticky subnav or something? No, just the main navbar.
    # What about the footer? The user only specified the navbar.
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed navbar from {filepath}")

# Process features subdirectories
for root, dirs, files in os.walk('public/features'):
    for file in files:
        if file.endswith('.html'):
            remove_navbar(os.path.join(root, file))
            
for root, dirs, files in os.walk('public/trackdrive.com/features'):
    for file in files:
        if file.endswith('.html'):
            remove_navbar(os.path.join(root, file))

print("Finished removing navbars from feature subpages.")
