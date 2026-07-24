/**
 * HD Mode Toggle - Improves clarity without modifying design
 * Add this script before Three.js initialization
 */

(function() {
    'use strict';

    // HD Mode state
    window.HDMode = {
        enabled: true,  // Start with HD mode ON
        filmGrainOriginal: 0.03,
        filmGrainHD: 0.005,
        vignetteOriginal: 0.35,
        vignetteHD: 0.05,
        blendPrevOriginal: 0.08,
        blendPrevHD: 0.0,
        chromaticAberrationOriginal: 0.025,
        chromaticAberrationHD: 0.003,

        init: function() {
            // Wait for Three.js and scene to load
            const checkReady = setInterval(() => {
                if (window.cinematicPass && window.cinematicPass.uniforms) {
                    clearInterval(checkReady);
                    this.apply();
                    this.createToggleButton();
                }
            }, 100);
        },

        apply: function() {
            if (!window.cinematicPass) return;

            const uniforms = window.cinematicPass.uniforms;

            if (this.enabled) {
                // HD MODE - Reduce blur effects for clarity
                uniforms.uFilmGrain.value = this.filmGrainHD;
                uniforms.uVignette.value = this.vignetteHD;
                uniforms.uBlendPrev.value = this.blendPrevHD;
                uniforms.uChromaticAberration.value = this.chromaticAberrationHD;
                console.log('✅ HD MODE ON - Clarity Enhanced');
            } else {
                // DESIGN MODE - Original artistic effects
                uniforms.uFilmGrain.value = this.filmGrainOriginal;
                uniforms.uVignette.value = this.vignetteOriginal;
                uniforms.uBlendPrev.value = this.blendPrevOriginal;
                uniforms.uChromaticAberration.value = this.chromaticAberrationOriginal;
                console.log('❌ HD MODE OFF - Original Design');
            }
        },

        toggle: function() {
            this.enabled = !this.enabled;
            this.apply();
            return this.enabled;
        },

        createToggleButton: function() {
            // Add HD Mode toggle button to page
            const button = document.createElement('button');
            button.id = 'hd-mode-toggle';
            button.innerHTML = '🎨 HD MODE: ON';
            button.style.cssText = `
                position: fixed;
                bottom: 120px;
                right: 20px;
                z-index: 100000;
                padding: 10px 15px;
                background: rgba(0, 245, 212, 0.1);
                border: 1px solid rgba(0, 245, 212, 0.5);
                color: #00f5d4;
                font-family: 'Share Tech Mono', monospace;
                font-size: 11px;
                cursor: pointer;
                transition: all 0.3s;
                letter-spacing: 2px;
                border-radius: 4px;
            `;

            button.onmouseover = () => {
                button.style.background = 'rgba(0, 245, 212, 0.2)';
                button.style.boxShadow = '0 0 10px rgba(0, 245, 212, 0.3)';
            };

            button.onmouseout = () => {
                button.style.background = 'rgba(0, 245, 212, 0.1)';
                button.style.boxShadow = 'none';
            };

            button.onclick = () => {
                const isHD = this.toggle();
                button.innerHTML = isHD ? '🎨 HD MODE: ON' : '🎨 HD MODE: OFF';
                button.style.color = isHD ? '#00f5d4' : '#ff6b6b';
                button.style.borderColor = isHD ? 'rgba(0, 245, 212, 0.5)' : 'rgba(255, 107, 107, 0.5)';
                button.style.background = isHD ? 'rgba(0, 245, 212, 0.1)' : 'rgba(255, 107, 107, 0.1)';
            };

            document.body.appendChild(button);
        }
    };

    // Auto-initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.HDMode.init());
    } else {
        window.HDMode.init();
    }
})();
