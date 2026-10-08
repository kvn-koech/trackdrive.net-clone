import os
import re

def process_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filepath}: {e}")
        return

    # Look for the Contact <li> tag closing and the </ul> tag closing.
    # The previous injection failed because href was relative like "../p/contact.html" or "p/contact.html"
    
    # We will just look for `>Contact</a>\s*</li>\s*</ul>` and replace the `</ul>` part
    target = r'>Contact</a>\s*</li>\s*</ul>'
    replacement = r'''>Contact</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/users/sign_in.html">Sign In</a>
        </li>
        <li class="nav-item ms-lg-2">
          <a class="btn btn-td-green btn-sm px-3" href="/sign_up.html">Sign Up Free</a>
        </li>
      </ul>'''
    
    # If it was already injected incorrectly or if we are applying it now
    # Let's remove any existing Sign In / Sign Up just in case they were injected weirdly
    content = re.sub(r'<li class="nav-item">\s*<a class="nav-link" href="/users/sign_in\.html">Sign In</a>\s*</li>', '', content)
    content = re.sub(r'<li class="nav-item ms-lg-2">\s*<a class="btn btn-td-green btn-sm px-3" href="/sign_up\.html">Sign Up Free</a>\s*</li>', '', content)
    
    # Now inject exactly once after Contact
    content = re.sub(target, replacement, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_html_file('index.html')

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            process_html_file(filepath)

print("Finished restoring Sign In and Sign Up using smarter regex.")
