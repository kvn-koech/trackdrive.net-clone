import os
import re

def restore_help_center(filepath):
    # Skip pages where we removed the entire navbar
    if not filepath.endswith('.html'):
        return
        
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    original = content
    
    # Check if "Help Center" is already there
    if 'Help Center</a>' in content:
        return
        
    # Inject Help Center right after Contact and before Sign In
    # We look for:
    # <li class="nav-item">
    #   <a class="nav-link" href="/users/sign_in.html">Sign In</a>
    # </li>
    
    # We will inject:
    # <li class="nav-item">
    #   <a class="nav-link" href="https://help.trackdrive.com" target="_blank">Help Center</a>
    # </li>
    
    injection = '''<li class="nav-item">
          <a class="nav-link" href="https://help.trackdrive.com" target="_blank">Help Center</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/users/sign_in.html">Sign In</a>
        </li>'''
        
    content = re.sub(
        r'<li class="nav-item">\s*<a class="nav-link" href="/users/sign_in\.html">Sign In</a>\s*</li>',
        injection,
        content
    )
    
    # Also replace it with Avortyx branding
    content = content.replace('help.trackdrive.com', 'help.avortyx.com')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Restored Help Center in {filepath}")

# Process main directory
restore_help_center('index.html')

# Process public
for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            restore_help_center(os.path.join(root, file))

print("Finished restoring Help Center.")
