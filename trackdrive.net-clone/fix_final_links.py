import os
import re

def fix_last_links(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    original = content
    
    # Fix links missing .html in the newly curled pages
    if 'verified_identity.html' in filepath or 'consent_opt_out.html' in filepath:
        content = content.replace('href="/sign_up"', 'href="/sign_up.html"')
        content = content.replace('href="/p/request_demo"', 'href="/p/request_demo.html"')
        content = content.replace('href="/features/spam_tag_mitigation"', 'href="/features/spam_tag_mitigation.html"')
        content = content.replace('href="/features/consent_opt_out"', 'href="/features/consent_opt_out.html"')
        content = content.replace('href="/features/data_export"', 'href="/features/data_export.html"')
        content = content.replace('href="/features/suppression_lists"', 'href="/features/suppression_lists.html"')
        content = content.replace('href="/features/state_rules"', 'href="/features/state_rules.html"')
        
    # Fix REST API Docs in password page
    if 'password/new.html' in filepath:
        content = content.replace('href="/api/docs.html"', 'href="https://trackdrive.com/api/docs"')
        
    # Fix the .ase asset in trackdrive.com/brand_assets.html
    # We actually just want to change it to point to the correct public path
    if 'brand_assets.html' in filepath:
        content = content.replace('href="/trackdrive.com/assets/trackdrive_marketing/brand-assets/Avortyx.ase"', 'href="/assets/trackdrive_marketing/brand-assets/Avortyx.ase"')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Repaired broken links in {filepath}")

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            fix_last_links(os.path.join(root, file))

print("Finished fixing final broken links.")
