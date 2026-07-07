-- Embervale demo UI: everything on screen is simulated client-side.
-- Vitals gauges (Geyser.Gauge), a location label (Geyser.Label), the
-- Chronicle user window, and timers that keep it all breathing.

embervale = embervale or {}
-- Idempotence guard: the package script can run more than once in a Lua
-- state (install + profile load) — a second run must not double the timers.
if embervale.loaded then return end
embervale.loaded = true
local ev = embervale

math.randomseed(os.time())

-- ── Vitals: three gauges pinned above the command line ──────────────
local function makeGauge(name, y, frontCss, text)
    local g = Geyser.Gauge:new({ name = name, x = "1%", y = y, width = "22%", height = "20px" })
    g.back:setStyleSheet([[background-color: rgba(20,14,12,0.85); border: 1px solid #3a2b22; border-radius: 4px;]])
    g.front:setStyleSheet(string.format([[background-color: %s; border-radius: 4px;]], frontCss))
    g.text:setStyleSheet([[padding-left: 8px; font-family: Consolas, monospace; font-size: 11px; color: #f0e2d0;]])
    g:setValue(100, 100, text)
    return g
end

ev.hp  = makeGauge("ev_hp",  "-92px", "#c23b22", "Vitality")
ev.mn  = makeGauge("ev_mn",  "-68px", "#7a4a9e", "Emberflow")
ev.sta = makeGauge("ev_sta", "-44px", "#b8863b", "Breath")

-- ── The sigil of the Vale: an image asset shipped inside the package,
-- served from the profile filesystem. Sits left of the location label in
-- the top-right overlay cluster, clear of the console text. ──────────
ev.sigil = Geyser.Label:new({ name = "ev_sigil", x = "-318px", y = "6px", width = "48px", height = "48px" })
ev.sigil:setStyleSheet([[background-color: transparent;]])
setBackgroundImage("ev_sigil", getMudletHomeDir() .. "/embervale/sigil.svg")

-- ── Location label, top-right ───────────────────────────────────────
ev.loc = Geyser.Label:new({ name = "ev_loc", x = "-262px", y = "8px", width = "250px", height = "44px" })
ev.loc:setStyleSheet([[
    background-color: rgba(18,13,11,0.82);
    border: 1px solid #7a4222;
    border-radius: 4px;
    color: #f0e2d0;
    font-family: Georgia, serif;
    font-size: 13px;
    qproperty-alignment: 'AlignCenter';
]])

-- ── The Chronicle: a docked window streaming world events ───────────
openUserWindow("Chronicle")
setWindowWrap("Chronicle", 60)

-- ── Fake world data ─────────────────────────────────────────────────
local rooms = {
    "Cinder Gate", "The Ashen Bazaar", "Bridge of Sighs", "Emberdeep Stair",
    "The Caldera Rim", "Pilgrims' Rest", "Hall of Quiet Bells", "The Glassed Field",
}
local chronicle = {
    "<ansiRed>A tremor<reset> rolls through the deep. Dust falls from the vaults.",
    "<orange>An ember-moth<reset> circles the lantern, drawn to old heat.",
    "<ansiYellow>The bellringer<reset> counts the hour: none answer.",
    "<ansiCyan>A pilgrim<reset> whispers a name the mountain remembers.",
    "<orange>The forgefires<reset> gutter, then steady.",
    "<ansiMagenta>Something vast<reset> shifts beneath the Glassed Field.",
    "<ansiGreen>Rain<reset> hisses into steam before it lands.",
}

-- ── Simulation ──────────────────────────────────────────────────────
local hp, mn, sta = 84, 62, 91
local function drift(v)
    v = v + math.random(-7, 6)
    if v < 18 then v = 18 elseif v > 100 then v = 100 end
    return v
end

function ev.tick()
    hp, mn, sta = drift(hp), drift(mn), drift(sta)
    ev.hp:setValue(hp, 100, string.format("Vitality %d%%", hp))
    ev.mn:setValue(mn, 100, string.format("Emberflow %d%%", mn))
    ev.sta:setValue(sta, 100, string.format("Breath %d%%", sta))
    tempTimer(1.4, ev.tick)
end

function ev.wander()
    ev.loc:echo(string.format("<span style='color:#e2703a'>&#9650;</span>  %s", rooms[math.random(#rooms)]))
    tempTimer(6, ev.wander)
end

function ev.chronicle()
    cecho("Chronicle", "\n<grey>" .. os.date("%H:%M") .. "<reset>  " .. chronicle[math.random(#chronicle)])
    tempTimer(4.5, ev.chronicle)
end

-- ── Toolbar bridge: the "Roll d20" brand button raises this event ───
registerAnonymousEventHandler("embervale.roll", function(_, sides)
    sides = tonumber(sides) or 20
    local n = math.random(sides)
    cecho(string.format("\n<orange>The bones of the mountain speak: <b>%d</b><reset> <grey>(d%d)\n", n, sides))
end)

-- ── Welcome ─────────────────────────────────────────────────────────
cecho([[

<orange>        E M B E R V A L E<reset>
<grey>     the ashes remember<reset>

<ansiWhite>You stand at the Cinder Gate. The mountain breathes below;
its heartbeat is the only clock this city keeps.<reset>

<grey>This world is a demonstration — every gauge, label and window
you see is drawn by a bundled Lua package, no server attached.
Try the <reset><orange>Roll d20<reset><grey> button in the top bar.<reset>

]])

ev.tick()
ev.wander()
ev.chronicle()
