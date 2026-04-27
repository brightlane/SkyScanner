import os
import random
import re
import shutil
from datetime import datetime

# CONFIG
SCANNER_ID = "21885"
AFFILIATE_URL = f"https://www.skyscanner.net/g/referrals/v1/flights/home?associationId={SCANNER_ID}"

def get_unique_intro(kw):
    intros = [
        f"Searching for the best deals on {kw}? We've analyzed the latest data for 2026.",
        f"Planning your next trip involves finding {kw} that fits your budget.",
        f"The landscape for {kw} has changed this year. Here is what you need to know.",
        f"If you are looking to secure {kw}, timing and platform choice are everything."
    ]
    return random.choice(intros)

def get_unique_cta(kw):
    ctas = [
        f"Check Live {kw} Prices",
        f"View {kw} Availability",
        f"Compare {kw} on Skyscanner",
        f"Book Your {kw} Now"
    ]
    return random.choice(ctas)

def generate_descrambled_html(kw):
    date_str = datetime.now().strftime("%B %d, 2026")
    
    # Randomize layout order
    layout = ["intro", "cta", "details"]
    random.shuffle(layout)
    
    content_map = {
        "intro": f"<p>{get_unique_intro(kw)}</p>",
        "cta": f"""<div style="margin:20px 0; padding:20px; border:1px solid #00d7f3; border-radius:8px; text-align:center;">
                    <a href='{AFFILIATE_URL}' style='color:#0071eb; font-weight:bold; font-size:1.3em;'>{get_unique_cta(kw)}</a>
                  </div>""",
        "details": f"<p>Our 2026 Skyscanner portal helps you navigate {kw} with real-time updates. Last verified: {date_str}.</p>"
    }

    # Inject "Code Noise" - invisible unique strings to bypass fingerprinting
    code_noise = f""

    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{kw} - 2026 Travel Guide</title>
    <style>body{{font-family:'Segoe UI', Tahoma, sans-serif; max-width:850px; margin:auto; padding:40px; line-height:1.7; color:#222;}}</style>
</head>
<body>
    {code_noise}
    <h1>{kw}</h1>
    {content_map[layout[0]]}
    {content_map[layout[1]]}
    {content_map[layout[2]]}
    <hr style="border:0; border-top:1px solid #eee;">
    <footer style="font-size:0.8em; color:#666;">Global Travel Network | Skyscanner Partner ID {SCANNER_ID}</footer>
</body>
</html>"""

def main():
    target_dir = 'skyscanner-pages'
    if os.path.exists(target_dir): shutil.rmtree(target_dir)
    os.makedirs(target_dir)

    # Use a specific Skyscanner keyword list if you have one
    keywords = ["Cheap Flights", "Last Minute Travel"]
    if os.path.exists('skyscanner-keywords.txt'):
        with open('skyscanner-keywords.txt', 'r', encoding='utf-8') as f:
            keywords = [line.strip() for line in f if line.strip()]

    for kw in keywords:
        html = generate_descrambled_html(kw)
        # Sanitize name
        safe_name = re.sub(r'[^a-zA-Z0-9\s-]', '', kw.lower()).strip().replace(' ', '-')
        with open(f"{target_dir}/{safe_name}.html", 'w', encoding='utf-8') as f:
            f.write(html)
    
    print(f"🏁 Skyscanner Scrambler: {len(keywords)} unique pages built.")

if __name__ == "__main__":
    main()
