import os
import re

new_files = [
    'public/features/consent_opt_out.html',
    'public/features/verified_identity.html'
]

def process_new_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return

    # Branding
    content = content.replace('TrackDrive', 'Avortyx')
    content = content.replace('trackdrive', 'avortyx')
    content = content.replace('Trackdrive', 'Avortyx')
    content = content.replace('TRACKDRIVE', 'AVORTYX')
    
    # Logo
    content = re.sub(r'<a class="navbar-brand.*?</a>', 
        r'''<a class="navbar-brand d-flex align-items-center gap-2" href="/" style="text-decoration: none;">
      <img alt="Avortyx" class="navbar-logo-light" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />
      <img alt="Avortyx" class="navbar-logo-dark" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />
      <span style="font-size: 32px; font-weight: 800; font-family: 'Inter', sans-serif; letter-spacing: -1.5px; color: #1a1a1a;">Avor<span style="color: #8cc63f;">tyx</span></span>
    </a>''', content, flags=re.DOTALL)

    content = re.sub(r'<a href="https://avortyx\.com/" class="text-decoration-none h2 m-0 text-dark fw-bold">.*?</a>', 
        r'''<a href="/" class="text-decoration-none h2 m-0 text-dark fw-bold d-flex align-items-center gap-2">
            <img alt="Avortyx" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />
            <span style="font-size: 32px; font-weight: 800; font-family: 'Inter', sans-serif; letter-spacing: -1.5px; color: #1a1a1a;">Avor<span style="color: #8cc63f;">tyx</span></span>
        </a>''', content, flags=re.DOTALL)

    # Center Nav
    content = content.replace('class="navbar-nav ms-auto align-items-lg-center"', 'class="navbar-nav mx-auto align-items-lg-center"')
    
    # Auth Buttons
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
    
    # Absolute links
    def replacer(match):
        href = match.group(1)
        if href.startswith(('http', 'mailto:', 'tel:', '#', '/')):
            return match.group(0)
        hash_part = ''
        if '#' in href:
            href, hash_part = href.split('#', 1)
            hash_part = '#' + hash_part
        if not href:
            return match.group(0)
        from posixpath import normpath, join, dirname
        rel_file = os.path.relpath(filepath, 'public')
        file_dir = '/' + dirname(rel_file) if dirname(rel_file) else '/'
        resolved = normpath(join(file_dir, href))
        return f'href="{resolved}{hash_part}"'
    content = re.sub(r'href="([^"]+)"', replacer, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for f in new_files:
    process_new_file(f)


def restore_security_links(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return
        
    original = content
    
    # Restore the specific cards in features.html
    content = re.sub(r'href="#"([^>]*>\s*<div[^>]*>\s*<div[^>]*>\s*<i[^>]*></i>\s*</div>\s*<h5[^>]*>Consent & Opt-Out</h5>)', r'href="/features/consent_opt_out.html"\1', content)
    content = re.sub(r'href="#"([^>]*>\s*<div[^>]*>\s*<div[^>]*>\s*<i[^>]*></i>\s*</div>\s*<h5[^>]*>Verified Identity & Caller ID</h5>)', r'href="/features/verified_identity.html"\1', content)
    
    # Text links in other feature pages
    content = re.sub(r'href="#"([^>]*>Consent & Opt-Out</a>)', r'href="/features/consent_opt_out.html"\1', content)
    content = re.sub(r'href="#"([^>]*>Verified Identity & Caller ID</a>)', r'href="/features/verified_identity.html"\1', content)
    content = re.sub(r'href="#"([^>]*>Verified Identity</a>)', r'href="/features/verified_identity.html"\1', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Restored security links in {filepath}")

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            restore_security_links(os.path.join(root, file))

print("Finished integrating security pages.")
