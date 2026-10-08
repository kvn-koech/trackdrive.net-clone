import os
import re

def process_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filepath}: {e}")
        return

    # Remove Help Center, Sign In, and Sign Up from navbar
    content = re.sub(r'<li class="nav-item">\s*<a class="nav-link" href="https://support\.avortyx\.com">Help Center</a>\s*</li>', '', content)
    content = re.sub(r'<li class="nav-item">\s*<a class="nav-link" href="/users/sign_in">Sign In</a>\s*</li>', '', content)
    content = re.sub(r'<li class="nav-item ms-lg-2">\s*<a class="btn btn-td-green btn-sm px-3" href="/sign_up">Sign Up Free</a>\s*</li>', '', content)
    content = re.sub(r'<li class="nav-item">\s*<a class="nav-link" href="https://support\.trackdrive\.com">Help Center</a>\s*</li>', '', content)

    # Extra aggressive removal just in case of formatting differences
    content = re.sub(r'<a[^>]*>Help Center</a>', '', content)
    content = re.sub(r'<a[^>]*>Sign In</a>', '', content)
    content = re.sub(r'<a[^>]*>Sign Up Free</a>', '', content)
    content = re.sub(r'<a[^>]*>Get Started Free</a>', '', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Processed {filepath}")

# Process root index.html
process_html_file('index.html')

# Process all files in public/
for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            process_html_file(filepath)

print("Finished processing all HTML files.")
