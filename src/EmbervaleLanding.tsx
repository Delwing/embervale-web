import { useState, type FormEvent } from 'react';
import { setSessionCredentials, type LandingProps } from 'mudix';
import './landing.css';

/**
 * Embervale's gate — a fully custom landing. "Enter the Vale" opens the
 * profile offline (the demo world is drawn by the bundled package, no server
 * attached); each character name keeps its own profile.
 */
export function EmbervaleLanding({ openProfile, ensureBrandProfile, openSettings }: LandingProps) {
    const [name, setName] = useState('');

    const enter = (e?: FormEvent) => {
        e?.preventDefault();
        const id = ensureBrandProfile(name);
        setSessionCredentials(id, { account: name.trim(), password: '' });
        openProfile(id, false);
    };

    return (
        <div className="ev-landing">
            <Caldera />

            <button type="button" className="ev-settings" onClick={openSettings}>
                settings
            </button>

            <main className="ev-panel">
                <p className="ev-eyebrow">a world that does not exist</p>
                <h1 className="ev-wordmark">Embervale</h1>
                <p className="ev-tagline">The ashes remember.</p>

                <form className="ev-form" onSubmit={enter}>
                    <label className="ev-field">
                        <span>Name your wanderer</span>
                        <input
                            name="username"
                            autoComplete="off"
                            spellCheck={false}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Ashka"
                            autoFocus
                        />
                    </label>
                    <button type="submit" className="ev-enter">Enter the Vale</button>
                    <p className="ev-note">
                        A demonstration world — the interface you are about to see is drawn
                        entirely by scripts, in your browser.
                    </p>
                </form>
            </main>

            <footer className="ev-footer">
                <span>Embervale is fiction</span>
                <span aria-hidden="true">·</span>
                <a href="https://github.com/Delwing/mudix" target="_blank" rel="noreferrer">built on mudix</a>
            </footer>
        </div>
    );
}

/** The caldera at night: dull red glow behind the rim, a watching spire, and
 *  embers drifting up — the only motion on the page. */
function Caldera() {
    // Deterministic pseudo-random ember placement (no Math.random — stable
    // across renders, StrictMode-safe).
    const embers = Array.from({ length: 18 }, (_, i) => {
        const h = (i * 2654435761) % 1000;
        return {
            left: `${(h % 90) + 5}%`,
            delay: `${(h % 700) / 100}s`,
            duration: `${7 + (h % 500) / 100}s`,
            size: 1.5 + (h % 3),
        };
    });
    return (
        <div className="ev-scene" aria-hidden="true">
            <svg className="ev-caldera" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
                <defs>
                    <linearGradient id="ev-sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#0c0a09" />
                        <stop offset="0.62" stopColor="#151010" />
                        <stop offset="0.86" stopColor="#2e1712" />
                        <stop offset="1" stopColor="#4a1f12" />
                    </linearGradient>
                    <linearGradient id="ev-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#e2703a" stopOpacity="0" />
                        <stop offset="1" stopColor="#e2703a" stopOpacity="0.55" />
                    </linearGradient>
                </defs>
                <rect width="1600" height="900" fill="url(#ev-sky)" />
                <ellipse cx="800" cy="880" rx="900" ry="220" fill="url(#ev-glow)" />
                {/* far rim */}
                <path fill="#1b1210" d="M0 700 L120 660 L260 690 L400 640 L540 685 L700 630 L860 680 L1020 645 L1180 690 L1330 655 L1470 685 L1600 650 L1600 900 L0 900 Z" />
                {/* the spire */}
                <path fill="#0e0a09" d="M1050 760 L1080 470 L1092 430 L1099 462 L1104 445 L1112 475 L1140 760 Z" />
                <circle cx="1096" cy="452" r="3.4" fill="#e2703a" className="ev-spire-light" />
                {/* near rim */}
                <path fill="#0a0807" d="M0 810 L150 770 L300 805 L470 755 L640 800 L820 750 L990 795 L1160 760 L1340 800 L1500 765 L1600 790 L1600 900 L0 900 Z" />
            </svg>
            <div className="ev-embers">
                {embers.map((e, i) => (
                    <span
                        key={i}
                        className="ev-ember"
                        style={{
                            left: e.left,
                            width: e.size,
                            height: e.size,
                            animationDelay: e.delay,
                            animationDuration: e.duration,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
