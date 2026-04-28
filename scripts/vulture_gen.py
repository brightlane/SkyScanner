import json
import os
import itertools

# Load your Skyscanner Protocol
with open('data/affiliate.json', 'r') as f:
    config = json.load(f)

OUTPUT_DIR = 'flights'
if not os.path.exists(OUTPUT_DIR): os.makedirs(OUTPUT_DIR)

locations = config['locations']
base_affiliate_url = config['base_url']

# Generate pairs (e.g., 100 cities = 9,900 unique routes)
routes = list(itertools.permutations(locations, 2))

for origin, dest in routes:
    route_id = f"{origin['code']}-{dest['code']}".lower()
    
    # Custom Sub-ID for tracking which route converts
    tracking_url = f"{base_affiliate_url}&aff_sub={route_id}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Cheap Flights from {origin['city']} to {dest['city']} | SkyFinder</title>
        <style>
            body {{ background: #0a192f; color: #ccd6f6; font-family: sans-serif; text-align: center; padding: 50px; }}
            .route-card {{ border: 1px solid #64ffda; padding: 40px; border-radius: 15px; max-width: 600px; margin: auto; }}
            h1 {{ color: #64ffda; font-size: 2rem; }}
            .price-tag {{ font-size: 1.5rem; margin: 20px 0; color: #8892b0; }}
            .btn {{ display: inline-block; padding: 15px 30px; border: 1px solid #64ffda; color: #64ffda; text-decoration: none; border-radius: 5px; font-weight: bold; }}
        </style>
    </head>
    <body>
        <div class="route-card">
            <p>SKSCANNER PROTOCOL: ACTIVE</p>
            <h1>{origin['city']} ({origin['code']}) → {dest['city']} ({dest['code']})</h1>
            <p class="price-tag">Analyzing 1,200+ airlines for this route...</p>
            <a href="{tracking_url}" class="btn">View Live Deals for 2026 →</a>
        </div>
    </body>
    </html>
    """
    
    with open(f"{OUTPUT_DIR}/{route_id}.html", "w", encoding="utf-8") as f:
        f.write(html_content)

print(f"Vulture 10K: Deployed {len(routes)} flight route pages.")
