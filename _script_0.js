

window.addEventListener("error", event => {
    try {
        console.error("Zoo Pet World JS error:", event.message, event.error);
        if (typeof message !== "undefined" && message) {
            message.textContent = t('error.game', {msg: event.message});
        }
    } catch (_) {}
});

const animalSvg = {
    lion: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#FFF3C4"/><circle cx="120" cy="124" r="76" fill="#C7771A"/><circle cx="120" cy="124" r="57" fill="#F6B24A"/><circle cx="90" cy="121" r="9" fill="#2B2118"/><circle cx="150" cy="121" r="9" fill="#2B2118"/><ellipse cx="120" cy="138" rx="16" ry="12" fill="#3B2A1A"/><path d="M102 158 Q120 173 138 158" fill="none" stroke="#3B2A1A" stroke-width="7" stroke-linecap="round"/><path d="M120 145 L111 157 M120 145 L129 157" stroke="#3B2A1A" stroke-width="5" stroke-linecap="round"/><circle cx="94" cy="144" r="11" fill="#F8C97E" opacity=".7"/><circle cx="146" cy="144" r="11" fill="#F8C97E" opacity=".7"/></svg>`,
    panda: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#E0F2FE"/><circle cx="76" cy="82" r="28" fill="#222"/><circle cx="164" cy="82" r="28" fill="#222"/><circle cx="120" cy="127" r="72" fill="#fff"/><ellipse cx="93" cy="123" rx="24" ry="30" fill="#222" transform="rotate(-24 93 123)"/><ellipse cx="147" cy="123" rx="24" ry="30" fill="#222" transform="rotate(24 147 123)"/><circle cx="98" cy="120" r="7" fill="#fff"/><circle cx="142" cy="120" r="7" fill="#fff"/><ellipse cx="120" cy="145" rx="16" ry="11" fill="#222"/><path d="M104 162 Q120 174 136 162" fill="none" stroke="#222" stroke-width="7" stroke-linecap="round"/></svg>`,
    fox: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#FFE8D6"/><path d="M56 101 L82 45 L106 94 Z" fill="#F97316"/><path d="M184 101 L158 45 L134 94 Z" fill="#F97316"/><path d="M75 90 L84 66 L97 90 Z" fill="#FFD3B6"/><path d="M165 90 L156 66 L143 90 Z" fill="#FFD3B6"/><circle cx="120" cy="126" r="72" fill="#FB923C"/><path d="M63 117 Q120 201 177 117 Q151 188 120 198 Q89 188 63 117Z" fill="#FFFFFF"/><circle cx="94" cy="116" r="9" fill="#2B2118"/><circle cx="146" cy="116" r="9" fill="#2B2118"/><ellipse cx="120" cy="143" rx="15" ry="11" fill="#2B2118"/><path d="M105 159 Q120 170 135 159" fill="none" stroke="#2B2118" stroke-width="6" stroke-linecap="round"/></svg>`,
    elephant: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#DBEAFE"/><circle cx="74" cy="124" r="42" fill="#A5B4FC"/><circle cx="166" cy="124" r="42" fill="#A5B4FC"/><circle cx="120" cy="116" r="66" fill="#C4B5FD"/><path d="M106 143 Q122 154 113 177 Q107 194 125 197 Q148 200 151 174" fill="none" stroke="#C4B5FD" stroke-width="27" stroke-linecap="round"/><circle cx="94" cy="111" r="8" fill="#1F2937"/><circle cx="146" cy="111" r="8" fill="#1F2937"/><path d="M80 141 Q59 150 57 169" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/><path d="M160 141 Q181 150 183 169" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/></svg>`,
    giraffe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#FEF3C7"/><path d="M102 188 V92 Q102 54 132 54 Q161 54 157 94 L148 188 Z" fill="#FBBF24"/><circle cx="134" cy="84" r="43" fill="#FBBF24"/><path d="M113 42 V22 M150 42 V22" stroke="#8B5A2B" stroke-width="10" stroke-linecap="round"/><circle cx="113" cy="20" r="8" fill="#8B5A2B"/><circle cx="150" cy="20" r="8" fill="#8B5A2B"/><circle cx="119" cy="79" r="7" fill="#1F2937"/><circle cx="151" cy="79" r="7" fill="#1F2937"/><ellipse cx="137" cy="101" rx="19" ry="13" fill="#F59E0B"/><circle cx="121" cy="112" r="9" fill="#A16207"/><circle cx="151" cy="133" r="11" fill="#A16207"/><circle cx="124" cy="159" r="10" fill="#A16207"/><circle cx="145" cy="58" r="8" fill="#A16207"/></svg>`,
    monkey: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#FDE68A"/><circle cx="74" cy="113" r="28" fill="#8B5A2B"/><circle cx="166" cy="113" r="28" fill="#8B5A2B"/><circle cx="120" cy="122" r="66" fill="#9A641F"/><ellipse cx="120" cy="140" rx="48" ry="38" fill="#F3C48A"/><circle cx="96" cy="116" r="9" fill="#1F2937"/><circle cx="144" cy="116" r="9" fill="#1F2937"/><ellipse cx="120" cy="139" rx="13" ry="9" fill="#5B3514"/><path d="M103 158 Q120 170 137 158" fill="none" stroke="#5B3514" stroke-width="7" stroke-linecap="round"/></svg>`,
    tiger: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#FFEDD5"/><path d="M63 104 L82 54 L109 91 Z" fill="#F97316"/><path d="M177 104 L158 54 L131 91 Z" fill="#F97316"/><circle cx="120" cy="126" r="72" fill="#FB923C"/><path d="M82 87 L102 112 M158 87 L138 112 M76 127 L101 134 M164 127 L139 134" stroke="#1F2937" stroke-width="8" stroke-linecap="round"/><circle cx="94" cy="121" r="8" fill="#1F2937"/><circle cx="146" cy="121" r="8" fill="#1F2937"/><ellipse cx="120" cy="145" rx="17" ry="12" fill="#FFF7ED"/><path d="M120 143 L111 154 H129 Z" fill="#1F2937"/><path d="M104 161 Q120 173 136 161" fill="none" stroke="#1F2937" stroke-width="6" stroke-linecap="round"/></svg>`,
    koala: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#E5E7EB"/><circle cx="72" cy="91" r="36" fill="#9CA3AF"/><circle cx="168" cy="91" r="36" fill="#9CA3AF"/><circle cx="120" cy="126" r="70" fill="#D1D5DB"/><circle cx="94" cy="119" r="8" fill="#111827"/><circle cx="146" cy="119" r="8" fill="#111827"/><ellipse cx="120" cy="141" rx="21" ry="17" fill="#111827"/><path d="M104 164 Q120 176 136 164" fill="none" stroke="#111827" stroke-width="7" stroke-linecap="round"/><circle cx="90" cy="143" r="12" fill="#FBCFE8" opacity=".7"/><circle cx="150" cy="143" r="12" fill="#FBCFE8" opacity=".7"/></svg>`,
    rabbit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#FCE7F3"/><ellipse cx="91" cy="65" rx="23" ry="58" fill="#F9FAFB" transform="rotate(-12 91 65)"/><ellipse cx="149" cy="65" rx="23" ry="58" fill="#F9FAFB" transform="rotate(12 149 65)"/><ellipse cx="91" cy="65" rx="10" ry="40" fill="#FFC7D1" transform="rotate(-12 91 65)"/><ellipse cx="149" cy="65" rx="10" ry="40" fill="#FFC7D1" transform="rotate(12 149 65)"/><circle cx="120" cy="132" r="70" fill="#FFFFFF"/><circle cx="94" cy="124" r="9" fill="#222"/><circle cx="146" cy="124" r="9" fill="#222"/><ellipse cx="120" cy="142" rx="12" ry="9" fill="#FF8FA3"/><path d="M108 157 Q120 168 132 157" fill="none" stroke="#555" stroke-width="6" stroke-linecap="round"/></svg>`,
    frog: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#DCFCE7"/><circle cx="82" cy="86" r="31" fill="#86C232"/><circle cx="158" cy="86" r="31" fill="#86C232"/><circle cx="120" cy="132" r="72" fill="#8BD346"/><circle cx="82" cy="86" r="17" fill="#FFFFFF"/><circle cx="158" cy="86" r="17" fill="#FFFFFF"/><circle cx="86" cy="90" r="8" fill="#222"/><circle cx="154" cy="90" r="8" fill="#222"/><path d="M82 154 Q120 184 158 154" fill="none" stroke="#2F6B17" stroke-width="8" stroke-linecap="round"/></svg>`,
    parrot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#DBEAFE"/><ellipse cx="119" cy="126" rx="56" ry="68" fill="#22C55E"/><path d="M86 91 Q118 42 153 91 Q123 79 86 91Z" fill="#EF4444"/><circle cx="105" cy="105" r="9" fill="#111827"/><circle cx="142" cy="105" r="9" fill="#111827"/><path d="M124 121 Q153 116 164 132 Q145 138 124 121Z" fill="#FACC15"/><path d="M75 139 Q43 150 56 185 Q92 175 102 145Z" fill="#38BDF8"/><path d="M153 139 Q191 149 178 187 Q139 174 139 145Z" fill="#8B5CF6"/></svg>`,
    zebra: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#F8FAFC"/><path d="M62 104 L82 54 L108 92 Z" fill="#F8FAFC"/><path d="M178 104 L158 54 L132 92 Z" fill="#F8FAFC"/><circle cx="120" cy="126" r="72" fill="#F8FAFC"/><path d="M86 68 L105 110 M121 55 L121 105 M154 69 L136 110 M72 119 L102 126 M168 119 L138 126 M83 158 L109 143 M157 158 L131 143" stroke="#111827" stroke-width="9" stroke-linecap="round"/><circle cx="94" cy="121" r="8" fill="#111827"/><circle cx="146" cy="121" r="8" fill="#111827"/><ellipse cx="120" cy="146" rx="20" ry="13" fill="#E5E7EB"/><path d="M105 162 Q120 173 135 162" fill="none" stroke="#111827" stroke-width="6" stroke-linecap="round"/></svg>`,
    penguin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#DBEAFE"/><ellipse cx="120" cy="126" rx="65" ry="75" fill="#111827"/><ellipse cx="120" cy="141" rx="45" ry="52" fill="#F8FAFC"/><circle cx="96" cy="104" r="8" fill="#fff"/><circle cx="144" cy="104" r="8" fill="#fff"/><circle cx="96" cy="104" r="4" fill="#111827"/><circle cx="144" cy="104" r="4" fill="#111827"/><path d="M120 119 L104 132 H136 Z" fill="#F97316"/><path d="M87 192 Q105 179 119 195" fill="#F97316"/><path d="M153 192 Q135 179 121 195" fill="#F97316"/></svg>`,
    hippo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#EDE9FE"/><circle cx="80" cy="91" r="23" fill="#A78BFA"/><circle cx="160" cy="91" r="23" fill="#A78BFA"/><circle cx="120" cy="126" r="72" fill="#C4B5FD"/><ellipse cx="120" cy="150" rx="52" ry="34" fill="#DDD6FE"/><circle cx="95" cy="118" r="8" fill="#1F2937"/><circle cx="145" cy="118" r="8" fill="#1F2937"/><circle cx="103" cy="150" r="6" fill="#7C3AED"/><circle cx="137" cy="150" r="6" fill="#7C3AED"/><path d="M94 168 Q120 184 146 168" fill="none" stroke="#5B21B6" stroke-width="7" stroke-linecap="round"/></svg>`,
    owl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#FEF3C7"/><path d="M67 77 Q120 28 173 77 V144 Q173 198 120 198 Q67 198 67 144Z" fill="#A16207"/><circle cx="96" cy="116" r="28" fill="#FDE68A"/><circle cx="144" cy="116" r="28" fill="#FDE68A"/><circle cx="96" cy="116" r="11" fill="#111827"/><circle cx="144" cy="116" r="11" fill="#111827"/><path d="M120 126 L105 146 H135 Z" fill="#F97316"/><path d="M86 77 L68 48 L105 66 Z" fill="#A16207"/><path d="M154 66 L172 48 L154 84 Z" fill="#A16207"/><path d="M92 162 Q120 178 148 162" fill="none" stroke="#78350F" stroke-width="7" stroke-linecap="round"/></svg>`,
    bear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#FDE68A"/><circle cx="75" cy="85" r="29" fill="#92400E"/><circle cx="165" cy="85" r="29" fill="#92400E"/><circle cx="120" cy="128" r="72" fill="#B45309"/><ellipse cx="120" cy="148" rx="42" ry="33" fill="#FCD34D"/><circle cx="94" cy="119" r="8" fill="#111827"/><circle cx="146" cy="119" r="8" fill="#111827"/><ellipse cx="120" cy="142" rx="16" ry="11" fill="#111827"/><path d="M103 162 Q120 174 137 162" fill="none" stroke="#111827" stroke-width="7" stroke-linecap="round"/></svg>`,
    deer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#FEF3C7"/><path d="M85 80 L66 47 M80 58 L59 58 M155 80 L174 47 M160 58 L181 58" stroke="#7C2D12" stroke-width="9" stroke-linecap="round"/><path d="M65 103 L82 58 L108 95 Z" fill="#B45309"/><path d="M175 103 L158 58 L132 95 Z" fill="#B45309"/><circle cx="120" cy="127" r="70" fill="#D97706"/><path d="M77 98 Q120 137 163 98 Q153 185 120 194 Q87 185 77 98Z" fill="#FED7AA"/><circle cx="95" cy="119" r="8" fill="#111827"/><circle cx="145" cy="119" r="8" fill="#111827"/><ellipse cx="120" cy="145" rx="15" ry="11" fill="#7C2D12"/><path d="M104 162 Q120 174 136 162" fill="none" stroke="#7C2D12" stroke-width="6" stroke-linecap="round"/></svg>`,
    raccoon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#E5E7EB"/><path d="M61 104 L83 54 L109 94 Z" fill="#6B7280"/><path d="M179 104 L157 54 L131 94 Z" fill="#6B7280"/><circle cx="120" cy="127" r="72" fill="#9CA3AF"/><path d="M65 120 Q120 85 175 120 Q155 155 120 155 Q85 155 65 120Z" fill="#374151"/><circle cx="95" cy="121" r="8" fill="#fff"/><circle cx="145" cy="121" r="8" fill="#fff"/><ellipse cx="120" cy="146" rx="16" ry="11" fill="#111827"/><path d="M104 163 Q120 174 136 163" fill="none" stroke="#111827" stroke-width="6" stroke-linecap="round"/></svg>`,
    turtle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="#DCFCE7"/><ellipse cx="120" cy="132" rx="72" ry="55" fill="#15803D"/><ellipse cx="120" cy="132" rx="50" ry="39" fill="#22C55E"/><path d="M120 93 V171 M82 132 H158 M94 105 L146 159 M146 105 L94 159" stroke="#166534" stroke-width="6" stroke-linecap="round"/><circle cx="120" cy="72" r="31" fill="#86EFAC"/><circle cx="108" cy="67" r="6" fill="#111827"/><circle cx="132" cy="67" r="6" fill="#111827"/><path d="M108 82 Q120 92 132 82" fill="none" stroke="#166534" stroke-width="5" stroke-linecap="round"/></svg>`

};

function svgUrl(svg) {
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}
const animalRasterMap = {
    lion: "assets/inline/asset_001_5b81d7e8e7a4.png",
    panda: "assets/inline/asset_002_6ff1be0e1e60.png",
    fox: "assets/inline/asset_003_2ec5970d8253.png",
    elephant: "assets/inline/asset_004_a2b4eb40416a.png",
    giraffe: "assets/inline/asset_005_0d88a36f880c.png",
    monkey: "assets/inline/asset_006_af407615df0a.png",
    tiger: "assets/inline/asset_007_0b1a684dae78.png",
    koala: "assets/inline/asset_008_c1b26ebe249e.png",
    rabbit: "assets/inline/asset_009_85d66270b3c2.png",
    frog: "assets/inline/asset_010_1a0bbeda6ad9.png",
    zebra: "assets/inline/asset_011_5787c95e6e0a.png",
    penguin: "assets/inline/asset_012_2c7a1d7b86cc.png",
    hippo: "assets/inline/asset_013_336f90b013fb.png",
    owl: "assets/inline/asset_014_5c6ea656b1e5.png",
    bear: "assets/inline/asset_015_6a237759ad26.png",
    deer: "assets/inline/asset_016_6587e7906779.png",
    raccoon: "assets/inline/asset_017_4da6e695f3e2.png",
    turtle: "assets/inline/asset_018_7a2172f4fa64.png",
    parrot: "assets/inline/asset_019_1b14d5a21d38.png",
    dog: "assets/inline/asset_020_a51c900802ef.png",
    cat: "assets/inline/asset_021_c7027c25e2ba.png",
    cow: "assets/inline/asset_022_1c9d4d7bbea9.png",
    horse: "assets/inline/asset_023_1714d2f7eb50.png",
    camel: "assets/inline/asset_024_1a0fc01df891.png",
    sheep: "assets/inline/asset_025_82f476ab393a.png",
    goat: "assets/inline/asset_026_16dedacaf6f9.png",
    crocodile: "assets/inline/asset_027_ea82f78202b8.png",
    snake: "assets/inline/asset_028_cbb66eb616af.png",
    kangaroo: "assets/inline/asset_029_b5479bd5802c.png",
    dolphin: "assets/inline/asset_030_3a72f0fd71e4.png",
    whale: "assets/inline/asset_031_c78608ffcaa0.png",
    octopus: "assets/inline/asset_032_ed54065c651b.png",
    flamingo: "assets/inline/asset_033_9cfcc66f3255.png",
    chicken: "assets/inline/asset_034_2f3c55b42c3d.png",
    duck: "assets/inline/asset_035_08a6ec7deb35.png",
    wolf: "assets/inline/asset_036_2b681fb4d39d.png",
    squirrel: "assets/inline/asset_037_758ae32db08e.png",
    seal: "assets/inline/asset_038_26dcea6eb288.png",
    polarBear: "assets/inline/asset_039_92d0d0aecd1a.png",
    hedgehog: "assets/inline/asset_040_d1049761bca7.png",
    bat: "assets/inline/asset_041_59f5f92b2247.png"
};

function animalImageSrc(key) {
    return animalRasterMap[key] || (animalSvg[key] ? svgUrl(animalSvg[key]) : "");
}

const cleanedAnimalSpriteCache = new Map();

function getCleanAnimalSpriteSrc(key) {
    if (cleanedAnimalSpriteCache.has(key)) return cleanedAnimalSpriteCache.get(key);
    const originalSrc = animalImageSrc(key);
    if (!originalSrc || !String(originalSrc).startsWith("data:image/png")) {
        const ready = Promise.resolve(originalSrc);
        cleanedAnimalSpriteCache.set(key, ready);
        return ready;
    }

    const task = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth || img.width;
                canvas.height = img.naturalHeight || img.height;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                const width = canvas.width;
                const height = canvas.height;
                const originalAlpha = new Uint8ClampedArray(width * height);

                for (let y = 0; y < height; y += 1) {
                    for (let x = 0; x < width; x += 1) {
                        originalAlpha[y * width + x] = data[(y * width + x) * 4 + 3];
                    }
                }

                const alphaAt = (arr, x, y) => {
                    if (x < 0 || y < 0 || x >= width || y >= height) return 0;
                    return arr[y * width + x];
                };

                const transparentNeighbors = (arr, x, y) => {
                    let count = 0;
                    for (let oy = -1; oy <= 1; oy += 1) {
                        for (let ox = -1; ox <= 1; ox += 1) {
                            if (!ox && !oy) continue;
                            if (alphaAt(arr, x + ox, y + oy) < 10) count += 1;
                        }
                    }
                    return count;
                };

                const nextAlpha = new Uint8ClampedArray(originalAlpha);

                for (let y = 0; y < height; y += 1) {
                    for (let x = 0; x < width; x += 1) {
                        const px = y * width + x;
                        const i = px * 4;
                        const a = originalAlpha[px];
                        if (!a) continue;

                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        const max = Math.max(r, g, b);
                        const min = Math.min(r, g, b);
                        const luma = (r * 0.299) + (g * 0.587) + (b * 0.114);
                        const chroma = max - min;
                        const edgeOpen = transparentNeighbors(originalAlpha, x, y);
                        const lowChroma = chroma < 68;

                        let newA = a;
                        if (edgeOpen >= 1 && lowChroma && luma > 238) {
                            newA = 0;
                        } else if (edgeOpen >= 1 && lowChroma && luma > 222) {
                            newA = Math.round(a * 0.04);
                        } else if (edgeOpen >= 1 && lowChroma && luma > 198) {
                            newA = Math.round(a * 0.11);
                        } else if (edgeOpen >= 1 && lowChroma && luma > 176) {
                            newA = Math.round(a * 0.22);
                        } else if (edgeOpen >= 2 && a < 255) {
                            newA = Math.round(a * 0.42);
                        } else if (edgeOpen >= 1 && a < 255) {
                            newA = Math.round(a * 0.62);
                        }
                        nextAlpha[px] = Math.max(0, Math.min(255, newA));
                    }
                }

                for (let y = 0; y < height; y += 1) {
                    for (let x = 0; x < width; x += 1) {
                        const px = y * width + x;
                        const i = px * 4;
                        const a = nextAlpha[px];
                        if (!a) {
                            data[i + 3] = 0;
                            continue;
                        }
                        let aroundTransparent = 0;
                        for (let oy = -1; oy <= 1; oy += 1) {
                            for (let ox = -1; ox <= 1; ox += 1) {
                                if (!ox && !oy) continue;
                                if (alphaAt(nextAlpha, x + ox, y + oy) < 10) aroundTransparent += 1;
                            }
                        }
                        if (aroundTransparent >= 2 && a < 220) {
                            data[i + 3] = Math.round(a * 0.72);
                        } else {
                            data[i + 3] = a;
                        }
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            } catch (error) {
                console.warn('Clean sprite fallback used for', key, error);
                resolve(originalSrc);
            }
        };
        img.onerror = () => resolve(originalSrc);
        img.src = originalSrc;
    });

    cleanedAnimalSpriteCache.set(key, task);
    return task;
}

function applyCleanSpriteToMount(mount, key) {


    const sprite = mount?.querySelector?.('.pet-stage-sprite');
    if (!sprite || sprite.tagName !== 'IMG') return;
    const fallbackSrc = animalImageSrc(key);
    sprite.src = fallbackSrc;
    getCleanAnimalSpriteSrc(key).then((cleanSrc) => {
        if (!sprite.isConnected) return;
        sprite.src = cleanSrc || fallbackSrc;
    });
}


const animalSleepEyeCoords = {"lion": [[163, 68, 12], [206, 68, 11]], "panda": [[65, 72, 12], [100, 72, 12]], "fox": [[41.5, 68.5, 10], [76.5, 64.5, 10]], "elephant": [[130, 78, 11], [195, 82, 11]], "giraffe": [[77, 85, 10]], "monkey": [[98, 90, 10], [133, 91, 10]], "tiger": [[65.5, 58.0, 11], [102.0, 59.5, 12]], "koala": [[96, 78, 11], [126, 80, 11]], "rabbit": [[47.5, 81.5, 6], [81.5, 78.5, 6]], "frog": [[51.5, 38.0, 17], [101.5, 45.0, 17]], "zebra": [[35.0, 51.0, 11], [57.5, 51.0, 10]], "penguin": [[81.5, 53.5, 12], [102.5, 54.5, 12]], "hippo": [[95.0, 44.5, 5], [121.0, 44.0, 5]], "owl": [[79.5, 53.5, 4], [105.0, 52.0, 3]], "bear": [[116.0, 50.0, 11], [151.0, 48.5, 11]], "deer": [[48.5, 58.0, 9], [81.0, 58.0, 11]], "raccoon": [[71.0, 79.5, 15], [90.0, 69.0, 11]], "turtle": [[150.5, 42.5, 12], [184.5, 42.0, 11]], "parrot": [[30.5, 36.0, 3], [53.5, 38.5, 10]], "dog": [[79.0, 41.0, 9], [101.5, 39.0, 13]], "cat": [[48.0, 65.0, 15], [84.5, 68.0, 16]], "cow": [[55, 74, 10], [86, 76, 10]], "horse": [[102, 88, 11]], "camel": [[87, 79, 10]], "sheep": [[52, 82, 12], [82, 79, 11]], "goat": [[77, 83, 10]], "crocodile": [[198, 66, 10]], "snake": [[132, 69, 10]], "kangaroo": [[43.5, 59.0, 7], [60.5, 60.0, 7]], "dolphin": [], "whale": [[173.5, 65.0, 5], [194.0, 64.5, 14]], "octopus": [[77.0, 37.5, 7], [115.0, 40.5, 9]], "flamingo": [[92, 63, 10]], "chicken": [[65.5, 54.0, 9], [83.0, 54.0, 9]], "duck": [[103, 77, 10]], "wolf": [[115, 73, 10]], "squirrel": [[29.5, 63.5, 8], [52.0, 65.5, 10]], "seal": [[90, 74, 10]], "polarBear": [[32.0, 48.5, 10], [62.0, 50.5, 10]], "hedgehog": [[63.5, 24.5, 6], [79.5, 25.0, 4]], "bat": [[84, 74, 10], [113, 74, 10]]};

function drawRoundedSleepEye(ctx, x, y, s, color) {
    const rx = Math.max(8, s * 1.45);
    const ry = Math.max(5, s * 0.9);

    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(25, 25, 25, .82)";
    ctx.lineWidth = Math.max(3, s * 0.28);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.ellipse(x, y + ry * 0.12, rx * 0.7, ry * 0.62, 0, Math.PI * 1.08, Math.PI * 1.92);
    ctx.stroke();

    ctx.restore();
}

function getCanvasSkinColor(ctx, x, y, radius) {
    try {
        const r = Math.max(6, Math.floor(radius));
        const sx = Math.max(0, Math.floor(x - r));
        const sy = Math.max(0, Math.floor(y - r));
        const sw = Math.max(1, Math.min(ctx.canvas.width - sx, r * 2));
        const sh = Math.max(1, Math.min(ctx.canvas.height - sy, r * 2));
        const data = ctx.getImageData(sx, sy, sw, sh).data;
        let pixels = [];
        for (let i = 0; i < data.length; i += 4) {
            const a = data[i + 3];
            if (a < 20) continue;
            const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
            if (lum > 70) pixels.push([data[i], data[i + 1], data[i + 2]]);
        }
        if (!pixels.length) return "rgba(232, 204, 148, 1)";
        pixels.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]));
        const p = pixels[Math.floor(pixels.length * 0.55)];
        return `rgba(${p[0]}, ${p[1]}, ${p[2]}, 1)`;
    } catch (e) {
        return "rgba(232, 204, 148, 1)";
    }
}

function renderSleepSpriteCanvas(key, mount = petAnimatedCharacterMount) {
    const canvas = mount ? mount.querySelector("canvas.pet-stage-sleep-canvas") : null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const src = animalRasterMap[key] || "";
    const coords = animalSleepEyeCoords[key] || [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.88;
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const dx = (canvas.width - drawW) / 2;
        const dy = (canvas.height - drawH) / 2;

        ctx.drawImage(img, dx, dy, drawW, drawH);

        coords.forEach(item => {
            const x = dx + item[0] * scale;
            const y = dy + item[1] * scale;
            const s = Math.max(8, (item[2] || 10) * scale);
            const skin = getCanvasSkinColor(ctx, x, y, s * 2.1);
            drawRoundedSleepEye(ctx, x, y, s, skin);
        });
    };

    img.onerror = () => {
        const fallback = new Image();
        fallback.onload = () => ctx.drawImage(fallback, 0, 0, canvas.width, canvas.height);
        fallback.src = src;
    };

    img.src = src;
}


function makeAnimalSvg(bg, body, accent, face = "#111827", type = "round") {
    const ears = type === "ears"
        ? `<path d="M62 105 L82 55 L110 96 Z" fill="${body}"/><path d="M178 105 L158 55 L130 96 Z" fill="${body}"/>`
        : type === "horns"
        ? `<path d="M86 82 L70 42 M154 82 L170 42" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>`
        : type === "long"
        ? `<path d="M105 190 V82 Q105 48 132 48 Q159 48 154 88 L148 190 Z" fill="${body}"/>`
        : "";

    const extra = type === "fish"
        ? `<path d="M55 128 L25 98 V158 Z" fill="${accent}"/><ellipse cx="124" cy="128" rx="74" ry="49" fill="${body}"/><path d="M176 128 L211 96 V160 Z" fill="${accent}"/><circle cx="96" cy="116" r="8" fill="${face}"/><path d="M109 146 Q128 158 148 146" fill="none" stroke="${face}" stroke-width="6" stroke-linecap="round"/>`
        : type === "bird"
        ? `<ellipse cx="120" cy="130" rx="58" ry="68" fill="${body}"/><path d="M84 96 Q120 45 156 96 Q120 82 84 96Z" fill="${accent}"/><circle cx="101" cy="112" r="8" fill="${face}"/><circle cx="141" cy="112" r="8" fill="${face}"/><path d="M122 126 Q152 121 163 137 Q145 143 122 126Z" fill="#FACC15"/><path d="M78 142 Q42 151 56 188 Q92 178 104 148Z" fill="#38BDF8"/><path d="M158 142 Q198 153 182 190 Q143 178 138 148Z" fill="#8B5CF6"/>`
        : `${ears}<circle cx="120" cy="128" r="72" fill="${body}"/><ellipse cx="120" cy="150" rx="42" ry="32" fill="${accent}" opacity=".9"/><circle cx="94" cy="120" r="8" fill="${face}"/><circle cx="146" cy="120" r="8" fill="${face}"/><ellipse cx="120" cy="143" rx="15" ry="11" fill="${face}"/><path d="M104 162 Q120 174 136 162" fill="none" stroke="${face}" stroke-width="6" stroke-linecap="round"/>`;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" rx="48" fill="${bg}"/>${extra}</svg>`;
}



Object.assign(animalSvg, {
    dog: makeAnimalSvg("#FEF3C7", "#D97706", "#FCD34D", "#111827", "ears"),
    cat: makeAnimalSvg("#FCE7F3", "#F59E0B", "#FED7AA", "#111827", "ears"),
    cow: makeAnimalSvg("#F8FAFC", "#F9FAFB", "#111827", "#111827", "horns"),
    horse: makeAnimalSvg("#FEF3C7", "#92400E", "#FBBF24", "#111827", "long"),
    camel: makeAnimalSvg("#FFF7ED", "#D97706", "#FCD34D", "#111827", "long"),
    sheep: makeAnimalSvg("#F8FAFC", "#F9FAFB", "#E5E7EB", "#111827", "round"),
    goat: makeAnimalSvg("#F3F4F6", "#D1D5DB", "#F9FAFB", "#111827", "horns"),
    crocodile: makeAnimalSvg("#DCFCE7", "#16A34A", "#86EFAC", "#111827", "round"),
    snake: makeAnimalSvg("#ECFDF5", "#22C55E", "#BBF7D0", "#111827", "long"),
    kangaroo: makeAnimalSvg("#FFEDD5", "#C2410C", "#FDBA74", "#111827", "ears"),
    dolphin: makeAnimalSvg("#DBEAFE", "#38BDF8", "#BAE6FD", "#111827", "fish"),
    whale: makeAnimalSvg("#E0F2FE", "#2563EB", "#93C5FD", "#111827", "fish"),
    octopus: makeAnimalSvg("#FCE7F3", "#EC4899", "#F9A8D4", "#111827", "round"),
    flamingo: makeAnimalSvg("#FCE7F3", "#FB7185", "#FBCFE8", "#111827", "bird"),
    chicken: makeAnimalSvg("#FEF3C7", "#FDE68A", "#EF4444", "#111827", "bird"),
    duck: makeAnimalSvg("#E0F2FE", "#FACC15", "#FDE68A", "#111827", "bird"),
    wolf: makeAnimalSvg("#E5E7EB", "#6B7280", "#D1D5DB", "#111827", "ears"),
    squirrel: makeAnimalSvg("#FFEDD5", "#B45309", "#FDBA74", "#111827", "ears"),
    hedgehog: makeAnimalSvg("#FEF3C7", "#A16207", "#FDE68A", "#111827", "round"),
    bat: makeAnimalSvg("#EDE9FE", "#4C1D95", "#8B5CF6", "#F9FAFB", "round"),
    seal: makeAnimalSvg("#E0F2FE", "#64748B", "#CBD5E1", "#111827", "round"),
    polarBear: makeAnimalSvg("#EFF6FF", "#F8FAFC", "#DBEAFE", "#111827", "round")
});

const animalInfo = {
    lion: { name: "Лев", fact: "Львы часто живут группами, которые называют прайдами." },
    panda: { name: "Панда", fact: "Панды любят бамбук и проводят много времени за едой." },
    fox: { name: "Лисёнок", fact: "Лисы очень ловкие и хорошо слышат даже тихие звуки." },
    elephant: { name: "Слон", fact: "Слоны запоминают места и узнают своих друзей." },
    giraffe: { name: "Жираф", fact: "Жирафы — самые высокие наземные животные." },
    monkey: { name: "Обезьянка", fact: "Обезьяны любят играть и быстро учатся новому." },
    tiger: { name: "Тигр", fact: "У каждого тигра свой уникальный рисунок полос." },
    koala: { name: "Коала", fact: "Коалы много спят и живут на деревьях." },
    rabbit: { name: "Кролик", fact: "Кролики быстро бегают и любят прятаться." },
    frog: { name: "Лягушка", fact: "Лягушки умеют далеко прыгать и живут рядом с водой." },
    parrot: { name: "Попугай", fact: "Попугаи могут повторять звуки и любят яркие цвета." },
    zebra: { name: "Зебра", fact: "Полоски зебры помогают ей выделяться среди других животных." },
    penguin: { name: "Пингвин", fact: "Пингвины отлично плавают и живут большими группами." },
    hippo: { name: "Бегемот", fact: "Бегемоты любят воду и могут долго отдыхать в реке." },
    owl: { name: "Сова", fact: "Совы хорошо видят ночью и очень тихо летают." },
    bear: { name: "Медвежонок", fact: "Медведи сильные, но маленькие медвежата очень игривые." },
    deer: { name: "Олень", fact: "Олени быстро бегают и хорошо слышат лесные звуки." },
    raccoon: { name: "Енот", fact: "Еноты любопытные и ловко пользуются передними лапками." },
    turtle: { name: "Черепаха", fact: "Черепахи носят свой домик-панцирь всегда с собой." },
    dog: { name: "Собачка", fact: "Собаки любят играть и быстро запоминают команды." },
    cat: { name: "Котик", fact: "Кошки умеют тихо ходить и любят уютные места." },
    cow: { name: "Корова", fact: "Коровы узнают знакомые голоса и любят спокойствие." },
    horse: { name: "Лошадка", fact: "Лошади быстро бегают и хорошо чувствуют настроение человека." },
    camel: { name: "Верблюд", fact: "Верблюды могут долго идти по пустыне." },
    sheep: { name: "Овечка", fact: "Овечки держатся вместе и любят пастись на траве." },
    goat: { name: "Козочка", fact: "Козы ловко забираются на камни и холмы." },
    crocodile: { name: "Крокодил", fact: "Крокодилы отлично плавают и любят тёплые берега." },
    snake: { name: "Змейка", fact: "Змеи двигаются без лап и хорошо чувствуют вибрации." },
    kangaroo: { name: "Кенгуру", fact: "Кенгуру прыгают на сильных задних лапах." },
    dolphin: { name: "Дельфин", fact: "Дельфины очень умные и общаются звуками." },
    whale: { name: "Кит", fact: "Киты — огромные морские животные, которые красиво поют." },
    octopus: { name: "Осьминог", fact: "Осьминоги умеют менять цвет и прятаться." },
    flamingo: { name: "Фламинго", fact: "Фламинго часто стоят на одной ноге." },
    chicken: { name: "Цыплёнок", fact: "Цыплята быстро бегают за мамой-курочкой." },
    duck: { name: "Утёнок", fact: "Утки плавают по воде и любят нырять за едой." },
    wolf: { name: "Волчонок", fact: "Волки живут стаями и хорошо слышат." },
    squirrel: { name: "Белочка", fact: "Белки делают запасы орешков и ловко прыгают по деревьям." },
    hedgehog: { name: "Ёжик", fact: "Ёжики сворачиваются клубком, когда пугаются." },
    bat: { name: "Летучая мышь", fact: "Летучие мыши ориентируются в темноте с помощью звуков." },
    seal: { name: "Тюлень", fact: "Тюлени отлично плавают и отдыхают на льду или берегу." },
    polarBear: { name: "Белый мишка", fact: "Белые медведи живут в холодных краях и хорошо плавают." }
};

const animalKeys = ["lion", "panda", "fox", "elephant", "giraffe", "monkey", "tiger", "koala", "rabbit", "frog", "zebra", "penguin", "hippo", "owl", "bear", "deer", "raccoon", "turtle", "parrot", "dog", "cat", "cow", "horse", "camel", "sheep", "goat", "crocodile", "snake", "kangaroo", "dolphin", "whale", "octopus", "flamingo", "chicken", "duck", "wolf", "squirrel", "hedgehog", "bat", "seal", "polarBear"];
const animals = animalKeys.map(key => ({ key, image: animalImageSrc(key) }));

function warmAllCleanAnimalSprites() {
    const run = () => animalKeys.forEach((key, index) => {
        setTimeout(() => { try { getCleanAnimalSpriteSrc(key); } catch (_) {} }, index * 30);
    });
    if (window.requestIdleCallback) {
        requestIdleCallback(run, { timeout: 1200 });
    } else {
        setTimeout(run, 350);
    }
}

// warmAllCleanAnimalSprites() removed from startup — ran 41 canvas ops at launch
// and caused visible freeze on mobile. Sprites are generated on demand instead.


// cleanRoomSceneData moved to assets/js/features/cleanRoomScene.js
const animalRoomBackgroundMap = {
    lion: "lion",
    giraffe: "lion",
    zebra: "lion",
    deer: "lion",
    camel: "lion",
    horse: "lion",
    cow: "lion",
    panda: "panda",
    bear: "panda",
    koala: "panda",
    dog: "panda",
    cat: "panda",
    frog: "panda",
    rabbit: "rabbit",
    fox: "rabbit",
    raccoon: "rabbit",
    squirrel: "rabbit",
    hedgehog: "rabbit",
    chicken: "rabbit",
    duck: "rabbit",
    sheep: "rabbit",
    goat: "rabbit",
    kangaroo: "rabbit",
    elephant: "elephant",
    hippo: "elephant",
    turtle: "elephant",
    tiger: "tiger",
    wolf: "tiger",
    owl: "tiger",
    bat: "tiger",
    snake: "tiger",
    penguin: "penguin",
    seal: "penguin",
    polarBear: "penguin",
    whale: "penguin",
    dolphin: "penguin",
    octopus: "penguin",
    parrot: "parrot",
    monkey: "parrot",
    flamingo: "parrot",
    crocodile: "parrot"
};

function getAnimalRoomBackground(key) {
    const roomKey = animalRoomBackgroundMap[key] || "lion";
    return cleanRoomSceneData[roomKey] || cleanRoomSceneData.lion;
}

function applyCleanRoomBackground(element, key) {
    if (!element) return;
    const roomDataUrl = getAnimalRoomBackground(key);
    element.classList.add("clean-room-scene");
    element.style.setProperty("--clean-room-bg", `url("${roomDataUrl}")`);
    element.style.backgroundImage = `url("${roomDataUrl}")`;
    element.style.backgroundSize = "cover";
    element.style.backgroundPosition = "center";
    element.style.backgroundRepeat = "no-repeat";
}

const zooZones = [
    { name: "Вход в зоопарк", icon: "🎪", timeBonus: 0 },
    { name: "Солнечная саванна", icon: "🌞", timeBonus: 2 },
    { name: "Бамбуковый сад", icon: "🎍", timeBonus: 4 },
    { name: "Лесная тропа", icon: "🌲", timeBonus: 6 },
    { name: "Джунгли", icon: "🌴", timeBonus: 8 },
    { name: "Ферма друзей", icon: "🚜", timeBonus: 10 },
    { name: "Пустыня", icon: "🏜️", timeBonus: 12 },
    { name: "Речной берег", icon: "🏞️", timeBonus: 14 },
    { name: "Океанариум", icon: "🌊", timeBonus: 16 },
    { name: "Ночной зоопарк", icon: "🌙", timeBonus: 18 }
];


const rareAnimalNames = {
    lion: "Золотой лев",
    panda: "Радужная панда",
    tiger: "Ночной тигр",
    penguin: "Ледяной пингвин",
    fox: "Серебряный лисёнок",
    elephant: "Слон-праздник",
    giraffe: "Звёздный жираф",
    monkey: "Весёлая обезьянка",
    koala: "Сонная коала",
    parrot: "Попугай-салют"
};

function getLevelTypeLabel(type) {
    const labels = {
        classic: "Классика",
        preview: "Запомни карточки",
        noMistake: "Без ошибок",
        targetAnimal: "Найди главное животное",
        speed: "Быстрый уровень"
    };
    return labels[type] || "Классика";
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function buildLevel(levelNumber) {
    const zoneIndex = Math.min(zooZones.length - 1, Math.floor((levelNumber - 1) / 5));
    const zone = zooZones[zoneIndex];
    const animal = animalKeys[(levelNumber * 2 - 2) % animalKeys.length];

    const typeCycle = ["classic", "preview", "noMistake", "targetAnimal", "speed"];
    const type = typeCycle[(levelNumber - 1) % typeCycle.length];

    // Stage 4.6: memory теперь 50 уровней. Максимум — 10 пар / 20 карточек.
    // Сложность растёт плавно, чтобы поле всегда помещалось на экран без скролла.
    const difficultyStep = Math.floor((levelNumber - 1) / 6);
    const pairWave = [0, 0, 1, 1, 2, 2][(levelNumber - 1) % 6];
    const pairs = clamp(3 + difficultyStep + pairWave, 3, 10);

    // До 10 пар: 3, 4 или 5 колонок. Финал = 5x4 = 20 карточек.
    const cols = pairs <= 3 ? 3 : pairs <= 6 ? 4 : 5;

    // Таймер всё ещё меняется по уровню, типу, зоне и сложности.
    const timeWave = [0, -5, 4, -8, 7, -3, 5][(levelNumber - 1) % 7];
    const typeTimeMod = {
        classic: 0,
        preview: 6,
        noMistake: 4,
        targetAnimal: -3,
        speed: -12
    }[type] || 0;

    const zoneBonus = zone.timeBonus;
    const latePenalty = Math.floor((levelNumber - 1) / 10) * 3;
    const rawTime = 28 + pairs * 7 + zoneBonus + timeWave + typeTimeMod - latePenalty;
    const time = clamp(rawTime, 32, 105);

    const unlock = [];
    unlock.push(animal);

    const secondAnimal = animalKeys[(levelNumber * 3 + 1) % animalKeys.length];
    if (!unlock.includes(secondAnimal) && levelNumber % 3 === 0) unlock.push(secondAnimal);

    return {
        title: `${zone.icon} ${zone.name} ${((levelNumber - 1) % 5) + 1}/5`,
        animal,
        pairs,
        time,
        cols,
        reward: 8 + Math.floor(levelNumber * 1.7),
        unlock,
        levelNumber,
        zoneName: zone.name,
        zoneIcon: zone.icon,
        type,
        rareReward: levelNumber % 10 === 0 ? `rare_${animal}` : null
    };
}

const levels = Array.from({ length: 50 }, (_, index) => buildLevel(index + 1));

const skins = [
    { id: "rainbow", title: "Радуга", price: 0, colors: ["#7c3aed", "#ec4899", "#f97316"] },
    { id: "jungle", title: "Джунгли", price: 30, colors: ["#166534", "#22c55e", "#facc15"] },
    { id: "ocean", title: "Океан", price: 45, colors: ["#0ea5e9", "#2563eb", "#8b5cf6"] },
    { id: "candy", title: "Конфеты", price: 60, colors: ["#fb7185", "#f9a8d4", "#facc15"] },
    { id: "night", title: "Ночной зоопарк", price: 80, colors: ["#111827", "#4c1d95", "#38bdf8"] }
];

const safeStorage = {
    get(key, fallback) {
        try {
            const value = window.localStorage.getItem(key);
            return value === null ? fallback : value;
        } catch (e) {
            return fallback;
        }
    },
    set(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {}
    }
};

function safeJsonParse(value, fallback) {
    try { return JSON.parse(value); } catch (e) { return fallback; }
}

function normalizeMemoryMode(mode) {
    if (mode === "timed" || mode === "timer") return "timed";
    if (mode === "calm" || mode === "free" || mode === "relaxed") return "calm";
    return "timed";
}

let currentMode = normalizeMemoryMode(safeStorage.get("zooMode", "timed"));
let levelIndex = 0;
let cards = [];
let opened = [];
let matchedPairs = 0;
let moves = 0;
let locked = false;
let timeLeft = 0;
let totalTime = 0;
let timerId = null;
let levelFinished = false;
let soundEnabled = safeStorage.get("zooSound", "on") !== "off";
let musicEnabled = safeStorage.get("zooMusic", "on") !== "off";
let selectedMusicTrack = safeStorage.get("zooMusicTrack", "happyZoo") || "happyZoo";
let soundVolume = Math.max(0, Math.min(1, Number(safeStorage.get("zooSoundVolume", "0.85") || "0.85")));
let musicVolume = Math.max(0, Math.min(1, Number(safeStorage.get("zooMusicVolume", "0.70") || "0.70")));
let musicTimer = null;
let musicStep = 0;
let musicTempo = 245;
let coins = Number(safeStorage.get("zooCoins", "0") || "0");
let unlockedSkins = safeJsonParse(safeStorage.get("zooUnlockedSkins", '["rainbow"]'), ["rainbow"]);
let selectedSkin = safeStorage.get("zooSelectedSkin", "rainbow") || "rainbow";
let maxUnlockedLevel = Number(safeStorage.get("zooMaxUnlockedLevel", "0") || "0");
if (!Number.isFinite(maxUnlockedLevel)) maxUnlockedLevel = 0;
maxUnlockedLevel = Math.max(0, Math.min(levels.length - 1, maxUnlockedLevel));
let levelStars = safeJsonParse(safeStorage.get("zooLevelStars", "{}"), {});
let albumUnlocked = safeJsonParse(safeStorage.get("zooAlbumUnlocked", '["lion"]'), ["lion"]);
let animalNames = safeJsonParse(safeStorage.get("zooAnimalNames", "{}"), {});
let animalFeedCount = safeJsonParse(safeStorage.get("zooAnimalFeedCount", "{}"), {});
let unlockedFoods = safeJsonParse(safeStorage.get("zooUnlockedFoods", '["carrot","apple","banana"]'), ["carrot", "apple", "banana"]);
let playerProfile = safeJsonParse(safeStorage.get("zooPlayerProfile", '{"name":"","avatar":"🦁","favorite":"lion"}'), { name: "", avatar: "🦁", favorite: "lion" });
let achievementClaims = safeJsonParse(safeStorage.get("zooAchievementClaims", "{}"), {});
let petMoodMap = safeJsonParse(safeStorage.get("zooPetMoodMap", "{}"), {});
let petCareStats = safeJsonParse(safeStorage.get("zooPetCareStats", "{}"), {});
let selectedMainPetKey = safeStorage.get("zooSelectedMainPet", "lion") || "lion";
let parentSettings = safeJsonParse(safeStorage.get("zooParentSettings", '{"timerEnabled":true,"musicEnabled":true,"interstitialEnabled":true}'), { timerEnabled: true, musicEnabled: true, interstitialEnabled: true });
let coloringUnlockedTemplates = safeJsonParse(safeStorage.get("zooColoringUnlockedTemplates", "[\"lion_savanna\",\"elephant_jungle\",\"penguin_ice\"]"), ["lion_savanna","elephant_jungle","penguin_ice"]);
let coloringCurrentTemplateSaved = safeStorage.get("zooColoringCurrentTemplate", "lion_savanna") || "lion_savanna";
let shadowLevelIndex = Number(safeStorage.get("zooShadowLevelIndex", "0") || "0");
if (!Number.isFinite(shadowLevelIndex)) shadowLevelIndex = 0;
let rareUnlocked = safeJsonParse(safeStorage.get("zooRareUnlocked", "[]"), []);
let dailyProgress = safeJsonParse(safeStorage.get("zooDailyProgress", "{}"), {});
let audioContext = null;
let selectedPetKey = "lion";
let currentDragGhost = null;
let currentDragFood = null;
let petAnimationMode = "walk";
let petExpressionMode = "happy";
let lastFedFoodEmoji = "🍎";
let petCareDecayTimer = null;
let lastReminderText = "";
let lastReminderShownAt = 0;

const screens = ["menuScreen", "pairsModeScreen", "petRoomScreen", "puzzleScreen", "blockScreen", "shadowScreen", "coloringScreen", "audioScreen", "profileScreen", "achievementsScreen", "mapScreen", "gameScreen", "albumScreen", "petsScreen", "petDetailScreen", "shopScreen", "tasksScreen", "parentScreen"];
const loadingScreen = document.getElementById("loadingScreen");
const board = document.getElementById("board");
const levelText = document.getElementById("level");
const movesText = document.getElementById("moves");
const timerText = document.getElementById("timer");
const timerBox = document.getElementById("timerBox");
const progressBox = document.getElementById("progressBox");
const progressFill = document.getElementById("progressFill");
const message = document.getElementById("message");
const menuCoins = document.getElementById("menuCoins");
const gameCoins = document.getElementById("gameCoins");
const petCoins = document.getElementById("petCoins");
const petRoomCoins = document.getElementById("petRoomCoins");
const petRoomSubtitle = document.getElementById("petRoomSubtitle");
const petRoomBars = document.getElementById("petRoomBars");
const petRoomSpeech = document.getElementById("petRoomSpeech");
const petRoomAnimatedMount = document.getElementById("petRoomAnimatedMount");
const petRoomStage = document.getElementById("petRoomStage");
const petRoomHero = document.getElementById("petRoomHero");
const petRoomCareCount = document.getElementById("petRoomCareCount");
const petRoomFeedCount = document.getElementById("petRoomFeedCount");
const petRoomMoodLabel = document.getElementById("petRoomMoodLabel");
const petRoomReminder = document.getElementById("petRoomReminder");
const petRoomFoodTray = document.getElementById("petRoomFoodTray");
const petRoomFoodRail = document.getElementById("petRoomFoodRail");
const petsCoins = document.getElementById("petsCoins");
const shopCoins = document.getElementById("shopCoins");
const soundButton = document.getElementById("soundButton");
const musicButton = document.getElementById("musicButton");
const musicTrackSelect = document.getElementById("musicTrackSelect");
const musicVolumeRange = document.getElementById("musicVolumeRange");
const musicVolumeText = document.getElementById("musicVolumeText");
const soundVolumeRange = document.getElementById("soundVolumeRange");
const soundVolumeText = document.getElementById("soundVolumeText");
const releaseChecklistBox = document.getElementById("releaseChecklistBox");
const modeLabel = document.getElementById("modeLabel");
const mapList = document.getElementById("mapList");
const albumGrid = document.getElementById("albumGrid");
const petsList = document.getElementById("petsList");
const petDetailTitle = document.getElementById("petDetailTitle");
const petDetailFact = document.getElementById("petDetailFact");
const petDetailImage = document.getElementById("petDetailImage");
const petDetailAvatar = document.getElementById("petDetailAvatar");
const petDetailSpeech = document.getElementById("petDetailSpeech");
const petDetailStatus = document.getElementById("petDetailStatus");
const petMoodCard = document.getElementById("petMoodCard");
const petAnimatedCharacterMount = document.getElementById("petAnimatedCharacterMount");
const petDropZone = document.getElementById("petDropZone");
const petStage = document.getElementById("petStage");
const foodRail = document.getElementById("foodRail");
const profileAvatarPreview = document.getElementById("profileAvatarPreview");
const playerNameInput = document.getElementById("playerNameInput");
const favoriteAnimalSelect = document.getElementById("favoriteAnimalSelect");
const avatarGrid = document.getElementById("avatarGrid");
const profileStars = document.getElementById("profileStars");
const profileCoins = document.getElementById("profileCoins");
const profileLevels = document.getElementById("profileLevels");
const profileAnimals = document.getElementById("profileAnimals");
const achievementsList = document.getElementById("achievementsList");
const achievementCoins = document.getElementById("achievementCoins");
const dailyGiftOverlay = document.getElementById("dailyGiftOverlay");
const dailyGiftText = document.getElementById("dailyGiftText");
const shopGrid = document.getElementById("shopGrid");
const tasksList = document.getElementById("tasksList");
const economyPanel = document.getElementById("economyPanel");
const levelTitle = document.getElementById("levelTitle");
const levelSubtitle = document.getElementById("levelSubtitle");
const puzzleCoins = document.getElementById("puzzleCoins");
const puzzleBoard = document.getElementById("puzzleBoard");
const puzzleStageRow = document.getElementById("puzzleStageRow");
const puzzleMoves = document.getElementById("puzzleMoves");
const puzzleStageLabel = document.getElementById("puzzleStageLabel");
const puzzleBestLabel = document.getElementById("puzzleBestLabel");
const puzzleReference = document.getElementById("puzzleReference");
const puzzleImageRail = document.getElementById("puzzleImageRail");
const puzzleImageLabel = document.getElementById("puzzleImageLabel");
const puzzleMessage = document.getElementById("puzzleMessage");
const puzzleTitleText = document.getElementById("puzzleTitleText");
const puzzleProgressNote = document.getElementById("puzzleProgressNote");
const puzzleFileInput = document.getElementById("puzzleFileInput");
const blockCoins = document.getElementById("blockCoins");

const shadowCoins = document.getElementById("shadowCoins");
const shadowLevelBadge = document.getElementById("shadowLevelBadge");
const shadowStage = document.getElementById("shadowStage");
const shadowTargetImage = document.getElementById("shadowTargetImage");
const shadowOptions = document.getElementById("shadowOptions");
const shadowMessage = document.getElementById("shadowMessage");
const shadowStreakBadge = document.getElementById("shadowStreakBadge");
const shadowCelebrationStats = document.getElementById("shadowCelebrationStats");
const shadowConfettiLayer = document.getElementById("shadowConfettiLayer");
const shadowTargets = document.getElementById("shadowTargets");
const shadowProgressRow = document.getElementById("shadowProgressRow");
const shadowCelebrationOverlay = document.getElementById("shadowCelebrationOverlay");
const shadowCelebrationTitle = document.getElementById("shadowCelebrationTitle");
const shadowCelebrationText = document.getElementById("shadowCelebrationText");
const shadowCelebrationAnimals = document.getElementById("shadowCelebrationAnimals");

const coloringCoins = document.getElementById("coloringCoins");
const coloringBadge = document.getElementById("coloringBadge");
const coloringHint = document.getElementById("coloringHint");
const coloringTemplates = document.getElementById("coloringTemplates");
const coloringPaletteGrid = document.getElementById("coloringPaletteGrid");
const coloringSizeRow = document.getElementById("coloringSizeRow");
const coloringCanvasWrap = document.getElementById("coloringCanvasWrap");
const coloringPaintCanvas = document.getElementById("coloringPaintCanvas");
const coloringOutlineCanvas = document.getElementById("coloringOutlineCanvas");
const blockBoard = document.getElementById("blockBoard");
const blockPieces = document.getElementById("blockPieces");
const blockScore = document.getElementById("blockScore");
const blockBest = document.getElementById("blockBest");
const blockCombo = document.getElementById("blockCombo");
const blockMessage = document.getElementById("blockMessage");
const blockMascot = document.getElementById("blockMascot");
const blockComboBadge = document.getElementById("blockComboBadge");

const overlay = document.getElementById("overlay");
const modalIcon = document.getElementById("modalIcon");
const modalAnimal = document.getElementById("modalAnimal");
const modalAnimalImg = document.getElementById("modalAnimalImg");
const modalTitle = document.getElementById("modalTitle");
const modalStars = document.getElementById("modalStars");
const modalText = document.getElementById("modalText");
const modalButton = document.getElementById("modalButton");

function setupImages() {
    document.getElementById("bgElephant").src = animalImageSrc("elephant");
    document.getElementById("bgGiraffe").src = animalImageSrc("giraffe");
    document.getElementById("bgMonkey").src = animalImageSrc("monkey");
    document.getElementById("bgLion").src = animalImageSrc("lion");
    document.getElementById("bgParrot").src = animalImageSrc("parrot");

    document.getElementById("menuLion").src = animalImageSrc("lion");
    document.getElementById("menuPanda").src = animalImageSrc("panda");
    document.getElementById("menuFox").src = animalImageSrc("fox");
}

function saveProgress() {
    currentMode = normalizeMemoryMode(currentMode);
    safeStorage.set("zooMode", currentMode);
    safeStorage.set("zooCoins", String(coins));
    safeStorage.set("zooUnlockedSkins", JSON.stringify(unlockedSkins));
    safeStorage.set("zooSelectedSkin", selectedSkin);
    safeStorage.set("zooSound", soundEnabled ? "on" : "off");
    safeStorage.set("zooMusic", musicEnabled ? "on" : "off");
    safeStorage.set("zooMusicTrack", selectedMusicTrack);
    safeStorage.set("zooSoundVolume", String(soundVolume));
    safeStorage.set("zooMusicVolume", String(musicVolume));
    safeStorage.set("zooMaxUnlockedLevel", String(maxUnlockedLevel));
    safeStorage.set("zooLevelStars", JSON.stringify(levelStars));
    safeStorage.set("zooAlbumUnlocked", JSON.stringify(albumUnlocked));
    safeStorage.set("zooAnimalNames", JSON.stringify(animalNames));
    safeStorage.set("zooAnimalFeedCount", JSON.stringify(animalFeedCount));
    safeStorage.set("zooUnlockedFoods", JSON.stringify(unlockedFoods));
    safeStorage.set("zooPlayerProfile", JSON.stringify(playerProfile));
    safeStorage.set("zooAchievementClaims", JSON.stringify(achievementClaims));
    safeStorage.set("zooPetMoodMap", JSON.stringify(petMoodMap));
    safeStorage.set("zooPetCareStats", JSON.stringify(petCareStats));
    safeStorage.set("zooSelectedMainPet", selectedMainPetKey);
    safeStorage.set("zooParentSettings", JSON.stringify(parentSettings));
    safeStorage.set("zooRareUnlocked", JSON.stringify(rareUnlocked));
    safeStorage.set("zooDailyProgress", JSON.stringify(dailyProgress));
    safeStorage.set("zooPuzzleBestMoves", JSON.stringify(puzzleBestMoves));
    safeStorage.set("zooPuzzleCompleted", String(puzzleCompleted));
    safeStorage.set("zooUnlockedPuzzleImages", JSON.stringify(unlockedPuzzleImages));
    safeStorage.set("zooMaxUnlockedPuzzleStage", String(maxUnlockedPuzzleStage));
    safeStorage.set("zooMaxUnlockedPuzzleStageV2", String(maxUnlockedPuzzleStage));
    safeStorage.set("zooBlockBestScore", String(zooBlockBestScore || 0));
    safeStorage.set("zooBlockGamesPlayed", String(zooBlockGamesPlayed || 0));
    safeStorage.set("zooColoringUnlockedTemplates", JSON.stringify(coloringUnlockedTemplates));
    safeStorage.set("zooColoringCurrentTemplate", coloringCurrentTemplateId);
    safeStorage.set("zooShadowLevelIndex", String(shadowLevelIndex || 0));
}

function updateCoinsViews() {
    menuCoins.textContent = String(coins);
    gameCoins.textContent = String(coins);
    shopCoins.textContent = String(coins);
    if (petCoins) petCoins.textContent = String(coins);
    if (petRoomCoins) petRoomCoins.textContent = String(coins);
    if (petsCoins) petsCoins.textContent = String(coins);
    if (achievementCoins) achievementCoins.textContent = String(coins);
    if (puzzleCoins) puzzleCoins.textContent = String(coins);
    if (blockCoins) blockCoins.textContent = String(coins);
    if (shadowCoins) shadowCoins.textContent = String(coins);
}

function applySkin() {
    const skin = skins.find(item => item.id === selectedSkin) || skins[0];
    document.documentElement.style.setProperty("--cardBackA", skin.colors[0]);
    document.documentElement.style.setProperty("--cardBackB", skin.colors[1]);
    document.documentElement.style.setProperty("--cardBackC", skin.colors[2]);

    document.body.classList.remove("skin-rainbow", "skin-jungle", "skin-ocean", "skin-candy", "skin-night");
    document.body.classList.add(`skin-${skin.id}`);
}

// Stage 2.1: lightweight navigation history.
// Top back buttons now return to the previous real screen instead of always jumping
// to a hard-coded section. goHome() still resets the flow to the main menu.
let zooCurrentScreen = "menuScreen";
let zooScreenHistory = [];

function getActiveScreenIdSafe() {
    const active = document.querySelector('.screen.show');
    return active ? active.id : (zooCurrentScreen || "menuScreen");
}

function rememberScreenTransition(nextScreenId, options = {}) {
    const previousScreenId = zooCurrentScreen || getActiveScreenIdSafe();
    if (!options.skipHistory && previousScreenId && previousScreenId !== nextScreenId && screens.includes(previousScreenId)) {
        if (zooScreenHistory[zooScreenHistory.length - 1] !== previousScreenId) {
            zooScreenHistory.push(previousScreenId);
        }
        if (zooScreenHistory.length > 20) zooScreenHistory = zooScreenHistory.slice(-20);
    }
    if (nextScreenId === "menuScreen" && options.clearHistory !== false) {
        zooScreenHistory = [];
    }
    zooCurrentScreen = nextScreenId;
}

function goBackOrHome(fallbackScreenId = "menuScreen") {
    playSound("click");
    clearInterval(timerId);
    hideOverlay();
    try { closeShadowCelebration(); } catch(e) {}

    const current = getActiveScreenIdSafe();
    let target = null;
    while (zooScreenHistory.length && !target) {
        const candidate = zooScreenHistory.pop();
        if (candidate && candidate !== current && screens.includes(candidate)) {
            target = candidate;
        }
    }
    showScreen(target || fallbackScreenId || "menuScreen", { skipHistory: true, clearHistory: false });
}

function goHome() {
    playSound("click");
    clearInterval(timerId);
    hideOverlay();
    try { closeShadowCelebration(); } catch(e) {}
    showScreen("menuScreen", { skipHistory: true, clearHistory: true });
}

function showScreen(screenId, navOptions = {}) {
    if (!screens.includes(screenId)) screenId = "menuScreen";
    rememberScreenTransition(screenId, navOptions || {});
    if (screenId !== "blockScreen") closeZooBlockGameOverModal();
    if (screenId !== "shadowScreen") { try { closeShadowCelebration(); } catch(e) {} }
    try { cleanupFoodDrag(); } catch(e) {}
    clearInterval(timerId);
    hideOverlay();
    screens.forEach(id => document.getElementById(id).classList.remove("show"));
    document.getElementById(screenId).classList.add("show");
    if (screenId === "mapScreen") renderMap();
    if (screenId === "albumScreen") renderAlbum();
    if (screenId === "petRoomScreen") renderPetRoom();
    if (screenId === "puzzleScreen") renderPuzzleScreen();
    if (screenId === "blockScreen") renderZooBlockScreen();
    if (screenId === "coloringScreen") renderColoringScreen();
    if (screenId === "petsScreen") renderPets();
    if (screenId === "shopScreen") renderShop();
    if (screenId === "tasksScreen") renderTasks();
    if (screenId === "profileScreen") renderProfile();
    if (screenId === "achievementsScreen") renderAchievements();
    if (screenId === "parentScreen") renderParentSettings();
    if (screenId === "audioScreen") renderAudioSettings();
    updateCoinsViews();
    translatePageToEnglish();
    hideGuideOverlay();
    // Show coloring scroll buttons only on coloring screen
    const scrollBtn = document.getElementById("coloringScrollBtn");
    const scrollUpBtn = document.getElementById("coloringScrollUpBtn");
    if (scrollBtn) scrollBtn.classList.toggle("visible", screenId === "coloringScreen");
    if (scrollUpBtn) scrollUpBtn.classList.toggle("visible", screenId === "coloringScreen");
    if (screenId === "coloringScreen") coloringScrollUpdateBtn();
    setTimeout(() => {
        refreshGuideHelpers(screenId);
        maybeAutoStartGuide(screenId);
    }, 180);
}



const guideOverlay = document.getElementById("guideOverlay");
const guideHighlight = document.getElementById("guideHighlight");
const guideBubbleTitle = document.getElementById("guideBubbleTitle");
const guideBubbleText = document.getElementById("guideBubbleText");
const guideNextBtn = document.getElementById("guideNextBtn");
const guideArrow = document.getElementById("guideArrow");
const guideArrowTip = document.getElementById("guideArrowTip");
const guideHand = document.getElementById("guideHand");
const guideFab = document.getElementById("guideFab");
const pageScrollHint = document.getElementById("pageScrollHint");

// Safe stubs for scroll-hint helpers (may be defined in economy patch or absent)
function attachScrollHint(selector, direction, root) {
    try {
        const el = (root || document).querySelector(selector);
        if (!el) return;
        if (el.querySelector('.guide-scroll-hint')) return;
        const hint = document.createElement('div');
        hint.className = `guide-scroll-hint ${direction}`;
        hint.innerHTML = direction === 'horizontal'
            ? '<span class="dots"><i></i><i></i><i></i></span><span class="arrow">→</span>'
            : '<span class="dots"><i></i><i></i><i></i></span><span class="arrow">↓</span>';
        el.appendChild(hint);
    } catch(e) {}
}

function renderPageScrollHint() {
    try {
        if (!pageScrollHint) return;
        const scrollable = document.body.scrollHeight > window.innerHeight + 8;
        const atBottom   = window.scrollY + window.innerHeight >= document.body.scrollHeight - 24;
        pageScrollHint.classList.toggle('show', scrollable && !atBottom);
    } catch(e) {}
}
const GUIDE_STORAGE_KEY = "zooPetWorldGuideSeenV2";
// ─── GUIDE / HELPER SYSTEM — Stage 3 rewrite ───────────────────────────────
// Data-driven, safe, no infinite loops, correct action types.
// Each step: { selector, title, text, action, arrow, fallback?, noHighlight?, prep? }
// action: 'tap' | 'drag-h' | 'drag-v' | 'scroll' | 'select-color'
// fallback: 'skip' (default) | 'text' (show bubble without highlight ring)
// noHighlight: true → informational text only, no dim/ring
// ───────────────────────────────────────────────────────────────────────────

let guideSeenState = {};
try { guideSeenState = JSON.parse(localStorage.getItem(GUIDE_STORAGE_KEY) || "{}"); } catch (e) { guideSeenState = {}; }
let activeGuide = null;

function guideT(ru, en, voiceKey) {
    // voiceKey: future audio key, no audio played yet (Stage 4 foundation)
    try {
        const lang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ru';
        if (lang === 'en') return en || ru;
        if (lang === 'ru') return ru;
        // HY or other future languages: try t() with voiceKey as i18n key,
        // fall back to ru string if no key provided or key missing
        if (typeof t === 'function' && voiceKey) {
            const translated = t(voiceKey);
            if (translated && translated !== voiceKey) return translated;
        }
        return ru; // safe fallback
    } catch (e) { return ru; }
}

function markGuideSeen(screenKey) {
    guideSeenState[screenKey] = true;
    try { localStorage.setItem(GUIDE_STORAGE_KEY, JSON.stringify(guideSeenState)); } catch (e) {}
}

function resetGuideSeen() {
    guideSeenState = {};
    try { localStorage.removeItem(GUIDE_STORAGE_KEY); } catch (e) {}
}

// ── Visibility check — avoids highlighting hidden/zero-size elements ────────
function isElementVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    if (parseFloat(style.opacity) === 0) return false;
    return true;
}

function refreshGuideHelpers(screenId = getVisibleScreenId()) {
    const root = document.getElementById(screenId) || document;
    root.querySelectorAll('.guide-scroll-hint').forEach(item => item.remove());
    attachScrollHint('.food-rail', 'horizontal', root);
    attachScrollHint('.puzzle-stage-row', 'horizontal', root);
    attachScrollHint('#puzzleImageRail', 'horizontal', root);
    attachScrollHint('#blockPieces', 'horizontal', root);
    attachScrollHint('.map-list', 'vertical', root);
    attachScrollHint('.pets-list', 'vertical', root);
    attachScrollHint('.tasks-list', 'vertical', root);
    attachScrollHint('.album-grid', 'vertical', root);
    attachScrollHint('.shop-grid', 'vertical', root);
    renderPageScrollHint();
}

// ── Guide flows — all steps data-driven ─────────────────────────────────────
function getGuideFlow(screenKey) {
    const petName = (typeof getAnimalDisplayName === 'function' && selectedMainPetKey)
        ? getAnimalDisplayName(selectedMainPetKey)
        : guideT('питомец', 'pet');

    const flows = {

        menuScreen: [
            {
                selector: '.big-play-card',
                title: guideT('Мой зоопарк', 'My Zoo'),
                text: guideT('Это будущая главная территория игры. Мини-игры находятся ниже.', 'Future main zoo area. Mini-games are below.'),
                action: 'tap', arrow: 'down', voiceKey: 'guide.menu.my_zoo'
            },
            {
                selector: 'button.feature-card[onclick="openPetRoom()"]',
                title: guideT('Комната питомца', 'Pet Room'),
                text: guideT('Корми, мой и играй со своим зверьком.', 'Feed, wash, and play with your pet.'),
                action: 'tap', arrow: 'down', voiceKey: 'guide.menu.pet_room'
            },
            {
                selector: 'button.feature-card[onclick="openColoring()"]',
                title: guideT('Раскраска', 'Coloring'),
                text: guideT('30 раскрасок — выбери цвет и нажми на область.', '30 coloring pages — pick a color and tap an area.'),
                action: 'tap', arrow: 'down', fallback: 'skip', voiceKey: 'guide.menu.coloring'
            },
            {
                selector: '.feature-card-grid',
                title: guideT('Листай меню', 'Scroll the menu'),
                text: guideT('Потяни экран вниз — там ещё мини-игры.', 'Swipe down to see more mini-games below.'),
                action: 'scroll', arrow: 'down'
            }
        ],

        petRoomScreen: [
            {
                selector: '.pet-room-action.feed, #petRoomFoodBtn',
                title: guideT('Покормить питомца', 'Feed your pet'),
                text: guideT(`Нажми на Еду — откроется лента с едой для ${petName}.`, `Tap Food to open the food rail for ${petName}.`),
                action: 'tap', arrow: 'down', voiceKey: 'guide.petroom.feed'
            },
            {
                selector: '#petRoomBars, .pet-room-bars',
                title: guideT('Следи за шкалами', 'Watch the bars'),
                text: guideT('Зелёный — хорошо, жёлтый — внимание, красный — действуй.', 'Green — good, yellow — watch it, red — act now.'),
                action: 'tap', arrow: 'down', fallback: 'text'
            },
            {
                selector: '.pet-room-mini-games, .pet-room-shortcut',
                title: guideT('Мини-игры рядом', 'Mini-games nearby'),
                text: guideT('Отсюда можно перейти в Найди пары, Пазл и Zoo Block.', 'Jump to Memory, Puzzle, and Zoo Block from here.'),
                action: 'tap', arrow: 'up', fallback: 'skip'
            }
        ],

        petRoomScreen_feed: [
            {
                prep: () => { try { showPetRoomFoodTray && showPetRoomFoodTray(); } catch(e) {} },
                selector: '#petRoomFoodRail, .food-rail',
                title: guideT('Потяни еду', 'Drag food'),
                text: guideT('Проведи пальцем по еде и потяни её на питомца.', 'Touch the food, drag it, and drop it on the pet.'),
                action: 'drag-h', arrow: 'up'
            },
            {
                selector: '#petRoomHero, .pet-room-hero',
                title: guideT('Отпусти на питомца', 'Drop on the pet'),
                text: guideT('Отпусти еду прямо на питомце — он обрадуется!', 'Release food right on the pet — it will be happy!'),
                action: 'drag-h', arrow: 'down'
            }
        ],

        coloringScreen: [
            {
                selector: '.coloring-palette-grid, #coloringPaletteGrid',
                title: guideT('Выбери цвет', 'Pick a color'),
                voiceKey: 'guide.coloring.pick_color',
                text: guideT('Нажми на любой кружок — цвет выберется. Листай вправо, чтобы увидеть все цвета.', 'Tap any circle to pick a color. Swipe right to see all colors.'),
                action: 'select-color', arrow: 'up', fallback: 'text'
            },
            {
                selector: '#coloringCanvasWrap, .coloring-canvas-wrap',
                title: guideT('Нажми на область', 'Tap an area'),
                text: guideT('Теперь нажми на любую белую область — она заполнится цветом. Двумя пальцами можно увеличить.', 'Now tap any white area to fill it with color. Pinch to zoom in.'),
                action: 'tap', arrow: 'down'
            },
            {
                selector: '#coloringTemplates, .coloring-templates',
                title: guideT('Смени раскраску', 'Switch coloring page'),
                text: guideT('Листай шаблоны внизу, чтобы выбрать другое животное.', 'Swipe the templates below to pick another animal.'),
                action: 'drag-h', arrow: 'up', fallback: 'skip'
            }
        ],

        puzzleScreen: [
            {
                selector: '#puzzleStageRow, .puzzle-stage-row',
                title: guideT('Этапы пазла', 'Puzzle stages'),
                text: guideT('Листай этапы вправо: от простого 2×2 до сложного 6×6.', 'Swipe stages right: easy 2×2 to hard 6×6.'),
                action: 'drag-h', arrow: 'up'
            },
            {
                selector: '#puzzleImageRail, .puzzle-image-rail',
                title: guideT('Пазлы животных', 'Animal puzzles'),
                text: guideT('Выбери картинку. Новые — под замком, открываются за монетки.', 'Choose a picture. New ones are locked — open with coins.'),
                action: 'drag-h', arrow: 'up', fallback: 'skip'
            },
            {
                selector: '#puzzleBoard, .puzzle-board',
                title: guideT('Собери картинку', 'Assemble the puzzle'),
                text: guideT('Перетаскивай кусочки или нажимай две части, чтобы поменять.', 'Drag pieces or tap two pieces to swap them.'),
                action: 'drag-h', arrow: 'down', fallback: 'text'
            }
        ],

        blockScreen: [
            {
                selector: '#blockPieces, .block-pieces',
                title: guideT('Выбери фигуру', 'Pick a piece'),
                text: guideT('Нажми на одну из трёх фигур. На телефоне: фигура → клетка.', 'Tap one of three pieces. On phone: piece → cell.'),
                action: 'tap', arrow: 'up'
            },
            {
                selector: '#blockBoard, .block-board',
                title: guideT('Поставь на поле', 'Place on the board'),
                text: guideT('Нажми на клетку 8×8, куда поставить выбранную фигуру.', 'Tap the 8×8 cell where you want to place the piece.'),
                action: 'tap', arrow: 'down', fallback: 'text'
            }
        ],

        shadowScreen: [
            {
                selector: '.shadow-options, .shadow-answers',
                title: guideT('Угадай животное', 'Guess the animal'),
                text: guideT('Смотри на тень и нажми на правильного зверя среди вариантов.', 'Look at the shadow and tap the correct animal from the options.'),
                action: 'tap', arrow: 'up', fallback: 'text'
            },
            {
                selector: '.shadow-silhouette, .shadow-image',
                title: guideT('Внимательно смотри', 'Look closely'),
                text: guideT('Контур подскажет, кто это. Есть подсказка — кнопка с лампочкой.', 'The outline gives it away. Use the hint button (lightbulb) if stuck.'),
                action: 'tap', arrow: 'down', fallback: 'skip'
            }
        ],

        mapScreen: [
            {
                selector: '.map-list, .level-list',
                title: guideT('Карта уровней', 'Level map'),
                text: guideT('Листай карту вниз и открывай новые уровни. Чем выше — тем сложнее.', 'Scroll down to unlock new levels. Higher = harder.'),
                action: 'scroll', arrow: 'down', fallback: 'text'
            }
        ],

        gameScreen: [
            {
                selector: '#board, .memory-board',
                title: guideT('Найди одинаковые карточки', 'Find matching cards'),
                voiceKey: 'guide.game.find_pairs',
                text: guideT('Открывай по две карточки, ищи одинаковые. Если пары нет — запоминай!', 'Open two cards and find the matching pair. Remember them if wrong!'),
                action: 'tap', arrow: 'down', fallback: 'text'
            }
        ],

        audioScreen: [
            {
                selector: '#musicTrackSelect, .audio-select',
                title: guideT('Выбери трек', 'Choose a track'),
                text: guideT('15 музыкальных тем. Нажми "Проверить музыку", чтобы послушать.', '15 music themes. Tap "Check music" to preview.'),
                action: 'tap', arrow: 'down', fallback: 'skip'
            }
        ],

        pairsModeScreen: [
            {
                selector: '.mode-card, .pairs-mode-card',
                title: guideT('Выбери режим', 'Choose mode'),
                text: guideT('Спокойный — без таймера. С таймером — нужно успеть.', 'Calm — no timer. Timed — race the clock.'),
                action: 'tap', arrow: 'down', fallback: 'text'
            }
        ],

        petsScreen: [
            {
                selector: '#petsList, .pets-list',
                title: guideT('Твои питомцы', 'Your pets'),
                text: guideT('Листай вниз, выбирай главного питомца. Новых покупай за монетки.', 'Scroll down to choose main pet. Buy new ones with coins.'),
                action: 'scroll', arrow: 'down', fallback: 'text'
            }
        ]
    };

    return flows[screenKey] || [];
}

// ── Safe element finder with prep support ───────────────────────────────────
function getGuideTarget(step) {
    if (step.prep) {
        try { step.prep(); } catch (e) {}
    }
    if (!step.selector) return null;
    // Support comma-separated selectors (try each)
    const selectors = step.selector.split(',').map(s => s.trim());
    for (const sel of selectors) {
        try {
            const el = document.querySelector(sel);
            if (isElementVisible(el)) return el;
        } catch (e) {}
    }
    return null;
}

// ── Show step without highlight (informational) ──────────────────────────────
function showGuideStepInfo(step) {
    if (!guideBubbleTitle || !guideBubbleText) return;
    // Hide highlight ring — show only the bubble in a safe position
    if (guideHighlight) {
        guideHighlight.style.width = '0px';
        guideHighlight.style.height = '0px';
        guideHighlight.style.left = '-9999px';
    }
    if (guideArrow) guideArrow.classList.remove('show');
    if (guideHand) guideHand.classList.remove('show');
    guideBubbleTitle.textContent = step.title || t('guide.tip');
    guideBubbleText.textContent = step.text || '';
    guideNextBtn.textContent = (activeGuide && activeGuide.index >= activeGuide.steps.length - 1)
        ? guideT('Готово', 'Done') : guideT('Дальше', 'Next');
}

// ── Main step display with infinite-loop guard ───────────────────────────────
function showGuideStep() {
    if (!activeGuide) return;

    // Safety exit: stop if we've skipped more steps than exist
    if ((activeGuide._skips || 0) > activeGuide.steps.length + 2) {
        markGuideSeen(activeGuide.screenKey);
        hideGuideOverlay();
        return;
    }

    const step = activeGuide.steps[activeGuide.index];
    if (!step) {
        if (activeGuide && !activeGuide.auto && activeGuide._skips > 0 && !activeGuide._fallbackShown) {
            activeGuide._fallbackShown = true;
            activeGuide.steps = [{
                noHighlight: true,
                title: guideT('Подсказка', 'Help'),
                text: guideT(
                    'Для этого экрана подсказка есть, но нужный элемент не найден. Экран работает — просто продолжай играть. Я не буду показывать кривую рамку.',
                    'This screen has guide text, but the target element was not found. The screen still works — keep playing. I will not show a crooked frame.'
                )
            }];
            activeGuide.index = 0;
            showGuideStep();
            return;
        }
        markGuideSeen(activeGuide.screenKey);
        hideGuideOverlay();
        return;
    }

    guideBubbleTitle.textContent = step.title || 'Подсказка';
    guideBubbleText.textContent = step.text || '';
    guideNextBtn.textContent = activeGuide.index >= activeGuide.steps.length - 1
        ? guideT('Готово', 'Done') : guideT('Дальше', 'Next');

    // Informational step (no selector, or explicitly noHighlight)
    if (!step.selector || step.noHighlight) {
        showGuideStepInfo(step);
        return;
    }

    const target = getGuideTarget(step);

    if (!target) {
        const fallback = step.fallback || (activeGuide && activeGuide.auto ? 'skip' : 'text');
        if (fallback === 'text') {
            // Show bubble text without highlight. Manual ❔ must never look broken.
            showGuideStepInfo(step);
        } else {
            // Skip this step silently for auto guide, then fall back to a safe text card if manual guide found nothing.
            activeGuide._skips = (activeGuide._skips || 0) + 1;
            activeGuide.index += 1;
            showGuideStep();
        }
        return;
    }

    // Valid target found — reset skip counter
    activeGuide._skips = 0;

    // Scroll element into view, then position after settling
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            positionGuideForTarget(target, step);
        });
    });
}

// ── Position highlight + hand + arrow on target ──────────────────────────────
function positionGuideForTarget(target, step) {
    if (!guideHighlight || !guideArrow || !guideHand) return;

    const rect = target.getBoundingClientRect();
    // Guard against off-screen or zero-size rects
    if (rect.width === 0 && rect.height === 0) {
        showGuideStepInfo(step);
        return;
    }

    const pad = 8;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    guideHighlight.style.left   = Math.max(4, rect.left - pad) + 'px';
    guideHighlight.style.top    = Math.max(4, rect.top  - pad) + 'px';
    guideHighlight.style.width  = Math.min(winW - 8, rect.width  + pad * 2) + 'px';
    guideHighlight.style.height = Math.min(winH - 8, rect.height + pad * 2) + 'px';

    const dir      = step.arrow  || 'down';
    const action   = step.action || 'tap';

    // Hand icon by action type
    const handIcons = {
        'tap':          '👆',
        'drag-h':       '🤏',
        'drag-v':       '🤏',
        'scroll':       '👆',
        'select-color': '🎨'
    };
    guideHand.textContent = handIcons[action] || '👆';

    // Arrow direction class + tip
    guideArrow.className = `guide-arrow show dir-${dir}`;
    const arrowTips = { up: '↑', down: '↓', left: '←', right: '→' };
    if (guideArrowTip) guideArrowTip.textContent = arrowTips[dir] || '↓';

    // Arrow position
    let arrowL, arrowT;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    if (dir === 'down')  { arrowL = cx - 18; arrowT = Math.max(4, rect.top - 52); }
    if (dir === 'up')    { arrowL = cx - 18; arrowT = Math.min(winH - 60, rect.bottom + 8); }
    if (dir === 'left')  { arrowL = Math.min(winW - 90, rect.right + 8); arrowT = cy - 18; }
    if (dir === 'right') { arrowL = Math.max(4, rect.left - 86); arrowT = cy - 18; }
    guideArrow.style.left = Math.min(winW - 90, Math.max(4, arrowL)) + 'px';
    guideArrow.style.top  = Math.min(winH - 70, Math.max(4, arrowT)) + 'px';

    // Hand position by action
    let handL = cx - 14;
    let handT = rect.bottom + 10;
    if (action === 'drag-h') {
        handL = rect.left + Math.max(16, rect.width * 0.1);
        handT = cy - 8;
    } else if (action === 'drag-v' || action === 'scroll') {
        handL = cx - 14;
        handT = rect.top + Math.max(12, rect.height * 0.15);
    } else if (action === 'select-color') {
        handL = rect.left + Math.max(10, rect.width * 0.05);
        handT = cy - 10;
    } else if (dir === 'up') {
        handT = rect.top - 42;
    }
    guideHand.className = `guide-hand show ${action}`;
    guideHand.style.left = Math.min(winW - 40, Math.max(4, handL)) + 'px';
    guideHand.style.top  = Math.min(winH - 50, Math.max(4, handT)) + 'px';
}

// ── Guide lifecycle ──────────────────────────────────────────────────────────
function maybeAutoStartGuide(screenKey = getVisibleScreenId()) {
    if (!guideOverlay || activeGuide) return;
    const flow = getGuideFlow(screenKey);
    if (!flow.length) return;
    if (guideSeenState[screenKey]) return;
    startGuide(screenKey, true);
}

function startGuideForCurrentScreen() {
    const screenKey = getVisibleScreenId();
    if (screenKey === 'petRoomScreen'
        && typeof petRoomFoodTray !== 'undefined'
        && petRoomFoodTray && petRoomFoodTray.classList.contains('show')) {
        startGuide('petRoomScreen_feed', false);
        return;
    }
    startGuide(screenKey, false);
}

function startGuide(screenKey, auto = false) {
    const steps = getGuideFlow(screenKey).slice();
    if (!guideOverlay) return;
    if (!steps.length) {
        if (auto) return;
        activeGuide = {
            screenKey,
            steps: [{
                noHighlight: true,
                title: guideT('Подсказка', 'Help'),
                text: guideT('Для этого экрана отдельный гид ещё готовится. Основные кнопки можно нажимать, а списки — листать.', 'A detailed guide for this screen is still being prepared. You can tap the main buttons and scroll lists.')
            }],
            index: 0,
            auto,
            _skips: 0,
            _fallbackShown: true
        };
        guideOverlay.classList.add('show');
        showGuideStep();
        return;
    }
    activeGuide = { screenKey, steps, index: 0, auto, _skips: 0, _fallbackShown: false };
    guideOverlay.classList.add('show');
    showGuideStep();
}

function hideGuideOverlay() {
    if (guideOverlay) guideOverlay.classList.remove('show');
    if (guideArrow)   guideArrow.classList.remove('show');
    if (guideHand)    guideHand.className = 'guide-hand';
    if (guideHighlight) {
        guideHighlight.style.width  = '0';
        guideHighlight.style.height = '0';
        guideHighlight.style.left   = '-9999px';
    }
    activeGuide = null;
}

function skipGuide() {
    if (activeGuide) markGuideSeen(activeGuide.screenKey);
    hideGuideOverlay();
}

function nextGuideStep() {
    if (!activeGuide) return;
    activeGuide.index += 1;
    showGuideStep();
}

// ── Event wiring ─────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
    refreshGuideHelpers(getVisibleScreenId());
    if (activeGuide) showGuideStep();
});
window.addEventListener('scroll', renderPageScrollHint, { passive: true });
document.addEventListener('visibilitychange', () => { if (!document.hidden) renderPageScrollHint(); });
if (guideOverlay) {
    guideOverlay.addEventListener('click', (event) => {
        if (event.target === guideOverlay) nextGuideStep();
    });
}
if (guideFab) {
    guideFab.onclick = (event) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        startGuideForCurrentScreen();
    };
    guideFab.style.pointerEvents = 'auto';
}
window.startGuideForCurrentScreen = startGuideForCurrentScreen;
window.startGuide = startGuide;
window.skipGuide = skipGuide;
window.nextGuideStep = nextGuideStep;
window.resetGuideSeen = resetGuideSeen;



let __menuOpenInProgress = false;
function forceOpenMenu() {
    if (__menuOpenInProgress) return;
    __menuOpenInProgress = true;
    try { setupImages(); } catch(e) {}
    try { applySkin(); } catch(e) {}
    try { updateCoinsViews(); } catch(e) {}
    try {
        soundButton.textContent = soundEnabled ? t('sound.on') : t('sound.off');
        updateMusicButton();
        updateSoundButton();
    } catch(e) {}
    try { loadingScreen.style.display = "none"; } catch(e) {}
    try { showScreen("menuScreen", { skipHistory: true, clearHistory: true }); } catch(e) {}
    try { translatePageToEnglish(); } catch(e) {}
    try { installTranslationObserver(); } catch(e) {}
    // Start music AFTER a short delay — iOS needs the user-gesture context
    // to already be processed before AudioContext operations.
    setTimeout(() => {
        try {
            if (musicEnabled && !musicTimer) startBackgroundMusic();
        } catch(e) {}
        __menuOpenInProgress = false;
    }, 300);
    setTimeout(checkDailyGift, 700);
}

function openPairsModeScreen() {
    playSound("click");
    if (musicEnabled && !musicTimer) startBackgroundMusic();
    showScreen("pairsModeScreen");
}

function openZooTeaser() {
    playSound("click");
    if (typeof showFoodToast === "function") {
        showFoodToast(t('myzoo.toast'));
    }
    if (!overlay || !modalIcon || !modalTitle || !modalText || !modalButton) return;
    modalIcon.textContent = "🐾";
    modalTitle.textContent = t('myzoo.title');
    modalStars.textContent = t('myzoo.soon');
    modalText.textContent = t("myzoo.text");
    modalAnimal.classList.remove("show");
    modalButton.textContent = t('myzoo.ok');
    modalButton.onclick = hideOverlay;
    forceShowVictoryPopup();
}

function setModeAndOpenMap(mode) {
    const requestedMode = normalizeMemoryMode(mode);

    if (requestedMode === "timed" && parentSettings && parentSettings.timerEnabled === false) {
        currentMode = "calm";
        saveProgress();
        playSound("wrong");
        if (typeof showFoodToast === "function") {
            showFoodToast(t('timer.disabled_toast'));
        } else if (typeof showPetRoomToast === "function") {
            showPetRoomToast("Таймер отключён в настройках родителей 🛡️");
        }
        if (musicEnabled && !musicTimer) startBackgroundMusic();
        showScreen("mapScreen");
        return;
    }

    currentMode = requestedMode;
    saveProgress();
    playSound("click");
    if (musicEnabled && !musicTimer) startBackgroundMusic();
    showScreen("mapScreen");
}

function initAudio() {
    if (!audioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioContext = new AudioContextClass();
    }
    if (audioContext && audioContext.state === "suspended") {
        audioContext.resume();
    }
}

// iOS Safari always creates AudioContext in "suspended" state and requires a
// user gesture to resume it. This one-time listener ensures audio works on
// first tap anywhere on the screen.
(function iosAudioUnlock() {
    function unlock() {
        if (!audioContext) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) audioContext = new AC();
        }
        if (audioContext && audioContext.state === "suspended") {
            audioContext.resume();
        }
        document.removeEventListener("touchstart", unlock, true);
        document.removeEventListener("touchend", unlock, true);
        document.removeEventListener("click", unlock, true);
    }
    document.addEventListener("touchstart", unlock, { capture: true, passive: true });
    document.addEventListener("touchend", unlock, { capture: true, passive: true });
    document.addEventListener("click", unlock, { capture: true, once: true });
})();

function playTone(freq, duration, type = "sine", volume = 0.05) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = Math.max(0.0001, volume * soundVolume);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    osc.stop(audioContext.currentTime + duration + 0.02);
}

function playSound(name) {
    if (name === "click") {
        playTone(520, 0.06, "triangle", 0.15);
    } else if (name === "match") {
        playTone(660, 0.08, "triangle", 0.18);
        setTimeout(() => playTone(880, 0.10, "triangle", 0.18), 90);
    } else if (name === "wrong") {
        playTone(220, 0.10, "sawtooth", 0.16);
        setTimeout(() => playTone(160, 0.15, "sawtooth", 0.14), 100);
    } else if (name === "win") {
        playTone(523, 0.10, "triangle", 0.20);
        setTimeout(() => playTone(659, 0.10, "triangle", 0.20), 100);
        setTimeout(() => playTone(784, 0.10, "triangle", 0.20), 200);
        setTimeout(() => playTone(1047, 0.22, "triangle", 0.22), 300);
    } else if (name === "lose") {
        playTone(330, 0.14, "sine", 0.18);
        setTimeout(() => playTone(247, 0.18, "sine", 0.16), 140);
    } else if (name === "coin") {
        playTone(988, 0.07, "square", 0.16);
        setTimeout(() => playTone(1319, 0.07, "square", 0.16), 70);
        setTimeout(() => playTone(1568, 0.10, "square", 0.14), 130);
    } else if (name === "eat") {
        // Nom-nom eating sound
        playTone(280, 0.06, "sine", 0.14);
        setTimeout(() => playTone(320, 0.06, "sine", 0.14), 100);
        setTimeout(() => playTone(280, 0.06, "sine", 0.12), 200);
    } else if (name === "sleep") {
        // Soft snore
        playTone(160, 0.30, "sine", 0.12);
        setTimeout(() => playTone(140, 0.35, "sine", 0.10), 350);
    } else if (name === "wash") {
        // Shower / water noise via noise burst pattern
        playNoiseBurst(0.35, 0.14, 0, 1800, "bandpass");
        playNoiseBurst(0.25, 0.10, 0.40, 2400, "bandpass");
    } else if (name === "play") {
        // Bouncy happy tune
        playTone(660, 0.07, "triangle", 0.18);
        setTimeout(() => playTone(880, 0.07, "triangle", 0.18), 80);
        setTimeout(() => playTone(660, 0.07, "triangle", 0.16), 160);
        setTimeout(() => playTone(784, 0.10, "triangle", 0.18), 240);
    } else if (name === "pet") {
        // Gentle stroke
        playTone(740, 0.12, "sine", 0.14);
        setTimeout(() => playTone(880, 0.14, "sine", 0.12), 120);
    }
}

/* ===== Zoo Pet World animal sounds ===== */
function playToneAt(freq, duration, type = "sine", volume = 0.04, delay = 0, slideTo = null) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioContext) return;

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = audioContext.currentTime + delay;
    const end = start + duration;

    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);

    if (slideTo !== null) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), end);
    }

    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(volume * soundVolume, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, end);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(start);
    osc.stop(end + 0.03);
}

function playNoiseBurst(duration = 0.18, volume = 0.035, delay = 0, filterFreq = 900, filterType = "bandpass") {
    if (!soundEnabled) return;
    initAudio();
    if (!audioContext) return;

    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, Math.max(1, Math.floor(sampleRate * duration)), sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }

    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    const start = audioContext.currentTime + delay;

    filter.type = filterType;
    filter.frequency.value = filterFreq;
    filter.Q.value = 1.2;

    gain.gain.setValueAtTime(volume * soundVolume, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);

    source.start(start);
    source.stop(start + duration + 0.02);
}

function playChirp(base = 780) {
    playToneAt(base, 0.08, "triangle", 0.035, 0, base * 1.45);
    playToneAt(base * 1.25, 0.07, "triangle", 0.03, 0.08, base * 0.95);
}


function animalPulse(freq, duration, type = "sine", volume = 0.04, delay = 0, slideTo = null) {
    playToneAt(freq, duration, type, volume, delay, slideTo);
}

function animalNoise(duration, volume, delay, filterFreq, filterType = "bandpass") {
    playNoiseBurst(duration, volume, delay, filterFreq, filterType);
}

function animalRumble(base = 90, power = 1) {
    animalNoise(0.30, 0.038 * power, 0, 190, "lowpass");
    animalPulse(base, 0.36, "sawtooth", 0.038 * power, 0.02, base * 0.55);
    animalPulse(base * 1.55, 0.24, "sawtooth", 0.018 * power, 0.10, base * 0.8);
    animalNoise(0.16, 0.02 * power, 0.22, 420, "lowpass");
}

function animalChirp(base = 760, count = 2) {
    for (let i = 0; i < count; i++) {
        animalPulse(base + i * 80, 0.065, "triangle", 0.034, i * 0.08, base * 1.35);
    }
}

function playAnimalSound(key) {
    if (!soundEnabled) return;
    initAudio();

    const soundKey = animalSoundMap[key] || "soft";

    switch (soundKey) {
        case "lion":
            animalRumble(82, 1.05);
            animalPulse(120, 0.22, "sawtooth", 0.018, 0.16, 70);
            break;

        case "tiger":
            animalRumble(95, 0.92);
            animalNoise(0.13, 0.022, 0.18, 620, "bandpass");
            break;

        case "bear":
        case "polarBear":
            animalRumble(76, 0.85);
            animalPulse(130, 0.16, "triangle", 0.018, 0.14, 88);
            break;

        case "wolf":
            animalPulse(360, 0.32, "sine", 0.028, 0, 650);
            animalPulse(650, 0.38, "sine", 0.022, 0.22, 420);
            break;

        case "elephant":
            animalPulse(180, 0.24, "sawtooth", 0.035, 0, 620);
            animalPulse(520, 0.22, "triangle", 0.032, 0.14, 920);
            animalNoise(0.12, 0.014, 0.30, 1800, "bandpass");
            break;

        case "frog":
            animalPulse(155, 0.14, "sawtooth", 0.038, 0, 115);
            animalPulse(135, 0.15, "sawtooth", 0.038, 0.16, 105);
            animalPulse(120, 0.12, "sine", 0.018, 0.31, 100);
            break;

        case "snake":
            animalNoise(0.42, 0.032, 0, 5200, "highpass");
            animalNoise(0.22, 0.018, 0.12, 7200, "highpass");
            break;

        case "monkey":
            animalPulse(820, 0.06, "square", 0.032, 0, 980);
            animalPulse(610, 0.07, "square", 0.033, 0.07, 850);
            animalPulse(920, 0.06, "square", 0.028, 0.15, 720);
            animalPulse(740, 0.06, "triangle", 0.026, 0.23, 890);
            break;

        case "dog":
            animalPulse(520, 0.075, "square", 0.038, 0, 390);
            animalPulse(610, 0.075, "square", 0.034, 0.11, 450);
            break;

        case "fox":
            animalPulse(680, 0.08, "square", 0.028, 0, 960);
            animalPulse(920, 0.07, "triangle", 0.026, 0.10, 640);
            break;

        case "cat":
            animalPulse(620, 0.18, "triangle", 0.031, 0, 900);
            animalPulse(920, 0.12, "sine", 0.018, 0.14, 700);
            break;

        case "cow":
            animalPulse(155, 0.34, "sawtooth", 0.038, 0, 115);
            animalPulse(125, 0.25, "sine", 0.026, 0.20, 102);
            break;

        case "horse":
        case "zebra":
            animalPulse(430, 0.12, "sawtooth", 0.035, 0, 280);
            animalPulse(530, 0.12, "triangle", 0.029, 0.12, 380);
            animalNoise(0.07, 0.014, 0.21, 1400, "bandpass");
            break;

        case "sheep":
        case "goat":
            animalPulse(410, 0.13, "triangle", 0.032, 0, 350);
            animalPulse(470, 0.13, "triangle", 0.032, 0.14, 390);
            break;

        case "duck":
            animalPulse(390, 0.08, "square", 0.035, 0, 330);
            animalPulse(430, 0.08, "square", 0.032, 0.10, 350);
            break;

        case "chicken":
            animalChirp(760, 3);
            animalPulse(520, 0.06, "triangle", 0.023, 0.20, 700);
            break;

        case "owl":
            animalPulse(330, 0.17, "sine", 0.032, 0, 280);
            animalPulse(245, 0.20, "sine", 0.030, 0.17, 220);
            break;

        case "parrot":
        case "flamingo":
            animalChirp(860, 3);
            animalPulse(1180, 0.05, "triangle", 0.018, 0.22, 920);
            break;

        case "penguin":
            animalChirp(620, 2);
            animalPulse(480, 0.075, "triangle", 0.020, 0.16, 560);
            break;

        case "whale":
            animalPulse(80, 0.58, "sine", 0.038, 0, 135);
            animalPulse(150, 0.42, "sine", 0.024, 0.32, 92);
            break;

        case "dolphin":
            animalPulse(1200, 0.075, "sine", 0.026, 0, 1700);
            animalPulse(1500, 0.075, "sine", 0.023, 0.10, 950);
            animalPulse(980, 0.06, "sine", 0.020, 0.19, 1400);
            break;

        case "crocodile":
            animalNoise(0.18, 0.03, 0, 390, "lowpass");
            animalPulse(110, 0.20, "sawtooth", 0.027, 0.07, 78);
            break;

        case "hippo":
            animalPulse(120, 0.25, "sawtooth", 0.032, 0, 95);
            animalNoise(0.18, 0.022, 0.12, 260, "lowpass");
            break;

        case "panda":
        case "koala":
        case "seal":
            animalPulse(260, 0.17, "sine", 0.031, 0, 210);
            animalPulse(330, 0.13, "triangle", 0.024, 0.12, 290);
            break;

        case "rabbit":
        case "squirrel":
        case "hedgehog":
            animalPulse(820, 0.055, "triangle", 0.020, 0, 980);
            animalPulse(920, 0.055, "triangle", 0.018, 0.08, 760);
            break;

        case "giraffe":
        case "deer":
        case "camel":
        case "kangaroo":
            animalPulse(350, 0.12, "triangle", 0.026, 0, 420);
            animalPulse(300, 0.12, "triangle", 0.022, 0.12, 255);
            break;

        case "turtle":
            animalPulse(230, 0.12, "triangle", 0.018, 0, 210);
            break;

        case "octopus":
            animalPulse(300, 0.09, "sine", 0.022, 0, 240);
            animalPulse(360, 0.08, "sine", 0.018, 0.08, 280);
            animalNoise(0.08, 0.014, 0.12, 900, "bandpass");
            break;

        case "bat":
            animalPulse(1400, 0.045, "sine", 0.018, 0, 1900);
            animalPulse(1700, 0.045, "sine", 0.015, 0.06, 1200);
            break;

        default:
            animalPulse(520, 0.08, "triangle", 0.024);
            animalPulse(700, 0.08, "triangle", 0.020, 0.08);
            break;
    }
}

const animalSoundMap = {
    lion: "lion",
    panda: "panda",
    fox: "fox",
    elephant: "elephant",
    giraffe: "giraffe",
    monkey: "monkey",
    tiger: "tiger",
    koala: "koala",
    rabbit: "rabbit",
    frog: "frog",
    zebra: "zebra",
    penguin: "penguin",
    hippo: "bear",
    owl: "owl",
    bear: "bear",
    deer: "deer",
    raccoon: "fox",
    turtle: "turtle",
    parrot: "parrot",
    dog: "dog",
    cat: "cat",
    cow: "cow",
    horse: "horse",
    camel: "camel",
    sheep: "sheep",
    goat: "goat",
    crocodile: "crocodile",
    snake: "snake",
    kangaroo: "kangaroo",
    dolphin: "dolphin",
    whale: "whale",
    octopus: "octopus",
    flamingo: "flamingo",
    chicken: "chicken",
    duck: "duck",
    wolf: "wolf",
    squirrel: "squirrel",
    hedgehog: "hedgehog",
    bat: "bat",
    seal: "seal",
    polarBear: "polarBear"
};



const musicTracks = {
    happyZoo: {
        label: "Весёлый зоопарк", tempo: 230,
        melody: [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880.00, 783.99],
        bass: [261.63, 329.63, 392.00, 329.63], wave: "triangle", sparkle: true
    },
    calmForest: {
        label: "Спокойный лес", tempo: 360,
        melody: [392.00, 440.00, 523.25, 493.88, 440.00, 392.00, 349.23, 392.00],
        bass: [196.00, 220.00, 261.63, 220.00], wave: "sine", sparkle: false
    },
    nightZoo: {
        label: "Ночной зоопарк", tempo: 430,
        melody: [329.63, 392.00, 493.88, 440.00, 392.00, 329.63, 293.66, 329.63],
        bass: [164.81, 196.00, 246.94, 196.00], wave: "sine", sparkle: true
    },
    oceanarium: {
        label: "Океанариум", tempo: 390,
        melody: [523.25, 587.33, 698.46, 783.99, 698.46, 587.33, 523.25, 440.00],
        bass: [130.81, 196.00, 174.61, 220.00], wave: "triangle", sparkle: true
    },
    softPiano: {
        label: "Мягкое пианино", tempo: 320,
        melody: [440.00, 523.25, 659.25, 587.33, 523.25, 493.88, 440.00, 392.00],
        bass: [220.00, 261.63, 329.63, 293.66], wave: "triangle", sparkle: false
    },
    adventureTime: {
        label: "Приключение", tempo: 200,
        melody: [659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 659.25, 783.99],
        bass: [329.63, 392.00, 440.00, 392.00], wave: "square", sparkle: true
    },
    bubbles: {
        label: "Пузырьки", tempo: 300,
        melody: [783.99, 880.00, 1046.50, 880.00, 783.99, 698.46, 783.99, 880.00],
        bass: [196.00, 261.63, 246.94, 220.00], wave: "sine", sparkle: true
    },
    jungleCall: {
        label: "Джунгли", tempo: 250,
        melody: [349.23, 440.00, 349.23, 392.00, 349.23, 329.63, 349.23, 392.00],
        bass: [174.61, 220.00, 174.61, 196.00], wave: "sawtooth", sparkle: false
    },
    starryNight: {
        label: "Звёздная ночь", tempo: 480,
        melody: [587.33, 659.25, 739.99, 659.25, 587.33, 554.37, 587.33, 659.25],
        bass: [146.83, 164.81, 185.00, 164.81], wave: "sine", sparkle: true
    },
    morningZoo: {
        label: "Утро в зоопарке", tempo: 210,
        melody: [523.25, 622.25, 698.46, 784.00, 880.00, 784.00, 698.46, 622.25],
        bass: [261.63, 311.13, 349.23, 392.00], wave: "triangle", sparkle: true
    },
    rainforest: {
        label: "Тропический дождь", tempo: 340,
        melody: [466.16, 523.25, 587.33, 622.25, 587.33, 523.25, 466.16, 440.00],
        bass: [233.08, 261.63, 293.66, 311.13], wave: "sine", sparkle: false
    },
    circusTheme: {
        label: "Цирк зверей", tempo: 190,
        melody: [659.25, 698.46, 659.25, 622.25, 587.33, 659.25, 783.99, 880.00],
        bass: [329.63, 349.23, 329.63, 311.13], wave: "triangle", sparkle: true
    },
    sleepyPanda: {
        label: "Сонная панда", tempo: 520,
        melody: [329.63, 369.99, 392.00, 369.99, 329.63, 311.13, 293.66, 311.13],
        bass: [130.81, 146.83, 164.81, 146.83], wave: "sine", sparkle: false
    },
    savanna: {
        label: "Саванна", tempo: 270,
        melody: [392.00, 466.16, 523.25, 466.16, 440.00, 392.00, 349.23, 392.00],
        bass: [196.00, 233.08, 261.63, 233.08], wave: "triangle", sparkle: false
    },
    iceArctic: {
        label: "Арктика", tempo: 400,
        melody: [587.33, 659.25, 587.33, 523.25, 493.88, 523.25, 587.33, 659.25],
        bass: [293.66, 329.63, 293.66, 261.63], wave: "sine", sparkle: true
    }
};

function getCurrentMusicTrack() {
    return musicTracks[selectedMusicTrack] || musicTracks.happyZoo;
}

function playMusicTone(freq, duration, delay = 0, volume = 0.018, type = "triangle") {
    if (!musicEnabled || musicVolume <= 0) return;
    initAudio();
    if (!audioContext) return;

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = audioContext.currentTime + delay;

    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume * musicVolume, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
}

function startBackgroundMusic() {
    if (!musicEnabled || musicTimer) return;
    initAudio();

    const track = getCurrentMusicTrack();
    musicTempo = track.tempo;
    const melodyLen = track.melody.length;
    const bassLen = track.bass.length;

    musicTimer = setInterval(() => {
        if (!musicEnabled) return;

        const currentTrack = getCurrentMusicTrack();
        const melody = currentTrack.melody;
        const bass = currentTrack.bass;
        const note = melody[musicStep % melody.length];
        const bassNote = bass[Math.floor(musicStep / 2) % bass.length];

        playMusicTone(note, 0.18, 0, 0.017, currentTrack.wave || "triangle");

        if (musicStep % 2 === 0) {
            playMusicTone(bassNote, 0.24, 0.02, 0.010, "sine");
        }

        if (currentTrack.sparkle && musicStep % 4 === 0) {
            playMusicTone(note * 1.5, 0.075, 0.12, 0.007, "triangle");
        }

        musicStep++;

        // Auto-rotate to a random new track after each full cycle (32 steps)
        if (musicStep > 0 && musicStep % 32 === 0 && parentSettings.autoRotateMusic !== false) {
            const keys = Object.keys(musicTracks);
            const others = keys.filter(k => k !== selectedMusicTrack);
            if (others.length > 0) {
                selectedMusicTrack = others[Math.floor(Math.random() * others.length)];
                musicStep = 0;
                clearInterval(musicTimer);
                musicTimer = null;
                updateMusicButton();
                if (musicEnabled && !musicTimer) startBackgroundMusic();
            }
        }
    }, musicTempo);
}

function stopBackgroundMusic() {
    if (musicTimer) {
        clearInterval(musicTimer);
        musicTimer = null;
    }
}


function updateMusicButton() {
    if (musicButton) {
        const track = getCurrentMusicTrack();
        musicButton.textContent = musicEnabled ? `${t('settings.music')}: ${track.label}` : t('music.off');
    }
}

function updateSoundButton() {
    if (soundButton) {
        soundButton.textContent = soundEnabled ? `${t('sound.on').replace('Вкл','').replace('On','').trim()}: ${Math.round(soundVolume * 100)}%` : t('sound.off');
    }
}

function openAudioSettings() {
    loadScriptOnce("assets/js/features/audioSettings.js", () => { openAudioSettings(); });
}

function toggleMusic() {
    musicEnabled = !musicEnabled;
    parentSettings.musicEnabled = musicEnabled;
    saveProgress();
    updateMusicButton();
    if (typeof renderAudioSettings === "function") renderAudioSettings();
    playSound("click");

    if (musicEnabled) {
        startBackgroundMusic();
    } else {
        stopBackgroundMusic();
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    if (soundEnabled && soundVolume <= 0) soundVolume = 0.85;
    saveProgress();
    updateSoundButton();
    if (typeof renderAudioSettings === "function") renderAudioSettings();
    if (soundEnabled) playSound("click");
}

function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function starString(count) {
    return "⭐".repeat(count) + "☆".repeat(3 - count);
}

function renderMap() {
    currentMode = normalizeMemoryMode(currentMode);
    modeLabel.textContent = currentMode === 'timed' ? t('mode.timed') : t('mode.calm');
    const mapChip = document.getElementById("mapModeChip");
    if (mapChip) mapChip.textContent = currentMode === 'timed' ? t('mode.timer_chip') : t('mode.calm_chip');
    mapList.innerHTML = "";
    levels.forEach((level, index) => {
        const unlocked = index <= maxUnlockedLevel;
        const stars = levelStars[index] || 0;
        const item = document.createElement("div");
        item.className = "map-item";
        const icon = document.createElement("div");
        icon.className = "map-icon";
        const img = document.createElement("img");
        img.src = animalImageSrc(level.animal);
        icon.appendChild(img);

        const content = document.createElement("div");
        const title = document.createElement("div");
        title.className = "map-title";
        title.textContent = `${index + 1}. ${level.title}`;
        const desc = document.createElement("div");
        desc.className = "map-desc";
        desc.textContent = unlocked
            ? `${level.zoneIcon || "🗺️"} ${level.zoneName || "Зоопарк"} • ${level.pairs} пар • ${currentMode === "timed" ? level.time + " сек" : "без таймера"}`
            : "Закрыто. Пройди предыдущий вольер.";
        const starsBox = document.createElement("div");
        starsBox.className = "stars";
        starsBox.textContent = starString(stars);
        const btn = document.createElement("button");
        btn.className = unlocked ? "btn btn-green" : "btn btn-red";
        btn.textContent = unlocked ? t('pairs.play') : t('pairs.locked');
        btn.disabled = !unlocked;
        btn.onclick = () => startLevel(index);

        content.appendChild(title);
        content.appendChild(desc);

        const typeBadge = document.createElement("div");
        typeBadge.className = "level-type-badge";
        typeBadge.textContent = getLevelTypeLabel(level.type);
        content.appendChild(typeBadge);
        content.appendChild(starsBox);
        content.appendChild(btn);

        item.appendChild(icon);
        item.appendChild(content);
        mapList.appendChild(item);
    });
}


function getLevelAnimals(config) {
    const selected = [];
    const used = new Set();

    function addByKey(key) {
        const animal = animals.find(item => item.key === key);
        if (animal && !used.has(key)) {
            selected.push(animal);
            used.add(key);
        }
    }

    // Главный зверь уровня всегда участвует.
    addByKey(config.animal);

    // Каждый уровень получает свой сдвиг по списку животных.
    const start = (config.levelNumber * 5 + config.pairs * 3) % animalKeys.length;
    const step = 7 + (config.levelNumber % 5);

    let cursor = start;
    let guard = 0;

    while (selected.length < config.pairs && guard < animalKeys.length * 3) {
        addByKey(animalKeys[cursor % animalKeys.length]);
        cursor += step;
        guard++;
    }

    // Fallback на случай любых редких коллизий.
    for (const key of animalKeys) {
        if (selected.length >= config.pairs) break;
        addByKey(key);
    }

    return selected.slice(0, config.pairs);
}

function startLevel(index) {
    currentMode = normalizeMemoryMode(currentMode);
    initAudio();
    playSound("click");
    clearInterval(timerId);
    hideOverlay();

    levelIndex = index;
    const config = levels[levelIndex];
    window.currentLevelMistakes = 0;
    window.targetAnimalKey = config.animal;
    const selectedAnimals = getLevelAnimals(config);

    cards = shuffle([...selectedAnimals, ...selectedAnimals]).map((animal, id) => ({
        id,
        key: animal.key,
        image: animal.image,
        featured: animal.key === config.animal,
        open: false,
        matched: false
    }));

    opened = [];
    matchedPairs = 0;
    moves = 0;
    locked = false;
    levelFinished = false;
    totalTime = config.time;
    timeLeft = currentMode === "timed" ? config.time : 0;

    levelText.textContent = String(levelIndex + 1);
    movesText.textContent = "0";
    const timerSpanAtStart = document.getElementById("timer");
    if (timerSpanAtStart) timerSpanAtStart.textContent = currentMode === "timed" ? String(timeLeft) : "";
    timerBox.classList.remove("danger");
    progressFill.style.width = currentMode === "timed" ? "100%" : "0%";
    message.textContent = `${config.title}: ${getLevelTypeLabel(config.type)} • ${config.pairs} пар${currentMode === "timed" ? " • " + config.time + "с" : ""}`;
    levelTitle.textContent = config.title;
    levelSubtitle.textContent = currentMode === 'timed' ? t('mode.timed_subtitle') : t('mode.calm_subtitle');
    const gameChip = document.getElementById("gameModeChip");
    if (gameChip) gameChip.textContent = currentMode === 'timed' ? t('mode.timer_chip') : t('mode.calm_chip');

    if (currentMode === "calm") {
        timerBox.innerHTML = t('mode.calm_html');
        progressBox.style.display = "none";
    } else {
        timerBox.innerHTML = `⏱ <span id="timer">${timeLeft}</span>с`;
        progressBox.style.display = "block";
    }

    board.className = `board cols-${config.cols}`;
    showScreen("gameScreen");
    renderCards();

    if (currentMode === "timed") {
        startTimer();
    }
}

function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => {
        if (levelFinished) return;

        timeLeft--;
        const timerSpan = document.getElementById("timer");
        if (timerSpan) timerSpan.textContent = String(timeLeft);

        const percent = Math.max(0, (timeLeft / totalTime) * 100);
        progressFill.style.width = percent + "%";

        if (timeLeft <= 10) {
            timerBox.classList.add("danger");
            message.textContent = t('pairs.hurry');
        }

        if (timeLeft <= 0) {
            loseLevel();
        }
    }, 1000);
}

function renderCards() {
    board.innerHTML = "";

    cards.forEach(card => {
        const button = document.createElement("button");
        button.className = "memory-card";
        if (card.featured) button.classList.add("featured");

        if (card.matched) {
            button.classList.add("matched");
            const art = document.createElement("div");
            art.className = "card-art";
            const img = document.createElement("img");
            img.src = card.image;
            img.alt = card.key;
            art.appendChild(img);
            button.appendChild(art);
        } else if (card.open) {
            button.classList.add("open");
            const art = document.createElement("div");
            art.className = "card-art";
            const img = document.createElement("img");
            img.src = card.image;
            img.alt = card.key;
            art.appendChild(img);
            button.appendChild(art);
        } else {
            button.classList.add("back");
        }

        button.onclick = () => openCard(card.id);
        board.appendChild(button);
    });
}

function openCard(id) {
    if (locked || levelFinished) return;

    initAudio();

    const card = cards.find(item => item.id === id);
    if (!card || card.open || card.matched) return;

    playSound("click");
    playAnimalSound(card.key);

    card.open = true;
    opened.push(card);
    renderCards();

    if (opened.length === 2) {
        moves++;
        movesText.textContent = String(moves);

        const first = opened[0];
        const second = opened[1];

        if (first.key === second.key) {
            first.matched = true;
            second.matched = true;
            opened = [];
            matchedPairs++;
            updateTaskProgress("pairs", 1);
            playSound("match");
            message.textContent = t('pairs.found', {matched: matchedPairs, total: levels[levelIndex].pairs});

            if (matchedPairs >= levels[levelIndex].pairs) {
                renderCards();
                setTimeout(() => {
                    if (!levelFinished) winLevel();
                }, 220);
                return;
            }

            renderCards();
        } else {
            window.currentLevelMistakes = (window.currentLevelMistakes || 0) + 1;
            locked = true;
            playSound("wrong");
            message.textContent = levels[levelIndex].type === 'noMistake' ? t('pairs.no_mistake_wrong') : t('pairs.wrong');

            setTimeout(() => {
                first.open = false;
                second.open = false;
                opened = [];
                locked = false;
                if (!levelFinished) {
                    message.textContent = t('pairs.next_pair');
                }
                renderCards();
            }, 650);
        }
    }
}

function calculateStars() {
    const config = levels[levelIndex];
    const perfectMoves = config.pairs;
    const goodMoves = config.pairs + Math.ceil(config.pairs * 0.7);

    if (currentMode === "calm") {
        if (moves <= goodMoves) return 3;
        if (moves <= goodMoves + config.pairs) return 2;
        return 1;
    }

    const timeRatio = timeLeft / totalTime;
    if (moves <= goodMoves && timeRatio >= 0.35) return 3;
    if (moves <= goodMoves + config.pairs && timeRatio >= 0.15) return 2;
    return 1;
}



function hideOverlay() {
    if (!overlay) return;
    overlay.classList.remove("show");
    overlay.style.display = "";
    overlay.style.opacity = "";
    overlay.style.pointerEvents = "";
    overlay.style.zIndex = "";
}

function forceShowVictoryPopup() {
    if (!overlay) return;
    overlay.style.display = "flex";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
    overlay.style.zIndex = "9999";
    overlay.classList.add("show");
}

function winLevel() {
    levelFinished = true;
    clearInterval(timerId);
    timerBox.classList.remove("danger");
    if (currentMode === "calm") {
        timerBox.innerHTML = "🧘 Без таймера";
        progressBox.style.display = "none";
        progressFill.style.width = "0%";
    } else {
        progressBox.style.display = "block";
        progressFill.style.width = "100%";
    }

    const config = levels[levelIndex];
    let stars = calculateStars();
    if (config.type === "noMistake" && (window.currentLevelMistakes || 0) > 0) stars = Math.min(stars, 2);
    const timeBonus = currentMode === "timed" ? Math.max(0, Math.floor(timeLeft / 5)) : 3;
    const reward = halfReward(config.reward + timeBonus + stars * 3);

    coins += reward;
    levelStars[levelIndex] = Math.max(levelStars[levelIndex] || 0, stars);
    maxUnlockedLevel = Math.max(maxUnlockedLevel, Math.min(levelIndex + 1, levels.length - 1));

    let newAnimals = [];
    config.unlock.forEach(key => {
        if (!albumUnlocked.includes(key)) {
            albumUnlocked.push(key);
            newAnimals.push(key);
        }
    });

    updateTaskProgress("levels", 1);
    updateTaskProgress("play", 1);
    if (stars === 3) updateTaskProgress("threeStars", 1);

    saveProgress();
    updateCoinsViews();

    playSound("win");
    setTimeout(() => playSound("coin"), 380);

    if (window.AndroidBridge && typeof window.AndroidBridge.onLevelCompleted === "function") {
        window.AndroidBridge.onLevelCompleted(levelIndex + 1);
    }

    createCelebration();

    const newAnimalKey = newAnimals[0] || config.animal;
    modalAnimalImg.src = animalImageSrc(newAnimalKey);
    modalAnimal.classList.remove("show");
    void modalAnimal.offsetWidth;
    modalAnimal.classList.add("show");

    const isLastLevel = levelIndex === levels.length - 1;
    modalIcon.textContent = isLastLevel ? "🏆" : "🎉";
    modalTitle.textContent = isLastLevel ? t('pairs.win_all') : t('pairs.win_title');
    modalStars.textContent = starString(stars);
    modalText.textContent = t('pairs.win_text', {reward, animal: animalInfo[newAnimalKey].name});
    modalButton.textContent = isLastLevel ? t('pairs.win_restart') : t('pairs.win_next');
    modalButton.onclick = isLastLevel ? () => startLevel(0) : nextLevel;
    hideOverlay();
    void overlay.offsetWidth;
    overlay.classList.add("show");
    forceShowVictoryPopup();
}

function loseLevel() {
    levelFinished = true;
    clearInterval(timerId);
    locked = true;
    timeLeft = 0;
    progressFill.style.width = "0%";
    timerBox.classList.add("danger");
    playSound("lose");

    modalIcon.textContent = "⏳";
    modalTitle.textContent = t('pairs.timeout_title');
    modalStars.textContent = "☆☆☆";
    modalText.textContent = t('pairs.timeout_text');
    modalAnimal.classList.remove("show");
    modalButton.textContent = t('pairs.retry');
    modalButton.onclick = restartLevel;
    forceShowVictoryPopup();
}

function nextLevel() {
    playSound("click");
    hideOverlay();
    const next = levelIndex + 1;
    if (next >= levels.length) {
        startLevel(0);
    } else {
        startLevel(next);
    }
}

function restartLevel() {
    playSound("click");
    hideOverlay();
    startLevel(levelIndex);
}

function openMapFromGame() {
    playSound("click");
    showScreen("mapScreen");
}

function openMapFromModal() {
    playSound("click");
    hideOverlay();
    showScreen("mapScreen");
}

function createCelebration() {
    createConfetti();
    createStars();
    createCoins();
}

function createConfetti() {
    const colors = ["#f97316", "#22c55e", "#38bdf8", "#ec4899", "#8b5cf6", "#facc15"];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.35 + "s";
        piece.style.animationDuration = (0.9 + Math.random() * 0.9) + "s";
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 2100);
    }
}

function createStars() {
    for (let i = 0; i < 20; i++) {
        const piece = document.createElement("div");
        piece.className = "star-piece";
        piece.textContent = "⭐";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.animationDelay = Math.random() * 0.4 + "s";
        piece.style.animationDuration = (0.9 + Math.random() * 0.9) + "s";
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 2100);
    }
}

function createCoins() {
    for (let i = 0; i < 16; i++) {
        const piece = document.createElement("div");
        piece.className = "coin-piece";
        piece.textContent = "🪙";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.animationDelay = Math.random() * 0.4 + "s";
        piece.style.animationDuration = (0.9 + Math.random() * 0.9) + "s";
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 2100);
    }
}

// --- Lazy feature-module loader (Stage 6.1.7 RESET architecture pilot) ---
// Loads a classic <script> on demand and runs the callback once it's ready.
// Using a plain <script> tag (not an ES module/import()) is deliberate: this
// project is opened via file://, where dynamic import() is blocked by the
// browser the same way external-image canvas reads were (see Step 2.2 notes).
// Classic <script src> tags are not subject to that restriction and already
// work fine under file:// elsewhere in this codebase.
const __loadedFeatureScripts = {};
function loadScriptOnce(src, callback) {
    const state = __loadedFeatureScripts[src];
    if (state && state.status === "loaded") { callback(); return; }
    if (state && state.status === "loading") { state.queue.push(callback); return; }
    __loadedFeatureScripts[src] = { status: "loading", queue: [callback] };
    const tag = document.createElement("script");
    tag.src = src;
    tag.onload = () => {
        __loadedFeatureScripts[src].status = "loaded";
        __loadedFeatureScripts[src].queue.forEach(cb => cb());
        __loadedFeatureScripts[src].queue = [];
    };
    tag.onerror = () => {
        console.error("Feature module failed to load:", src);
    };
    document.body.appendChild(tag);
}

function openAlbum() {
    // First call loads assets/js/features/album.js, which defines the real
    // openAlbum()/renderAlbum() and overwrites these global names — then we
    // call through to the freshly-loaded real implementation.
    loadScriptOnce("assets/js/features/album.js", () => { openAlbum(); });
}



function openPetRoom() {
    playSound("click");
    const preferred = selectedMainPetKey || playerProfile.favorite || "lion";
    selectedMainPetKey = albumUnlocked.includes(preferred) ? preferred : (albumUnlocked[0] || "lion");
    selectedPetKey = selectedMainPetKey;
    showScreen("petRoomScreen");
}

function clampCare(value) {
    return clamp(Math.round(Number(value) || 0), 0, 100);
}

function getPetCare(key) {
    const now = Date.now();
    const saved = petCareStats[key] || {};
    const care = {
        hunger: clampCare(saved.hunger ?? 72),
        mood: clampCare(saved.mood ?? 76),
        energy: clampCare(saved.energy ?? 68),
        cleanliness: clampCare(saved.cleanliness ?? 74),
        careActions: Number(saved.careActions || 0),
        updatedAt: Number(saved.updatedAt || now)
    };

    const hours = Math.min(12, Math.max(0, Math.floor((now - care.updatedAt) / 3600000)));
    if (hours > 0) {
        care.hunger = clampCare(care.hunger - hours * 4);
        care.cleanliness = clampCare(care.cleanliness - hours * 3);
        care.mood = clampCare(care.mood - hours * 2);
        care.energy = clampCare(care.energy + hours * 2);
        care.updatedAt = now;
        petCareStats[key] = care;
        saveProgress();
    }

    return care;
}

function setPetCare(key, patch = {}) {
    const current = getPetCare(key);
    petCareStats[key] = {
        ...current,
        ...patch,
        hunger: clampCare(patch.hunger ?? current.hunger),
        mood: clampCare(patch.mood ?? current.mood),
        energy: clampCare(patch.energy ?? current.energy),
        cleanliness: clampCare(patch.cleanliness ?? current.cleanliness),
        careActions: Number(patch.careActions ?? current.careActions),
        updatedAt: Date.now()
    };
    saveProgress();
}

function getPetRoomMoodText(care) {
    if (care.hunger < 28) return "голодный 😋";
    if (care.cleanliness < 30) return "грязный 🚿";
    if (care.energy < 25) return "сонный 🌙";
    if (care.mood > 82) return "счастливый 💚";
    return "спокойный 🐾";
}

function getPetRoomMode(care) {
    if (care.energy < 25) return "sleep";
    if (care.mood > 82) return "greet";
    return "walk";
}

function getCareLevelClass(value) {
    if (value < 30) return "critical";
    if (value < 60) return "warn";
    return "good";
}

function getPetNeeds(care) {
    const needs = [];
    if (care.hunger < 35) needs.push({ type: "feed", text: "покормить", icon: "🥣" });
    if (care.cleanliness < 35) needs.push({ type: "wash", text: "помыть", icon: "🚿" });
    if (care.energy < 35) needs.push({ type: "sleep", text: "уложить спать", icon: "🌙" });
    if (care.mood < 35) needs.push({ type: "play", text: "поиграть", icon: "🎈" });
    return needs;
}

function getPetReminderText(care, name) {
    const needs = getPetNeeds(care);
    if (!needs.length) return "";
    const main = needs[0];
    const extra = needs.slice(1).map(item => item.text).join(", ");
    return `${main.icon} ${name} просит: ${main.text}${extra ? `, ещё ${extra}` : ""}`;
}

function renderPetRoomBars(care) {
    if (!petRoomBars) return;
    const items = [
        ["🍽️", "Сытость", care.hunger],
        ["💚", "Настроение", care.mood],
        ["⚡", "Энергия", care.energy],
        ["🫧", "Чистота", care.cleanliness]
    ];
    petRoomBars.innerHTML = items.map(([icon, label, value]) => {
        const levelClass = getCareLevelClass(value);
        return `
            <div class="pet-stat-bar ${levelClass}">
                <div class="pet-stat-bar-title"><span>${icon} ${label}</span><span>${value}%</span></div>
                <div class="pet-stat-track"><div class="pet-stat-fill ${levelClass}" style="width:${value}%"></div></div>
            </div>
        `;
    }).join("");
}

function renderPetRoom() {
    const fallback = albumUnlocked[0] || "lion";
    if (!albumUnlocked.includes(selectedMainPetKey)) selectedMainPetKey = fallback;
    selectedPetKey = selectedMainPetKey;

    const care = getPetCare(selectedMainPetKey);
    const displayName = getAnimalDisplayName(selectedMainPetKey);
    const moodText = getPetRoomMoodText(care);

    applyCleanRoomBackground(petRoomHero, selectedMainPetKey);

    if (petRoomSubtitle) petRoomSubtitle.textContent = `${displayName}: ${animalInfo[selectedMainPetKey].fact}`;
    const reminderText = getPetReminderText(care, displayName);
    if (petRoomSpeech) petRoomSpeech.textContent = reminderText || `${displayName} ${moodText}. ${t('btn.next')}?`;
    if (petRoomReminder) {
        petRoomReminder.textContent = reminderText;
        petRoomReminder.classList.toggle("show", Boolean(reminderText));
    }
    if (petRoomCareCount) petRoomCareCount.textContent = String(care.careActions || 0);
    if (petRoomFeedCount) petRoomFeedCount.textContent = String(animalFeedCount[selectedMainPetKey] || 0);
    if (petRoomMoodLabel) petRoomMoodLabel.textContent = moodText;

    renderPetRoomBars(care);
    renderPetRoomFoodRail();
    renderPetActorInto(petRoomAnimatedMount, selectedMainPetKey, getPetRoomMode(care), lastFedFoodEmoji);
    maybeShowPetReminder(reminderText);
    updateCoinsViews();
}

function setPetRoomMode(mode, autoReturnMs = 0) {
    renderPetActorInto(petRoomAnimatedMount, selectedMainPetKey, mode, lastFedFoodEmoji);
    if (autoReturnMs > 0) {
        setTimeout(() => {
            const care = getPetCare(selectedMainPetKey);
            renderPetActorInto(petRoomAnimatedMount, selectedMainPetKey, getPetRoomMode(care), lastFedFoodEmoji);
        }, autoReturnMs);
    }
}

function showPetRoomFoodTray() {
    if (!petRoomFoodTray) return;
    petRoomFoodTray.classList.add("show");
    renderPetRoomFoodRail();
    if (petRoomSpeech) petRoomSpeech.textContent = guideT("Выбери еду снизу и перетащи её к питомцу 🥣", "Choose food below and drag it to the pet 🥣");
    petRoomFoodTray.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(() => {
        refreshGuideHelpers("petRoomScreen");
        maybeAutoStartGuide("petRoomScreen_feed");
    }, 280);
}

function renderPetRoomFoodRail() {
    if (!petRoomFoodRail || typeof foodCatalog === "undefined") return;
    renderFoodRailInto(petRoomFoodRail, "petRoom");
}

function addPetRoomEffect(className, text = "") {
    if (!petRoomHero) return;
    const fx = document.createElement("div");
    fx.className = className;
    if (text) fx.textContent = text;
    petRoomHero.appendChild(fx);
    setTimeout(() => fx.remove(), 1500);
}

function playPetRoomBallEffect() {
    addPetRoomEffect("pet-room-ball-fx");
}

function playPetRoomWashEffect() {
    addPetRoomEffect("pet-room-water-fx");
}

function playPetRoomFoamEffect() {
    if (!petRoomHero) return;
    const fx = document.createElement("div");
    fx.className = "pet-room-foam-burst";
    const bubbles = [
        { x: 12, y: 14, s: 21, d: 0, drift: -28 },
        { x: 24, y: 4, s: 30, d: 60, drift: -18 },
        { x: 37, y: 19, s: 18, d: 25, drift: -8 },
        { x: 49, y: 8, s: 34, d: 90, drift: 4 },
        { x: 62, y: 18, s: 23, d: 35, drift: 12 },
        { x: 74, y: 4, s: 28, d: 70, drift: 24 },
        { x: 88, y: 16, s: 19, d: 110, drift: 31 },
        { x: 18, y: 38, s: 15, d: 145, drift: -34 },
        { x: 42, y: 44, s: 17, d: 165, drift: -13 },
        { x: 68, y: 40, s: 16, d: 130, drift: 19 },
        { x: 82, y: 34, s: 14, d: 190, drift: 36 }
    ];
    bubbles.forEach(item => {
        const bubble = document.createElement("span");
        bubble.style.setProperty("--x", item.x);
        bubble.style.setProperty("--y", item.y);
        bubble.style.setProperty("--s", item.s);
        bubble.style.setProperty("--d", item.d);
        bubble.style.setProperty("--drift", item.drift);
        fx.appendChild(bubble);
    });
    petRoomHero.appendChild(fx);
    setTimeout(() => fx.remove(), 1750);
}

function playPetRoomSleepEffect() {
    addPetRoomEffect("pet-room-sleep-fx", "💤");
}

function playPetRoomSparkEffect(symbol = "✨") {
    addPetRoomEffect("pet-room-spark-fx", symbol);
}

function maybeShowPetReminder(text) {
    if (!text) {
        lastReminderText = "";
        return;
    }
    const now = Date.now();
    if (text === lastReminderText && now - lastReminderShownAt < 60000) return;
    lastReminderText = text;
    lastReminderShownAt = now;
    showPetRoomToast(text);
}

function tickPetCareDecay() {
    if (!selectedMainPetKey) return;
    const care = getPetCare(selectedMainPetKey);
    const decay = {
        hunger: care.hunger - 1,
        mood: care.mood - 1,
        energy: care.energy - 1,
        cleanliness: care.cleanliness - 1,
        careActions: care.careActions
    };
    setPetCare(selectedMainPetKey, decay);
    if (document.getElementById("petRoomScreen")?.classList.contains("show")) {
        renderPetRoom();
    }
}

function ensurePetCareDecayTimer() {
    if (petCareDecayTimer) return;
    petCareDecayTimer = setInterval(tickPetCareDecay, 20000);
}

function showPetRoomToast(text) {
    const old = document.querySelector(".pet-room-pop");
    if (old) old.remove();
    const toast = document.createElement("div");
    toast.className = "pet-room-pop";
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1950);
}

function refreshPetRoomAfterAction(text, mode, autoReturnMs = 1500) {
    if (petRoomSpeech) petRoomSpeech.textContent = text;
    setPetRoomMode(mode, autoReturnMs);
    renderPetRoomBars(getPetCare(selectedMainPetKey));
    if (petRoomCareCount) petRoomCareCount.textContent = String(getPetCare(selectedMainPetKey).careActions || 0);
    if (petRoomFeedCount) petRoomFeedCount.textContent = String(animalFeedCount[selectedMainPetKey] || 0);
    if (petRoomMoodLabel) petRoomMoodLabel.textContent = getPetRoomMoodText(getPetCare(selectedMainPetKey));
}

function carePetRoom(action) {
    initAudio();
    const key = selectedMainPetKey;
    const care = getPetCare(key);
    const name = getAnimalDisplayName(key);
    const nextActions = (care.careActions || 0) + 1;

    if (action === "feed") {
        showPetRoomFoodTray();
        playSound("click");
        return;
    }

    if (action === "play") {
        setPetCare(key, {
            hunger: care.hunger - 6,
            mood: care.mood + 26,
            energy: care.energy - 14,
            cleanliness: care.cleanliness - 7,
            careActions: nextActions
        });
        setPetMood(key, "playful", { played: (getPetMood(key).played || 0) + 1 });
        updateTaskProgress("play", 1);
        playPetRoomBallEffect();
        playPetRoomSparkEffect("🎈");
        refreshPetRoomAfterAction(`${name} играет с мячиком и радуется! 🎈`, "run", 2200);
        playSound("play");
    }

    if (action === "sleep") {
        setPetCare(key, {
            hunger: care.hunger - 4,
            mood: care.mood + 7,
            energy: care.energy + 36,
            cleanliness: care.cleanliness,
            careActions: nextActions
        });
        setPetMood(key, "sleepy", { slept: (getPetMood(key).slept || 0) + 1 });
        playPetRoomSleepEffect();
        refreshPetRoomAfterAction(`${name} отдыхает. Тсс... 💤`, "sleep", 0);
        playSound("sleep");
    }

    if (action === "wash") {
        setPetCare(key, {
            hunger: care.hunger,
            mood: care.mood + 10,
            energy: care.energy - 3,
            cleanliness: care.cleanliness + 42,
            careActions: nextActions
        });
        setPetMood(key, "loved", { care: (getPetMood(key).care || 0) + 1 });
        playPetRoomWashEffect();
        playPetRoomFoamEffect();
        playPetRoomSparkEffect("🫧");
        refreshPetRoomAfterAction(`${name} чистый! Вода, пена и блеск 🫧`, "greet", 1700);
        playSound("wash");
    }

    if (action === "dress") {
        setPetCare(key, {
            hunger: care.hunger,
            mood: care.mood + 5,
            energy: care.energy,
            cleanliness: care.cleanliness,
            careActions: nextActions
        });
        showPetRoomToast("Одежда и домики появятся в отдельном обновлении 👕");
        playPetRoomSparkEffect("👕");
        refreshPetRoomAfterAction(`${name} примеряет красивый скин 👕`, "greet", 1400);
        playSound("click");
    }

    saveProgress();
    updateAchievementProgress();
}

function feedPetRoomWithFood(foodEmoji, foodName, startX, startY) {
    const key = selectedMainPetKey;
    const care = getPetCare(key);
    const name = getAnimalDisplayName(key);
    const targetRect = petRoomStage.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height * 0.56;

    const fly = document.createElement("div");
    fly.className = "food-success-fly";
    fly.innerHTML = buildFoodDragMarkup(foodEmoji);
    fly.style.left = startX + "px";
    fly.style.top = startY + "px";
    fly.style.setProperty("--dx", (targetX - startX) + "px");
    fly.style.setProperty("--dy", (targetY - startY) + "px");
    document.body.appendChild(fly);
    setTimeout(() => fly.remove(), 750);

    lastFedFoodEmoji = foodEmoji;
    animalFeedCount[key] = (animalFeedCount[key] || 0) + 1;
    setPetCare(key, {
        hunger: care.hunger + 30,
        mood: care.mood + 10,
        energy: care.energy - 2,
        cleanliness: care.cleanliness - 3,
        careActions: (care.careActions || 0) + 1
    });
    setPetMood(key, "happy");
    updateTaskProgress("feed", 1);
    playPetRoomSparkEffect("💚");
    refreshPetRoomAfterAction(`${name} покушал ${foodName}! ${foodEmoji}`, "eat", 1800);
    playSound("eat");
    saveProgress();
    updateAchievementProgress();
}



function openPets() {
    playSound("click");
    showScreen("petsScreen");
}

function getAnimalDisplayName(key) {
    const customName = (animalNames[key] || "").trim();
    return customName || animalInfo[key].name;
}

function saveAnimalName(key) {
    const input = document.getElementById(`petName_${key}`);
    if (!input) return;

    const value = input.value.trim().slice(0, 18);
    animalNames[key] = value;
    saveProgress();
    playSound("coin");
    renderPets();
}

function openPetDetail(key) {
    // Старое отдельное окно деталей больше не открываем: теперь главный экран питомца — это и есть детали.
    if (!albumUnlocked.includes(key)) {
        playSound("wrong");
        return;
    }
    selectedMainPetKey = key;
    selectedPetKey = key;
    playerProfile.favorite = key;
    saveProgress();
    openPetRoom();
}


function greetPetDetail(isAuto = false) {
    const key = selectedPetKey;
    const name = getAnimalDisplayName(key);
    const speciesGreetings = {
        lion: [`Привет! Я ${name}! Царь зверят 👑`, `${name} гордо приветствует тебя! 🦁`],
        panda: [`Привет! Я ${name}! Давай дружить 🐼`, `${name} мягко машет лапкой! 💚`],
        elephant: [`Привет! Я ${name}! Тру-ту! 🐘`, `${name} машет хоботом! ✨`],
        giraffe: [`Привет! Я ${name}! Я очень высокий! 🦒`, `${name} тянется к тебе шеей! 🌟`],
        monkey: [`Привет! Я ${name}! Поиграем? 🐒`, `${name} весело подпрыгивает! 🎈`],
        tiger: [`Привет! Я ${name}! Я смелый тигр 🐯`, `${name} крадётся и улыбается! ⚡`],
        penguin: [`Привет! Я ${name}! Я смешно хожу 🐧`, `${name} весело переваливается! ❄️`],
        rabbit: [`Привет! Я ${name}! Я люблю прыгать 🐰`, `${name} подпрыгивает от радости! 🌈`],
        frog: [`Привет! Я ${name}! Ква-ква! 🐸`, `${name} радостно прыгает к тебе! 💚`],
        parrot: [`Hello! Я ${name}! 🦜`, `${name} машет крылышками и говорит привет! 🎉`]
    };

    const greetings = speciesGreetings[key] || [
        `Привет! Я ${name}! 🐾`,
        `${name} рад тебя видеть! 💚`,
        `Ура, ты пришёл! Это я, ${name}!`,
        `Привет-привет! Поиграем? ⭐`
    ];

    const text = isAuto ? greetings[0] : greetings[Math.floor(Math.random() * greetings.length)];
    showDetailSpeech(text);
    setPetActorMode("greet", "happy", 1800);
    playSound("match");
}

function showDetailSpeech(text) {
    petDetailSpeech.textContent = text;
    petDetailSpeech.classList.remove("show");
    void petDetailSpeech.offsetWidth;
    petDetailSpeech.classList.add("show");
}

function animateDetailAvatar(className) {
    petDetailAvatar.classList.remove("hello", "eating");
    void petDetailAvatar.offsetWidth;
    petDetailAvatar.classList.add(className);
    setTimeout(() => petDetailAvatar.classList.remove(className), 850);
}



/* ===== Zoo Pet World animated pet helpers ===== */

function getPetSpeciesBubble(key, mode) {
    const map = {
        greet: {
            lion: 'Р-р-р! 👑', panda: 'Привет! 🐼', elephant: 'Тру-ту! 🐘', giraffe: 'Хееей! 🌟', monkey: 'У-у-а! 🎉', tiger: 'Грр! 🐯', penguin: 'Пи-пи! ❄️', rabbit: 'Прыг! 🥕', frog: 'Ква! 💚', parrot: 'Hello! 🦜'
        },
        eat: {
            lion: 'Ням! 🍖', panda: 'Хрум! 🎋', elephant: 'Хом! 🥬', giraffe: 'Ам! 🌿', monkey: 'Ммм! 🍌', tiger: 'Ням! 🐾', penguin: 'Клюв-клюв! 🐟', rabbit: 'Хрум! 🥕', frog: 'Ква-ням! 🪰', parrot: 'Клю! 🌽'
        },
        run: {
            lion: 'Вперёд! 🐾', panda: 'Пошли! 💫', elephant: 'Топ-топ! 🐘', giraffe: 'Побежали! ✨', monkey: 'Прыг-скок! 🙈', tiger: 'Охота! ⚡', penguin: 'Вперевалку! ❄️', rabbit: 'Скок-скок! 🌈', frog: 'Прыг! 🫧', parrot: 'Летим! 🪶'
        },
        sleep: {
            lion: 'Р-р... 💤', panda: 'Спа-а-ать 💤', elephant: 'Тсс... 🌙', giraffe: 'Дремлю... 🌙', monkey: 'Сплю... 💤', tiger: 'Тихо... 🌙', penguin: 'Спать! ❄️', rabbit: 'Тсс... 💤', frog: 'Ква-сон 💤', parrot: 'Night! 🌙'
        },
        walk: {
            lion: '🐾', panda: '🐼', elephant: '🐘', giraffe: '🦒', monkey: '🐒', tiger: '🐯', penguin: '🐧', rabbit: '🐰', frog: '🐸', parrot: '🦜'
        }
    };
    return (map[mode] && map[mode][key]) || (map.walk[key] || '🐾');
}

function getPetSpeciesFoodEmoji(key, fallback) {
    // Для анимации кормления всегда сначала используем именно тот визуал еды,
    // который ребёнок выбрал в разделе "Еда".
    if (fallback) return fallback;
    const preferred = { panda:'🎋', elephant:'🥬', monkey:'🍌', rabbit:'🥕', parrot:'🌽', penguin:'🐟', frog:'🪰', giraffe:'🌿' };
    return preferred[key] || '🍎';
}

function getAnimatedPetConfig(key) {
    const base = {
        kind: "mammal",
        fur: "#D97706",
        belly: "#FDE68A",
        accent: "#92400E",
        earInner: "#FCA5A5",
        speed: "7.2s",
        mane: false,
        trunk: false,
        neck: false,
        spots: false,
        rare: false,
        species: key
    };

    const map = {
        lion:      { fur:"#D97706", belly:"#FDE68A", accent:"#92400E", mane:true },
        panda:     { fur:"#F8FAFC", belly:"#FFFFFF", accent:"#111827", earInner:"#D1D5DB" },
        fox:       { fur:"#F97316", belly:"#FED7AA", accent:"#7C2D12" },
        elephant:  { fur:"#9CA3AF", belly:"#CBD5E1", accent:"#6B7280", trunk:true, earInner:"#E5E7EB" },
        giraffe:   { fur:"#FACC15", belly:"#FDE68A", accent:"#B45309", neck:true, spots:true },
        monkey:    { fur:"#B45309", belly:"#FED7AA", accent:"#7C2D12" },
        tiger:     { fur:"#F59E0B", belly:"#FDE68A", accent:"#111827", rare: rareUnlocked.includes("rare_tiger") },
        koala:     { fur:"#94A3B8", belly:"#E2E8F0", accent:"#64748B" },
        rabbit:    { fur:"#F8FAFC", belly:"#FDF2F8", accent:"#A855F7", speed:"6.2s" },
        frog:      { fur:"#22C55E", belly:"#BBF7D0", accent:"#166534" },
        zebra:     { fur:"#F8FAFC", belly:"#FFFFFF", accent:"#111827" },
        penguin:   { kind:"bird", fur:"#111827", belly:"#F8FAFC", accent:"#F59E0B" },
        hippo:     { fur:"#A78BFA", belly:"#DDD6FE", accent:"#6D28D9" },
        owl:       { kind:"bird", fur:"#92400E", belly:"#FDE68A", accent:"#F59E0B" },
        bear:      { fur:"#92400E", belly:"#FDE68A", accent:"#7C2D12" },
        deer:      { fur:"#B45309", belly:"#FED7AA", accent:"#F59E0B", neck:true },
        raccoon:   { fur:"#6B7280", belly:"#E5E7EB", accent:"#111827" },
        turtle:    { fur:"#22C55E", belly:"#BBF7D0", accent:"#166534" },
        parrot:    { kind:"bird", fur:"#22C55E", belly:"#86EFAC", accent:"#EF4444", rare: rareUnlocked.includes("rare_parrot") },
        dog:       { fur:"#D97706", belly:"#FCD34D", accent:"#7C2D12" },
        cat:       { fur:"#F59E0B", belly:"#FED7AA", accent:"#7C2D12" },
        cow:       { fur:"#F8FAFC", belly:"#FFFFFF", accent:"#111827" },
        horse:     { fur:"#92400E", belly:"#FCD34D", accent:"#7C2D12", neck:true },
        camel:     { fur:"#D97706", belly:"#FDE68A", accent:"#92400E", neck:true },
        sheep:     { fur:"#F8FAFC", belly:"#FFFFFF", accent:"#D1D5DB" },
        goat:      { fur:"#E5E7EB", belly:"#F8FAFC", accent:"#6B7280" },
        crocodile: { fur:"#16A34A", belly:"#86EFAC", accent:"#166534", speed:"8.0s" },
        snake:     { fur:"#22C55E", belly:"#BBF7D0", accent:"#166534", speed:"8.4s" },
        kangaroo:  { fur:"#C2410C", belly:"#FDBA74", accent:"#7C2D12", speed:"6.8s" },
        dolphin:   { kind:"fish", fur:"#38BDF8", belly:"#BAE6FD", accent:"#2563EB" },
        whale:     { kind:"fish", fur:"#2563EB", belly:"#93C5FD", accent:"#1D4ED8", rare: rareUnlocked.includes("rare_whale") },
        octopus:   { kind:"fish", fur:"#EC4899", belly:"#F9A8D4", accent:"#BE185D" },
        flamingo:  { kind:"bird", fur:"#FB7185", belly:"#FBCFE8", accent:"#EC4899" },
        chicken:   { kind:"bird", fur:"#FDE68A", belly:"#FFFFFF", accent:"#EF4444" },
        duck:      { kind:"bird", fur:"#FACC15", belly:"#FEF3C7", accent:"#F59E0B" },
        wolf:      { fur:"#6B7280", belly:"#D1D5DB", accent:"#374151" },
        squirrel:  { fur:"#B45309", belly:"#FED7AA", accent:"#7C2D12", speed:"6.5s" },
        hedgehog:  { fur:"#A16207", belly:"#FDE68A", accent:"#92400E" },
        bat:       { kind:"bird", fur:"#4C1D95", belly:"#DDD6FE", accent:"#A78BFA" },
        seal:      { fur:"#64748B", belly:"#CBD5E1", accent:"#334155" },
        polarBear: { fur:"#F8FAFC", belly:"#EFF6FF", accent:"#CBD5E1", rare: rareUnlocked.includes("rare_polarBear") }
    };

    return { ...base, ...(map[key] || {}), species: key };
}


const sleepEyeStyleMap = {
    lion: { top: 90, left: 44, right: 82, size: 18 },
    panda: { top: 95, left: 42, right: 81, size: 18 },
    fox: { top: 92, left: 52, right: 92, size: 18 },
    elephant: { top: 96, left: 42, right: 78, size: 17 },
    giraffe: { top: 78, left: 74, right: 108, size: 16 },
    monkey: { top: 94, left: 46, right: 84, size: 17 },
    tiger: { top: 92, left: 48, right: 86, size: 18 },
    koala: { top: 92, left: 44, right: 82, size: 18 },
    rabbit: { top: 88, left: 48, right: 84, size: 17 },
    frog: { top: 88, left: 40, right: 78, size: 18 },
    zebra: { top: 88, left: 60, right: 98, size: 17 },
    penguin: { top: 95, left: 43, right: 80, size: 17 },
    hippo: { top: 96, left: 54, right: 94, size: 16 },
    owl: { top: 86, left: 42, right: 80, size: 18 },
    bear: { top: 92, left: 44, right: 82, size: 18 },
    deer: { top: 88, left: 58, right: 96, size: 16 },
    raccoon: { top: 92, left: 42, right: 80, size: 17 },
    turtle: { top: 98, left: 56, right: 94, size: 15 },
    parrot: { top: 90, left: 46, right: 82, size: 16 },
    dog: { top: 92, left: 48, right: 86, size: 17 },
    cat: { top: 92, left: 48, right: 86, size: 17 },
    cow: { top: 94, left: 48, right: 86, size: 17 },
    horse: { top: 86, left: 64, right: 102, size: 16 },
    camel: { top: 88, left: 64, right: 102, size: 16 },
    sheep: { top: 92, left: 46, right: 84, size: 17 },
    goat: { top: 88, left: 54, right: 92, size: 16 },
    crocodile: { top: 96, left: 66, right: 108, size: 15 },
    snake: { top: 86, left: 54, right: 92, size: 15 },
    kangaroo: { top: 90, left: 52, right: 92, size: 16 },
    dolphin: { top: 88, left: 60, right: 102, size: 15 },
    whale: { top: 90, left: 60, right: 102, size: 15 },
    octopus: { top: 92, left: 42, right: 80, size: 17 },
    flamingo: { top: 84, left: 60, right: 98, size: 15 },
    chicken: { top: 90, left: 46, right: 84, size: 16 },
    duck: { top: 90, left: 48, right: 86, size: 16 },
    wolf: { top: 90, left: 54, right: 94, size: 16 },
    squirrel: { top: 90, left: 48, right: 86, size: 16 },
    hedgehog: { top: 96, left: 48, right: 86, size: 16 },
    bat: { top: 88, left: 44, right: 82, size: 16 },
    seal: { top: 98, left: 56, right: 96, size: 15 },
    polarBear: { top: 92, left: 44, right: 82, size: 18 }
};

function getSleepEyeStyle(key) {
    const c = sleepEyeStyleMap[key] || { top: 92, left: 46, right: 84, size: 17 };
    return `--sleep-eye-top:${c.top}px;--sleep-eye-left:${c.left}px;--sleep-eye-right:${c.right}px;--sleep-eye-size:${c.size}px;`;
}

function getSleepEyesHtml(key) {
    if (petAnimationMode !== "sleep") return "";
    return `<div class="pet-stage-sleep-eyes" style="${getSleepEyeStyle(key)}">
        <span class="pet-stage-sleep-eye left"></span>
        <span class="pet-stage-sleep-eye right"></span>
    </div>`;
}


function renderPetActorInto(mount, key, mode = petAnimationMode, foodEmoji = lastFedFoodEmoji) {
    if (!mount) return;

    const sceneModeClass = {
        walk: "mode-walk",
        run: "mode-run",
        sleep: "mode-sleep",
        eat: "mode-eat",
        greet: "mode-greet"
    }[mode] || "mode-walk";

    const bubbleText = getPetSpeciesBubble(key, mode);
    const foodText = getPetSpeciesFoodEmoji(key, foodEmoji);
    const rareBadge = rareUnlocked.includes(`rare_${key}`) ? "👑 " : "";
    const showActorBubble = mount?.id !== "petRoomAnimatedMount";

    const spriteHtml = mode === "sleep"
        ? `<canvas class="pet-stage-sprite pet-stage-sleep-canvas" width="260" height="260" aria-label="${getAnimalDisplayName(key)} спит"></canvas>`
        : `<img class="pet-stage-sprite" alt="${getAnimalDisplayName(key)}"/>`;

    mount.innerHTML = `
        <div class="pet-stage-actor ${sceneModeClass}">
            ${showActorBubble ? `<div class="pet-stage-bubble">${rareBadge}${bubbleText}</div>` : ""}
            <div class="pet-stage-shadow"></div>
            ${spriteHtml}
            <div class="pet-stage-food">${buildFoodDragMarkup(foodText)}</div>
        </div>
    `;

    if (mode === "sleep") {
        renderSleepSpriteCanvas(key, mount);
    } else {
        applyCleanSpriteToMount(mount, key);
    }
}

function renderAnimatedPetCharacter(key) {
    renderPetActorInto(petAnimatedCharacterMount, key, petAnimationMode, lastFedFoodEmoji);
}

function setPetActorMode(mode, expression = "happy", autoReturnMs = 0) {
    petAnimationMode = mode;
    petExpressionMode = expression;
    renderAnimatedPetCharacter(selectedPetKey);

    if (autoReturnMs > 0) {
        setTimeout(() => {
            petAnimationMode = expression === "sleepy" ? "sleep" : "walk";
            petExpressionMode = expression;
            renderAnimatedPetCharacter(selectedPetKey);
        }, autoReturnMs);
    }
}

function petAutoWalk() {
    petAnimationMode = "walk";
    petExpressionMode = "happy";
    renderAnimatedPetCharacter(selectedPetKey);
}

function getPetMood(key) {
    return petMoodMap[key] || { mood: "happy", care: 0, played: 0, slept: 0 };
}

function setPetMood(key, mood, delta = {}) {
    const current = getPetMood(key);
    petMoodMap[key] = {
        ...current,
        ...delta,
        mood,
        updatedAt: Date.now()
    };
    saveProgress();
    updatePetMoodView(key);
}

function getMoodText(mood) {
    const map = {
        hungry: "голодный 😋",
        happy: "счастливый 💚",
        playful: "игривый 🎈",
        sleepy: "сонный 🌙",
        loved: "довольный 🥰"
    };
    return map[mood] || map.happy;
}

function updatePetMoodView(key) {
    if (!petMoodCard) return;
    const mood = getPetMood(key).mood;
    petMoodCard.textContent = t('pets.mood', {mood: getMoodText(mood)});
    if (selectedPetKey === key && petAnimationMode !== "eat" && petAnimationMode !== "greet" && petAnimationMode !== "run") {
        petExpressionMode = mood === "sleepy" ? "sleepy" : "happy";
        petAnimationMode = mood === "sleepy" ? "sleep" : "walk";
        renderAnimatedPetCharacter(key);
    }
}

function carePet(action) {
    const key = selectedPetKey;
    const pet = getPetMood(key);
    const name = getAnimalDisplayName(key);

    if (action === "pet") {
        setPetMood(key, "loved", { care: (pet.care || 0) + 1 });
        showDetailSpeech(`${name} рад, что его погладили 🥰`);
        setPetActorMode("greet", "happy", 1400);
        playSound("pet");
    }

    if (action === "play") {
        setPetMood(key, "playful", { played: (pet.played || 0) + 1 });
        showDetailSpeech(`${name} играет с тобой! 🎈`);
        setPetActorMode("run", "happy", 2200);
        createDetailHeart("🎈");
        playSound("play");
    }

    if (action === "sleep") {
        setPetMood(key, "sleepy", { slept: (pet.slept || 0) + 1 });
        showDetailSpeech(`${name} отдыхает. Спокойной ночи 🌙`);
        setPetActorMode("sleep", "sleepy");
        createSleepStars();
        playSound("sleep");
    }

    updateAchievementProgress();
}

function createDetailHeart(symbol = "💚") {
    const heart = document.createElement("div");
    heart.className = "detail-heart";
    heart.textContent = symbol;
    document.getElementById("petStage").appendChild(heart);
    setTimeout(() => heart.remove(), 1300);
}

function createSleepStars() {
    const stars = document.createElement("div");
    stars.className = "sleep-stars";
    stars.textContent = "💤";
    document.getElementById("petStage").appendChild(stars);
    setTimeout(() => stars.remove(), 1300);
}

function renderPetDetail(key) {
    const info = animalInfo[key];
    petDetailTitle.textContent = getAnimalDisplayName(key);
    petDetailFact.textContent = info.fact;
    petDetailImage.src = animalImageSrc(key);
    petDetailImage.alt = info.name;

    applyCleanRoomBackground(petStage, key);

    renderAnimatedPetCharacter(key);

    const fed = animalFeedCount[key] || 0;
    petDetailStatus.textContent = fed
        ? `${getAnimalDisplayName(key)} уже кушал ${fed} раз(а). Перетащи ещё еды 🍎`
        : `Перетащи еду к ${getAnimalDisplayName(key)} 🍎`;

    updatePetMoodView(key);
    renderFoodRail();
}


const foodCatalog = [
    { id: "carrot", emoji: "🥕", name: "морковку", label: "Морковь", price: 0 },
    { id: "apple", emoji: "🍎", name: "яблоко", label: "Яблоко", price: 0 },
    { id: "banana", emoji: "🍌", name: "банан", label: "Банан", price: 0 },
    { id: "strawberry", emoji: "🍓", name: "клубнику", label: "Клубника", price: 18 },
    { id: "leaf", emoji: "🥬", name: "листик", label: "Листик", price: 22 },
    { id: "corn", emoji: "🌽", name: "кукурузу", label: "Кукуруза", price: 28 },
    { id: "watermelon", emoji: "🍉", name: "арбуз", label: "Арбуз", price: 35 },
    { id: "berries", emoji: "🫐", name: "ягоды", label: "Ягоды", price: 45 },
    { id: "honey", emoji: "🍯", name: "мёд", label: "Мёд", price: 55 },
    { id: "fish", emoji: "🐟", name: "рыбку", label: "Рыбка", price: 60 },
    { id: "milk", emoji: "🥛", name: "молоко", label: "Молоко", price: 65 },
    { id: "cheese", emoji: "🧀", name: "сыр", label: "Сыр", price: 70 },
    { id: "cookie", emoji: "🍪", name: "печенье", label: "Печенье", price: 80 },
    { id: "peanut", emoji: "🥜", name: "орешки", label: "Орешки", price: 90 },
    { id: "shrimp", emoji: "🦐", name: "креветку", label: "Креветка", price: 100 },
    { id: "coconut", emoji: "🥥", name: "кокос", label: "Кокос", price: 115 }
];

function getFoodByEmoji(emoji) {
    return foodCatalog.find(item => item.emoji === emoji) || foodCatalog[0];
}

function buildFoodVisualMarkup(food, extraClass = "") {
    const item = typeof food === "string" ? getFoodByEmoji(food) : food;
    const safeId = String(item?.id || "apple").replace(/[^a-zA-Z0-9_-]/g, "");
    const emoji = item?.emoji || "🍎";
    return `
        <span class="food-art food-art-${safeId} ${extraClass}" aria-hidden="true">
            <span class="food-plate"></span>
            <span class="food-icon">${emoji}</span>
            <span class="food-shine"></span>
        </span>
    `;
}

function buildFoodDragMarkup(food) {
    const item = typeof food === "string" ? getFoodByEmoji(food) : food;
    const safeId = String(item?.id || "apple").replace(/[^a-zA-Z0-9_-]/g, "");
    const emoji = item?.emoji || "🍎";
    return `
        <span class="food-drag-icon food-art-${safeId}" aria-hidden="true">
            <span class="food-drag-emoji">${emoji}</span>
        </span>
    `;
}

function renderFoodRail() {
    if (!foodRail) return;
    renderFoodRailInto(foodRail, "detail");
}

function renderFoodRailInto(container, source = "detail") {
    if (!container) return;
    container.innerHTML = "";

    if (source !== "petRoom") {
        const note = document.createElement("div");
        note.className = "food-shop-note";
        note.textContent = t('petroom.buy_food_hint');
        container.appendChild(note);
    }

    foodCatalog.forEach(food => {
        const isUnlocked = unlockedFoods.includes(food.id);

        const chip = document.createElement("button");
        chip.className = isUnlocked ? "food-chip unlocked" : "food-chip locked";
        chip.setAttribute("aria-label", food.label);
        chip.dataset.id = food.id;
        chip.dataset.food = food.emoji;
        chip.dataset.name = food.name;
        chip.dataset.price = String(food.price);
        chip.dataset.source = source;

        chip.innerHTML = `
            ${buildFoodVisualMarkup(food)}
            <span class="food-label">${food.label}</span>
            ${isUnlocked ? "" : `<span class="food-price">${food.price} 🪙</span>`}
        `;

        if (isUnlocked) {
            chip.addEventListener("pointerdown", startFoodDrag);
        } else {
            chip.onclick = () => buyFood(food.id);
        }

        container.appendChild(chip);
    });
    try { refreshGuideHelpers(getVisibleScreenId ? getVisibleScreenId() : "petRoomScreen"); } catch (e) {}
}


function showFoodToast(text) {
    const old = document.querySelector(".food-buy-pop");
    if (old) old.remove();

    const toast = document.createElement("div");
    toast.className = "food-buy-pop";
    toast.textContent = text;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 1800);
}

function buyFood(foodId) {
    const food = foodCatalog.find(item => item.id === foodId);
    if (!food) return;

    if (unlockedFoods.includes(food.id)) {
        showFoodToast(t('petroom.food_owned', {food: food.label}));
        return;
    }

    if (coins < food.price) {
        playSound("wrong");
        showFoodToast(t('petroom.food_no_coins', {price: food.price}));
        return;
    }

    coins -= food.price;
    unlockedFoods.push(food.id);
    saveProgress();
    updateCoinsViews();
    renderFoodRail();
    renderPetRoomFoodRail();
    playSound("coin");
    showFoodToast(t('petroom.food_bought', {food: food.label, emoji: food.emoji}));
}

function startFoodDrag(event) {
    event.preventDefault();
    cleanupFoodDrag();
    initAudio();

    const target = event.currentTarget;
    try { target.setPointerCapture?.(event.pointerId); } catch(e) {}
    const food = target.dataset.food;
    const name = target.dataset.name;

    const source = target.dataset.source || "detail";
    currentDragFood = { food, name, source };

    currentDragGhost = document.createElement("div");
    currentDragGhost.className = "drag-ghost";
    currentDragGhost.innerHTML = buildFoodDragMarkup({ id: target.dataset.id || "apple", emoji: food });
    document.body.appendChild(currentDragGhost);

    moveDragGhost(event.clientX, event.clientY);
    if (currentDragFood.source === "petRoom") {
        petRoomStage?.classList.add("ready");
        petRoomHero?.classList.add("ready");
    } else {
        petDropZone?.classList.add("ready");
    }

    window.addEventListener("pointermove", moveFoodDrag);
    window.addEventListener("pointerup", endFoodDrag, { once: true });
    window.addEventListener("pointercancel", cancelFoodDrag, { once: true });
    window.addEventListener("touchend", cancelFoodDrag, { once: true });
    window.addEventListener("mouseup", cancelFoodDrag, { once: true });
    window.addEventListener("blur", cancelFoodDrag, { once: true });
    document.addEventListener("visibilitychange", cancelFoodDrag, { once: true });
}

function moveDragGhost(x, y) {
    if (!currentDragGhost) return;
    currentDragGhost.style.left = x + "px";
    currentDragGhost.style.top = y + "px";
}

function moveFoodDrag(event) {
    moveDragGhost(event.clientX, event.clientY);
}

function endFoodDrag(event) {
    const isPetRoom = currentDragFood?.source === "petRoom";
    const dropTarget = isPetRoom ? petRoomStage : petDropZone;
    if (!dropTarget || !event) {
        cleanupFoodDrag();
        return;
    }
    const dropRect = dropTarget.getBoundingClientRect();
    const inside =
        event.clientX >= dropRect.left &&
        event.clientX <= dropRect.right &&
        event.clientY >= dropRect.top &&
        event.clientY <= dropRect.bottom;

    if (inside && currentDragFood) {
        if (isPetRoom) {
            feedPetRoomWithFood(currentDragFood.food, currentDragFood.name, event.clientX, event.clientY);
        } else {
            feedPetDetail(currentDragFood.food, currentDragFood.name, event.clientX, event.clientY);
        }
    } else {
        playSound("wrong");
        if (isPetRoom) {
            if (petRoomSpeech) petRoomSpeech.textContent = t('petroom.drag_food');
        } else if (petDetailStatus) {
            petDetailStatus.textContent = t('petroom.try_drag');
        }
    }

    cleanupFoodDrag();
}


function cancelFoodDrag() {
    cleanupFoodDrag();
}

function cleanupFoodDrag() {
    petDropZone?.classList.remove("ready");
    petRoomStage?.classList.remove("ready");
    petRoomHero?.classList.remove("ready");

    if (currentDragGhost) {
        currentDragGhost.remove();
        currentDragGhost = null;
    }
    document.querySelectorAll(".drag-ghost, .food-success-fly").forEach(el => el.remove());

    currentDragFood = null;
    window.removeEventListener("pointermove", moveFoodDrag);
    window.removeEventListener("pointerup", endFoodDrag);
    window.removeEventListener("pointercancel", cancelFoodDrag);
    window.removeEventListener("touchend", cancelFoodDrag);
    window.removeEventListener("mouseup", cancelFoodDrag);
    window.removeEventListener("blur", cancelFoodDrag);
    document.removeEventListener("visibilitychange", cancelFoodDrag);
}

function feedPetDetail(foodEmoji, foodName, startX, startY) {
    const key = selectedPetKey;
    const animalName = getAnimalDisplayName(key);

    const targetRect = petDetailAvatar.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;

    const fly = document.createElement("div");
    fly.className = "food-success-fly";
    fly.innerHTML = buildFoodDragMarkup(foodEmoji);
    fly.style.left = startX + "px";
    fly.style.top = startY + "px";
    fly.style.setProperty("--dx", (targetX - startX) + "px");
    fly.style.setProperty("--dy", (targetY - startY) + "px");
    document.body.appendChild(fly);

    setTimeout(() => fly.remove(), 750);

    lastFedFoodEmoji = foodEmoji;
    setPetActorMode("eat", "happy", 1800);

    createDetailHeart("💚");
    setPetMood(key, "happy");

    animalFeedCount[key] = (animalFeedCount[key] || 0) + 1;
    updateTaskProgress("feed", 1);
    saveProgress();

    petDetailStatus.textContent = t('petroom.fed', {animal: animalName, food: foodName, count: animalFeedCount[key]});
    showDetailSpeech(`Ням-ням! Спасибо за ${foodName}! 💚`);
    playSound("coin");
}

function getPetUnlockMeta(key, index) {
    const stage = Math.floor(index / 5) + 1;
    const requiredLevel = Math.max(0, index * 2);
    const price = Math.max(0, 80 + index * 18);
    return { stage, requiredLevel, price };
}

function buyPet(key, price) {
    if (albumUnlocked.includes(key)) {
        showPetRoomToast("Этот питомец уже открыт ✅");
        return;
    }
    if (coins < price) {
        playSound("wrong");
        showPetRoomToast(`Не хватает монет: нужно ${price} 🪙`);
        return;
    }
    coins -= price;
    albumUnlocked.push(key);
    selectedMainPetKey = key;
    selectedPetKey = key;
    playerProfile.favorite = key;
    saveProgress();
    updateCoinsViews();
    renderPets();
    playSound("coin");
    showPetRoomToast(`${animalInfo[key].name} теперь твой питомец! 🐾`);
}

function selectPetForRoom(key) {
    if (!albumUnlocked.includes(key)) {
        playSound("wrong");
        return;
    }
    selectedMainPetKey = key;
    selectedPetKey = key;
    playerProfile.favorite = key;
    saveProgress();
    openPetRoom();
}

function renderPets() {
    petsList.innerHTML = "";
    updateCoinsViews();

    Array.from(new Set(animalKeys.concat(["parrot"]))).forEach((key, index) => {
        const unlocked = albumUnlocked.includes(key);
        const selected = selectedMainPetKey === key;
        const meta = getPetUnlockMeta(key, index);
        const levelReady = maxUnlockedLevel >= meta.requiredLevel;
        const item = document.createElement("div");
        item.id = `petCard_${key}`;
        item.className = unlocked ? "pet-card" : "pet-card locked";

        const content = document.createElement("div");
        content.className = "pet-content";

        const avatarWrap = document.createElement("div");
        avatarWrap.className = "pet-avatar-wrap";
        avatarWrap.id = `petWrap_${key}`;

        const avatar = document.createElement("div");
        avatar.className = "pet-avatar";
        avatar.id = `petAvatar_${key}`;
        avatar.onclick = () => unlocked ? selectPetForRoom(key) : showPetRoomToast(`Этап ${meta.stage}: открой за уровни или купи за монеты 🪙`);

        const img = document.createElement("img");
        img.src = animalImageSrc(key);
        img.alt = animalInfo[key].name;
        avatar.appendChild(img);
        avatarWrap.appendChild(avatar);

        const info = document.createElement("div");

        const stageBadge = document.createElement("div");
        stageBadge.className = "pet-stage-badge";
        stageBadge.textContent = t('pets.stage_level', {stage: meta.stage, level: meta.requiredLevel});
        info.appendChild(stageBadge);

        const title = document.createElement("div");
        title.className = "pet-title";
        title.textContent = unlocked ? getAnimalDisplayName(key) : animalInfo[key].name;

        const fact = document.createElement("div");
        fact.className = "pet-fact";
        fact.textContent = unlocked ? animalInfo[key].fact : t('pets.locked_fact', {price: meta.price});

        info.appendChild(title);
        info.appendChild(fact);

        if (unlocked) {
            const nameRow = document.createElement("div");
            nameRow.className = "pet-name-row";

            const input = document.createElement("input");
            input.className = "pet-name-input";
            input.id = `petName_${key}`;
            input.placeholder = "Дай имя животному";
            input.value = animalNames[key] || "";
            input.maxLength = 18;

            const saveBtn = document.createElement("button");
            saveBtn.className = "pet-mini-btn";
            saveBtn.textContent = "OK";
            saveBtn.onclick = () => saveAnimalName(key);

            nameRow.appendChild(input);
            nameRow.appendChild(saveBtn);

            const selectBtn = document.createElement("button");
            selectBtn.className = "pet-buy-btn";
            selectBtn.textContent = selected ? t('pets.open_room') : t('pets.select_main');
            selectBtn.onclick = () => selectPetForRoom(key);

            info.appendChild(nameRow);
            info.appendChild(selectBtn);
            // Stage 4.2A: animal voice button moved from My Animals list into the active Pet Room window.

            if (selected) {
                const badge = document.createElement("div");
                badge.className = "pet-selected-badge";
                badge.textContent = t('pets.in_room');
                info.appendChild(badge);
            }
        } else {
            const lockedText = document.createElement("div");
            lockedText.className = "pet-locked-text";
            lockedText.textContent = levelReady
                ? `Этап доступен. Можно купить за ${meta.price} монет.`
                : `Закрыт до уровня ${meta.requiredLevel}, но покупка монетами доступна.`;
            const buyBtn = document.createElement("button");
            buyBtn.className = coins >= meta.price ? "pet-buy-btn" : "pet-buy-btn locked-stage";
            buyBtn.textContent = coins >= meta.price ? t('pets.buy_price', {price: meta.price}) : t('pets.need_price', {price: meta.price});
            buyBtn.onclick = () => buyPet(key, meta.price);
            info.appendChild(lockedText);
            info.appendChild(buyBtn);
        }

        content.appendChild(avatarWrap);
        content.appendChild(info);
        item.appendChild(content);
        petsList.appendChild(item);
    });
}



/* ===== Zoo Pet World Stage 2.2: Puzzle mini-game logic with 10 stages ===== */
let puzzleStageId = 1;
let puzzleRows = 2;
let puzzleCols = 2;
let puzzleSize = 2; // legacy alias for rows; kept so old helpers do not break
let puzzleMovesCount = 0;
let puzzleSelectedIndex = null;
let puzzleDragIndex = null;
let puzzleSolved = false;
let puzzleCompleted = parseInt(safeStorage.get("zooPuzzleCompleted") || "0", 10);
let puzzleBestMoves = safeJsonParse(safeStorage.get("zooPuzzleBestMoves", "{}"), {});
let unlockedPuzzleImages = safeJsonParse(safeStorage.get("zooUnlockedPuzzleImages", '["lion"]'), ["lion"]);
if (!Array.isArray(unlockedPuzzleImages) || !unlockedPuzzleImages.length) unlockedPuzzleImages = ["lion"];

const puzzleStages = [
    { id: 1, rows: 2, cols: 2, label: "1 этап", short: "2x2", pieces: 4, reward: 10, unlockPrice: 0 },
    { id: 2, rows: 2, cols: 3, label: "2 этап", short: "2x3", pieces: 6, reward: 14, unlockPrice: 25 },
    { id: 3, rows: 2, cols: 4, label: "3 этап", short: "2x4", pieces: 8, reward: 18, unlockPrice: 40 },
    { id: 4, rows: 3, cols: 3, label: "4 этап", short: "3x3", pieces: 9, reward: 24, unlockPrice: 60 },
    { id: 5, rows: 3, cols: 4, label: "5 этап", short: "3x4", pieces: 12, reward: 32, unlockPrice: 85 },
    { id: 6, rows: 4, cols: 4, label: "6 этап", short: "4x4", pieces: 16, reward: 42, unlockPrice: 115 },
    { id: 7, rows: 4, cols: 5, label: "7 этап", short: "4x5", pieces: 20, reward: 55, unlockPrice: 150 },
    { id: 8, rows: 5, cols: 5, label: "8 этап", short: "5x5", pieces: 25, reward: 70, unlockPrice: 190 },
    { id: 9, rows: 5, cols: 6, label: "9 этап", short: "5x6", pieces: 30, reward: 88, unlockPrice: 235 },
    { id: 10, rows: 6, cols: 6, label: "10 этап", short: "6x6", pieces: 36, reward: 110, unlockPrice: 285 }
];

let maxUnlockedPuzzleStage = Number(safeStorage.get("zooMaxUnlockedPuzzleStageV2") || "1");
if (!Number.isFinite(maxUnlockedPuzzleStage) || maxUnlockedPuzzleStage < 1) maxUnlockedPuzzleStage = 1;
if (maxUnlockedPuzzleStage > puzzleStages.length) maxUnlockedPuzzleStage = puzzleStages.length;

let puzzleCurrentImage = {
    id: "lion",
    label: "Львёнок",
    src: animalImageSrc("lion")
};
let puzzlePieces = [];

const puzzleImageCatalog = [
    { key: "lion", label: "Львёнок", price: 0 },
    { key: "panda", label: "Панда", price: 35 },
    { key: "fox", label: "Лисёнок", price: 45 },
    { key: "elephant", label: "Слон", price: 60 },
    { key: "giraffe", label: "Жираф", price: 75 },
    { key: "tiger", label: "Тигр", price: 90 },
    { key: "penguin", label: "Пингвин", price: 105 },
    { key: "koala", label: "Коала", price: 120 },
    { key: "rabbit", label: "Кролик", price: 135 },
    { key: "monkey", label: "Обезьянка", price: 150 }
];
const puzzleImageKeys = puzzleImageCatalog.map(item => item.key);

function getPuzzleStageById(id) {
    return puzzleStages.find(stage => stage.id === id) || puzzleStages[0];
}

function getCurrentPuzzleStage() {
    return getPuzzleStageById(puzzleStageId);
}

function applyPuzzleStage(stage, shouldRebuild = true) {
    puzzleStageId = stage.id;
    puzzleRows = stage.rows;
    puzzleCols = stage.cols;
    puzzleSize = stage.rows;
    if (shouldRebuild) {
        buildPuzzlePieces();
        shufflePuzzle(false);
    }
}

function openPuzzle() {
    playSound("click");
    showScreen("puzzleScreen");
}

function getPuzzleBestKey() {
    return `${puzzleCurrentImage.id}_${puzzleRows}x${puzzleCols}`;
}

function renderPuzzleScreen() {
    if (!puzzleBoard) return;
    ensurePuzzleStateIsUnlocked();
    renderPuzzleStages();
    renderPuzzleImageRail();
    if (!puzzlePieces.length || puzzlePieces.length !== puzzleRows * puzzleCols) {
        buildPuzzlePieces();
        shufflePuzzle(false);
    } else {
        renderPuzzleBoard();
    }
    updatePuzzleUI();
}

function ensurePuzzleStateIsUnlocked() {
    if (puzzleStageId > maxUnlockedPuzzleStage) applyPuzzleStage(getPuzzleStageById(maxUnlockedPuzzleStage), true);
    if (!unlockedPuzzleImages.includes(puzzleCurrentImage.id) && !puzzleCurrentImage.id.startsWith("custom_")) {
        const first = puzzleImageCatalog[0];
        puzzleCurrentImage = { id: first.key, label: first.label, src: animalImageSrc(first.key) };
        buildPuzzlePieces();
    }
}

function isPuzzleStageUnlocked(stageOrId) {
    const id = typeof stageOrId === "number" ? stageOrId : stageOrId.id;
    return id <= maxUnlockedPuzzleStage;
}

function renderPuzzleStages() {
    if (!puzzleStageRow) return;
    puzzleStageRow.innerHTML = "";
    puzzleStages.forEach(stage => {
        const isUnlocked = isPuzzleStageUnlocked(stage.id);
        const btn = document.createElement("button");
        btn.className = [
            "puzzle-stage-btn",
            stage.id === puzzleStageId ? "active" : "",
            isUnlocked ? "unlocked" : "locked"
        ].filter(Boolean).join(" ");
        btn.innerHTML = isUnlocked
            ? `<b>${stage.label}</b><small>${stage.short} • ${stage.pieces} шт • +${stage.reward}🪙</small>`
            : `<b>🔒 ${stage.label}</b><small>${stage.short} • ${stage.unlockPrice}🪙</small>`;
        btn.onclick = () => isUnlocked ? setPuzzleStage(stage.id) : buyPuzzleStage(stage.id);
        puzzleStageRow.appendChild(btn);
    });
}

function renderPuzzleImageRail() {
    if (!puzzleImageRail) return;
    puzzleImageRail.innerHTML = "";
    puzzleImageCatalog.forEach(item => {
        const info = animalInfo[item.key] || { name: item.label };
        const label = item.label || info.name || item.key;
        const isUnlocked = unlockedPuzzleImages.includes(item.key);
        const isActive = puzzleCurrentImage.id === item.key;
        const btn = document.createElement("button");
        btn.className = [
            "puzzle-image-choice",
            isActive ? "active" : "",
            isUnlocked ? "unlocked" : "locked"
        ].filter(Boolean).join(" ");
        btn.setAttribute("aria-label", isUnlocked ? `Пазл: ${label}` : `Открыть пазл: ${label}`);
        btn.onclick = () => isUnlocked ? setPuzzleImage(item.key, label, animalImageSrc(item.key)) : buyPuzzleImage(item.key);

        const img = document.createElement("img");
        img.src = animalImageSrc(item.key);
        img.alt = label;
        btn.appendChild(img);

        const name = document.createElement("span");
        name.className = "puzzle-choice-name";
        name.textContent = label;
        btn.appendChild(name);

        if (!isUnlocked) {
            const price = document.createElement("span");
            price.className = "puzzle-choice-price";
            price.textContent = `${item.price} 🪙`;
            btn.appendChild(price);
        }

        puzzleImageRail.appendChild(btn);
    });
}

function setPuzzleStage(stageId) {
    const stage = getPuzzleStageById(stageId);
    if (!isPuzzleStageUnlocked(stage.id)) {
        buyPuzzleStage(stage.id);
        return;
    }
    if (puzzleStageId === stage.id) return;
    applyPuzzleStage(stage, true);
    renderPuzzleStages();
    showPuzzleMessage(`Этап ${stage.short}: ${stage.pieces} кусочков. Собери картинку и получи награду 🧩`);
}

function buyPuzzleStage(stageId) {
    const stage = getPuzzleStageById(stageId);
    const previous = puzzleStages[puzzleStages.findIndex(item => item.id === stage.id) - 1];
    if (previous && !isPuzzleStageUnlocked(previous.id)) {
        showPuzzleMessage(`Сначала открой предыдущий этап ${previous.short} 🔒`);
        playSound("wrong");
        return;
    }
    if (isPuzzleStageUnlocked(stage.id)) {
        setPuzzleStage(stage.id);
        return;
    }
    if (coins < stage.unlockPrice) {
        showPuzzleMessage(`Не хватает монет: нужно ${stage.unlockPrice} 🪙`);
        playSound("wrong");
        return;
    }
    coins -= stage.unlockPrice;
    maxUnlockedPuzzleStage = Math.max(maxUnlockedPuzzleStage, stage.id);
    applyPuzzleStage(stage, true);
    saveProgress();
    updateCoinsViews();
    renderPuzzleStages();
    playSound("coin");
    showPuzzleMessage(`${stage.label} открыт! Теперь доступен пазл ${stage.short} 🧩`);
}

function setPuzzleImage(id, label, src) {
    if (!id.startsWith("custom_") && !unlockedPuzzleImages.includes(id)) {
        buyPuzzleImage(id);
        return;
    }
    puzzleCurrentImage = { id, label, src };
    buildPuzzlePieces();
    shufflePuzzle(false);
    renderPuzzleImageRail();
    showPuzzleMessage(`Новая картинка: ${label}`);
}

function buyPuzzleImage(id) {
    const item = puzzleImageCatalog.find(entry => entry.key === id);
    if (!item) return;
    if (unlockedPuzzleImages.includes(id)) {
        setPuzzleImage(item.key, item.label, animalImageSrc(item.key));
        return;
    }
    if (coins < item.price) {
        showPuzzleMessage(`Не хватает монет: нужно ${item.price} 🪙`);
        playSound("wrong");
        return;
    }
    coins -= item.price;
    unlockedPuzzleImages.push(id);
    puzzleCurrentImage = { id: item.key, label: item.label, src: animalImageSrc(item.key) };
    buildPuzzlePieces();
    shufflePuzzle(false);
    saveProgress();
    updateCoinsViews();
    renderPuzzleImageRail();
    playSound("coin");
    showPuzzleMessage(`Пазл «${item.label}» открыт! ${item.price}🪙 списано`);
}

function buildPuzzlePieces() {
    const total = puzzleRows * puzzleCols;
    puzzlePieces = Array.from({ length: total }, (_, index) => index);
    puzzleMovesCount = 0;
    puzzleSelectedIndex = null;
    puzzleDragIndex = null;
    puzzleSolved = false;
}

function shufflePuzzle(userTriggered = false) {
    const total = puzzleRows * puzzleCols;
    if (!puzzlePieces.length || puzzlePieces.length !== total) buildPuzzlePieces();
    for (let i = puzzlePieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [puzzlePieces[i], puzzlePieces[j]] = [puzzlePieces[j], puzzlePieces[i]];
    }
    if (puzzlePieces.every((piece, index) => piece === index) && total > 1) {
        [puzzlePieces[0], puzzlePieces[1]] = [puzzlePieces[1], puzzlePieces[0]];
    }
    puzzleMovesCount = 0;
    puzzleSelectedIndex = null;
    puzzleDragIndex = null;
    puzzleSolved = false;
    renderPuzzleBoard();
    updatePuzzleUI();
    if (userTriggered) showPuzzleMessage("Пазл перемешан 🔀");
}

function renderPuzzleBoard() {
    if (!puzzleBoard) return;
    puzzleBoard.innerHTML = "";
    puzzleBoard.className = [
        "puzzle-board",
        puzzleRows * puzzleCols >= 25 ? "stage-hard" : "",
        puzzleRows * puzzleCols >= 16 && puzzleRows * puzzleCols < 25 ? "stage-medium" : ""
    ].filter(Boolean).join(" ");
    puzzleBoard.style.gridTemplateColumns = `repeat(${puzzleCols}, 1fr)`;
    puzzleBoard.style.gridTemplateRows = `repeat(${puzzleRows}, 1fr)`;
    puzzleBoard.style.aspectRatio = `${puzzleCols} / ${puzzleRows}`;

    puzzlePieces.forEach((piece, position) => {
        const tile = document.createElement("button");
        tile.className = position === puzzleSelectedIndex ? "puzzle-tile selected" : "puzzle-tile";
        tile.dataset.position = String(position);
        tile.dataset.piece = String(piece);
        tile.draggable = true;

        const col = piece % puzzleCols;
        const row = Math.floor(piece / puzzleCols);
        tile.style.backgroundImage = `url('${puzzleCurrentImage.src}')`;
        tile.style.backgroundSize = `${puzzleCols * 100}% ${puzzleRows * 100}%`;
        tile.style.backgroundPosition = `${puzzleCols === 1 ? 0 : (col * 100) / (puzzleCols - 1)}% ${puzzleRows === 1 ? 0 : (row * 100) / (puzzleRows - 1)}%`;

        tile.onclick = () => selectOrSwapPuzzleTile(position);
        tile.addEventListener("dragstart", event => startPuzzleDrag(event, position));
        tile.addEventListener("dragover", event => event.preventDefault());
        tile.addEventListener("drop", event => dropPuzzleTile(event, position));

        puzzleBoard.appendChild(tile);
    });
}

function selectOrSwapPuzzleTile(position) {
    if (puzzleSolved) return;
    if (puzzleSelectedIndex === null) {
        puzzleSelectedIndex = position;
        renderPuzzleBoard();
        return;
    }
    if (puzzleSelectedIndex === position) {
        puzzleSelectedIndex = null;
        renderPuzzleBoard();
        return;
    }
    swapPuzzlePieces(puzzleSelectedIndex, position);
    puzzleSelectedIndex = null;
}

function startPuzzleDrag(event, position) {
    if (puzzleSolved) return;
    puzzleDragIndex = position;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(position));
}

function dropPuzzleTile(event, position) {
    event.preventDefault();
    if (puzzleSolved) return;
    const from = puzzleDragIndex !== null ? puzzleDragIndex : parseInt(event.dataTransfer.getData("text/plain"), 10);
    if (Number.isFinite(from) && from !== position) swapPuzzlePieces(from, position);
    puzzleDragIndex = null;
}

function swapPuzzlePieces(from, to) {
    [puzzlePieces[from], puzzlePieces[to]] = [puzzlePieces[to], puzzlePieces[from]];
    puzzleMovesCount++;
    playSound("click");
    renderPuzzleBoard();
    updatePuzzleUI();
    checkPuzzleWin();
}

function updatePuzzleUI() {
    const stage = getCurrentPuzzleStage();
    const best = puzzleBestMoves[getPuzzleBestKey()];
    if (puzzleMoves) puzzleMoves.textContent = String(puzzleMovesCount);
    if (puzzleStageLabel) puzzleStageLabel.textContent = `${stage.label} ${stage.short}`;
    if (puzzleBestLabel) puzzleBestLabel.textContent = best ? String(best) : "—";
    if (puzzleReference) {
        puzzleReference.style.backgroundImage = `url('${puzzleCurrentImage.src}')`;
        puzzleReference.style.backgroundSize = "contain";
        puzzleReference.style.backgroundPosition = "center";
    }
    if (puzzleImageLabel) puzzleImageLabel.textContent = puzzleCurrentImage.label;
    if (puzzleTitleText) puzzleTitleText.textContent = t('puzzle.assemble', {label: puzzleCurrentImage.label});
    if (puzzleProgressNote) {
        const nextStage = puzzleStages.find(item => item.id > maxUnlockedPuzzleStage);
        const lockedCount = puzzleImageCatalog.filter(item => !unlockedPuzzleImages.includes(item.key)).length;
        puzzleProgressNote.innerHTML = nextStage
            ? `Открыто <strong>${maxUnlockedPuzzleStage}/${puzzleStages.length}</strong> этапов. Следующий ${nextStage.short}: собери текущий пазл или купи за ${nextStage.unlockPrice}🪙. Финал: 6x6. Закрытых картинок: ${lockedCount}.`
            : `Все <strong>${puzzleStages.length}/${puzzleStages.length}</strong> этапов открыты! Финальный уровень — 6x6. Закрытых картинок с животными: ${lockedCount}.`;
    }
    if (puzzleCoins) puzzleCoins.textContent = String(coins);
}

function checkPuzzleWin() {
    if (!puzzlePieces.every((piece, index) => piece === index)) return;
    puzzleSolved = true;
    const stage = getCurrentPuzzleStage();
    const bestKey = getPuzzleBestKey();
    const oldBest = puzzleBestMoves[bestKey];
    if (!oldBest || puzzleMovesCount < oldBest) puzzleBestMoves[bestKey] = puzzleMovesCount;

    const reward = halfReward(stage.reward + Math.max(0, 8 - Math.floor(puzzleMovesCount / Math.max(1, Math.ceil(stage.pieces / 6)))));
    let unlockedStageText = "";
    const nextStage = puzzleStages.find(item => item.id === stage.id + 1);
    if (stage.id >= maxUnlockedPuzzleStage && nextStage) {
        maxUnlockedPuzzleStage = nextStage.id;
        unlockedStageText = ` Открыт следующий этап ${nextStage.short}!`;
    }
    coins += reward;
    puzzleCompleted++;
    updateTaskProgress("puzzle", 1);
    updateTaskProgress("play", 1);
    petCareStats.play = (petCareStats.play || 0) + 1;
    petCareStats.mood = clamp((petCareStats.mood || 80) + 8, 0, 100);
    saveProgress();
    updateCoinsViews();
    renderPuzzleStages();
    updatePuzzleUI();
    playSound("win");
    showPuzzleWinPop(reward, unlockedStageText);
    showPuzzleMessage(`Готово! +${reward} монет.${unlockedStageText} Питомец стал счастливее 💚`);
    setTimeout(() => {
        buildPuzzlePieces();
        shufflePuzzle(false);
    }, 1900);
}

function showPuzzleHint() {
    if (!puzzleBoard) return;
    const tiles = puzzleBoard.querySelectorAll(".puzzle-tile");
    tiles.forEach(tile => {
        const pos = Number(tile.dataset.position);
        const piece = Number(tile.dataset.piece);
        if (pos === piece) tile.classList.add("correct-hint");
    });
    showPuzzleMessage("Зелёные кусочки уже стоят правильно ✨");
    setTimeout(() => tiles.forEach(tile => tile.classList.remove("correct-hint")), 1600);
}

function handlePuzzleFileUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
        showPuzzleMessage("Выбери картинку из галереи 📷");
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        const src = String(reader.result || "");
        if (!src) return;
        puzzleCurrentImage = { id: `custom_${Date.now()}`, label: "Своя картинка", src };
        buildPuzzlePieces();
        shufflePuzzle(false);
        renderPuzzleImageRail();
        showPuzzleMessage("Своя картинка загружена. Собираем пазл! 📷");
        if (puzzleFileInput) puzzleFileInput.value = "";
    };
    reader.readAsDataURL(file);
}

function showPuzzleMessage(text) {
    if (puzzleMessage) puzzleMessage.textContent = text;
}

function showPuzzleWinPop(reward, unlockedStageText = "") {
    const old = document.querySelector(".puzzle-win-pop");
    if (old) old.remove();
    const pop = document.createElement("div");
    pop.className = "puzzle-win-pop";
    pop.innerHTML = `<span class="big">🎉</span>${t('puzzle.complete', {reward, extra: unlockedStageText})}`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 1700);
}



/* ===== Zoo Pet World Stage 3: Zoo Block mini-game logic ===== */
const ZOO_BLOCK_SIZE = 8;
let zooBlockGrid = Array(ZOO_BLOCK_SIZE * ZOO_BLOCK_SIZE).fill(null);
let zooBlockPieces = [];
let zooBlockScore = 0;
let zooBlockCombo = 0;
let zooBlockSelectedPieceIndex = null;
let zooBlockDragPieceIndex = null;
let zooBlockPointerDrag = null;
let zooBlockDragGhost = null;
let zooBlockLastPreviewIndex = null;
let zooBlockSuppressPieceClick = false;
let zooBlockGameOver = false;
let zooBlockBestScore = parseInt(safeStorage.get("zooBlockBestScore") || "0", 10);
if (!Number.isFinite(zooBlockBestScore)) zooBlockBestScore = 0;
let zooBlockGamesPlayed = parseInt(safeStorage.get("zooBlockGamesPlayed") || "0", 10);
if (!Number.isFinite(zooBlockGamesPlayed)) zooBlockGamesPlayed = 0;

const zooBlockShapes = [
    { id: "single", cells: [[0,0]] },
    { id: "dominoH", cells: [[0,0],[0,1]] },
    { id: "dominoV", cells: [[0,0],[1,0]] },
    { id: "line3H", cells: [[0,0],[0,1],[0,2]] },
    { id: "line3V", cells: [[0,0],[1,0],[2,0]] },
    { id: "line4H", cells: [[0,0],[0,1],[0,2],[0,3]] },
    { id: "line4V", cells: [[0,0],[1,0],[2,0],[3,0]] },
    { id: "square2", cells: [[0,0],[0,1],[1,0],[1,1]] },
    { id: "corner3", cells: [[0,0],[1,0],[1,1]] },
    { id: "corner3b", cells: [[0,1],[1,0],[1,1]] },
    { id: "corner4", cells: [[0,0],[1,0],[2,0],[2,1]] },
    { id: "tee", cells: [[0,0],[0,1],[0,2],[1,1]] },
    { id: "zig", cells: [[0,0],[0,1],[1,1],[1,2]] },
    { id: "plus", cells: [[0,1],[1,0],[1,1],[1,2],[2,1]] }
];

function openZooBlock() {
    playSound("click");
    showScreen("blockScreen");
}

function renderZooBlockScreen() {
    if (!blockBoard) return;
    if (!zooBlockPieces.length || zooBlockGameOver) restartZooBlock(false);
    renderZooBlockBoard();
    renderZooBlockPieces();
    updateZooBlockUI();
    if (blockMascot) blockMascot.src = animalImageSrc(selectedMainPetKey || "lion");
}

function restartZooBlock(userTriggered = true) {
    closeZooBlockGameOverModal();
    zooBlockGrid = Array(ZOO_BLOCK_SIZE * ZOO_BLOCK_SIZE).fill(null);
    zooBlockScore = 0;
    zooBlockCombo = 0;
    zooBlockSelectedPieceIndex = null;
    zooBlockDragPieceIndex = null;
    cleanupZooBlockPointerDrag(false);
    zooBlockLastPreviewIndex = null;
    zooBlockGameOver = false;
    zooBlockPieces = generateZooBlockPieces();
    renderZooBlockBoard();
    renderZooBlockPieces();
    updateZooBlockUI();
    if (userTriggered) {
        showZooBlockMessage(guideT("Новая партия! Выбери фигуру и поставь её на поле 🧱", "New game! Choose a piece and place it on the board 🧱"));
        playSound("click");
    }
}

function createZooBlockPiece() {
    const shape = zooBlockShapes[Math.floor(Math.random() * zooBlockShapes.length)];
    return {
        id: `${shape.id}_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        shapeId: shape.id,
        cells: shape.cells.map(cell => [cell[0], cell[1]]),
        color: Math.floor(Math.random() * 6),
        used: false
    };
}

function generateZooBlockPieces() {
    const pieces = [createZooBlockPiece(), createZooBlockPiece(), createZooBlockPiece()];
    return pieces.map(piece => (!piece.cells || !piece.cells.length) ? createZooBlockPiece() : piece);
}

function renderZooBlockBoard(preview = null) {
    if (!blockBoard) return;
    blockBoard.innerHTML = "";
    const previewMap = new Map();
    if (preview && Array.isArray(preview.cells)) {
        preview.cells.forEach(index => previewMap.set(index, {
            state: preview.ok ? "preview-ok" : "preview-bad",
            color: Number.isFinite(preview.color) ? preview.color : 1
        }));
    }
    zooBlockGrid.forEach((color, index) => {
        const previewInfo = previewMap.get(index);
        const cell = document.createElement("button");
        cell.className = [
            "block-cell",
            color !== null ? "filled" : "",
            color !== null ? `block-color-${color}` : "",
            previewInfo ? previewInfo.state : "",
            previewInfo ? `preview-color-${previewInfo.color}` : ""
        ].filter(Boolean).join(" ");
        cell.dataset.index = String(index);
        cell.onclick = () => placeSelectedZooBlockAt(index);
        cell.addEventListener("dragover", event => {
            event.preventDefault();
            const dragIndex = zooBlockDragPieceIndex !== null ? zooBlockDragPieceIndex : zooBlockSelectedPieceIndex;
            previewZooBlockAt(index, dragIndex);
        });
        cell.addEventListener("dragleave", () => {
            if (zooBlockDragPieceIndex === null && !zooBlockPointerDrag) renderZooBlockBoard();
        });
        cell.addEventListener("drop", event => dropZooBlockPiece(event, index));
        blockBoard.appendChild(cell);
    });
}

function getPieceBounds(piece) {
    const rows = piece.cells.map(cell => cell[0]);
    const cols = piece.cells.map(cell => cell[1]);
    return {
        rows: Math.max(...rows) + 1,
        cols: Math.max(...cols) + 1
    };
}


function buildZooBlockMiniGrid(piece) {
    const bounds = getPieceBounds(piece);
    const mini = document.createElement("div");
    mini.className = "block-mini-grid";
    mini.style.gridTemplateColumns = `repeat(${Math.max(3, bounds.cols)}, minmax(0, 1fr))`;
    mini.style.gridTemplateRows = `repeat(${Math.max(3, bounds.rows)}, minmax(0, 1fr))`;
    const totalRows = Math.max(3, bounds.rows);
    const totalCols = Math.max(3, bounds.cols);
    for (let r = 0; r < totalRows; r++) {
        for (let c = 0; c < totalCols; c++) {
            const miniCell = document.createElement("div");
            const filled = piece.cells.some(([pr, pc]) => pr === r && pc === c);
            miniCell.className = ["block-mini-cell", filled ? "filled" : "", filled ? `block-color-${piece.color}` : ""].filter(Boolean).join(" ");
            mini.appendChild(miniCell);
        }
    }
    return mini;
}

function getZooBlockPointerAnchor(piece, sourceEl, clientX, clientY) {
    const bounds = getPieceBounds(piece);
    const totalRows = Math.max(3, bounds.rows);
    const totalCols = Math.max(3, bounds.cols);
    const mini = sourceEl && sourceEl.querySelector ? sourceEl.querySelector(".block-mini-grid") : null;
    const rect = (mini || sourceEl).getBoundingClientRect();
    const relX = Math.max(0, Math.min(rect.width - 1, clientX - rect.left));
    const relY = Math.max(0, Math.min(rect.height - 1, clientY - rect.top));
    const approxCol = Math.max(0, Math.min(totalCols - 1, Math.floor((relX / rect.width) * totalCols)));
    const approxRow = Math.max(0, Math.min(totalRows - 1, Math.floor((relY / rect.height) * totalRows)));
    let best = piece.cells[0] || [0, 0];
    let bestDist = Number.POSITIVE_INFINITY;
    piece.cells.forEach(([r, c]) => {
        const dist = Math.abs(r - approxRow) + Math.abs(c - approxCol);
        if (dist < bestDist) {
            best = [r, c];
            bestDist = dist;
        }
    });
    return {
        row: best[0],
        col: best[1],
        totalRows,
        totalCols
    };
}

function getZooBlockPlacementIndexFromPoint(clientX, clientY, pieceIndex, dragData = null) {
    const pointedIndex = getBlockCellIndexFromPoint(clientX, clientY);
    if (pointedIndex === null) return null;
    const piece = zooBlockPieces[pieceIndex];
    if (!piece) return pointedIndex;
    const anchorData = dragData || zooBlockPointerDrag || {};
    const anchorRow = Math.max(0, Math.floor(anchorData.anchorRow || 0));
    const anchorCol = Math.max(0, Math.floor(anchorData.anchorCol || 0));
    const pointedRow = Math.floor(pointedIndex / ZOO_BLOCK_SIZE);
    const pointedCol = pointedIndex % ZOO_BLOCK_SIZE;
    const originRow = pointedRow - anchorRow;
    const originCol = pointedCol - anchorCol;
    return originRow * ZOO_BLOCK_SIZE + originCol;
}

function getBlockCellIndexFromPoint(clientX, clientY) {
    if (!blockBoard) return null;
    const element = document.elementFromPoint(clientX, clientY);
    const directCell = element && element.closest ? element.closest(".block-cell") : null;
    if (directCell && blockBoard.contains(directCell)) {
        const index = parseInt(directCell.dataset.index, 10);
        return Number.isFinite(index) ? index : null;
    }

    const boardRect = blockBoard.getBoundingClientRect();
    if (clientX < boardRect.left || clientX > boardRect.right || clientY < boardRect.top || clientY > boardRect.bottom) return null;

    // Pointer can land on the small gap between cells. In that case use the nearest board coordinate.
    const relativeX = Math.max(0, Math.min(boardRect.width - 1, clientX - boardRect.left));
    const relativeY = Math.max(0, Math.min(boardRect.height - 1, clientY - boardRect.top));
    const col = Math.max(0, Math.min(ZOO_BLOCK_SIZE - 1, Math.floor((relativeX / boardRect.width) * ZOO_BLOCK_SIZE)));
    const row = Math.max(0, Math.min(ZOO_BLOCK_SIZE - 1, Math.floor((relativeY / boardRect.height) * ZOO_BLOCK_SIZE)));
    return row * ZOO_BLOCK_SIZE + col;
}

function moveZooBlockDragGhost(clientX, clientY) {
    if (!zooBlockDragGhost) return;
    const drag = zooBlockPointerDrag || {};
    const offsetX = Number.isFinite(drag.ghostOffsetX) ? drag.ghostOffsetX : (zooBlockDragGhost.offsetWidth / 2);
    const offsetY = Number.isFinite(drag.ghostOffsetY) ? drag.ghostOffsetY : (zooBlockDragGhost.offsetHeight / 2);
    zooBlockDragGhost.style.left = (clientX - offsetX) + "px";
    zooBlockDragGhost.style.top = (clientY - offsetY) + "px";
}

function createZooBlockDragGhost(piece, clientX, clientY, dragData = null) {
    cleanupZooBlockDragGhost();
    const ghost = document.createElement("div");
    ghost.className = "block-drag-ghost";
    const mini = buildZooBlockMiniGrid(piece);
    ghost.appendChild(mini);
    document.body.appendChild(ghost);
    zooBlockDragGhost = ghost;
    const drag = dragData || zooBlockPointerDrag || {};
    const miniRect = mini.getBoundingClientRect();
    const totalRows = Math.max(3, (drag.totalRows || getPieceBounds(piece).rows));
    const totalCols = Math.max(3, (drag.totalCols || getPieceBounds(piece).cols));
    const cellW = miniRect.width / totalCols;
    const cellH = miniRect.height / totalRows;
    drag.ghostOffsetX = (drag.anchorCol || 0) * cellW + cellW / 2 + 4;
    drag.ghostOffsetY = (drag.anchorRow || 0) * cellH + cellH / 2 + 4;
    moveZooBlockDragGhost(clientX, clientY);
}

function cleanupZooBlockDragGhost() {
    if (zooBlockDragGhost) {
        zooBlockDragGhost.remove();
        zooBlockDragGhost = null;
    }
}

function cleanupZooBlockPointerDrag(shouldRender = true) {
    if (zooBlockPointerDrag && zooBlockPointerDrag.releaseTarget && zooBlockPointerDrag.pointerId !== undefined) {
        try { zooBlockPointerDrag.releaseTarget.releasePointerCapture(zooBlockPointerDrag.pointerId); } catch(e) {}
    }
    zooBlockPointerDrag = null;
    zooBlockDragPieceIndex = null;
    zooBlockLastPreviewIndex = null;
    cleanupZooBlockDragGhost();
    if (shouldRender) {
        renderZooBlockBoard();
        renderZooBlockPieces();
    }
}

function startZooBlockPointerDrag(event, index, sourceEl) {
    const piece = zooBlockPieces[index];
    if (!piece || piece.used || zooBlockGameOver) return;
    if (event.button !== undefined && event.button !== 0) return;
    initAudio();
    const anchor = getZooBlockPointerAnchor(piece, sourceEl, event.clientX, event.clientY);
    zooBlockPointerDrag = {
        index,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastY: event.clientY,
        active: false,
        releaseTarget: sourceEl,
        anchorRow: anchor.row,
        anchorCol: anchor.col,
        totalRows: anchor.totalRows,
        totalCols: anchor.totalCols
    };
    try { sourceEl.setPointerCapture(event.pointerId); } catch(e) {}
}

function startZooBlockMouseDrag(event, index, sourceEl) {
    // Fallback for desktop browsers/tests where pointer events are not emitted from mouse actions.
    if (zooBlockPointerDrag) return;
    if (event.button !== undefined && event.button !== 0) return;
    startZooBlockPointerDrag({
        pointerId: "mouse",
        clientX: event.clientX,
        clientY: event.clientY,
        button: event.button,
        preventDefault: () => event.preventDefault()
    }, index, sourceEl);
}

function startZooBlockTouchDrag(event, index, sourceEl) {
    // Extra fallback for older Android WebView builds. Modern WebView usually uses pointer events.
    if (zooBlockPointerDrag) return;
    const touch = event.touches && event.touches[0];
    if (!touch) return;
    event.preventDefault();
    startZooBlockPointerDrag({
        pointerId: "touch",
        clientX: touch.clientX,
        clientY: touch.clientY,
        button: 0,
        preventDefault: () => event.preventDefault()
    }, index, sourceEl);
}

function moveZooBlockMouseDrag(event) {
    if (!zooBlockPointerDrag || zooBlockPointerDrag.pointerId !== "mouse") return;
    moveZooBlockPointerDrag({
        pointerId: "mouse",
        clientX: event.clientX,
        clientY: event.clientY,
        preventDefault: () => event.preventDefault()
    });
}

function endZooBlockMouseDrag(event) {
    if (!zooBlockPointerDrag || zooBlockPointerDrag.pointerId !== "mouse") return;
    endZooBlockPointerDrag({
        pointerId: "mouse",
        clientX: event.clientX,
        clientY: event.clientY,
        preventDefault: () => event.preventDefault()
    });
}

function moveZooBlockTouchDrag(event) {
    if (!zooBlockPointerDrag || zooBlockPointerDrag.pointerId !== "touch") return;
    const touch = event.touches && event.touches[0];
    if (!touch) return;
    moveZooBlockPointerDrag({
        pointerId: "touch",
        clientX: touch.clientX,
        clientY: touch.clientY,
        preventDefault: () => event.preventDefault()
    });
}

function endZooBlockTouchDrag(event) {
    if (!zooBlockPointerDrag || zooBlockPointerDrag.pointerId !== "touch") return;
    const touch = (event.changedTouches && event.changedTouches[0]) || (event.touches && event.touches[0]);
    const clientX = touch ? touch.clientX : zooBlockPointerDrag.lastX;
    const clientY = touch ? touch.clientY : zooBlockPointerDrag.lastY;
    endZooBlockPointerDrag({
        pointerId: "touch",
        clientX,
        clientY,
        preventDefault: () => event.preventDefault()
    });
}

function moveZooBlockPointerDrag(event) {
    if (!zooBlockPointerDrag) return;
    const drag = zooBlockPointerDrag;
    if (event.pointerId !== drag.pointerId) return;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const distance = Math.hypot(dx, dy);
    if (!drag.active && distance > 7) {
        drag.active = true;
        zooBlockSuppressPieceClick = true;
        zooBlockDragPieceIndex = drag.index;
        zooBlockSelectedPieceIndex = drag.index;
        const piece = zooBlockPieces[drag.index];
        createZooBlockDragGhost(piece, event.clientX, event.clientY, drag);
        renderZooBlockPieces();
        showZooBlockMessage(guideT("Наведи фигуру на поле: зелёный силуэт — можно ставить, красный — нельзя.", "Move the piece over the board: green silhouette fits, red does not."));
    }
    if (!drag.active) return;
    event.preventDefault();
    moveZooBlockDragGhost(event.clientX, event.clientY);
    const targetIndex = getZooBlockPlacementIndexFromPoint(event.clientX, event.clientY, drag.index, drag);
    if (targetIndex !== null) {
        zooBlockLastPreviewIndex = targetIndex;
        previewZooBlockAt(targetIndex, drag.index);
    } else if (zooBlockLastPreviewIndex !== null) {
        zooBlockLastPreviewIndex = null;
        renderZooBlockBoard();
    }
}

function endZooBlockPointerDrag(event) {
    if (!zooBlockPointerDrag) return;
    const drag = zooBlockPointerDrag;
    if (event.pointerId !== undefined && event.pointerId !== drag.pointerId) return;
    if (drag.active) {
        event.preventDefault();
        const dropIndex = getZooBlockPlacementIndexFromPoint(drag.lastX, drag.lastY, drag.index, drag);
        zooBlockSelectedPieceIndex = drag.index;
        if (dropIndex !== null) {
            placeSelectedZooBlockAt(dropIndex);
        } else {
            showZooBlockMessage(guideT("Перетащи фигуру прямо на поле 8x8.", "Drag the piece directly onto the 8x8 board."));
            playSound("wrong");
            cleanupZooBlockPointerDrag(true);
        }
        setTimeout(() => { zooBlockSuppressPieceClick = false; }, 80);
    } else {
        cleanupZooBlockPointerDrag(false);
    }
}

function renderZooBlockPieces() {
    if (!blockPieces) return;
    blockPieces.innerHTML = "";
    zooBlockPieces.forEach((piece, index) => {
        const btn = document.createElement("button");
        btn.className = [
            "block-piece",
            index === zooBlockSelectedPieceIndex ? "selected" : "",
            index === zooBlockDragPieceIndex ? "dragging-source" : "",
            piece.used ? "used" : ""
        ].filter(Boolean).join(" ");
        btn.draggable = false;
        btn.setAttribute("aria-label", guideT(`Фигура ${index + 1}`, `Piece ${index + 1}`));
        btn.dataset.shape = piece.shapeId;
        btn.dataset.cells = String(piece.cells.length);
        btn.dataset.index = String(index);
        btn.title = guideT(`Фигура: ${piece.cells.length} блоков`, `Piece: ${piece.cells.length} blocks`);
        btn.onclick = (event) => {
            if (zooBlockSuppressPieceClick) {
                event.preventDefault();
                event.stopPropagation();
                zooBlockSuppressPieceClick = false;
                return;
            }
            selectZooBlockPiece(index);
        };
        btn.addEventListener("dragstart", event => startZooBlockDrag(event, index));
        btn.addEventListener("pointerdown", event => startZooBlockPointerDrag(event, index, btn));
        btn.addEventListener("mousedown", event => startZooBlockMouseDrag(event, index, btn));
        btn.addEventListener("touchstart", event => startZooBlockTouchDrag(event, index, btn), { passive: false });

        const mini = buildZooBlockMiniGrid(piece);
        btn.appendChild(mini);
        blockPieces.appendChild(btn);
    });
    try { refreshGuideHelpers("blockScreen"); } catch(e) {}
}

function selectZooBlockPiece(index) {
    const piece = zooBlockPieces[index];
    if (!piece || piece.used || zooBlockGameOver) return;
    zooBlockSelectedPieceIndex = zooBlockSelectedPieceIndex === index ? null : index;
    renderZooBlockPieces();
    showZooBlockMessage(guideT("Теперь нажми клетку на поле, куда поставить фигуру.", "Now tap a board cell where you want to place the piece."));
    playSound("click");
}

function startZooBlockDrag(event, index) {
    const piece = zooBlockPieces[index];
    if (!piece || piece.used || zooBlockGameOver) return;
    zooBlockDragPieceIndex = index;
    zooBlockSelectedPieceIndex = index;
    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(index));
    }
    renderZooBlockPieces();
}

function getZooBlockPlacementCells(piece, targetIndex) {
    const row = Math.floor(targetIndex / ZOO_BLOCK_SIZE);
    const col = targetIndex % ZOO_BLOCK_SIZE;
    const cells = [];
    let ok = true;
    piece.cells.forEach(([dr, dc]) => {
        const r = row + dr;
        const c = col + dc;
        if (r < 0 || r >= ZOO_BLOCK_SIZE || c < 0 || c >= ZOO_BLOCK_SIZE) {
            ok = false;
            return;
        }
        const index = r * ZOO_BLOCK_SIZE + c;
        if (zooBlockGrid[index] !== null) ok = false;
        cells.push(index);
    });
    return { ok, cells };
}

function canPlaceZooBlockPiece(piece, targetIndex) {
    return getZooBlockPlacementCells(piece, targetIndex).ok;
}

function canPlaceZooBlockAnywhere(piece) {
    if (!piece || piece.used) return false;
    for (let i = 0; i < ZOO_BLOCK_SIZE * ZOO_BLOCK_SIZE; i++) {
        if (canPlaceZooBlockPiece(piece, i)) return true;
    }
    return false;
}

function previewZooBlockAt(targetIndex, pieceIndex = zooBlockSelectedPieceIndex) {
    const piece = zooBlockPieces[pieceIndex];
    if (!piece || piece.used || zooBlockGameOver) return;
    const placement = getZooBlockPlacementCells(piece, targetIndex);
    renderZooBlockBoard({ ...placement, color: piece.color });
}

function dropZooBlockPiece(event, targetIndex) {
    event.preventDefault();
    const from = zooBlockDragPieceIndex !== null ? zooBlockDragPieceIndex : parseInt(event.dataTransfer ? event.dataTransfer.getData("text/plain") : "", 10);
    if (Number.isFinite(from)) {
        zooBlockSelectedPieceIndex = from;
        placeSelectedZooBlockAt(targetIndex);
    }
    cleanupZooBlockPointerDrag(false);
    zooBlockDragPieceIndex = null;
}

function placeSelectedZooBlockAt(targetIndex) {
    if (zooBlockGameOver) return;
    const piece = zooBlockPieces[zooBlockSelectedPieceIndex];
    if (!piece || piece.used) {
        showZooBlockMessage(guideT("Сначала выбери фигуру снизу 👇", "Choose a piece below first 👇"));
        playSound("wrong");
        return;
    }
    const placement = getZooBlockPlacementCells(piece, targetIndex);
    if (!placement.ok) {
        showZooBlockMessage(guideT("Сюда фигура не помещается. Попробуй другое место.", "The piece does not fit here. Try another place."));
        playSound("wrong");
        cleanupZooBlockPointerDrag(false);
        renderZooBlockBoard();
        renderZooBlockPieces();
        return;
    }
    placement.cells.forEach(index => { zooBlockGrid[index] = piece.color; });
    piece.used = true;
    zooBlockScore += piece.cells.length * 8;
    zooBlockSelectedPieceIndex = null;
    zooBlockDragPieceIndex = null;
    zooBlockLastPreviewIndex = null;
    cleanupZooBlockPointerDrag(false);
    playSound("match");
    const cleared = findZooBlockLinesToClear();
    if (cleared.cells.length) {
        animateAndClearZooBlockLines(cleared);
    } else {
        zooBlockCombo = 0;
        afterZooBlockMove();
    }
}

function findZooBlockLinesToClear() {
    const clearSet = new Set();
    let lineCount = 0;
    for (let r = 0; r < ZOO_BLOCK_SIZE; r++) {
        const rowCells = Array.from({ length: ZOO_BLOCK_SIZE }, (_, c) => r * ZOO_BLOCK_SIZE + c);
        if (rowCells.every(index => zooBlockGrid[index] !== null)) {
            lineCount++;
            rowCells.forEach(index => clearSet.add(index));
        }
    }
    for (let c = 0; c < ZOO_BLOCK_SIZE; c++) {
        const colCells = Array.from({ length: ZOO_BLOCK_SIZE }, (_, r) => r * ZOO_BLOCK_SIZE + c);
        if (colCells.every(index => zooBlockGrid[index] !== null)) {
            lineCount++;
            colCells.forEach(index => clearSet.add(index));
        }
    }
    return { lineCount, cells: Array.from(clearSet) };
}

function animateAndClearZooBlockLines(cleared) {
    renderZooBlockBoard();
    cleared.cells.forEach(index => {
        const cell = blockBoard && blockBoard.children[index];
        if (cell) cell.classList.add("clearing");
    });
    setTimeout(() => {
        cleared.cells.forEach(index => { zooBlockGrid[index] = null; });
        zooBlockCombo++;
        const comboBonus = Math.max(0, zooBlockCombo - 1) * 25;
        const lineBonus = cleared.lineCount * 80 + comboBonus;
        zooBlockScore += lineBonus;
        showZooBlockPop(`${cleared.lineCount} ${guideT("линия", "line")}!`, `+${lineBonus} ${guideT("очков", "points")}${zooBlockCombo > 1 ? ` • ${guideT("комбо", "combo")} x${zooBlockCombo}` : ""}`);
        playSound("win");
        playZooBlockCoinBurst();
        afterZooBlockMove();
    }, 330);
}

function afterZooBlockMove() {
    if (zooBlockPieces.every(piece => piece.used)) {
        zooBlockPieces = generateZooBlockPieces();
        showZooBlockMessage(guideT("Новые фигуры готовы! Продолжай закрывать линии 🧱", "New pieces are ready! Keep clearing lines 🧱"));
    }
    if (zooBlockScore > zooBlockBestScore) zooBlockBestScore = zooBlockScore;
    renderZooBlockBoard();
    renderZooBlockPieces();
    updateZooBlockUI();
    if (!zooBlockPieces.some(piece => canPlaceZooBlockAnywhere(piece))) {
        finishZooBlockGame();
    }
    saveProgress();
}

function updateZooBlockUI() {
    if (blockScore) blockScore.textContent = String(zooBlockScore);
    if (blockBest) blockBest.textContent = String(Math.max(zooBlockBestScore, zooBlockScore));
    if (blockCombo) blockCombo.textContent = String(zooBlockCombo);
    if (blockCoins) blockCoins.textContent = String(coins);
    if (blockComboBadge) {
        blockComboBadge.textContent = zooBlockCombo > 1
            ? guideT(`Комбо x${zooBlockCombo}! Питомец радуется 💚`, `Combo x${zooBlockCombo}! Pet is happy 💚`)
            : guideT("Комбо ждёт тебя ✨", "Combo is waiting ✨");
    }
    if (blockMascot && !blockMascot.src) blockMascot.src = animalImageSrc(selectedMainPetKey || "lion");
}


function scrollFoodRailBy(id, delta) {
    const rail = document.getElementById(id);
    if (!rail) return;
    rail.scrollBy({ left: delta, behavior: "smooth" });
}

function showZooBlockGameOverModal(reward) {
    const overlay = document.getElementById("blockGameOverOverlay");
    const title = document.getElementById("blockGameOverTitle");
    const text = document.getElementById("blockGameOverText");
    if (!overlay || !title || !text) return;
    title.textContent = guideT("Игра окончена", "Game over");
    text.textContent = guideT(`Награда: +${reward} монет 🪙. Нет места для фигур — нажми «Заново» и начни новую партию!`, `Reward: +${reward} coins 🪙. No room for pieces — tap Restart to begin a new game!`);
    overlay.classList.add("show");
}

function closeZooBlockGameOverModal() {
    const overlay = document.getElementById("blockGameOverOverlay");
    if (overlay) overlay.classList.remove("show");
}

function restartZooBlockFromModal() {
    closeZooBlockGameOverModal();
    restartZooBlock(true);
}

function finishZooBlockGame() {
    zooBlockGameOver = true;
    zooBlockBestScore = Math.max(zooBlockBestScore, zooBlockScore);
    zooBlockGamesPlayed++;
    // Stage 4 fix: removed halfReward — Zoo Block now pays full score-based reward.
    // Minimum 8 coins per game (was ~4), scales with score.
    const reward = Math.max(8, Math.floor(zooBlockScore / 75));
    coins += reward;
    updateTaskProgress("block", 1);
    updateTaskProgress("play", 1);
    const care = getPetCare(selectedMainPetKey || "lion");
    setPetCare(selectedMainPetKey || "lion", {
        mood: care.mood + 10,
        energy: care.energy - 5,
        hunger: care.hunger - 4,
        cleanliness: care.cleanliness - 2,
        careActions: (care.careActions || 0) + 1
    });
    saveProgress();
    updateCoinsViews();
    updateZooBlockUI();
    showZooBlockPop(t('block.gameover'), t('block.reward_pop', {coins: reward}));
    showZooBlockGameOverModal(reward);
    showZooBlockMessage(guideT("Нет места для фигур. Нажми Заново, чтобы начать новую игру.", "No space for pieces. Tap Restart to start a new game."));
    playSound("coin");
}

function showZooBlockHint() {
    if (zooBlockGameOver) {
        showZooBlockMessage(guideT("Игра закончилась. Начни заново 🔄", "Game is over. Restart 🔄"));
        return;
    }
    let found = null;
    for (let p = 0; p < zooBlockPieces.length; p++) {
        const piece = zooBlockPieces[p];
        if (!piece || piece.used) continue;
        for (let i = 0; i < ZOO_BLOCK_SIZE * ZOO_BLOCK_SIZE; i++) {
            const placement = getZooBlockPlacementCells(piece, i);
            if (placement.ok) {
                found = { pieceIndex: p, placement };
                break;
            }
        }
        if (found) break;
    }
    if (!found) {
        finishZooBlockGame();
        return;
    }
    zooBlockSelectedPieceIndex = found.pieceIndex;
    renderZooBlockPieces();
    renderZooBlockBoard({ ok: true, cells: found.placement.cells });
    showZooBlockMessage(guideT("Подсказка подсветила место для одной фигуры ✨", "Hint highlighted a place for one piece ✨"));
    setTimeout(() => renderZooBlockBoard(), 1500);
}

function showZooBlockMessage(text) {
    if (blockMessage) blockMessage.textContent = text;
}

function showZooBlockPop(title, sub = "") {
    const old = document.querySelector(".block-pop");
    if (old) old.remove();
    const pop = document.createElement("div");
    pop.className = "block-pop";
    pop.innerHTML = `${title}<small>${sub}</small>`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 1450);
}

function playZooBlockCoinBurst() {
    for (let i = 0; i < 5; i++) {
        const coin = document.createElement("div");
        coin.className = "block-fly-coin";
        coin.textContent = i % 2 ? "⭐" : "🪙";
        coin.style.left = (window.innerWidth / 2 + (Math.random() * 120 - 60)) + "px";
        coin.style.top = (window.innerHeight * 0.45 + (Math.random() * 40 - 20)) + "px";
        coin.style.animationDelay = (i * 0.05) + "s";
        document.body.appendChild(coin);
        setTimeout(() => coin.remove(), 1000);
    }
}



function runZooBlockSelfTest() {
    const oldGrid = zooBlockGrid.slice();
    const oldPieces = zooBlockPieces.map(piece => ({ ...piece, cells: piece.cells.map(cell => cell.slice()) }));
    const oldScore = zooBlockScore;
    const testPiece = { cells: [[0,0],[0,1]], color: 2, used: false };
    zooBlockGrid = Array(ZOO_BLOCK_SIZE * ZOO_BLOCK_SIZE).fill(null);
    const placement = getZooBlockPlacementCells(testPiece, 0);
    const canPlace = placement.ok && placement.cells.length === 2;
    zooBlockPieces = [testPiece];
    zooBlockSelectedPieceIndex = 0;
    placeSelectedZooBlockAt(0);
    const placed = zooBlockGrid[0] === 2 && zooBlockGrid[1] === 2 && zooBlockScore >= oldScore;
    zooBlockGrid = oldGrid;
    zooBlockPieces = oldPieces;
    zooBlockScore = oldScore;
    zooBlockSelectedPieceIndex = null;
    return { canPlace, placed };
}



document.addEventListener("pointermove", moveZooBlockPointerDrag, { passive: false });
document.addEventListener("pointerup", endZooBlockPointerDrag, { passive: false });
document.addEventListener("pointercancel", endZooBlockPointerDrag, { passive: false });
document.addEventListener("mousemove", moveZooBlockMouseDrag, { passive: false });
document.addEventListener("mouseup", endZooBlockMouseDrag, { passive: false });
document.addEventListener("touchmove", moveZooBlockTouchDrag, { passive: false });
document.addEventListener("touchend", endZooBlockTouchDrag, { passive: false });
document.addEventListener("touchcancel", endZooBlockTouchDrag, { passive: false });
window.addEventListener("blur", () => cleanupZooBlockPointerDrag(true));



/* ===== Stage 4: Coloring logic ===== */
const coloringPalette = [
    '#facc15','#fb923c','#ef4444','#fbcfe8',
    '#f472b6','#ec4899','#a855f7','#7c3aed',
    '#38bdf8','#2563eb','#4ade80','#84cc16',
    '#16a34a','#9ca3af','#8b5e3c','#111827'
];
const coloringSizes = [4, 8, 14, 22];


/* ===== Stage 5.1 Shadow Game logic ===== */
const shadowBackgrounds = {"savanna": "assets/inline/asset_049_8ff06751eef1.jpg", "jungle": "assets/inline/asset_050_99d08edb5bc1.jpg", "winter": "assets/inline/asset_051_cb3069e7f70e.jpg", "meadow": "assets/inline/asset_052_3e544d8d8e46.jpg"};


const shadowHabitatByAnimal = {
    lion: 'savanna', giraffe: 'savanna', tiger: 'savanna', zebra: 'savanna', elephant: 'jungle', monkey: 'jungle', parrot: 'jungle', panda: 'jungle', koala: 'jungle', frog: 'jungle', crocodile: 'jungle', snake: 'jungle',
    penguin: 'winter', polarBear: 'winter', seal: 'winter', whale: 'winter', dolphin: 'winter',
    rabbit: 'meadow', fox: 'meadow', deer: 'meadow', raccoon: 'meadow', turtle: 'meadow', dog: 'meadow', cat: 'meadow', cow: 'meadow', horse: 'meadow', sheep: 'meadow', goat: 'meadow', chicken: 'meadow', duck: 'meadow', squirrel: 'meadow', hedgehog: 'meadow', owl: 'meadow', bear: 'meadow',
    camel: 'savanna', kangaroo: 'savanna', hippo: 'jungle', octopus: 'winter', flamingo: 'meadow', bat: 'meadow'
};

const shadowAnimals = animalKeys
    .filter(id => animalImageSrc(id))
    .map(id => ({
        id,
        name: (animalInfo[id] && animalInfo[id].name) || id,
        habitat: shadowHabitatByAnimal[id] || 'meadow'
    }));

let currentShadowLevel = null;
let shadowAnswered = false;
let shadowHintUsed = false;
let shadowFoundIds = new Set();
let shadowLevelReward = 0;
let shadowWrongCount = 0;
let shadowComboBonus = 0;
let shadowPerfectStreak = Number(safeStorage.get("zooShadowPerfectStreak", "0") || "0");
if (!Number.isFinite(shadowPerfectStreak) || shadowPerfectStreak < 0) shadowPerfectStreak = 0;

function shuffleShadowArray(list) {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getShadowDifficulty(index) {
    const block = Math.floor(index / 10);
    const targetCount = Math.min(1 + block, 5);
    const optionCount = Math.min(4 + block * 2, 12);
    // Stage 4 fix: removed halfReward — Shadow now pays full per-animal reward.
    const reward = Math.max(5, 5 + block * 3);
    const label = block === 0 ? 'Лёгкий' : block === 1 ? 'Средний' : block === 2 ? 'Сложный' : block === 3 ? 'Мастер' : 'Легенда';
    return { block, targetCount, optionCount, reward, label };
}

function getShadowAnimalByShift(shift) {
    if (!shadowAnimals.length) return null;
    return shadowAnimals[((shift % shadowAnimals.length) + shadowAnimals.length) % shadowAnimals.length];
}

function buildShadowLevel(index) {
    const difficulty = getShadowDifficulty(index);
    const safeCount = Math.max(1, shadowAnimals.length || 1);
    const start = index % safeCount;
    const targets = [];
    const usedTargetIds = new Set();
    for (let offset = 0; offset < safeCount && targets.length < difficulty.targetCount; offset++) {
        const candidate = getShadowAnimalByShift(start + offset);
        if (candidate && !usedTargetIds.has(candidate.id)) {
            targets.push(candidate);
            usedTargetIds.add(candidate.id);
        }
    }
    const targetIds = new Set(targets.map(item => item.id));
    const targetHabitats = new Set(targets.map(item => item.habitat));
    const wrongPool = shadowAnimals.filter(item => !targetIds.has(item.id));

    // Stage 5.4: stable rotation through the full animal list + smarter decoys.
    // 1-10: broad choices. 11+: same habitat. 21+: nearby animals too.
    let preferredWrong = [];
    if (difficulty.block >= 1) {
        preferredWrong = wrongPool.filter(item => targetHabitats.has(item.habitat));
    }
    if (difficulty.block >= 2) {
        const near = [];
        for (let i = 1; i <= Math.max(12, difficulty.optionCount * 3); i++) {
            const candidate = getShadowAnimalByShift(start + difficulty.targetCount + i);
            if (candidate && !targetIds.has(candidate.id) && !near.some(item => item.id === candidate.id)) near.push(candidate);
        }
        preferredWrong = [...preferredWrong, ...near];
    }
    const uniquePreferred = [];
    [...preferredWrong, ...wrongPool].forEach(item => {
        if (!targetIds.has(item.id) && !uniquePreferred.some(x => x.id === item.id)) uniquePreferred.push(item);
    });
    const requiredWrongCount = Math.max(0, Math.min(difficulty.optionCount, shadowAnimals.length) - targets.length);
    const wrong = shuffleShadowArray(uniquePreferred).slice(0, requiredWrongCount);
    const options = shuffleShadowArray([...targets, ...wrong]);
    const habitat = targets[0] ? targets[0].habitat : 'savanna';
    return { index, targets, options, habitat, difficulty };
}

function openShadowGame() {
    if (!Number.isFinite(shadowLevelIndex) || shadowLevelIndex < 0) shadowLevelIndex = 0;
    closeShadowCelebration();
    showScreen('shadowScreen');
    renderShadowLevel();
}

function renderShadowLevel() {
    currentShadowLevel = buildShadowLevel(shadowLevelIndex);
    shadowAnswered = false;
    shadowHintUsed = false;
    shadowFoundIds = new Set();
    shadowLevelReward = 0;
    shadowWrongCount = 0;
    shadowComboBonus = 0;

    const needCount = currentShadowLevel.targets.length;
    if (shadowLevelBadge) {
        shadowLevelBadge.textContent = t('shadow.level_badge', {level: shadowLevelIndex + 1, diff: currentShadowLevel.difficulty.label});
    }
    if (typeof shadowStreakBadge !== 'undefined' && shadowStreakBadge) {
        shadowStreakBadge.textContent = t('shadow.streak', {n: shadowPerfectStreak});
    }

    if (typeof shadowTargets !== 'undefined' && shadowTargets) {
        shadowTargets.innerHTML = '';
        currentShadowLevel.targets.forEach((target, idx) => {
            const item = document.createElement('div');
            const shouldObscure = currentShadowLevel.difficulty.block >= 2 && idx % 2 === 0;
            item.className = `shadow-target-item${shouldObscure ? ' obscured' : ''}`;
            item.dataset.animalId = target.id;
            item.innerHTML = `<img src="${animalImageSrc(target.id)}" alt="Тень: ${target.name}"/><small>${target.name}</small>`;
            shadowTargets.appendChild(item);
        });
    } else if (typeof shadowTargetImage !== 'undefined' && shadowTargetImage && currentShadowLevel.targets[0]) {
        shadowTargetImage.src = animalImageSrc(currentShadowLevel.targets[0].id);
        shadowTargetImage.alt = `Тень: ${currentShadowLevel.targets[0].name}`;
    }

    if (shadowStage) {
        const bg = shadowBackgrounds[currentShadowLevel.habitat] || shadowBackgrounds.savanna;
        shadowStage.style.backgroundImage = `url(${bg})`;
        shadowStage.classList.remove('shadow-stage-medium', 'shadow-stage-hard', 'shadow-stage-legend');
        if (currentShadowLevel.difficulty.block >= 1) shadowStage.classList.add('shadow-stage-medium');
        if (currentShadowLevel.difficulty.block >= 2) shadowStage.classList.add('shadow-stage-hard');
        if (currentShadowLevel.difficulty.block >= 4) shadowStage.classList.add('shadow-stage-legend');
    }
    updateShadowProgress();
    if (shadowMessage) {
        const hardNote = currentShadowLevel.difficulty.block >= 2 ? ' Некоторые тени чуть спрятаны 🌿' : '';
        shadowMessage.textContent = needCount === 1 ? t('shadow.find_one') + hardNote : t('shadow.find_many', {n: needCount}) + hardNote;
    }

    if (shadowOptions) {
        shadowOptions.innerHTML = '';
        shadowOptions.className = `shadow-options options-${Math.min(currentShadowLevel.options.length, 12)}`;
        currentShadowLevel.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'shadow-option';
            btn.type = 'button';
            btn.dataset.animalId = option.id;
            btn.innerHTML = `<img src="${animalImageSrc(option.id)}" alt="${option.name}"/><span>${option.name}</span>`;
            btn.addEventListener('click', () => chooseShadowOption(option.id, btn));
            shadowOptions.appendChild(btn);
        });
    }
    updateCoinsViews();
}

function updateShadowProgress() {
    if (!currentShadowLevel) return;
    const found = shadowFoundIds.size;
    const total = currentShadowLevel.targets.length;
    if (typeof shadowProgressRow !== 'undefined' && shadowProgressRow) {
        const animalWord = total === 1 ? 'зверька' : 'зверьков';
        const dots = Array.from({ length: total }, (_, i) => `<span class="shadow-progress-dot ${i < found ? 'done' : ''}"></span>`).join('');
        shadowProgressRow.innerHTML = `<span>${t('shadow.find_progress', {word: animalWord, found, total})}</span><span>${dots}</span>`;
    }
    if (typeof shadowTargets !== 'undefined' && shadowTargets) {
        [...shadowTargets.querySelectorAll('.shadow-target-item')].forEach(item => {
            item.classList.toggle('found', shadowFoundIds.has(item.dataset.animalId));
        });
    }
    if (typeof shadowStreakBadge !== 'undefined' && shadowStreakBadge) {
        shadowStreakBadge.textContent = `🔥 Серия ${shadowPerfectStreak}`;
    }
}

function chooseShadowOption(animalId, button) {
    if (shadowAnswered || !currentShadowLevel) return;
    const targetIds = new Set(currentShadowLevel.targets.map(item => item.id));
    if (targetIds.has(animalId)) {
        if (shadowFoundIds.has(animalId)) return;
        shadowFoundIds.add(animalId);
        button.classList.add('correct', 'found-correct');
        button.disabled = true;
        const add = Math.max(2, currentShadowLevel.difficulty.reward - (shadowHintUsed ? 2 : 0));
        shadowLevelReward += add;
        coins += add;
        albumUnlocked = Array.from(new Set([...(albumUnlocked || []), animalId]));
        updateTaskProgress("shadow", 1);
        saveProgress();
        updateCoinsViews();
        updateShadowProgress();
        playTone(880, 0.12, 'sine', 0.05);
        setTimeout(() => { try { playAnimalSound(animalId); } catch (_) {} }, 120);
        const foundAnimal = currentShadowLevel.targets.find(item => item.id === animalId);
        const left = currentShadowLevel.targets.length - shadowFoundIds.size;
        if (left > 0) {
            if (shadowMessage) shadowMessage.textContent = t('shadow.correct_remain', {name: foundAnimal ? foundAnimal.name : t('shadow.great'), left});
        } else {
            shadowAnswered = true;
            if (shadowWrongCount === 0) {
                shadowPerfectStreak += 1;
            } else {
                shadowPerfectStreak = 0;
            }
            shadowComboBonus = shadowWrongCount === 0
                ? Math.min(25, 5 + Math.floor(shadowPerfectStreak / 3) * 3 + Math.max(0, currentShadowLevel.targets.length - 1) * 2)
                : 0;
            if (shadowComboBonus > 0) {
                coins += shadowComboBonus;
                shadowLevelReward += shadowComboBonus;
            }
            safeStorage.set('zooShadowPerfectStreak', String(shadowPerfectStreak));
            saveProgress();
            updateCoinsViews();
            if (shadowOptions) [...shadowOptions.querySelectorAll('.shadow-option')].forEach(btn => btn.classList.add('disabled-after-win'));
            if (shadowMessage) shadowMessage.textContent = t('shadow.level_done', {reward: shadowLevelReward});
            setTimeout(showShadowCelebration, 420);
        }
    } else {
        shadowWrongCount += 1;
        button.classList.remove('wrong');
        void button.offsetWidth;
        button.classList.add('wrong');
        playTone(240, 0.10, 'sine', 0.035);
        if (shadowMessage) shadowMessage.textContent = currentShadowLevel.targets.length > 1 ? t('shadow.wrong_one') : t('shadow.wrong_many');
    }
}

function useShadowHint() {
    if (!currentShadowLevel || shadowAnswered || shadowHintUsed || !shadowOptions) return;
    const targetIds = new Set(currentShadowLevel.targets.map(item => item.id));
    const wrongButtons = [...shadowOptions.querySelectorAll('.shadow-option')]
        .filter(btn => !targetIds.has(btn.dataset.animalId) && !btn.classList.contains('hidden-by-hint'));
    if (wrongButtons.length) {
        const btn = wrongButtons[Math.floor(Math.random() * wrongButtons.length)];
        btn.classList.add('hidden-by-hint');
        shadowHintUsed = true;
        if (shadowMessage) shadowMessage.textContent = t('shadow.hint_remove');
        playTone(520, 0.10, 'triangle', 0.035);
        return;
    }
    const notFoundButtons = [...shadowOptions.querySelectorAll('.shadow-option')]
        .filter(btn => targetIds.has(btn.dataset.animalId) && !shadowFoundIds.has(btn.dataset.animalId));
    if (notFoundButtons.length) {
        notFoundButtons[0].classList.add('hint-pulse');
        setTimeout(() => notFoundButtons[0].classList.remove('hint-pulse'), 1500);
        shadowHintUsed = true;
        if (shadowMessage) shadowMessage.textContent = t('shadow.hint_highlight');
        playTone(620, 0.10, 'triangle', 0.035);
    }
}

function showShadowCelebration() {
    if (!currentShadowLevel) return;
    const perfect = shadowWrongCount === 0;
    if (typeof shadowCelebrationTitle !== 'undefined' && shadowCelebrationTitle) {
        if (shadowLevelIndex % 10 === 9) shadowCelebrationTitle.textContent = t('shadow.new_stage');
        else shadowCelebrationTitle.textContent = perfect ? t('shadow.perfect') : t('shadow.great');
    }
    if (typeof shadowCelebrationText !== 'undefined' && shadowCelebrationText) {
        const nextDifficulty = getShadowDifficulty(shadowLevelIndex + 1);
        const completed = currentShadowLevel.targets.map(item => item.name).join(', ');
        const stageNote = nextDifficulty.targetCount > currentShadowLevel.difficulty.targetCount
            ? `Дальше будет сложнее: нужно найти уже ${nextDifficulty.targetCount} зверьков!`
            : 'Нажми кнопку, чтобы перейти дальше.';
        const perfectNote = perfect ? ` Серия без ошибок: ${shadowPerfectStreak}!` : ' Ничего, в следующем уровне можно собрать серию!';
        shadowCelebrationText.textContent = t('shadow.celeb_text', {done: completed, reward: shadowLevelReward, perfect: perfectNote, stage: stageNote});
    }
    if (typeof shadowCelebrationAnimals !== 'undefined' && shadowCelebrationAnimals) {
        shadowCelebrationAnimals.innerHTML = '';
        currentShadowLevel.targets.forEach(item => {
            const img = document.createElement('img');
            img.src = animalImageSrc(item.id);
            img.alt = item.name;
            shadowCelebrationAnimals.appendChild(img);
        });
    }
    if (typeof shadowCelebrationStats !== 'undefined' && shadowCelebrationStats) {
        shadowCelebrationStats.innerHTML = `
            <div class="shadow-celebration-stat">🪙 +${shadowLevelReward} монет</div>
            <div class="shadow-celebration-stat">🔥 Серия ${shadowPerfectStreak}</div>
            <div class="shadow-celebration-stat">🎯 Ошибки: ${shadowWrongCount}</div>
            <div class="shadow-celebration-stat">⭐ ${currentShadowLevel.difficulty.label}</div>
        `;
    }
    if (typeof shadowConfettiLayer !== 'undefined' && shadowConfettiLayer) {
        const pieces = ['🎉','✨','🎊','⭐','💚','🪙','✨','🎉'];
        shadowConfettiLayer.innerHTML = pieces.map(icon => `<span class="shadow-confetti-piece">${icon}</span>`).join('');
    }
    if (typeof shadowCelebrationOverlay !== 'undefined' && shadowCelebrationOverlay) {
        shadowCelebrationOverlay.classList.add('show');
    }
    try {
        playTone(988, 0.12, 'triangle', 0.045);
        setTimeout(() => playTone(1174, 0.12, 'triangle', 0.04), 110);
        setTimeout(() => playTone(1318, 0.16, 'triangle', 0.035), 220);
    } catch (_) {}
}

function closeShadowCelebration() {
    if (typeof shadowCelebrationOverlay !== 'undefined' && shadowCelebrationOverlay) {
        shadowCelebrationOverlay.classList.remove('show');
    }
    if (typeof shadowConfettiLayer !== 'undefined' && shadowConfettiLayer) shadowConfettiLayer.innerHTML = '';
}



// Stage 5.4 QA: close Shadow celebration with Escape during browser testing.
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && typeof shadowCelebrationOverlay !== 'undefined' && shadowCelebrationOverlay && shadowCelebrationOverlay.classList.contains('show')) {
        closeShadowCelebration();
    }
});

function goNextShadowLevel() {
    closeShadowCelebration();
    shadowLevelIndex += 1;
    saveProgress();
    renderShadowLevel();
}

function restartShadowLevel() {
    closeShadowCelebration();
    renderShadowLevel();
}


const coloringTemplatesCatalog = [
    { id: 'lion_savanna', title: 'Львенок в саванне', emoji: '🦁', thumb: 'lion', price: 0 },
    { id: 'elephant_jungle', title: 'Слонёнок в джунглях', emoji: '🐘', thumb: 'elephant', price: 0 },
    { id: 'penguin_ice', title: 'Пингвин на льду', emoji: '🐧', thumb: 'penguin', price: 0 },
    { id: 'rabbit_meadow', title: 'Кролик на лугу', emoji: '🐰', thumb: 'rabbit', price: 35 },
    { id: 'tiger_tropics', title: 'Тигренок в тропиках', emoji: '🐯', thumb: 'tiger', price: 45 },
    { id: 'parrot_jungle', title: 'Попугай в джунглях', emoji: '🦜', thumb: 'parrot', price: 55 }
];

const COLORING_SCENE_WIDTH = 1280;
const COLORING_SCENE_HEIGHT = 720;

const coloringLineArtAssets = {
    lion_savanna: {
        src: "assets/inline/asset_053_9ce2dc3cd25e.png",
        boundarySrc: "assets/inline/asset_054_3fdfda94d2ff.png",
        width: COLORING_SCENE_WIDTH,
        height: COLORING_SCENE_HEIGHT,
        offsetX: 0,
        offsetY: 0,
        loaded: false,
        boundaryLoaded: false
    }
};

const coloringLineArtImages = {};
const coloringLineArtBoundaryImages = {};
function requestColoringRedrawAfterAssetLoad() {
    setTimeout(() => {
        try {
            const screenEl = document.getElementById('coloringScreen');
            if (screenEl && screenEl.classList.contains('show') && typeof redrawColoringOutline === 'function') {
                redrawColoringOutline();
            }
        } catch (e) {
            console.warn('coloring asset redraw skipped', e);
        }
    }, 0);
}
// Moved out of top-level execution — called by openColoring() instead.
// Previously ran at startup and caused asset_053/054 to download before
// the player ever opened Раскраска.
let __coloringBoundaryPreloadDone = false;
function preloadColoringLineArtAssets() {
    if (__coloringBoundaryPreloadDone) return;
    __coloringBoundaryPreloadDone = true;
    Object.keys(coloringLineArtAssets).forEach(key => {
        const asset = coloringLineArtAssets[key];
        const img = new Image();
        img.onload = () => {
            asset.loaded = true;
            requestColoringRedrawAfterAssetLoad();
        };
        img.src = asset.src;
        coloringLineArtImages[key] = img;

        if (asset.boundarySrc) {
            const boundaryImg = new Image();
            boundaryImg.onload = () => {
                asset.boundaryLoaded = true;
                requestColoringRedrawAfterAssetLoad();
            };
            boundaryImg.src = asset.boundarySrc;
            coloringLineArtBoundaryImages[key] = boundaryImg;
        }
    });
}

function normalizeColoringUnlockedTemplates() {
    const defaults = ['lion_savanna', 'elephant_jungle', 'penguin_ice'];
    defaults.forEach(id => {
        if (!coloringUnlockedTemplates.includes(id)) coloringUnlockedTemplates.push(id);
    });
    coloringUnlockedTemplates = Array.from(new Set(coloringUnlockedTemplates)).filter(id => coloringTemplatesCatalog.some(item => item.id === id));
}
normalizeColoringUnlockedTemplates();
let coloringCurrentTemplateId = coloringCurrentTemplateSaved;
if (!coloringTemplatesCatalog.some(item => item.id === coloringCurrentTemplateId)) coloringCurrentTemplateId = 'lion_savanna';
if (!coloringUnlockedTemplates.includes(coloringCurrentTemplateId)) coloringCurrentTemplateId = coloringUnlockedTemplates[0] || 'lion_savanna';
let coloringCurrentColor = coloringPalette[2];
let coloringCurrentTool = 'marker';
let coloringCurrentSize = 14;
let coloringIsDrawing = false;
let coloringLastPoint = null;
let coloringUndoStack = [];
let coloringHasDrawn = false;
let coloringPointerId = null;

const COLORING_CANVAS_WIDTH = 1280;
const COLORING_CANVAS_HEIGHT = 720;
let coloringBoundaryCanvas = null;
let coloringBoundaryCtx = null;
let coloringOutlineReady = false;

function setColoringLoadingState(isLoading, text) {
    const box = document.getElementById("coloringLoadingState");
    if (!box) return;
    if (text) {
        const label = box.querySelector("div:not(.coloring-loading-spinner)");
        if (label) label.textContent = text;
    }
    box.classList.toggle("show", !!isLoading);
}

function openColoring() {
    playSound("click");
    // Show the screen immediately so the user does not see a frozen menu while
    // the large embedded coloring image bundle is being lazy-loaded.
    showScreen("coloringScreen");
    setColoringLoadingState(true, "Загружаем картинки раскраски...");

    // Start boundary image downloads + load coloring modules in parallel.
    // preloadColoringLineArtAssets() is idempotent (guarded by a flag).
    preloadColoringLineArtAssets();
    let coloringLoadFinished = false;
    const loadingGuard = setTimeout(() => {
        if (!coloringLoadFinished) {
            setColoringLoadingState(true, "Картинки ещё загружаются...");
        }
    }, 4500);

    loadScriptOnce("assets/js/features/coloringImages.js", () => {
        loadScriptOnce("assets/js/zoo_coloring_reset_step2.js", () => {
            coloringLoadFinished = true;
            clearTimeout(loadingGuard);
            setColoringLoadingState(false);
            try { renderColoringScreen(); } catch(e) {}
            setTimeout(() => {
                try { if (typeof buildColoringScrollHandles === 'function') buildColoringScrollHandles(); } catch(e) {}
            }, 400);
        });
    });
}

function getColoringPaintCtx() {
    return coloringPaintCanvas ? coloringPaintCanvas.getContext('2d') : null;
}

function getColoringOutlineCtx() {
    return coloringOutlineCanvas ? coloringOutlineCanvas.getContext('2d') : null;
}

function getCurrentColoringTemplate() {
    return coloringTemplatesCatalog.find(item => item.id === coloringCurrentTemplateId) || coloringTemplatesCatalog[0];
}

function renderColoringScreen() {
    if (!coloringPaintCanvas || !coloringOutlineCanvas) return;
    if (coloringCoins) coloringCoins.textContent = String(coins);
    renderColoringPalette();
    renderColoringSizes();
    renderColoringTools();
    renderColoringTemplates();
    ensureColoringCanvasReady();
    redrawColoringOutline();
    updateColoringBadge();
    updateColoringHint(guideT('Поверни телефон горизонтально, выбери цвет и нажми на область для аккуратной заливки ✨', 'Rotate your phone, pick a color and tap an area to fill it ✨'));
}

function ensureColoringCanvasSize() {
    if (!coloringPaintCanvas || !coloringOutlineCanvas) return;
    if (coloringPaintCanvas.width !== COLORING_CANVAS_WIDTH || coloringPaintCanvas.height !== COLORING_CANVAS_HEIGHT) {
        coloringPaintCanvas.width = COLORING_CANVAS_WIDTH;
        coloringPaintCanvas.height = COLORING_CANVAS_HEIGHT;
    }
    if (coloringOutlineCanvas.width !== COLORING_CANVAS_WIDTH || coloringOutlineCanvas.height !== COLORING_CANVAS_HEIGHT) {
        coloringOutlineCanvas.width = COLORING_CANVAS_WIDTH;
        coloringOutlineCanvas.height = COLORING_CANVAS_HEIGHT;
    }
    if (!coloringBoundaryCanvas) {
        coloringBoundaryCanvas = document.createElement('canvas');
        coloringBoundaryCtx = coloringBoundaryCanvas.getContext('2d', { willReadFrequently: true });
    }
    if (coloringBoundaryCanvas.width !== COLORING_CANVAS_WIDTH || coloringBoundaryCanvas.height !== COLORING_CANVAS_HEIGHT) {
        coloringBoundaryCanvas.width = COLORING_CANVAS_WIDTH;
        coloringBoundaryCanvas.height = COLORING_CANVAS_HEIGHT;
    }
}

function ensureColoringCanvasReady() {
    ensureColoringCanvasSize();
    if (!coloringPaintCanvas.__prepared) {
        setupColoringCanvasEvents();
        resetColoringCanvasBase();
        coloringPaintCanvas.__prepared = true;
    }
    if (!coloringUndoStack.length) {
        pushColoringUndoState();
    }
}

function setupColoringCanvasEvents() {
    coloringCanvasWrap.addEventListener('pointerdown', e => {
        e.preventDefault();
        handleColoringTap(e.clientX, e.clientY);
    });
}

function getColoringPoint(clientX, clientY) {
    const rect = coloringPaintCanvas.getBoundingClientRect();
    const scaleX = coloringPaintCanvas.width / rect.width;
    const scaleY = coloringPaintCanvas.height / rect.height;
    return {
        x: Math.max(0, Math.min(coloringPaintCanvas.width - 1, Math.round((clientX - rect.left) * scaleX))),
        y: Math.max(0, Math.min(coloringPaintCanvas.height - 1, Math.round((clientY - rect.top) * scaleY)))
    };
}

function getColoringToolConfig() {
    const cfg = {
        pencil: { fillColor: coloringCurrentColor, hint: guideT('Карандаш: нажми на область, и она закрасится ✏️', 'Pencil: tap an area to fill it ✏️') },
        brush: { fillColor: coloringCurrentColor, hint: guideT('Кисть: мягкая заливка по нажатию 🖌️', 'Brush: soft tap fill 🖌️') },
        marker: { fillColor: coloringCurrentColor, hint: guideT('Фломастер: яркая заливка по нажатию 🖍️', 'Marker: bright tap fill 🖍️') },
        eraser: { fillColor: '#ffffff', hint: guideT('Ластик: нажми на закрашенную область, чтобы стереть 🧽', 'Eraser: tap a colored area to erase it 🧽') }
    };
    return cfg[coloringCurrentTool] || cfg.marker;
}

function hexToRgb(hex) {
    const normalized = String(hex || '').replace('#', '');
    const value = normalized.length === 3
        ? normalized.split('').map(ch => ch + ch).join('')
        : normalized.padEnd(6, '0').slice(0, 6);
    const int = parseInt(value, 16) || 0;
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255, 255];
}

function isSameColor(data, idx, rgba, tolerance = 8) {
    return Math.abs(data[idx] - rgba[0]) <= tolerance &&
        Math.abs(data[idx + 1] - rgba[1]) <= tolerance &&
        Math.abs(data[idx + 2] - rgba[2]) <= tolerance &&
        Math.abs(data[idx + 3] - rgba[3]) <= tolerance;
}

function isBoundaryPixel(boundaryData, idx) {
    const alpha = boundaryData[idx + 3];
    if (alpha < 20) return false;
    const brightness = (boundaryData[idx] + boundaryData[idx + 1] + boundaryData[idx + 2]) / 3;
    return brightness < 250;
}

function floodFillColoringArea(startX, startY) {
    if (!coloringBoundaryCtx) return false;
    const paintCtx = getColoringPaintCtx();
    if (!paintCtx) return false;

    const width = coloringPaintCanvas.width;
    const height = coloringPaintCanvas.height;
    const paintImage = paintCtx.getImageData(0, 0, width, height);
    const data = paintImage.data;
    const boundaryData = coloringBoundaryCtx.getImageData(0, 0, width, height).data;
    const startIndex = (startY * width + startX) * 4;

    if (isBoundaryPixel(boundaryData, startIndex)) {
        updateColoringHint(guideT('Нажми внутри пустой области, а не по контуру 🙂', 'Tap inside an empty area, not on the outline 🙂'));
        return false;
    }

    const replacement = hexToRgb(getColoringToolConfig().fillColor);
    const target = [data[startIndex], data[startIndex + 1], data[startIndex + 2], data[startIndex + 3]];

    if (isSameColor(data, startIndex, replacement, 3)) {
        updateColoringHint(guideT('Эта область уже такого цвета 🎨', 'This area already has this color 🎨'));
        return false;
    }

    const stack = [startY * width + startX];
    while (stack.length) {
        const pos = stack.pop();
        const x = pos % width;
        const y = (pos - x) / width;
        const idx = pos * 4;

        if (isBoundaryPixel(boundaryData, idx) || !isSameColor(data, idx, target, 6)) {
            continue;
        }

        data[idx] = replacement[0];
        data[idx + 1] = replacement[1];
        data[idx + 2] = replacement[2];
        data[idx + 3] = replacement[3];

        if (x > 0) stack.push(pos - 1);
        if (x < width - 1) stack.push(pos + 1);
        if (y > 0) stack.push(pos - width);
        if (y < height - 1) stack.push(pos + width);
    }

    paintCtx.putImageData(paintImage, 0, 0);
    return true;
}

function handleColoringTap(clientX, clientY) {
    if (!coloringOutlineReady) return;
    const point = getColoringPoint(clientX, clientY);
    const changed = floodFillColoringArea(point.x, point.y);
    if (!changed) return;
    pushColoringUndoState();
    if (coloringCurrentTool !== 'eraser') updateTaskProgress("coloring", 1);
    playSound('click');
    updateColoringHint(guideT('Готово! Теперь можно нажать на соседнюю область ✨', 'Done! Pick a color and tap the next area ✨'));
}

function resetColoringCanvasBase() {
    ensureColoringCanvasSize();
    const ctx = getColoringPaintCtx();
    if (!ctx) return;
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, coloringPaintCanvas.width, coloringPaintCanvas.height);
    ctx.restore();
    coloringUndoStack = [];
    pushColoringUndoState();
}

function pushColoringUndoState() {
    try {
        const data = coloringPaintCanvas.toDataURL('image/png');
        coloringUndoStack.push(data);
        if (coloringUndoStack.length > 18) coloringUndoStack.shift();
    } catch (e) {}
}

function undoColoring() {
    if (!coloringUndoStack.length) return;
    if (coloringUndoStack.length === 1) {
        clearColoringCanvas();
        return;
    }
    coloringUndoStack.pop();
    const prev = coloringUndoStack[coloringUndoStack.length - 1];
    restoreColoringState(prev);
    updateColoringHint(guideT('Последнее действие отменено ↩️', 'Last action undone ↩️'));
    playSound('click');
}

function restoreColoringState(dataUrl) {
    const ctx = getColoringPaintCtx();
    if (!ctx || !dataUrl) return;
    const img = new Image();
    img.onload = () => {
        ctx.clearRect(0, 0, coloringPaintCanvas.width, coloringPaintCanvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, coloringPaintCanvas.width, coloringPaintCanvas.height);
        ctx.drawImage(img, 0, 0, coloringPaintCanvas.width, coloringPaintCanvas.height);
    };
    img.src = dataUrl;
}

function clearColoringCanvas() {
    resetColoringCanvasBase();
    updateColoringHint(guideT('Холст очищен. Можно раскрашивать заново 🧼', 'Canvas cleared. Paint again 🧼'));
    playSound('click');
}

function saveColoringArt() {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = coloringPaintCanvas.width;
    exportCanvas.height = coloringPaintCanvas.height;
    const ctx = exportCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(coloringPaintCanvas, 0, 0);
    ctx.drawImage(coloringOutlineCanvas, 0, 0);
    const link = document.createElement('a');
    link.href = exportCanvas.toDataURL('image/png');
    link.download = `${getCurrentColoringTemplate().id}_art.png`;
    link.click();
    updateColoringHint(guideT('Рисунок сохранён как PNG 💾', 'Artwork saved as PNG 💾'));
    playSound('coin');
}

function setColoringTool(tool) {
    coloringCurrentTool = tool;
    renderColoringTools();
    const textMap = {
        pencil: guideT('Карандаш: выбери цвет и нажми на область для аккуратной заливки ✏️', 'Pencil: choose a color and tap an area to fill it ✏️'),
        brush: guideT('Кисть: нажимай по областям и заполняй их цветом 🖌️', 'Brush: tap areas and fill them with color 🖌️'),
        marker: guideT('Фломастер: яркая заливка по нажатию 🖍️', 'Marker: bright tap fill 🖍️'),
        eraser: guideT('Ластик: нажми на закрашенную область, чтобы сделать её белой 🧽', 'Eraser: tap a colored area to make it white 🧽')
    };
    updateColoringHint(textMap[tool] || '');
    playSound('click');
}

function setColoringColor(color) {
    coloringCurrentColor = color;
    renderColoringPalette();
    updateColoringHint(guideT('Цвет выбран. Теперь нажми на область для заливки 🎨', 'Color chosen. Now tap an area to fill it 🎨'));
    playSound('click');
}

function setColoringSize(size) {
    coloringCurrentSize = size;
    renderColoringSizes();
    updateColoringHint(guideT('В этой версии работает заливка по нажатию ✨', 'This version uses tap-to-fill coloring ✨'));
    playSound('click');
}

function selectColoringTemplate(id) {
    if (!isColoringTemplateUnlocked(id)) {
        purchaseColoringTemplate(id);
        return;
    }
    coloringCurrentTemplateId = id;
    saveProgress();
    renderColoringTemplates();
    resetColoringCanvasBase();
    redrawColoringOutline();
    updateColoringBadge();
    updateColoringHint(guideT('Новая сцена открыта. Выбери цвет и нажми на область 🌈', 'New scene opened. Pick a color and tap an area 🌈'));
    playSound('match');
}

function updateColoringBadge() {
    const item = getCurrentColoringTemplate();
    if (coloringBadge) coloringBadge.textContent = `${item.emoji} ${item.title}`;
    if (coloringCoins) coloringCoins.textContent = String(coins);
}

function updateColoringHint(text) {
    if (coloringHint) coloringHint.textContent = text;
}

function renderColoringTools() {
    ['pencil','brush','marker','eraser'].forEach(tool => {
        const el = document.getElementById(`tool${tool.charAt(0).toUpperCase()+tool.slice(1)}`);
        if (el) el.classList.toggle('active', coloringCurrentTool === tool);
    });
}

function renderColoringPalette() {
    if (!coloringPaletteGrid) return;
    coloringPaletteGrid.innerHTML = '';
    coloringPalette.forEach(color => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'color-chip' + (coloringCurrentColor === color ? ' active' : '');
        btn.style.background = color;
        btn.onclick = () => setColoringColor(color);
        coloringPaletteGrid.appendChild(btn);
    });
}

function renderColoringSizes() {
    if (!coloringSizeRow) return;
    coloringSizeRow.innerHTML = '';
    coloringSizes.forEach(size => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'coloring-size-chip' + (coloringCurrentSize === size ? ' active' : '');
        const dot = document.createElement('i');
        dot.style.width = `${Math.max(4, Math.min(18, size))}px`;
        dot.style.height = `${Math.max(4, Math.min(18, size))}px`;
        btn.appendChild(dot);
        btn.onclick = () => setColoringSize(size);
        coloringSizeRow.appendChild(btn);
    });
}

function isColoringTemplateUnlocked(id) {
    return coloringUnlockedTemplates.includes(id);
}

function purchaseColoringTemplate(id) {
    const item = coloringTemplatesCatalog.find(template => template.id === id);
    if (!item) return;
    if (isColoringTemplateUnlocked(id)) {
        selectColoringTemplate(id);
        return;
    }
    if (coins < item.price) {
        playSound('wrong');
        updateColoringHint(guideT('Не хватает монет для открытия этой раскраски 😿', 'Not enough coins to unlock this coloring page 😿'));
        return;
    }
    coins -= item.price;
    coloringUnlockedTemplates.push(id);
    coloringUnlockedTemplates = Array.from(new Set(coloringUnlockedTemplates));
    coloringCurrentTemplateId = id;
    saveProgress();
    updateCoinsViews();
    renderColoringTemplates();
    resetColoringCanvasBase();
    redrawColoringOutline();
    updateColoringBadge();
    playSound('coin');
    updateColoringHint(guideT('Новая раскраска куплена! Выбери цвет и нажми на область 🌈', 'New coloring page unlocked! Pick a color and tap an area 🌈'));
}

function renderColoringTemplates() {
    if (!coloringTemplates) return;
    coloringTemplates.innerHTML = '';
    coloringTemplatesCatalog.forEach(item => {
        const unlocked = isColoringTemplateUnlocked(item.id);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'coloring-template-card' + (item.id === coloringCurrentTemplateId ? ' active' : '') + (unlocked ? '' : ' locked');
        btn.innerHTML = `
            <div class="coloring-template-thumb">
                <img src="${animalImageSrc(item.thumb)}" alt="${item.title}"/>
                ${unlocked ? '' : `<span class="lock-badge">🔒</span><span class="price-badge">${item.price} 🪙</span>`}
            </div>
            <div>${item.title}</div>`;
        btn.onclick = () => unlocked ? selectColoringTemplate(item.id) : purchaseColoringTemplate(item.id);
        coloringTemplates.appendChild(btn);
    });
    try { refreshGuideHelpers('coloringScreen'); } catch(e) {}
    // Update scroll indicator dots
    updateColoringScrollDots();
    coloringTemplates.addEventListener('scroll', updateColoringScrollDots, { passive: true });
}

function updateColoringScrollDots() {
    const dotsEl = document.getElementById('coloringScrollDots');
    const scrollEl = coloringTemplates;
    if (!dotsEl || !scrollEl) return;
    const isMobile = window.innerWidth <= 900;
    if (!isMobile) { dotsEl.style.display = 'none'; return; }

    const totalW = scrollEl.scrollWidth;
    const viewW = scrollEl.clientWidth;
    if (totalW <= viewW + 4) { dotsEl.style.display = 'none'; return; }

    const numDots = Math.min(7, Math.round(totalW / viewW));
    const progress = scrollEl.scrollLeft / (totalW - viewW);
    const activeDot = Math.round(progress * (numDots - 1));

    dotsEl.style.display = 'flex';
    dotsEl.innerHTML = '';
    for (let i = 0; i < numDots; i++) {
        const sp = document.createElement('span');
        if (i === activeDot) sp.className = 'active';
        dotsEl.appendChild(sp);
    }
}

// ── Floating coloring scroll button (green circle, left side like ? is right) ──
function coloringScrollUpdateBtn() {
    const btn = document.getElementById('coloringScrollBtn');
    const icon = document.getElementById('coloringScrollIcon');
    if (!btn || !icon) return;
    // Find the scrollable container (could be window or card-panel)
    const screen = document.getElementById('coloringScreen');
    const panel = screen ? screen.querySelector('.card-panel') : null;
    const canPanelScroll = panel && panel.scrollHeight > panel.clientHeight + 4;
    const scrollEl = canPanelScroll ? panel : null;
    const scrollTop = scrollEl ? scrollEl.scrollTop : window.pageYOffset;
    const scrollMax = scrollEl
        ? scrollEl.scrollHeight - scrollEl.clientHeight
        : document.body.scrollHeight - window.innerHeight;
    const atBottom = scrollMax > 0 && (scrollMax - scrollTop) < 30;
    icon.textContent = atBottom ? '↑' : '↓';
}

function coloringScrollToggle() {
    const screen = document.getElementById('coloringScreen');
    const panel = screen ? screen.querySelector('.card-panel') : null;
    const canPanelScroll = panel && panel.scrollHeight > panel.clientHeight + 4;
    if (canPanelScroll) {
        const atBottom = panel.scrollHeight - panel.scrollTop - panel.clientHeight < 30;
        panel.scrollTo({ top: atBottom ? 0 : panel.scrollHeight, behavior: 'smooth' });
    } else {
        // Fall back to scrolling the screen element or window
        const atBottom = screen && (screen.scrollHeight - screen.scrollTop - screen.clientHeight < 30);
        if (screen && screen.scrollHeight > screen.clientHeight + 4) {
            screen.scrollTo({ top: atBottom ? 0 : screen.scrollHeight, behavior: 'smooth' });
        } else {
            const winAtBottom = window.pageYOffset + window.innerHeight >= document.body.scrollHeight - 30;
            window.scrollTo({ top: winAtBottom ? 0 : document.body.scrollHeight, behavior: 'smooth' });
        }
    }
    setTimeout(coloringScrollUpdateBtn, 500);
}

// Update button icon as user scrolls
document.addEventListener('scroll', function() {
    const screen = document.getElementById('coloringScreen');
    if (screen && screen.classList.contains('show')) coloringScrollUpdateBtn();
}, { passive: true, capture: true });

function drawColoringAssetIntoCanvas(ctx, img, offsetX = 0, offsetY = 0) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const topPadding = Math.round(canvasHeight * 0.04);
    const drawHeight = canvasHeight - topPadding * 2;
    ctx.drawImage(img, offsetX, topPadding + offsetY, canvasWidth, drawHeight);
}


function coloringLine(ctx, pts) {
    ctx.beginPath();
    pts.forEach(([x, y], index) => index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
    ctx.stroke();
}

function drawColoringSceneSegments(ctx, templateId) {
    const curved = pts => coloringLine(ctx, pts);
    const poly = pts => coloringLine(ctx, pts);
    switch (templateId) {
        case 'lion_savanna':
            break;
        case 'elephant_jungle':
            curved([[84,204],[116,184],[148,194]]);
            curved([[92,238],[122,220],[154,226]]);
            curved([[224,288],[286,270],[350,286]]);
            curved([[452,98],[486,90],[520,98],[546,116]]);
            curved([[390,362],[424,342],[454,344]]);
            curved([[448,354],[466,380],[458,416]]);
            curved([[334,418],[374,404],[416,414],[442,438]]);
            curved([[272,492],[320,504],[372,500],[422,492]]);
            curved([[504,394],[528,414],[534,446]]);
            poly([[488,392],[506,402],[516,416]]);
            // extra zones: split elephant body into front/back and belly band
            curved([[320,310],[320,530]]);
            curved([[180,440],[260,448],[340,438],[460,440]]);
            // sky band split + extra cloud puff
            curved([[0,150],[180,140],[360,154],[640,142]]);
            curved([[260,80],[286,68],[314,80],[300,98],[272,98],[260,80]]);
            // extra hill grass divider line
            curved([[0,562],[220,572],[380,562],[640,576]]);
            break;
        case 'penguin_ice':
            curved([[104,330],[140,302],[176,330]]);
            curved([[460,312],[520,264],[580,312]]);
            curved([[88,522],[154,494],[218,518]]);
            curved([[466,474],[524,450],[580,476]]);
            curved([[286,322],[324,310],[360,322]]);
            curved([[292,382],[282,430],[294,488]]);
            curved([[356,382],[366,430],[354,488]]);
            curved([[304,418],[324,434],[344,418]]);
            poly([[324,286],[350,302],[324,318],[298,302],[324,286]]);
            // extra zones: vertical split through head and body, belly band
            curved([[324,80],[324,600]]);
            curved([[230,500],[324,512],[418,500]]);
            // extra background: snow mound + cloud puff
            curved([[140,600],[200,558],[270,600]]);
            curved([[220,140],[248,124],[278,140],[262,158],[234,158],[220,140]]);
            break;
        case 'rabbit_meadow':
            curved([[112,108],[150,94],[188,104]]);
            curved([[446,164],[474,152],[500,158]]);
            curved([[270,150],[278,206],[276,266]]);
            curved([[330,148],[322,204],[324,264]]);
            curved([[292,374],[328,366],[372,374],[406,394]]);
            curved([[300,438],[330,456],[364,444]]);
            curved([[448,454],[462,480],[452,512]]);
            poly([[446,456],[486,520],[424,512],[446,456]]);
            // extra zones: vertical split through body, and through head
            curved([[380,340],[380,535]]);
            curved([[304,240],[304,385]]);
            // extra background: meadow mound + extra cloud
            curved([[460,560],[520,520],[580,560]]);
            curved([[360,90],[390,76],[420,90],[404,108],[376,108],[360,90]]);
            break;
        case 'tiger_tropics':
            curved([[86,186],[116,170],[146,180]]);
            curved([[84,230],[116,214],[150,222]]);
            curved([[222,264],[228,414]]);
            curved([[204,298],[252,298]]);
            curved([[198,324],[256,324]]);
            curved([[194,392],[260,392]]);
            curved([[318,376],[352,364],[386,370]]);
            curved([[336,410],[370,396],[404,402]]);
            curved([[330,444],[366,430],[404,436]]);
            curved([[366,356],[366,500]]);
            curved([[430,370],[430,486]]);
            curved([[524,144],[510,202],[522,264]]);
            curved([[560,132],[574,204],[564,272]]);
            // extra zones: additional stripe and back/belly band on body
            curved([[300,335],[300,512]]);
            curved([[230,470],[330,486],[440,476]]);
            // extra background: extra palm leaf and meadow mound
            curved([[110,590],[170,505],[230,590]]);
            curved([[480,160],[470,220],[486,280]]);
            break;
        case 'parrot_jungle':
            curved([[164,220],[206,188],[244,214]]);
            curved([[166,282],[220,254],[270,284]]);
            curved([[354,216],[398,210],[434,226]]);
            curved([[336,304],[366,292],[394,304]]);
            curved([[320,278],[288,304],[278,340]]);
            curved([[142,360],[514,360]]);
            curved([[292,420],[270,468],[252,516]]);
            curved([[316,430],[290,486],[274,538]]);
            curved([[438,264],[458,272],[480,280]]);
            // extra zones: split body wing/breast, extra band lower body
            curved([[330,250],[352,336],[336,430]]);
            curved([[300,380],[352,392],[404,378]]);
            // extra background: jungle leaf cluster and hill divider
            curved([[420,395],[470,420],[520,500]]);
            curved([[0,480],[180,470],[300,486],[440,476],[640,488]]);
            break;
    }
}

function drawColoringSceneLeakFixes(ctx, templateId) {
    switch (templateId) {
        case 'lion_savanna':
            break;
        case 'elephant_jungle':
            coloringLine(ctx, [[520,80],[546,94],[560,70]]);
            coloringLine(ctx, [[544,470],[520,492],[506,498]]);
            coloringLine(ctx, [[370,300],[420,334],[454,368]]);
            break;
        case 'penguin_ice':
            coloringLine(ctx, [[232,348],[188,394],[162,430]]);
            coloringLine(ctx, [[405,332],[434,388],[462,468]]);
            coloringLine(ctx, [[60,572],[640,572]]);
            break;
        case 'rabbit_meadow':
            coloringLine(ctx, [[150,515],[188,540],[226,532]]);
            coloringLine(ctx, [[150,515],[124,536],[98,540]]);
            break;
        case 'tiger_tropics':
            coloringLine(ctx, [[564,470],[560,500],[532,520]]);
            coloringLine(ctx, [[142,456],[162,488],[178,520]]);
            break;
        case 'parrot_jungle':
            coloringLine(ctx, [[142,360],[142,420],[148,514]]);
            coloringLine(ctx, [[514,360],[560,330],[600,314]]);
            break;
    }
}

function drawColoringTemplateById(ctx, templateId) {
    switch (templateId) {
        case 'lion_savanna':
            drawColoringLionSavanna(ctx); break;
        case 'elephant_jungle':
            drawColoringElephantJungle(ctx); break;
        case 'penguin_ice':
            drawColoringPenguinIce(ctx); break;
        case 'rabbit_meadow':
            drawColoringRabbitMeadow(ctx); break;
        case 'tiger_tropics':
            drawColoringTigerTropics(ctx); break;
        case 'parrot_jungle':
            drawColoringParrotJungle(ctx); break;
        default:
            drawColoringLionSavanna(ctx); break;
    }
}

function buildColoringTemplateCanvas(templateId, { boundary = false, visibleSegments = true } = {}) {
    const off = document.createElement('canvas');
    off.width = COLORING_SCENE_WIDTH;
    off.height = COLORING_SCENE_HEIGHT;
    const ctx = off.getContext('2d');
    ctx.clearRect(0, 0, off.width, off.height);
    ctx.lineWidth = boundary ? 14 : 5;
    ctx.strokeStyle = '#111827';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.fillStyle = 'transparent';
    ctx.__coloringBoundary = boundary;
    drawColoringTemplateById(ctx, templateId);
    ctx.lineWidth = boundary ? 12 : 4;
    if (visibleSegments) drawColoringSceneSegments(ctx, templateId);
    if (boundary) drawColoringSceneLeakFixes(ctx, templateId);
    return off;
}

function drawTemplateCanvasIntoViewport(targetCtx, sourceCanvas, offsetX = 0, offsetY = 0) {
    const canvasWidth = targetCtx.canvas.width;
    const canvasHeight = targetCtx.canvas.height;
    targetCtx.drawImage(sourceCanvas, offsetX, offsetY, canvasWidth, canvasHeight);
}

function drawHiddenColoringSegments(ctx) {
    const boundaryCanvas = buildColoringTemplateCanvas(coloringCurrentTemplateId, { boundary: true, visibleSegments: true });
    drawTemplateCanvasIntoViewport(ctx, boundaryCanvas);
}

function rebuildColoringBoundaryFromImage(img) {
    ensureColoringCanvasSize();
    if (!coloringBoundaryCtx) return;
    coloringBoundaryCtx.clearRect(0, 0, coloringBoundaryCanvas.width, coloringBoundaryCanvas.height);
    const boundaryCanvas = buildColoringTemplateCanvas(coloringCurrentTemplateId, { boundary: true, visibleSegments: true });
    coloringBoundaryCtx.save();
    coloringBoundaryCtx.imageSmoothingEnabled = true;
    coloringBoundaryCtx.imageSmoothingQuality = 'high';
    const offsets = [[0,0],[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[-1,1],[1,-1]];
    offsets.forEach(([dx, dy]) => drawTemplateCanvasIntoViewport(coloringBoundaryCtx, boundaryCanvas, dx, dy));
    coloringBoundaryCtx.restore();
    coloringOutlineReady = true;
}

function redrawColoringOutline() {
    const ctx = getColoringOutlineCtx();
    if (!ctx) return;
    ensureColoringCanvasSize();
    coloringOutlineReady = false;
    ctx.clearRect(0, 0, coloringOutlineCanvas.width, coloringOutlineCanvas.height);
    const outlineCanvas = buildColoringTemplateCanvas(coloringCurrentTemplateId, { boundary: false, visibleSegments: true });
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawTemplateCanvasIntoViewport(ctx, outlineCanvas);
    ctx.restore();
    rebuildColoringBoundaryFromImage(null);
}

function drawSnowflake(ctx, x, y, s=10) {
    ctx.beginPath();
    ctx.moveTo(x-s, y); ctx.lineTo(x+s, y);
    ctx.moveTo(x, y-s); ctx.lineTo(x, y+s);
    ctx.moveTo(x-s*.7, y-s*.7); ctx.lineTo(x+s*.7, y+s*.7);
    ctx.moveTo(x+s*.7, y-s*.7); ctx.lineTo(x-s*.7, y+s*.7);
    ctx.stroke();
}
function drawMountain(ctx, x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.stroke();
}
function drawMushroom(ctx, x, y, s=1) {
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y+22*s); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, 16*s, Math.PI, 0); ctx.stroke();
}
function drawButterfly(ctx, x, y, s=1) {
    ctx.beginPath(); ctx.ellipse(x-10*s, y, 10*s, 14*s, .4, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x+10*s, y, 10*s, 14*s, -.4, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y-16*s); ctx.lineTo(x, y+16*s); ctx.stroke();
}

function drawSun(ctx, x, y, r) {
    const rays = 10;
    const rayLen = r * 0.5;
    const rayHalf = r * 0.22;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    for (let i = 0; i < rays; i++) {
        const a = (Math.PI * 2 / rays) * i;
        const baseAngle1 = a - rayHalf / r;
        const baseAngle2 = a + rayHalf / r;
        const bx1 = x + Math.cos(baseAngle1) * r;
        const by1 = y + Math.sin(baseAngle1) * r;
        const bx2 = x + Math.cos(baseAngle2) * r;
        const by2 = y + Math.sin(baseAngle2) * r;
        const tipX = x + Math.cos(a) * (r + rayLen);
        const tipY = y + Math.sin(a) * (r + rayLen);
        ctx.beginPath();
        ctx.moveTo(bx1, by1);
        ctx.lineTo(tipX, tipY);
        ctx.lineTo(bx2, by2);
        ctx.closePath();
        ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(x - r*0.32, y - r*0.12, r*0.1, 0, Math.PI*2); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.arc(x + r*0.32, y - r*0.12, r*0.1, 0, Math.PI*2); ctx.closePath(); ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + r*0.05, r*0.4, 0.1*Math.PI, 0.9*Math.PI);
    ctx.closePath();
    ctx.stroke();
}
function drawCloud(ctx, x, y, scale=1) {
    ctx.beginPath();
    ctx.arc(x, y + 8*scale, 18*scale, Math.PI*0.6, Math.PI*1.6);
    ctx.arc(x + 20*scale, y - 10*scale, 20*scale, Math.PI*0.9, Math.PI*2.05);
    ctx.arc(x + 46*scale, y - 16*scale, 24*scale, Math.PI*1.0, Math.PI*2.1);
    ctx.arc(x + 72*scale, y - 6*scale, 20*scale, Math.PI*1.15, Math.PI*2.2);
    ctx.arc(x + 92*scale, y + 6*scale, 16*scale, Math.PI*1.3, Math.PI*0.35);
    ctx.quadraticCurveTo(x + 78*scale, y + 22*scale, x + 60*scale, y + 18*scale);
    ctx.quadraticCurveTo(x + 40*scale, y + 26*scale, x + 22*scale, y + 18*scale);
    ctx.quadraticCurveTo(x + 6*scale, y + 24*scale, x - 4*scale, y + 12*scale);
    ctx.closePath();
    ctx.stroke();
}
function drawGrassTuft(ctx, x, y, size=18) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+size*.2, y-size);
    ctx.lineTo(x+size*.45, y);
    ctx.moveTo(x+size*.3, y);
    ctx.lineTo(x+size*.55, y-size*1.2);
    ctx.lineTo(x+size*.8, y);
    ctx.moveTo(x+size*.55, y);
    ctx.lineTo(x+size*.9, y-size*.95);
    ctx.lineTo(x+size*1.1, y);
    ctx.stroke();
}
function drawHillGround(ctx) {
    ctx.beginPath();
    ctx.moveTo(70, 540);
    ctx.quadraticCurveTo(220, 460, 340, 530);
    ctx.quadraticCurveTo(470, 585, 610, 520);
    ctx.quadraticCurveTo(635, 520, 640, 560);
    ctx.lineTo(40,560);
    ctx.quadraticCurveTo(52, 520, 70, 540);
    ctx.stroke();
}
function drawFlower(ctx, x, y, r=10) {
    for (let i=0;i<5;i++) {
        const a = (Math.PI*2/5)*i;
        ctx.beginPath(); ctx.arc(x + Math.cos(a)*r, y + Math.sin(a)*r, r*0.75, 0, Math.PI*2); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(x,y,r*0.55,0,Math.PI*2); ctx.stroke();
}
function drawFlowerWithStem(ctx, x, y, r=14, stemHeight=46) {
    drawFlower(ctx, x, y, r);

    const stemW = Math.max(3, r * 0.18);
    const topY = y + r * 0.85;
    const botY = y + stemHeight;
    const midY = y + stemHeight * 0.55;
    const bend = r * 0.35;
    ctx.beginPath();
    ctx.moveTo(x - stemW, topY);
    ctx.quadraticCurveTo(x - stemW - bend, midY, x - stemW, botY);
    ctx.lineTo(x + stemW, botY);
    ctx.quadraticCurveTo(x + stemW - bend, midY, x + stemW, topY);
    ctx.closePath();
    ctx.stroke();

    const leafX = x - r * 1.0;
    const leafY = midY;
    const leafW = r * 0.95;
    const leafH = r * 0.4;
    ctx.beginPath();
    ctx.ellipse(leafX, leafY, leafW, leafH, -0.35, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
}
function drawGrassCheck(ctx, x, y, size=8) {
    ctx.beginPath();
    ctx.moveTo(x - size*0.5, y - size*0.2);
    ctx.lineTo(x, y + size*0.3);
    ctx.lineTo(x + size*0.5, y - size*0.4);
    ctx.stroke();
}
function drawCloudTree(ctx, x, y, scale=1) {
    const crownW = 130 * scale;
    const crownH = 110 * scale;
    const cx = x + crownW/2;
    const cy = y + crownH/2;
    ctx.beginPath();
    ctx.arc(cx - crownW*0.32, cy + crownH*0.12, crownH*0.32, Math.PI*0.6, Math.PI*1.65);
    ctx.arc(cx - crownW*0.06, cy - crownH*0.18, crownH*0.36, Math.PI*0.95, Math.PI*2.1);
    ctx.arc(cx + crownW*0.2, cy - crownH*0.22, crownH*0.42, Math.PI*1.05, Math.PI*2.15);
    ctx.arc(cx + crownW*0.42, cy - crownH*0.04, crownH*0.34, Math.PI*1.2, Math.PI*2.25);
    ctx.arc(cx + crownW*0.46, cy + crownH*0.18, crownH*0.28, Math.PI*1.35, Math.PI*0.4);
    ctx.quadraticCurveTo(cx + crownW*0.2, cy + crownH*0.42, cx, cy + crownH*0.34);
    ctx.quadraticCurveTo(cx - crownW*0.2, cy + crownH*0.42, cx - crownW*0.4, cy + crownH*0.3);
    ctx.closePath();
    ctx.stroke();

    const trunkTop = cy + crownH*0.30;
    const trunkBottom = trunkTop + 90*scale;
    const trunkHalf = 14 * scale;
    ctx.beginPath();
    ctx.moveTo(cx - trunkHalf, trunkTop);
    ctx.lineTo(cx - trunkHalf*1.4, trunkBottom);
    ctx.lineTo(cx + trunkHalf*1.4, trunkBottom);
    ctx.lineTo(cx + trunkHalf, trunkTop);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, trunkTop);
    ctx.lineTo(cx, trunkBottom);
    ctx.stroke();
}

function drawColoringLionSavanna(ctx) {
    const asset = coloringLineArtAssets.lion_savanna;
    const useBoundary = !!ctx.__coloringBoundary;
    const boundaryImg = coloringLineArtBoundaryImages.lion_savanna;
    const visibleImg = coloringLineArtImages.lion_savanna;
    const img = useBoundary && asset.boundarySrc && boundaryImg ? boundaryImg : visibleImg;
    const isLoaded = useBoundary && asset.boundarySrc ? asset.boundaryLoaded : asset.loaded;

    if (img && isLoaded) {
        ctx.drawImage(img, asset.offsetX || 0, asset.offsetY || 0, asset.width || COLORING_SCENE_WIDTH, asset.height || COLORING_SCENE_HEIGHT);
        return;
    }

    // Very small fallback only while image is decoding. Asset onload will redraw immediately.
    ctx.save();
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = ctx.__coloringBoundary ? 10 : 4;
    ctx.strokeRect(18, 18, COLORING_SCENE_WIDTH - 36, COLORING_SCENE_HEIGHT - 36);
    ctx.restore();
}

function drawColoringElephantJungle(ctx) {
    drawCloud(ctx, 130, 95, .95); drawCloud(ctx, 495, 110, 1);
    drawHillGround(ctx);
    drawMountain(ctx, 210, 300, 290, 240, 370, 300);
    // jungle tree
    ctx.beginPath(); ctx.rect(92, 235, 50, 218); ctx.stroke();
    ctx.beginPath(); ctx.arc(118, 202, 54, 0, Math.PI * 2); ctx.arc(88, 236, 44, 0, Math.PI * 2); ctx.arc(150, 236, 42, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(520, 80); ctx.quadraticCurveTo(500, 160, 530, 220); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(560, 70); ctx.quadraticCurveTo(590, 150, 558, 235); ctx.stroke();
    drawGrassTuft(ctx, 108, 545, 22); drawGrassTuft(ctx, 545, 540, 22); drawGrassTuft(ctx, 260, 548, 18); drawGrassTuft(ctx, 420, 548, 18);
    drawButterfly(ctx, 220, 170, .9); drawFlower(ctx, 555, 250, 10); drawFlower(ctx, 240, 240, 10);

    // elephant body
    ctx.beginPath(); ctx.ellipse(320, 420, 128, 92, 0, 0, Math.PI * 2); ctx.stroke();
    // head
    ctx.beginPath(); ctx.arc(454, 368, 62, 0, Math.PI * 2); ctx.stroke();
    // ear
    ctx.beginPath(); ctx.ellipse(420, 366, 52, 62, .12, 0, Math.PI * 2); ctx.stroke();
    // trunk
    ctx.beginPath();
    ctx.moveTo(505, 378);
    ctx.quadraticCurveTo(560, 410, 544, 470);
    ctx.quadraticCurveTo(532, 512, 506, 498);
    ctx.stroke();
    // tusk
    ctx.beginPath(); ctx.moveTo(492, 392); ctx.quadraticCurveTo(515, 400, 524, 418); ctx.stroke();
    // eye
    ctx.beginPath(); ctx.arc(468, 352, 5, 0, Math.PI * 2); ctx.stroke();
    // legs
    ctx.beginPath();
    ctx.moveTo(254, 494); ctx.lineTo(254, 590);
    ctx.moveTo(304, 500); ctx.lineTo(304, 590);
    ctx.moveTo(370, 500); ctx.lineTo(370, 590);
    ctx.moveTo(430, 490); ctx.lineTo(430, 590);
    ctx.stroke();
    [254,304,370,430].forEach(x => { ctx.beginPath(); ctx.arc(x, 592, 11, Math.PI, 0); ctx.stroke(); });
    // tail
    ctx.beginPath(); ctx.moveTo(196, 414); ctx.quadraticCurveTo(164, 442, 170, 478); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(170, 478); ctx.lineTo(162, 494); ctx.lineTo(176, 488); ctx.stroke();
}


function drawColoringPenguinIce(ctx) {
    drawCloud(ctx, 118, 98, .9); drawCloud(ctx, 470, 112, .8);
    drawMountain(ctx, 52, 348, 142, 250, 232, 348);
    drawMountain(ctx, 405, 332, 520, 218, 632, 332);
    ctx.beginPath(); ctx.moveTo(38, 522); ctx.quadraticCurveTo(118, 488, 196, 522); ctx.quadraticCurveTo(290, 552, 378, 505); ctx.quadraticCurveTo(484, 462, 642, 530); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(60, 572); ctx.lineTo(642, 572); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(95, 455); ctx.lineTo(142, 430); ctx.lineTo(202, 455); ctx.lineTo(162, 485); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(462, 468); ctx.lineTo(525, 438); ctx.lineTo(588, 468); ctx.lineTo(536, 500); ctx.closePath(); ctx.stroke();
    drawSnowflake(ctx, 128, 186, 12); drawSnowflake(ctx, 535, 176, 11); drawSnowflake(ctx, 575, 245, 10);

    // cute penguin
    ctx.beginPath(); ctx.ellipse(324, 432, 108, 124, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(324, 278, 72, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(324, 444, 62, 92, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(293, 268, 14, 0, Math.PI * 2); ctx.arc(355, 268, 14, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(293, 268, 5, 0, Math.PI * 2); ctx.arc(355, 268, 5, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(324, 286); ctx.lineTo(350, 302); ctx.lineTo(324, 318); ctx.lineTo(298, 302); ctx.closePath(); ctx.stroke();
    // wings
    ctx.beginPath(); ctx.moveTo(262, 386); ctx.quadraticCurveTo(214, 420, 220, 474); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(386, 386); ctx.quadraticCurveTo(434, 420, 428, 474); ctx.stroke();
    // feet
    ctx.beginPath(); ctx.moveTo(296, 546); ctx.lineTo(270, 582); ctx.lineTo(314, 572); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(352, 546); ctx.lineTo(378, 582); ctx.lineTo(334, 572); ctx.closePath(); ctx.stroke();
}


function drawColoringRabbitMeadow(ctx) {
    drawSun(ctx, 540, 105, 30); drawCloud(ctx, 120, 110, 1); drawCloud(ctx, 450, 165, .8);
    drawHillGround(ctx);
    drawFlower(ctx, 145, 230, 12); drawFlower(ctx, 555, 235, 12); drawFlower(ctx, 500, 470, 10); drawFlower(ctx, 116, 470, 10);
    drawGrassTuft(ctx, 92, 540, 20); drawGrassTuft(ctx, 540, 542, 24); drawGrassTuft(ctx, 248, 548, 18); drawGrassTuft(ctx, 436, 548, 18);
    drawButterfly(ctx, 520, 300, .8); drawMushroom(ctx, 150, 515, .9);

    // rabbit head + ears
    ctx.beginPath(); ctx.arc(304, 314, 62, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(270, 208, 28, 96, -.18, 0, Math.PI * 2); ctx.ellipse(330, 206, 28, 102, .12, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(286, 314, 5, 0, Math.PI * 2); ctx.arc(318, 314, 5, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(302, 334, 8, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(302, 342); ctx.quadraticCurveTo(288, 356, 276, 344); ctx.moveTo(302, 342); ctx.quadraticCurveTo(316, 356, 328, 344); ctx.stroke();
    // body
    ctx.beginPath(); ctx.ellipse(350, 438, 118, 88, 0, 0, Math.PI * 2); ctx.stroke();
    // back leg and paws
    ctx.beginPath(); ctx.moveTo(288, 506); ctx.lineTo(256, 570); ctx.moveTo(346, 508); ctx.lineTo(364, 570); ctx.moveTo(410, 486); ctx.lineTo(444, 556); ctx.stroke();
    [256,364,444].forEach(x => { ctx.beginPath(); ctx.arc(x, 574, 9, Math.PI, 0); ctx.stroke(); });
    // tail
    ctx.beginPath(); ctx.arc(454, 414, 16, 0, Math.PI * 2); ctx.stroke();
    // carrot
    ctx.beginPath(); ctx.moveTo(446, 456); ctx.lineTo(486, 520); ctx.lineTo(424, 512); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(450, 446); ctx.lineTo(438, 422); ctx.moveTo(462, 444); ctx.lineTo(466, 420); ctx.moveTo(472, 448); ctx.lineTo(490, 430); ctx.stroke();
}


function drawColoringTigerTropics(ctx) {
    drawSun(ctx, 96, 98, 30); drawCloud(ctx, 468, 106, .95);
    drawHillGround(ctx);
    ctx.beginPath(); ctx.rect(88, 220, 54, 236); ctx.stroke();
    ctx.beginPath(); ctx.arc(116, 186, 60, 0, Math.PI * 2); ctx.arc(90, 230, 42, 0, Math.PI * 2); ctx.arc(146, 232, 42, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(526, 144); ctx.quadraticCurveTo(498, 220, 522, 304); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(564, 130); ctx.quadraticCurveTo(592, 222, 564, 312); ctx.stroke();
    drawGrassTuft(ctx, 118, 540, 20); drawGrassTuft(ctx, 250, 546, 18); drawGrassTuft(ctx, 478, 546, 18); drawFlower(ctx, 532, 244, 11);

    ctx.beginPath(); ctx.ellipse(346, 432, 132, 88, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(228, 340, 76, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(190, 284, 18, 0, Math.PI * 2); ctx.arc(266, 284, 18, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(228, 352, 46, 42, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(212, 336, 5, 0, Math.PI * 2); ctx.arc(244, 336, 5, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(228, 352); ctx.lineTo(214, 366); ctx.lineTo(242, 366); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(214, 382); ctx.quadraticCurveTo(228, 394, 242, 382); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(286, 496); ctx.lineTo(284, 584);
    ctx.moveTo(328, 496); ctx.lineTo(326, 584);
    ctx.moveTo(402, 496); ctx.lineTo(402, 584);
    ctx.moveTo(444, 488); ctx.lineTo(446, 584);
    ctx.stroke();
    [284,326,402,446].forEach(x => { ctx.beginPath(); ctx.arc(x, 588, 10, Math.PI, 0); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(468, 422); ctx.quadraticCurveTo(560, 390, 564, 470); ctx.quadraticCurveTo(568, 516, 532, 520); ctx.stroke();
    [
        [[226,268],[226,412]], [[208,300],[248,300]], [[204,324],[252,324]], [[196,392],[260,392]],
        [[320,378],[352,364],[384,372]], [[338,410],[372,396],[406,404]], [[330,444],[366,430],[404,438]],
        [[366,356],[366,500]], [[430,370],[430,486]]
    ].forEach(pts => { ctx.beginPath(); pts.forEach(([x,y],i)=> i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.stroke(); });
}

function drawColoringParrotJungle(ctx) {
    drawCloud(ctx, 124, 112, .9); drawCloud(ctx, 470, 106, .9);
    drawHillGround(ctx);
    ctx.beginPath(); ctx.moveTo(70, 260); ctx.quadraticCurveTo(244, 206, 430, 242); ctx.quadraticCurveTo(560, 264, 622, 232); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(152, 222); ctx.lineTo(148, 514); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(164, 222); ctx.quadraticCurveTo(204, 186, 246, 214); ctx.quadraticCurveTo(208, 242, 164, 222); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(164, 282); ctx.quadraticCurveTo(222, 252, 272, 284); ctx.quadraticCurveTo(220, 316, 164, 282); ctx.stroke();
    drawFlower(ctx, 522, 240, 12); drawFlower(ctx, 100, 452, 10); drawGrassTuft(ctx, 112, 540, 20); drawGrassTuft(ctx, 512, 544, 18);

    ctx.beginPath(); ctx.ellipse(352, 336, 72, 88, -.18, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(410, 252, 56, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(394, 246, 7, 0, Math.PI * 2); ctx.arc(426, 246, 7, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(438, 264); ctx.lineTo(480, 280); ctx.lineTo(438, 298); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(322, 280); ctx.quadraticCurveTo(252, 294, 250, 362); ctx.quadraticCurveTo(286, 342, 320, 356); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(334, 414); ctx.lineTo(302, 534); ctx.moveTo(370, 424); ctx.lineTo(356, 544); ctx.stroke();
    [302,356].forEach(x => { ctx.beginPath(); ctx.arc(x, 548, 10, Math.PI, 0); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(292, 420); ctx.lineTo(240, 520); ctx.lineTo(272, 534); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(316, 430); ctx.lineTo(264, 540); ctx.lineTo(302, 552); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(142, 360); ctx.lineTo(514, 360); ctx.stroke();
}


function openShop() {
    playSound("click");
    showScreen("shopScreen");
}

function renderShop() {
    updateCoinsViews();
    shopGrid.innerHTML = "";

    skins.forEach(skin => {
        const isUnlocked = unlockedSkins.includes(skin.id);
        const isSelected = selectedSkin === skin.id;

        const item = document.createElement("div");
        item.className = "skin-item";

        const preview = document.createElement("div");
        preview.className = `skin-preview skin-preview--${skin.id}`;
        preview.textContent = "★";

        const info = document.createElement("div");
        const title = document.createElement("div");
        title.className = "skin-title";
        title.textContent = skin.title;
        const price = document.createElement("div");
        price.className = "skin-price";
        price.textContent = skin.price === 0 ? t('shop.free') : t('shop.price_coins', {price: skin.price});

        const button = document.createElement("button");
        button.className = isSelected ? "btn btn-green" : "btn btn-blue";

        if (isSelected) {
            button.textContent = t('shop.selected');
        } else if (isUnlocked) {
            button.textContent = t('shop.select');
            button.onclick = () => {
                selectedSkin = skin.id;
                applySkin();
                saveProgress();
                playSound("click");
                renderShop();
            };
        } else {
            button.textContent = coins >= skin.price ? t('shop.buy') : t('shop.no_coins');
            button.onclick = () => {
                if (coins >= skin.price) {
                    coins -= skin.price;
                    unlockedSkins.push(skin.id);
                    selectedSkin = skin.id;
                    applySkin();
                    saveProgress();
                    updateCoinsViews();
                    playSound("coin");
                    renderShop();
                } else {
                    playSound("wrong");
                }
            };
        }

        info.appendChild(title);
        info.appendChild(price);
        info.appendChild(button);
        item.appendChild(preview);
        item.appendChild(info);
        shopGrid.appendChild(item);
    });
}

function openTasks() {
    playSound("click");
    showScreen("tasksScreen");
}



function getDailyProgressDefaults(date = getTodayKey()) {
    return {
        date,
        pairs: 0,
        levels: 0,
        threeStars: 0,
        feed: 0,
        play: 0,
        puzzle: 0,
        block: 0,
        shadow: 0,
        coloring: 0,
        claimed: []
    };
}

function normalizeDailyProgress() {
    const today = getTodayKey();
    if (!dailyProgress || dailyProgress.date !== today) {
        dailyProgress = getDailyProgressDefaults(today);
        saveProgress();
        return;
    }
    dailyProgress = { ...getDailyProgressDefaults(today), ...dailyProgress };
    dailyProgress.claimed = Array.isArray(dailyProgress.claimed) ? dailyProgress.claimed : [];
}

function updateTaskProgress(type, amount = 1) {
    normalizeDailyProgress();
    const before = Number(dailyProgress[type] || 0);
    dailyProgress[type] = before + amount;
    saveProgress();
    try {
        if (tasksScreen && tasksScreen.classList.contains('show')) renderTasks();
    } catch (e) {}
}

function renderEconomyPanel() {
    if (!economyPanel) return;
    const today = getTodayKey();
    const claimedToday = safeStorage.get("zooDailyGiftDay", "") === today;
    const streak = getDailyGiftStreakForClaim();
    const reward = getDailyGiftReward(streak);
    const dots = Array.from({ length: 7 }, (_, i) => {
        const active = i < Math.min(streak, 7);
        return `<span class="economy-dot ${active ? "active" : ""}">${active ? "✓" : i + 1}</span>`;
    }).join("");

    economyPanel.innerHTML = `
        <div class="economy-card">
            <div class="economy-card-top">
                <div>
                    <div class="economy-title">🎁 Ежедневный бонус</div>
                    <div class="economy-desc">Заходи каждый день: серия увеличивает награду до +50 монет.</div>
                </div>
                <div class="economy-reward-badge">${claimedToday ? "Получено" : `+${reward} 🪙`}</div>
            </div>
            <div class="economy-streak">${dots}</div>
            <div class="economy-actions">
                <button class="btn btn-green" ${claimedToday ? "disabled" : ""} onclick="claimDailyGift()">${claimedToday ? "Сегодня забрано" : "Забрать подарок"}</button>
                <button class="btn btn-purple" onclick="showScreen('shopScreen')">Куда тратить?</button>
            </div>
        </div>
        <div class="coin-purpose-grid">
            <div class="coin-purpose"><span>🥕</span><span>Еда<small>открывай вкусняшки</small></span></div>
            <div class="coin-purpose"><span>🐾</span><span>Питомцы<small>покупай новых зверей</small></span></div>
            <div class="coin-purpose"><span>🧩</span><span>Пазлы<small>открывай этапы и картинки</small></span></div>
            <div class="coin-purpose"><span>🎨</span><span>Раскраски<small>открывай новые сцены</small></span></div>
        </div>
    `;
}

function getDailyQuestDefinitions() {
    normalizeDailyProgress();
    return [
        {
            id: "feed",
            icon: "🥕",
            title: "Покорми питомца",
            desc: "Дай зверьку любую открытую еду в комнате питомца.",
            progress: dailyProgress.feed || 0,
            target: 1,
            reward: 10,
            actionText: "К питомцу",
            action: () => openPetRoom()
        },
        {
            id: "pairs",
            icon: "🧠",
            title: "Найди 5 пар",
            desc: "Играй в Memory и находи одинаковых животных.",
            progress: dailyProgress.pairs || 0,
            target: 5,
            reward: 8,
            actionText: "Memory",
            action: () => startGame(currentMode || "timed")
        },
        {
            id: "play",
            icon: "🎮",
            title: "Сыграй 2 раза",
            desc: "Подходит Memory, Pet Room play, Puzzle или Zoo Block.",
            progress: dailyProgress.play || 0,
            target: 2,
            reward: 12,
            actionText: "Играть",
            action: () => showScreen("menuScreen")
        },
        {
            id: "puzzle",
            icon: "🧩",
            title: "Собери 1 пазл",
            desc: "Собери любую открытую картинку в Puzzle.",
            progress: dailyProgress.puzzle || 0,
            target: 1,
            reward: 14,
            actionText: "Пазл",
            action: () => openPuzzle()
        },
        {
            id: "shadow",
            icon: "🌙",
            title: "Найди 3 тени",
            desc: "В Shadow Game угадай животных по силуэту.",
            progress: dailyProgress.shadow || 0,
            target: 3,
            reward: 15,
            actionText: "Тени",
            action: () => openShadowGame()
        },
        {
            id: "coloring",
            icon: "🎨",
            title: "Раскрась 3 области",
            desc: "Открой раскраску и залей цветом несколько областей.",
            progress: dailyProgress.coloring || 0,
            target: 3,
            reward: 12,
            actionText: "Раскраска",
            action: () => openColoring()
        },
        {
            id: "threeStars",
            icon: "⭐",
            title: "Получи 3 звезды",
            desc: "Пройди уровень Memory аккуратно.",
            progress: dailyProgress.threeStars || 0,
            target: 1,
            reward: 18,
            actionText: "Уровни",
            action: () => openMap()
        }
    ];
}

function isDailyQuestDone(task) {
    return Number(task.progress || 0) >= Number(task.target || 1);
}

function isDailyQuestClaimed(task) {
    return (dailyProgress.claimed || []).includes(task.id);
}

function claimDailyQuest(taskId) {
    normalizeDailyProgress();
    const task = getDailyQuestDefinitions().find(item => item.id === taskId);
    if (!task || !isDailyQuestDone(task) || isDailyQuestClaimed(task)) return;
    coins += task.reward;
    dailyProgress.claimed = dailyProgress.claimed || [];
    dailyProgress.claimed.push(task.id);
    saveProgress();
    updateCoinsViews();
    playSound("coin");
    showFoodToast(t('tasks.done_toast', {reward: task.reward}));
    renderTasks();
}

function claimAllDailyQuests() {
    normalizeDailyProgress();
    const tasks = getDailyQuestDefinitions();
    const ready = tasks.filter(task => isDailyQuestDone(task) && !isDailyQuestClaimed(task));
    if (!ready.length) {
        showFoodToast(t('tasks.no_ready'));
        return;
    }
    const reward = ready.reduce((sum, task) => sum + task.reward, 0);
    coins += reward;
    dailyProgress.claimed = dailyProgress.claimed || [];
    ready.forEach(task => dailyProgress.claimed.push(task.id));
    saveProgress();
    updateCoinsViews();
    playSound("coin");
    showFoodToast(t('tasks.claim_all', {reward}));
    renderTasks();
}

function renderTasks() {
    normalizeDailyProgress();
    renderEconomyPanel();
    const tasks = getDailyQuestDefinitions();
    const doneCount = tasks.filter(isDailyQuestDone).length;
    const claimedCount = tasks.filter(isDailyQuestClaimed).length;
    const claimableCount = tasks.filter(task => isDailyQuestDone(task) && !isDailyQuestClaimed(task)).length;

    tasksList.innerHTML = "";

    const summary = document.createElement("div");
    summary.className = "task-summary-card";
    summary.innerHTML = `
        <div class="task-summary-top">
            <div>
                <div class="task-summary-title">📋 Сегодняшние миссии</div>
                <div class="task-summary-desc">Выполняй маленькие цели в разных режимах и забирай монеты.</div>
            </div>
            <div class="task-summary-badge">${doneCount}/${tasks.length}</div>
        </div>
        <button class="btn btn-green" style="width:100%;" ${claimableCount ? "" : "disabled"} onclick="claimAllDailyQuests()">
            ${claimableCount ? `Забрать готовые награды (${claimableCount})` : claimedCount === tasks.length ? "Все награды забраны" : "Нет готовых наград"}
        </button>
    `;
    tasksList.appendChild(summary);

    tasks.forEach(task => {
        const done = isDailyQuestDone(task);
        const claimed = isDailyQuestClaimed(task);
        const claimable = done && !claimed;
        const progress = Math.min(Number(task.progress || 0), Number(task.target || 1));
        const percent = Math.max(0, Math.min(100, Math.round((progress / task.target) * 100)));

        const item = document.createElement("div");
        item.className = "task-item quest-card" + (done ? " completed" : "") + (claimable ? " claimable" : "");

        const icon = document.createElement("div");
        icon.className = "quest-icon";
        icon.textContent = task.icon;

        const body = document.createElement("div");
        body.className = "quest-body";

        const title = document.createElement("div");
        title.className = "task-title";
        title.textContent = task.title;

        const desc = document.createElement("div");
        desc.className = "task-desc";
        desc.textContent = task.desc;

        const progressRow = document.createElement("div");
        progressRow.className = "quest-progress-row";
        progressRow.innerHTML = `
            <div class="quest-progress"><div class="quest-progress-fill" style="width:${percent}%"></div></div>
            <div class="quest-progress-text">${progress}/${task.target}</div>
        `;

        const bottom = document.createElement("div");
        bottom.className = "quest-bottom";

        const reward = document.createElement("div");
        reward.className = "quest-reward";
        reward.textContent = `+${task.reward} 🪙`;

        const btn = document.createElement("button");
        btn.className = claimable ? "btn btn-green" : done ? "btn btn-blue" : "btn btn-purple";
        btn.textContent = claimed ? t('tasks.claimed') : claimable ? t('tasks.claim') : task.actionText;
        btn.disabled = claimed;
        btn.onclick = () => {
            if (claimable) {
                claimDailyQuest(task.id);
            } else if (!done && typeof task.action === "function") {
                playSound("click");
                task.action();
            }
        };

        bottom.appendChild(reward);
        bottom.appendChild(btn);

        body.appendChild(title);
        body.appendChild(desc);
        body.appendChild(progressRow);
        body.appendChild(bottom);

        item.appendChild(icon);
        item.appendChild(body);
        tasksList.appendChild(item);
    });
}

function openParentScreen() {
    loadScriptOnce("assets/js/features/parentSettings.js", () => { openParentScreen(); });
}


/* ===== Zoo Pet World single-file RU/EN i18n ===== */
const i18nMap = {

    "Zoo Block": "Zoo Block",
    "блоки, линии и комбо": "blocks, lines and combos",
    "Ставь фигуры на поле 8x8, закрывай линии и собирай комбо": "Place pieces on the 8x8 board, clear lines and make combos",
    "Заполни зоопарк блоками": "Fill the zoo with blocks",
    "Очки": "Score",
    "Рекорд": "Best",
    "Комбо": "Combo",
    "Совет питомца": "Pet tip",
    "Закрывай строки и столбцы, чтобы получить монеты.": "Clear rows and columns to get coins.",
    "Комбо ждёт тебя ✨": "Combo is waiting ✨",
    "Фигуры": "Pieces",
    "нажми фигуру, потом клетку • или перетащи": "tap a piece, then a cell • or drag",
    "Заново": "Restart",
    "Выбери фигуру снизу и поставь её на поле.": "Choose a piece below and place it on the board.",
    "Вернуться к питомцу": "Back to pet",
    "Выбери фигуру": "Choose a piece",
    "Поставь на поле": "Place it on the board",
    "Комбо и линии": "Combos and lines",
    "Показать подсказки": "Show tips",
    "помощник": "helper",
    "Подсказка": "Tip",
    "Я покажу, куда нажать и где можно листать.": "I will show where to tap and where to scroll.",
    "Пропустить": "Skip",
    "Дальше": "Next",
    "Готово": "Done",
    "Выбери еду снизу и перетащи её к питомцу 🥣": "Choose food below and drag it to the pet 🥣",

    "Профиль": "Profile",
    "Профиль игрока": "Player Profile",
    "Имя, аватар и общий прогресс": "Name, avatar and progress",
    "Имя игрока": "Player name",
    "Напиши имя": "Enter name",
    "Любимое животное": "Favorite animal",
    "Сохранить профиль": "Save profile",
    "звёзд": "stars",
    "монет": "coins",
    "уровней": "levels",
    "животных": "animals",
    "Имя, аватар и прогресс": "Name, avatar and progress",
    "Достижения": "Achievements",
    "Награды за игру": "Game rewards",
    "Награды за прогресс, животных и память": "Rewards for progress, animals and memory",
    "Ежедневный подарок": "Daily Gift",
    "Сегодняшний подарок: ": "Today’s gift: ",
    "Забрать подарок": "Claim gift",
    "Найди 50 пар": "Find 50 pairs",
    "Тренируй память на разных уровнях.": "Train memory on different levels.",
    "Открой первую большую часть зоопарка.": "Unlock the first big part of the zoo.",
    "Открой 20 животных": "Unlock 20 animals",
    "Собери большой альбом зверят.": "Collect a big animal album.",
    "Покорми 10 раз": "Feed 10 times",
    "Позаботься о своих питомцах.": "Care for your pets.",
    "Собери 60 звёзд": "Collect 60 stars",
    "Проходи уровни аккуратно.": "Complete levels carefully.",
    "Открой 3 редких зверя": "Unlock 3 rare animals",
    "Редкие звери открываются на каждом 10 уровне.": "Rare animals unlock every 10th level.",
    "Погладь питомца 5 раз": "Pet an animal 5 times",
    "Покажи зверятам заботу.": "Show care to your animals.",
    "Поиграй 5 раз": "Play 5 times",
    "Мини-игры делают питомцев счастливее.": "Mini games make pets happier.",
    "Настроение": "Mood",
    "счастливый": "happy",
    "голодный": "hungry",
    "игривый": "playful",
    "сонный": "sleepy",
    "довольный": "loved",
    "Погладить": "Pet",
    "Поиграть": "Play",
    "Спать": "Sleep",
    "Музыка": "Music",

    "Звук и музыка": "Sound & Music",
    "Треки и громкость": "Tracks and volume",
    "Настройки звука": "Sound Settings",
    "Музыкальная тема": "Music theme",
    "Громкость музыки": "Music volume",
    "Громкость звуков животных": "Animal sound volume",
    "Проверить музыку": "Preview music",
    "Проверить зверей": "Preview animals",
    "Режим малыша": "Toddler mode",
    "Чеклист релиза": "Release checklist",

    "Таймер": "Timer",
    "Можно полностью выключить музыку.": "You can turn music off.",
    "Если выключить, игра будет спокойнее.": "Turn off timer for a calmer game.",
    "Interstitial реклама": "Interstitial ads",
    "Можно выключить полноэкранную рекламу в детском режиме.": "You can turn off full-screen ads in kids mode.",
    "Сброс прогресса": "Reset progress",
    "Удалить уровни, монеты, животных и настройки.": "Delete levels, coins, animals and settings.",
    "Сброс": "Reset",
    "Вкл": "On",
    "Выкл": "Off",
    "Классика": "Classic",
    "Запомни карточки": "Memorize cards",
    "Без ошибок": "No mistakes",
    "Найди главное животное": "Find main animal",
    "Быстрый уровень": "Speed level",
    "Золотой лев": "Golden Lion",
    "Радужная панда": "Rainbow Panda",
    "Ночной тигр": "Night Tiger",
    "Ледяной пингвин": "Ice Penguin",
    "Серебряный лисёнок": "Silver Fox",
    "Реальные cartoon sprites животных": "Real cartoon animal sprites",

    "🇬🇧 English version": "🇷🇺 Русская версия",
    "Zoo Pet World": "Zoo Pet World",
    "Реальные cartoon sprites животных": "Real cartoon animal sprites",
    "Загружаем 50 уровней зоопарка...": "Loading 50 zoo levels...",
    "Открыть игру": "Open game",
    "Монетки": "Coins",
    "Играть с таймером": "Play with timer",
    "Карта зоопарка, уровни и звёзды": "Zoo map, levels and stars",
    "Спокойный режим": "Calm mode",
    "Без таймера": "No timer",
    "Карта": "Map",
    "Все вольеры": "All habitats",
    "Альбом": "Album",
    "Факты о животных": "Animal facts",
    "Мои животные": "My Animals",
    "Имя, привет и еда": "Names, greetings and food",
    "Скины": "Skins",
    "Рубашки карточек": "Card backs",
    "Задания": "Tasks",
    "Монетки за цели": "Coins for goals",
    "Родителям": "For Parents",
    "Безопасность": "Safety",
    "Звук: Вкл": "Sound: On",
    "Звук: Выкл": "Sound: Off",
    "Музыка: Вкл": "Music: On",
    "Музыка: Выкл": "Music: Off",
    "Главное меню": "Main menu",
    "← Назад": "← Back",
    "Загружаем картинки раскраски...": "Loading coloring pages...",
    "Первое открытие может занять несколько секунд, дальше быстрее.": "The first opening may take a few seconds, then it is faster.",
    "Картинки ещё загружаются...": "Coloring pages are still loading...",
    "Мой питомец": "My Pet",
    "Все животные": "All animals",
    "Еда": "Food",
    "Игра": "Play",
    "Сон": "Sleep",
    "Душ": "Shower",
    "Одежда": "Clothes",
    "Найди пары": "Memory",
    "Пазл": "Puzzle",
    "Собери пазл": "Complete a puzzle",
    "Открой мини-игру «Пазл» и собери картинку.": "Open the Puzzle mini-game and complete the picture.",
    "Собери картинку": "Complete the picture",
    "Своя картинка": "Custom image",
    "Перемешать": "Shuffle",
    "Подсказка": "Hint",
    "Готовые картинки": "Ready pictures",
    "Пазлы с животными": "Animal puzzles",
    "новые картинки открываются за монеты": "new pictures unlock with coins",
    "10 этапов открываются по очереди: старт 2x2, финал 6x6. Собери текущий пазл или открой следующий за монеты.": "Stages unlock in order: complete the current puzzle or unlock the next one with coins.",
    "Открыт следующий этап": "Next stage unlocked",
    "Вернуться к питомцу": "Back to pet",
    "Ходы": "Moves",
    "Этап": "Stage",
    "Лучшее": "Best",
    "Образец": "Preview",
    
    "уже работает": "works now",
    "Stage 2": "Stage 2",
    "Stage 3": "Stage 3",
    "Меню": "Menu",
    "Назад": "Back",
    "Игра": "Game",
    "С таймером": "Timed",
    "Спокойный": "Calm",
    "Таймер": "Timer",
    "Карта зоопарка": "Zoo Map",
    "Проходи вольеры и открывай животных": "Complete habitats and unlock animals",
    "Режим": "Mode",
    "Закрыто. Пройди предыдущий вольер.": "Locked. Complete the previous habitat.",
    "Играть": "Play",
    "Закрыто": "Locked",
    "Заново": "Restart",
    "Звёзды зависят от ходов и времени": "Stars depend on moves and time",
    "Уровень": "Level",
    "Ходы": "Moves",
    "Нажми на карточку": "Tap a card",
    "Быстрее! Время почти закончилось": "Hurry! Time is almost over",
    "Время вышло": "Time is up",
    "Ничего страшного. Можно повторить уровень или включить спокойный режим без таймера.": "No worries. Try again or switch to calm mode.",
    "Повторить уровень": "Try again",
    "Уровень пройден!": "Level completed!",
    "Игра пройдена!": "Game completed!",
    "Следующий уровень": "Next level",
    "Играть заново": "Play again",
    "Получено": "Earned",
    "Открыто": "Unlocked",
    "Осталось времени": "Time left",
    "Вольер": "Habitat",
    "Найди пары зверят": "Find animal pairs",
    "Режим с таймером": "Timed mode",
    "Спокойный режим без таймера": "Calm mode without timer",
    "Альбом животных": "Animal Album",
    "Открывай карточки после уровней": "Unlock cards after levels",
    "Не открыто": "Not unlocked",
    "Пройди уровни зоопарка, чтобы открыть эту карточку.": "Complete zoo levels to unlock this card.",
    "Дай имя зверьку, нажми на него и покорми": "Name your animal, tap it and feed it",
    "Открывай новых животных на карте зоопарка": "Unlock new animals on the zoo map",
    "Дай имя животному": "Name your animal",
    "Изменить": "Change",
    "Нажми на животное, чтобы открыть его вкладку": "Tap the animal to open its page",
    "Закрытое животное": "Locked animal",
    "Пройди уровни зоопарка, чтобы открыть этого зверька.": "Complete zoo levels to unlock this animal.",
    "Пока нельзя дать имя и открыть вкладку.": "You cannot name or open this animal yet.",
    "← Мои животные": "← My Animals",
    "Факт о животном": "Animal fact",
    "Перетащи еду к животному": "Drag food to the animal",
    "Выбери еду и перетащи к животному": "Choose food and drag it to the animal",
    "Покупай вкусняшки за монетки": "Buy treats with coins",
    "Попробуй дотащить еду прямо к животному": "Try dragging food right to the animal",
    "Ням-ням! Спасибо за": "Yum-yum! Thanks for",
    "покушал": "ate",
    "Всего": "Total",
    "раз(а)": "times",
    "уже кушал": "has already eaten",
    "Перетащи ещё еды": "Drag more food",
    "Привет! Я": "Hi! I am",
    "рад тебя видеть": "is happy to see you",
    "Ура, ты пришёл! Это я": "Yay, you came! It's me",
    "Привет-привет! Поиграем": "Hi-hi! Shall we play",
    "Открыть": "Open",
    "Скины карточек": "Card Skins",
    "Только визуальные награды, без доната": "Visual rewards only, no purchases",
    "Бесплатно": "Free",
    "Выбран": "Selected",
    "Выбрать": "Select",
    "Купить": "Buy",
    "Не хватает": "Not enough",
    "уже открыта": "already unlocked",
    "Не хватает монет: нужно": "Not enough coins: need",
    "открыта": "unlocked",
    "Задания дня": "Daily Tasks",
    "Без давления: просто маленькие цели": "No pressure: just small goals",
    "Найди 5 пар": "Find 5 pairs",
    "Тренировка памяти без спешки.": "Memory practice without rushing.",
    "Пройди 1 уровень": "Complete 1 level",
    "Любой режим засчитывается.": "Any mode counts.",
    "Получи 3 звезды": "Get 3 stars",
    "Попробуй пройти аккуратно.": "Try to play carefully.",
    "Покорми животное": "Feed an animal",
    "Зайди в «Мои животные» и дай зверьку еды.": "Open My Animals and feed a pet.",
    "Прогресс": "Progress",
    "Награда": "Reward",
    "Забрать": "Claim",
    "В процессе": "In progress",
    "Для родителей": "For Parents",
    "Простой экран доверия для Play Market": "A simple trust screen for Google Play",
    "Что тренирует игра": "What the game trains",
    "Память, внимание, реакцию, распознавание одинаковых картинок и узнавание звуков животных.": "Memory, attention, reaction and matching skills.",
    "Можно играть без таймера, чтобы ребёнок не нервничал.": "The child can play without a timer.",
    "Данные и приватность": "Data and privacy",
    "В HTML-версии нет регистрации и аккаунта. Прогресс хранится локально на устройстве.": "No sign-in or account. Progress is stored locally.",
    "Реклама": "Ads",
    "В Android-пакете используется аккуратный подход: баннер снизу и редкая полноэкранная реклама после нескольких уровней. Для релиза нужны реальные настройки AdMob и проверка семейных правил Google Play.": "The Android package uses a bottom banner and occasional interstitial ads. Before release, configure AdMob and check Google Play family policies.",
    "Вход в зоопарк": "Zoo Entrance",
    "Солнечная саванна": "Sunny Savanna",
    "Бамбуковый сад": "Bamboo Garden",
    "Лесная тропа": "Forest Trail",
    "Джунгли": "Jungle",
    "Ферма друзей": "Friend Farm",
    "Пустыня": "Desert",
    "Речной берег": "River Bank",
    "Океанариум": "Aquarium",
    "Ночной зоопарк": "Night Zoo",
    "Лев": "Lion",
    "Панда": "Panda",
    "Лисёнок": "Fox",
    "Слон": "Elephant",
    "Жираф": "Giraffe",
    "Обезьянка": "Monkey",
    "Тигр": "Tiger",
    "Коала": "Koala",
    "Кролик": "Rabbit",
    "Лягушка": "Frog",
    "Попугай": "Parrot",
    "Зебра": "Zebra",
    "Пингвин": "Penguin",
    "Бегемот": "Hippo",
    "Сова": "Owl",
    "Медвежонок": "Bear Cub",
    "Олень": "Deer",
    "Енот": "Raccoon",
    "Черепаха": "Turtle",
    "Собачка": "Dog",
    "Котик": "Cat",
    "Корова": "Cow",
    "Лошадка": "Horse",
    "Верблюд": "Camel",
    "Овечка": "Sheep",
    "Козочка": "Goat",
    "Крокодил": "Crocodile",
    "Змейка": "Snake",
    "Кенгуру": "Kangaroo",
    "Дельфин": "Dolphin",
    "Кит": "Whale",
    "Осьминог": "Octopus",
    "Фламинго": "Flamingo",
    "Цыплёнок": "Chick",
    "Утёнок": "Duckling",
    "Волчонок": "Wolf Cub",
    "Белочка": "Squirrel",
    "Ёжик": "Hedgehog",
    "Летучая мышь": "Bat",
    "Тюлень": "Seal",
    "Белый мишка": "Polar Bear",
    "Морковь": "Carrot",
    "Яблоко": "Apple",
    "Банан": "Banana",
    "Клубника": "Strawberry",
    "Листик": "Leaf",
    "Кукуруза": "Corn",
    "Арбуз": "Watermelon",
    "Ягоды": "Berries",
    "Мёд": "Honey",
    "Рыбка": "Fish",
    "Молоко": "Milk",
    "Сыр": "Cheese",
    "Печенье": "Cookie",
    "Орешки": "Nuts",
    "Креветка": "Shrimp",
    "Кокос": "Coconut",
    "морковку": "carrot",
    "яблоко": "apple",
    "банан": "banana",
    "клубнику": "strawberry",
    "листик": "leaf",
    "кукурузу": "corn",
    "арбуз": "watermelon",
    "ягоды": "berries",
    "мёд": "honey",
    "рыбку": "fish",
    "молоко": "milk",
    "сыр": "cheese",
    "печенье": "cookie",
    "орешки": "nuts",
    "креветку": "shrimp",
    "кокос": "coconut",
    "Львы часто живут группами, которые называют прайдами.": "Lions often live in groups called prides.",
    "Панды любят бамбук и проводят много времени за едой.": "Pandas love bamboo and spend a lot of time eating.",
    "Лисы очень ловкие и хорошо слышат даже тихие звуки.": "Foxes are agile and can hear very quiet sounds.",
    "Слоны запоминают места и узнают своих друзей.": "Elephants remember places and recognize friends.",
    "Жирафы — самые высокие наземные животные.": "Giraffes are the tallest land animals.",
    "Обезьяны любят играть и быстро учатся новому.": "Monkeys love to play and learn quickly.",
    "У каждого тигра свой уникальный рисунок полос.": "Every tiger has a unique stripe pattern.",
    "Коалы много спят и живут на деревьях.": "Koalas sleep a lot and live in trees.",
    "Кролики быстро бегают и любят прятаться.": "Rabbits run fast and like to hide.",
    "Лягушки умеют далеко прыгать и живут рядом с водой.": "Frogs can jump far and live near water.",
    "Попугаи могут повторять звуки и любят яркие цвета.": "Parrots can repeat sounds and love bright colors.",
    "Полоски зебры помогают ей выделяться среди других животных.": "A zebra's stripes make it special among animals.",
    "Пингвины отлично плавают и живут большими группами.": "Penguins swim well and live in groups.",
    "Бегемоты любят воду и могут долго отдыхать в реке.": "Hippos love water and rest in rivers.",
    "Совы хорошо видят ночью и очень тихо летают.": "Owls see well at night and fly quietly.",
    "Медведи сильные, но маленькие медвежата очень игривые.": "Bears are strong, and cubs are very playful.",
    "Олени быстро бегают и хорошо слышат лесные звуки.": "Deer run fast and hear forest sounds well.",
    "Еноты любопытные и ловко пользуются передними лапками.": "Raccoons are curious and use their paws skillfully.",
    "Черепахи носят свой домик-панцирь всегда с собой.": "Turtles carry their shell-home with them.",
    "Собаки любят играть и быстро запоминают команды.": "Dogs love to play and learn commands quickly.",
    "Кошки умеют тихо ходить и любят уютные места.": "Cats walk quietly and love cozy places.",
    "Коровы узнают знакомые голоса и любят спокойствие.": "Cows recognize familiar voices and like calm places.",
    "Лошади быстро бегают и хорошо чувствуют настроение человека.": "Horses run fast and sense people's moods.",
    "Верблюды могут долго идти по пустыне.": "Camels can walk through deserts for a long time.",
    "Овечки держатся вместе и любят пастись на траве.": "Sheep stay together and like grazing.",
    "Козы ловко забираются на камни и холмы.": "Goats climb rocks and hills well.",
    "Крокодилы отлично плавают и любят тёплые берега.": "Crocodiles swim well and like warm banks.",
    "Змеи двигаются без лап и хорошо чувствуют вибрации.": "Snakes move without legs and feel vibrations.",
    "Кенгуру прыгают на сильных задних лапах.": "Kangaroos jump on strong back legs.",
    "Дельфины очень умные и общаются звуками.": "Dolphins are smart and communicate with sounds.",
    "Киты — огромные морские животные, которые красиво поют.": "Whales are huge sea animals that sing.",
    "Осьминоги умеют менять цвет и прятаться.": "Octopuses can change color and hide.",
    "Фламинго часто стоят на одной ноге.": "Flamingos often stand on one leg.",
    "Цыплята быстро бегают за мамой-курочкой.": "Chicks run after their mother hen.",
    "Утки плавают по воде и любят нырять за едой.": "Ducks swim and dive for food.",
    "Волки живут стаями и хорошо слышат.": "Wolves live in packs and hear well.",
    "Белки делают запасы орешков и ловко прыгают по деревьям.": "Squirrels store nuts and jump through trees.",
    "Ёжики сворачиваются клубком, когда пугаются.": "Hedgehogs curl into a ball when scared.",
    "Летучие мыши ориентируются в темноте с помощью звуков.": "Bats use sound to navigate in the dark.",
    "Тюлени отлично плавают и отдыхают на льду или берегу.": "Seals swim well and rest on ice or shore.",
    "Белые медведи живут в холодных краях и хорошо плавают.": "Polar bears live in cold places and swim well."
};

function getCurrentLanguage() {
    // Overridden by assets/js/features/i18n.js (Stage 4).
    // This stub exists as a fallback if i18n.js fails to load.
    try { return localStorage.getItem("zooLanguage") || "ru"; } catch(e) { return "ru"; }
}

function toggleLanguage() {
    // Legacy binary toggle — replaced by setLanguage() from i18n.js.
    // Kept for any old onclick handlers that may still reference it.
    if (typeof setLanguage === 'function') {
        const next = getCurrentLanguage() === "ru" ? "en" : "ru";
        setLanguage(next);
    } else {
        const next = getCurrentLanguage() === "ru" ? "en" : "ru";
        try { localStorage.setItem("zooLanguage", next); } catch(e) {}
        location.reload();
    }
}

function translateTextValue(value) {
    if (!value || !value.trim()) return value;

    let output = value;

    const entries = Object.entries(i18nMap).sort((a, b) => b[0].length - a[0].length);
    entries.forEach(([ru, en]) => {
        output = output.split(ru).join(en);
    });

    output = output.replace(/(\d+)\s*пар/g, "$1 pairs");
    output = output.replace(/(\d+)\s*сек/g, "$1 sec");
    output = output.replace(/Уровень:\s*/g, "Level: ");
    output = output.replace(/Ходы:\s*/g, "Moves: ");
    output = output.replace(/Монетки:\s*/g, "Coins: ");
    output = output.replace(/(\d+)\s*монет/g, "$1 coins");
    output = output.replace(/(\d+)\s*монеты/g, "$1 coins");
    output = output.replace(/(\d+)\s*монетка/g, "$1 coin");

    return output;
}

function translatePageToEnglish() {
    if (getCurrentLanguage() !== "en") return;

    document.documentElement.lang = "en";
    document.title = "Zoo Pet World";

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
        node.nodeValue = translateTextValue(node.nodeValue);
    });

    document.querySelectorAll("input[placeholder]").forEach(input => {
        input.placeholder = translateTextValue(input.placeholder);
    });

    const langButton = document.getElementById("languageSwitchButton");
    if (langButton) langButton.textContent = t('lang.ru_btn');
}

function installTranslationObserver() {
    if (getCurrentLanguage() !== "en") return;

    const observeOptions = { childList: true, subtree: true, characterData: true };
    let locked = false;
    const observer = new MutationObserver(() => {
        if (locked) return;
        locked = true;
        // translatePageToEnglish() itself rewrites text nodes (and the language
        // button's textContent), which counts as new mutations. Without
        // disconnecting first, those self-caused mutations re-trigger this same
        // observer forever (verified: ~4 calls/sec with zero user interaction),
        // pegging the CPU and, after enough repeated passes, corrupting text via
        // compounding find/replace. Disconnect while we translate, then resume.
        observer.disconnect();
        setTimeout(() => {
            translatePageToEnglish();
            locked = false;
            observer.observe(document.body, observeOptions);
        }, 0);
    });

    observer.observe(document.body, observeOptions);
}


/* ===== Zoo Pet World profile / achievements / daily gift / parent settings ===== */
const profileAvatars = ["🦁","🐼","🦊","🐘","🦒","🐵","🐯","🐨","🐰","🐸","🐧","🦉"];

function openProfile() {
    loadScriptOnce("assets/js/features/profile.js", () => { openProfile(); });
}

function openAchievements() {
    loadScriptOnce("assets/js/features/profile.js", () => { openAchievements(); });
}

function updateAchievementProgress() {
    saveProgress();
}

function getTodayKey() {
    return new Date().toISOString().slice(0, 10);
}

function getYesterdayKey() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
}

function getDailyGiftStreakForClaim() {
    const today = getTodayKey();
    const yesterday = getYesterdayKey();
    const claimedDay = safeStorage.get("zooDailyGiftDay", "");
    const currentStreak = Number(safeStorage.get("zooDailyGiftStreak", "0") || "0");
    if (claimedDay === today) return Math.max(1, currentStreak);
    if (claimedDay === yesterday) return Math.max(1, currentStreak + 1);
    return 1;
}

function getDailyGiftReward(streak = getDailyGiftStreakForClaim()) {
    // Stage 4 fix: removed halfReward — now pays full 20-50 coins (was 10-25).
    // streak=1→20, streak=7→50 (capped), aligns with what the UI promises.
    return 20 + Math.min(30, Math.max(0, (Number(streak || 1) - 1) * 5));
}

function checkDailyGift() {
    const today = getTodayKey();
    const claimedDay = safeStorage.get("zooDailyGiftDay", "");
    if (claimedDay !== today) {
        const streak = getDailyGiftStreakForClaim();
        const reward = getDailyGiftReward(streak);
        dailyGiftOverlay.style.display = "grid";
        dailyGiftText.textContent = t('daily.gift_text', {coins: reward, streak});
    }
    renderEconomyPanel();
}

function claimDailyGift() {
    const today = getTodayKey();
    if (safeStorage.get("zooDailyGiftDay", "") === today) {
        dailyGiftOverlay.style.display = "none";
        renderEconomyPanel();
        return;
    }

    const streak = getDailyGiftStreakForClaim();
    const reward = getDailyGiftReward(streak);
    coins += reward;
    safeStorage.set("zooDailyGiftDay", today);
    safeStorage.set("zooDailyGiftStreak", String(streak));
    saveProgress();
    updateCoinsViews();
    dailyGiftOverlay.style.display = "none";
    playSound("coin");
    showFoodToast(t('daily.gift_toast', {coins: reward}));
    renderEconomyPanel();
}

window.zooMemoryBootOk = true;

// Restore low-performance mode before first paint
(function() {
    try {
        if (localStorage.getItem("zooLowPerformance") === "1") {
            document.body.classList.add("low-performance");
        }
    } catch(e) {}
})();

function initApp() {
    try {
        normalizeDailyProgress();
        setupImages();
        applySkin();
        updateCoinsViews();
        soundButton.textContent = soundEnabled ? "Звук: Вкл" : "Звук: Выкл";
        updateMusicButton();
        updateSoundButton();
        setTimeout(() => {
            try { forceOpenMenu(); } catch(e) { console.warn("initApp open failed", e); }
        }, 150);
    } catch (e) {
        console.log("init fallback", e);
        setTimeout(() => { try { forceOpenMenu(); } catch(_) {} }, 50);
    }
}

initApp();

setTimeout(() => {
    try {
        if (loadingScreen && loadingScreen.style.display !== "none") {
            forceOpenMenu();
        }
    } catch (e) {}
}, 1200);
