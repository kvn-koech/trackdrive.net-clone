import os
import urllib.request
import re

PAGES = [
    'features',
    'features/integrations',
    'pricing',
    'p/contact',
    'terms_of_service',
    'privacy_policy',
    'careers',
    'brand_assets'
]

BASE_URL = 'https://trackdrive.net/'

for page in PAGES:
    url = BASE_URL + page
    print(f"Downloading {url}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            content = response.read().decode('utf-8')
            
        # Generic replacements
        content = content.replace('TrackDrive', 'Avortyx')
        content = content.replace('Trackdrive', 'Avortyx')
        content = content.replace('trackdrive', 'avortyx')
        
        # URL Fixes (undo the bad generic replacements)
        content = re.sub(r'cloudfront\.net/assets/avortyx', r'cloudfront.net/assets/trackdrive', content)
        content = re.sub(r'amazonaws\.com/avortyx', r'amazonaws.com/trackdrive', content)
        content = content.replace('assets/avortyx_marketing', 'assets/trackdrive_marketing')
        
        # Favicon replacements
        content = re.sub(
            r'href="https://d15iqiuf0x41sc\.cloudfront\.net/assets/favicons/[^"]+"',
            r'href="/avortyx_logo.jpg"',
            content
        )
        
        # Navbar replacement
        navbar_target = r'<a class="navbar-brand" href="https://avortyx\.com/">\s*<img alt="Avortyx" class="navbar-logo-light"[^>]+>\s*<img alt="Avortyx" class="navbar-logo-dark"[^>]+>\s*</a>'
        navbar_replacement = r'''<a class="navbar-brand d-flex align-items-center gap-2" href="/" style="text-decoration: none;">
      <img alt="Avortyx" class="navbar-logo-light" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />
      <img alt="Avortyx" class="navbar-logo-dark" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />
      <span style="font-size: 32px; font-weight: 800; font-family: 'Inter', sans-serif; letter-spacing: -1.5px; color: #1a1a1a;">Avor<span style="color: #8cc63f;">tyx</span></span>
    </a>'''
        content = re.sub(navbar_target, navbar_replacement, content)
        
        # Footer replacement
        footer_target = r'<img alt="Avortyx" class="footer-logo footer-logo-light mb-3"[^>]+>\s*<img alt="Avortyx" class="footer-logo footer-logo-dark mb-3"[^>]+>'
        footer_replacement = r'''<div class="d-flex align-items-center gap-2 mb-3">
          <img alt="Avortyx" class="footer-logo footer-logo-light" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />
          <img alt="Avortyx" class="footer-logo footer-logo-dark" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />
          <span style="font-size: 32px; font-weight: 800; font-family: 'Inter', sans-serif; letter-spacing: -1.5px; color: #1a1a1a;">Avor<span style="color: #8cc63f;">tyx</span></span>
        </div>'''
        content = re.sub(footer_target, footer_replacement, content)
        
        # Fix href links to point locally (e.g. /features instead of https://avortyx.com/features)
        content = content.replace('href="https://avortyx.com/', 'href="/')
        
        # Make directories and save
        os.makedirs(page, exist_ok=True)
        with open(f"{page}/index.html", "w") as f:
            f.write(content)
            
    except Exception as e:
        print(f"Failed to process {page}: {e}")

print("Done.")
