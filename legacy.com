<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2026 Inheritourism | Legacy Safaris & Heritage Journeys</title>
    <style>
        :root { --burgundy: #6b21a8; --paper: #fdfbf7; --ink: #1e293b; }
        * { margin:0; padding:0; box-sizing:border-box; font-family: 'Playfair Display', serif; }
        body { background: var(--paper); color: var(--ink); line-height: 1.8; }
        
        .nav { padding: 25px; text-align: center; background: #fff; border-bottom: 2px solid #f1f5f9; font-family: 'Inter', sans-serif; }
        .nav a { color: var(--burgundy); text-decoration: none; margin: 0 15px; font-weight: 600; font-size: 0.8rem; letter-spacing: 1px; }

        .hero-legacy { padding: 100px 20px; text-align: center; background: linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80'); background-size: cover; }
        .hero-legacy h1 { font-size: 3.2rem; margin-bottom: 20px; color: #1e1b4b; }
        .hero-legacy p { font-size: 1.2rem; max-width: 700px; margin: 0 auto; color: #475569; font-style: italic; }

        .legacy-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 35px; padding: 60px 20px; }
        .legacy-card { background: #fff; padding: 40px; border: 1px solid #e2e8f0; border-radius: 8px; position: relative; }
        .legacy-card h3 { color: var(--burgundy); font-size: 1.6rem; margin-bottom: 15px; }
        
        .stat-pill { position: absolute; top: -15px; right: 20px; background: var(--burgundy); color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.7rem; font-family: 'Inter', sans-serif; font-weight: 700; }

        .destination-block { margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1; }
        .destination-block span { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 0.75rem; color: #64748b; text-transform: uppercase; }

        .booking-footer { background: #1e1b4b; color: white; padding: 80px 20px; text-align: center; margin-top: 40px; }
        .btn-legacy { display: inline-block; padding: 18px 45px; background: #fff; color: #1e1b4b; text-decoration: none; font-weight: 800; border-radius: 4px; font-family: 'Inter', sans-serif; transition: 0.3s; }
        .btn-legacy:hover { background: var(--burgundy); color: white; }
    </style>
</head>
<body>

    <nav class="nav">
        <a href="index.html">DASHBOARD</a>
        <a href="eco.html">REGENERATIVE</a>
        <a href="nomad.html">NOMAD BASES</a>
    </nav>

    <div class="hero-legacy">
        <h1>Inheritourism: The 2026 Legacy Voyage</h1>
        <p>Because the best things we leave behind aren't things—they are the memories of where we stood together.</p>
    </div>

    <div class="legacy-grid">
        <!-- Trend 1: Ancestry Travels -->
        <div class="legacy-card">
            <span class="stat-pill">TOP 2026 TREND</span>
            <h3>Ancestry Journeys</h3>
            <p>60% of Millennials are prioritizing travel that connects them to their roots. These aren't just trips; they are identity-building experiences for the whole family tree.</p>
            <div class="destination-block">
                <span>Key Regions:</span>
                <p>Ireland, West Africa, Sicily, & Scandinavia.</p>
            </div>
        </div>

        <!-- Trend 2: Legacy Safaris -->
        <div class="legacy-card">
            <h3>"Skip-Gen" Safaris</h3>
            <p>A massive rise in grandparents taking grandchildren on 1-on-1 "Legacy Safaris" in Kenya and South Africa, leaving the parents at home for a week of pure connection.</p>
            <div class="destination-block">
                <span>Key Regions:</span>
                <p>Maasai Mara, Kruger National Park, & Botswana.</p>
            </div>
        </div>
    </div>

    <div class="booking-footer">
        <h2>Plan Your 2026 Family Reunion</h2>
        <p style="margin-bottom: 30px; opacity: 0.8;">Specialists in multi-generational logistics and heritage-certified guides.</p>
        <a href="http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885" class="btn-legacy">BROWSE FAMILY COLLECTIONS</a>
    </div>

    <footer style="text-align: center; padding: 40px; color: #94a3b8; font-size: 0.8rem; font-family: 'Inter', sans-serif;">
        © 2026 SoftLife Network | Modernizing Heritage for the Next Generation.
    </footer>

</body>
</html>
