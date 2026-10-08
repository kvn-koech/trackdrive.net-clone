import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace favicons
content = re.sub(
    r'href="https://d15iqiuf0x41sc\.cloudfront\.net/assets/favicons/[^"]+"',
    r'href="/avortyx_logo.jpg"',
    content
)

# Replace navbar and footer logos
content = re.sub(
    r'src="https://d15iqiuf0x41sc\.cloudfront\.net/assets/trackdrive_marketing/brand-assets/[^"]+"',
    r'src="/avortyx_logo.jpg" style="height: 40px; width: auto; mix-blend-mode: multiply;"',
    content
)

with open('index.html', 'w') as f:
    f.write(content)
