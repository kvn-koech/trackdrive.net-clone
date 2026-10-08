import os
import re

def strip_recaptcha(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    original = content
    
    # Remove the reCAPTCHA api.js script
    content = re.sub(r'<script src="https://www\.google\.com/recaptcha/api\.js"[^>]*></script>', '', content)
    
    # Remove the g-recaptcha div
    content = re.sub(r'<div class="g-recaptcha"[^>]*></div>', '', content)
    
    # Remove any noscript fallback for reCAPTCHA
    content = re.sub(r'<noscript>.*?https://www\.google\.com/recaptcha/api/fallback.*?</noscript>', '', content, flags=re.DOTALL)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Stripped reCAPTCHA from {filepath}")

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            strip_recaptcha(os.path.join(root, file))

print("Finished stripping reCAPTCHA from all pages.")
