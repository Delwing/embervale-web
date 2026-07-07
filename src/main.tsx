import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@delwing/mudix/styles.css';
import { MudixApp } from '@delwing/mudix';
import { EmbervaleLanding } from './EmbervaleLanding';
import embervalePkg from './packages/embervale.mpackage?url';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MudixApp brand={{
            appName: 'Embervale',
            tagline: 'The ashes remember.',
            aboutText:
                'Embervale is a fictional MUD — a demonstration of the mudix white-label client. ' +
                'The world you see is drawn entirely by a bundled Lua package: gauges, labels, ' +
                'windows and events, all running in your browser with no server attached.',
            repoUrl: undefined,
            mud: { mode: 'mud', host: 'embervale.example', port: 4000 },
            profileMode: 'perLogin',
            stockPackages: false,
            packages: [
                { name: 'embervale', filename: 'embervale.mpackage', url: embervalePkg, version: '1.2', removable: false },
            ],
            themes: [{
                id: 'ember',
                label: 'Ember',
                variables: {
                    '--accent': '#e2703a',
                    '--accent-dim': '#8a4222',
                    '--accent-glow': 'rgba(226, 112, 58, 0.18)',
                    '--accent-focus': 'rgba(226, 112, 58, 0.30)',
                    '--bg': '#0c0a09',
                    '--bg-surface': '#121010',
                    '--bg-input': '#1a1512',
                    '--border': '#382c24',
                    '--text': '#ddd3c6',
                    '--text-dim': '#7d6f61',
                },
            }],
            defaultTheme: 'ember',
            availableThemes: ['ember', 'dark'],
            toolbar: {
                hide: ['reportBug'],
                className: 'ev-toolbar',
                buttons: [{
                    id: 'roll',
                    label: 'Roll d20',
                    title: 'Ask the mountain',
                    onClick: ctx => ctx.raiseEvent('embervale.roll', 20),
                }],
            },
            Landing: EmbervaleLanding,
        }} />
    </StrictMode>,
);
