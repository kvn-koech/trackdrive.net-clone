import os
import re

def process_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filepath}: {e}")
        return

    # Put mx-auto back to ms-auto
    content = content.replace('class="navbar-nav mx-auto align-items-lg-center"', 'class="navbar-nav ms-auto align-items-lg-center"')

    # Inject Sign In and Sign Up buttons back into the navbar
    target = r'<li class="nav-item">\s*<a class="nav-link" href="/p/contact\.html">Contact</a>\s*</li>\s*</ul>'
    replacement = r'''<li class="nav-item">
          <a class="nav-link" href="/p/contact.html">Contact</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/users/sign_in.html">Sign In</a>
        </li>
        <li class="nav-item ms-lg-2">
          <a class="btn btn-td-green btn-sm px-3" href="/sign_up.html">Sign Up Free</a>
        </li>
      </ul>'''
    
    content = re.sub(target, replacement, content)

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

print("Finished restoring Sign In and Sign Up.")
