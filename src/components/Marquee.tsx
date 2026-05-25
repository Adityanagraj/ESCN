const ITEMS = [
  'HANDMADE IN ನಮ್ಮ ಬೆಂಗಳೂರು ❤️',
  'NEW DROP — IPL 2026 EDITION',
  'IPL 2025 CHAMPIONS EDITION',
  'LIMITED · NUMBERED · NEVER REPEATED',
  'SHIPPING ACROSS INDIA',
  'EE SALA CUP NAMDE',
  'TOP NOTCH CRAFTSMANSHIP GUARANTEED'
]

function Row() {
  return (
    <div className="flex items-center gap-10 sm:gap-14 px-5 sm:px-7">
      {ITEMS.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex items-center gap-10 sm:gap-14 font-display tracking-[0.18em] text-white text-xl sm:text-2xl uppercase whitespace-nowrap"
        >
          {item}
          <span className="inline-block w-2 h-2 rounded-full bg-rcb-gold" />
        </span>
      ))}
    </div>
  )
}

export function Marquee() {
  return (
    <div className="relative w-full bg-rcb-red py-4 sm:py-5 overflow-hidden border-y border-rcb-red-deep">
      <div className="rcb-marquee-track flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  )
}
