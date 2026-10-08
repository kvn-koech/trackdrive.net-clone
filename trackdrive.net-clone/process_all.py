import os
import re

def process_html_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Skipping {filepath}: {e}")
        return

    # Generic replacements
    content = content.replace('TrackDrive', 'Avortyx')
    content = content.replace('Trackdrive', 'Avortyx')
    content = content.replace('trackdrive', 'avortyx')

    # URL Fixes
    content = content.replace('cloudfront.net/assets/avortyx', 'cloudfront.net/assets/trackdrive')
    content = content.replace('amazonaws.com/avortyx', 'amazonaws.com/trackdrive')
    content = content.replace('assets/avortyx_marketing', 'assets/trackdrive_marketing')

    # Favicon
    content = re.sub(
        r'href="https://d15iqiuf0x41sc\.cloudfront\.net/assets/favicons/[^"]+"',
        r'href="/avortyx_logo.jpg"',
        content
    )

    # Simplified logo swap
    # Instead of full regex, just string replacement
    content = content.replace(
        '<img alt="Avortyx" class="navbar-logo-light" src="https://d15iqiuf0x41sc.cloudfront.net/assets/trackdrive_marketing/brand-assets/horizontal-gradient-logo-b597a493481a57b2b9d4414ab7e371c086df0062e831e5e9b1d286f1f7ab3e0e.png" />',
        '<img alt="Avortyx" class="navbar-logo-light" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" /> <span style="font-size: 32px; font-weight: 800; font-family: \'Inter\', sans-serif; letter-spacing: -1.5px; color: #1a1a1a;">Avor<span style="color: #8cc63f;">tyx</span></span>'
    )
    content = content.replace(
        '<img alt="Avortyx" class="navbar-logo-dark" src="https://d15iqiuf0x41sc.cloudfront.net/assets/trackdrive_marketing/brand-assets/horizontal-white-text-logo-3a60c0439799dad8699acdd86a2e11d058514ef01f642e62e798d7260d985742.png" />',
        '<img alt="Avortyx" class="navbar-logo-dark" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />'
    )
    content = content.replace(
        '<img alt="Avortyx" class="footer-logo footer-logo-light mb-3" src="https://d15iqiuf0x41sc.cloudfront.net/assets/trackdrive_marketing/brand-assets/vertical-gradient-logo-4e5933ab98f9eb1823497c95f4b1dd1fcc9c29238ccec7c26300a7f028d1fbc2.png" />',
        '<img alt="Avortyx" class="footer-logo footer-logo-light mb-3" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" /> <span style="font-size: 32px; font-weight: 800; font-family: \'Inter\', sans-serif; letter-spacing: -1.5px; color: #1a1a1a;">Avor<span style="color: #8cc63f;">tyx</span></span>'
    )
    content = content.replace(
        '<img alt="Avortyx" class="footer-logo footer-logo-dark mb-3" src="https://d15iqiuf0x41sc.cloudfront.net/assets/trackdrive_marketing/brand-assets/vertical-logo-white-2a16528aa4b8aed3217936eb0750adf4820be643cff3bc22e451cd627028b1ad.png" />',
        '<img alt="Avortyx" class="footer-logo footer-logo-dark mb-3" src="/avortyx_logo.jpg" style="height: 65px; width: auto; mix-blend-mode: multiply;" />'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Processed {filepath}")

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            process_html_file(filepath)

print("Finished processing all HTML files.")
