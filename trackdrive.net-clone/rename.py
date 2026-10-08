import sys
import re

with open('index.html', 'r') as f:
    content = f.read()

# Fix CloudFront assets
content = re.sub(r'cloudfront\.net/assets/avortyx', r'cloudfront.net/assets/trackdrive', content)

# Fix AWS S3 assets
content = re.sub(r'amazonaws\.com/avortyx', r'amazonaws.com/trackdrive', content)

# Fix any other potential asset paths that might have been broken by the generic replace
content = content.replace('assets/avortyx_marketing', 'assets/trackdrive_marketing')

with open('index.html', 'w') as f:
    f.write(content)
