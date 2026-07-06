# Embervale

A **fictional MUD** used as the [mudix](https://github.com/Delwing/mudix) white-label
showcase. Everything here is brand configuration: a custom landing (caldera night,
rising embers), a custom `ember` theme (default, picker limited to two), a restyled
toolbar with a brand button (`Roll d20` → raises a Lua event), and a bundled Lua
package that draws the whole "game" UI — vitals gauges, a location label, the
Chronicle window — simulated client-side with no server attached.

```bash
yarn            # installs mudix from mudix.tgz
yarn build      # packs pkg/ into embervale.mpackage + builds the app
yarn preview    # or: yarn dev
```

License: GPL-2.0-or-later (mudix bundles Mudlet's GPL Lua).
