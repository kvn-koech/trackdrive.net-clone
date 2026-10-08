import os
import re

# 1. Process the newly downloaded password reset page
password_file = 'public/users/password/new.html'
try:
    with open(password_file, 'r', encoding='utf-8') as f:
        content = f.read()
except Exception as e:
    print(f"Failed to read {password_file}: {e}")
    content = ""

if content:
    # Apply standard branding
    content = content.replace('TrackDrive', 'Avortyx')
    content = content.replace('trackdrive', 'avortyx')
    content = content.replace('Trackdrive', 'Avortyx')
    content = content.replace('TRACKDRIVE', 'AVORTYX')
    
    # Inject Logo
    content = re.sub(r'<a class="navbar-brand.*?</a>', 
        r'''<a class="navbar-brand d-flex align-items-center gap-2" href="#" style="text-decoration: none;">
      <img alt="Avortyx" class="navbar-logo-light" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />
      <img alt="Avortyx" class="navbar-logo-dark" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />
      <span style="font-size: 32px; font-weight: 800; font-family: 'Inter', sans-serif; letter-spacing: -1.5px; color: #1a1a1a;">Avor<span style="color: #8cc63f;">tyx</span></span>
    </a>''', content, flags=re.DOTALL)
    
    content = re.sub(r'<a href="https://avortyx\.com/" class="text-decoration-none h2 m-0 text-dark fw-bold">.*?</a>', 
        r'''<a href="#" class="text-decoration-none h2 m-0 text-dark fw-bold d-flex align-items-center gap-2">
            <img alt="Avortyx" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />
            <span style="font-size: 32px; font-weight: 800; font-family: 'Inter', sans-serif; letter-spacing: -1.5px; color: #1a1a1a;">Avor<span style="color: #8cc63f;">tyx</span></span>
        </a>''', content, flags=re.DOTALL)

    # Convert absolute domain links to relative
    content = re.sub(r'href="https?://(?:www\.)?avortyx\.com(/[^"]*)"', r'href="\1"', content)
    
    # Fix internal links missing .html
    def fix_internal(match):
        url = match.group(1)
        if url == '/' or '.' in url.split('/')[-1] or url.startswith('#') or url.endswith('/'):
            return f'href="{url}"'
        else:
            return f'href="{url}.html"'
    content = re.sub(r'href="(/[^"]+)"', fix_internal, content)
    
    # Center Nav
    content = content.replace('class="navbar-nav ms-auto align-items-lg-center"', 'class="navbar-nav mx-auto align-items-lg-center"')
    
    # Restore Auth Buttons
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
    content = re.sub(target, replacement, content)

    with open(password_file, 'w', encoding='utf-8') as f:
        f.write(content)

# 2. Fix the nullified links across all files
def repair_nullified_links(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    original = content
    
    # In public/users/sign_in.html, the forgot password link was nullified
    if 'users/sign_in.html' in filepath:
        content = content.replace('href="#" class="small text-muted text-decoration-none">Forgot password?</a>', 'href="/users/password/new.html" class="small text-muted text-decoration-none">Forgot password?</a>')
    
    # The REST API Docs in the footer was nullified everywhere
    content = content.replace('href="#">REST API Docs</a>', 'href="https://trackdrive.com/api/docs">REST API Docs</a>')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Repaired links in {filepath}")

repair_nullified_links('index.html')
for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            repair_nullified_links(os.path.join(root, file))

print("Finished fixing password reset page and nullified links.")
