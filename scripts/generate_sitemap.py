import os
from datetime import datetime

# Configuration - Update this to your actual GitHub Pages URL
BASE_URL = "https://brightlane.github.io/SkyScanner" 
FLIGHTS_DIR = 'flights'
SITEMAP_FILE = 'sitemap.xml'

def build_sitemap():
    pages = []
    
    # 1. Add the main index if it exists
    pages.append(BASE_URL)

    # 2. Scan the flights directory for all generated route pages
    if os.path.exists(FLIGHTS_DIR):
        for file in os.listdir(FLIGHTS_DIR):
            if file.endswith(".html"):
                # Clean up the path for the URL
                pages.append(f"{BASE_URL}/{FLIGHTS_DIR}/{file}")

    # 3. Generate XML structure
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for page in pages:
        xml += '  <url>\n'
        xml += f'    <loc>{page}</loc>\n'
        xml += f'    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>\n'
        xml += '    <priority>0.8</priority>\n'
        xml += '  </url>\n'
    
    xml += '</urlset>'

    # 4. Write the sitemap to the root directory
    with open(SITEMAP_FILE, 'w', encoding='utf-8') as f:
        f.write(xml)
    
    print(f"🗺️ Vulture 10K: Sitemap updated with {len(pages)} URLs.")

if __name__ == "__main__":
    build_sitemap()
