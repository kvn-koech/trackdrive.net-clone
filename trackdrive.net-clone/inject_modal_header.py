import os
import re

def inject_modal_header(filepath):
    # Don't inject in main features.html
    if filepath.endswith('features.html') or filepath.endswith('features/index.html'):
        return
        
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    original = content
    
    # Check if we already injected it
    if 'id="injected-modal-header"' in content:
        # We can replace it or just return
        content = re.sub(r'<div id="injected-modal-header".*?</div>\s*<!-- END INJECTED -->', '', content, flags=re.DOTALL)
        
    # The absolute URL for "View full page" is just the current path
    # But since it's already the full page when viewed directly, "View full page" is just a visual mimic.
    # The user explicitly asked for "view full page links and X to cancel" on these pages.
    # We will inject it right after the opening <body ... > tag.
    
    # We want the href of "View full page" to just be the current page's absolute path
    # e.g., /features/spam_tag_mitigation.html
    rel_path = os.path.relpath(filepath, 'public')
    absolute_url = f'/{rel_path}'
    
    injection = f'''
    <div id="injected-modal-header" class="feature-modal-actions bg-white p-3 d-flex justify-content-end align-items-center border-bottom" style="position: sticky; top: 0; z-index: 9999;">
      <a class="feature-modal-fullpage text-decoration-none text-secondary me-3" href="{absolute_url}" target="_blank">
        <i class="fa-solid fa-up-right-from-square me-1"></i>View full page
      </a>
      <a href="javascript:history.back()" class="btn-close" aria-label="Close" style="cursor: pointer;"></a>
    </div>
    <!-- END INJECTED -->
    '''
    
    # Inject after <body ...>
    content = re.sub(r'(<body[^>]*>)', r'\1' + injection, content, count=1)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected modal header into {filepath}")

for root, dirs, files in os.walk('public/features'):
    for file in files:
        if file.endswith('.html'):
            inject_modal_header(os.path.join(root, file))

for root, dirs, files in os.walk('public/trackdrive.com/features'):
    for file in files:
        if file.endswith('.html'):
            inject_modal_header(os.path.join(root, file))

print("Finished injecting mock modal headers.")
