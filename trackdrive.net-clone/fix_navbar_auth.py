import os
import re

def fix_navbar_auth(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    original = content
    
    # We want to match:
    # 1. ">Contact</a>"
    # 2. "</li>"
    # 3. Anything up to "</ul>" (this catches those empty <li> tags)
    # And replace it with the Contact closing + the buttons + </ul>
    
    # We use re.DOTALL so .* matches newlines
    # But we want to match lazily up to the VERY NEXT </ul>, so .*?
    
    target = re.compile(r'(>Contact</a>\s*</li>).*?(</ul>)', re.DOTALL)
    
    replacement = r'''\1
        <li class="nav-item">
          <a class="nav-link" href="/users/sign_in.html">Sign In</a>
        </li>
        <li class="nav-item ms-lg-2">
          <a class="btn btn-td-green btn-sm px-3" href="/sign_up.html">Sign Up Free</a>
        </li>
      \2'''
      
    content = target.sub(replacement, content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed navbar in {filepath}")

fix_navbar_auth('index.html')
for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            fix_navbar_auth(os.path.join(root, file))

print("Finished fixing navbar auth buttons everywhere.")
