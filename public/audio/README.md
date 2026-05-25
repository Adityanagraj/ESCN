# PLAY BOLD — Audio assets

Drop **three** tracks here with these exact filenames:

- `anthem-1.mp3`
- `anthem-2.mp3`
- `anthem-3.mp3`

On every fresh page load, one of the three is picked at random and used by
both the splash sound button and the floating page toggle. A hard reload
re-rolls the pick, so returning visitors hear variety.

If you only have one or two tracks ready, you can duplicate the same file
across all three filenames temporarily — the picker still works, it just
plays the same audio every time until you swap in the others.

## What to use

The official RCB anthem (“We Are Challengers / Game for Life / Play Bold”) is
copyrighted by Royal Challengers Bengaluru and its label. You CANNOT host it
directly on a commercial site without a sync licence. Three legitimate options:

1. **A short instrumental stinger (recommended).** A 3–6 second drum + roar +
   chant intro — the splash is only ~2 s, so a tight stinger fits perfectly and
   carries no lyric/melody copyright. Tools: Logic / GarageBand / royalty-free
   marketplaces like **Artlist**, **Epidemic Sound**, **Soundstripe**.

2. **Royalty-free / Creative Commons cricket-stadium ambience.** Free options:
   - https://pixabay.com/sound-effects/search/cricket-stadium/
   - https://freesound.org/search/?q=stadium+cheer
   Layer a short drum beat over a stadium roar for an "EE SALA CUP NAMDE" vibe.

3. **Pay a producer.** Fiverr / Soundbetter — a custom 5-second sting is
   typically ₹ 500 – 2,000 INR and you fully own it.

## File format and size

- **Format:** `.mp3` (broadest browser support; iOS Safari included).
- **Length:** **2 – 6 seconds**. The splash auto-dismisses around 2.4 s.
- **Bitrate:** 128 kbps mono or 160 kbps stereo — keeps file size under 100 KB.
- **Peak level:** −3 dBFS or lower. Avoid clipping. Mix as if it’ll play through
  a phone speaker.
- **No long fade-in / fade-out** — the splash component fades audio in/out for
  you in JS. Your file should start punchy.

## Optional: fallback / multi-format

If you want broader compatibility (older Android, some embedded webviews), you
can also drop `anthem.ogg` and the splash will pick the first format the
browser supports. Update `LoadingSplash.tsx` to add the extra `<source>` if you
do.

## Final checklist before going live

- [ ] You own / have licensed the audio
- [ ] File is ≤ 200 KB
- [ ] Plays cleanly when previewed in `public/audio/`
- [ ] Tested on iPhone Safari and Android Chrome
- [ ] No DMCA / copyright complaint risk on YouTube embeds, social shares, etc.
