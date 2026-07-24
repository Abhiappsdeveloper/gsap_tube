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
                    // Toggle button removed - HD mode is always active
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


    };

    // Auto-initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.HDMode.init());
    } else {
        window.HDMode.init();
    }
})();
