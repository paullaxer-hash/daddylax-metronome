// Main App Controller
class MetronomeApp {
    constructor() {
        this.engine = new MetronomeEngine();
        this.bpm = 120;
        this.isPlaying = false;
        this.tapTempoTaps = [];
        this.visualBeatInterval = null;
        
        this.initElements();
        this.attachEventListeners();
        this.loadSettings();
        this.setupVisualBeatSync();
    }
    
    setupVisualBeatSync() {
        // Sync visual beats with audio engine
        this.engine.onBeat((beatNumber, isDownbeat) => {
            if (!this.isPlaying) return;
            
            // Update pulse
            this.pulseCircleEl.classList.add('pulse');
            if (isDownbeat) {
                this.pulseCircleEl.classList.add('downbeat');
            } else {
                this.pulseCircleEl.classList.remove('downbeat');
            }
            
            setTimeout(() => {
                this.pulseCircleEl.classList.remove('pulse');
            }, 200);
            
            // Haptics
            if (this.hapticsToggleEl.checked && navigator.vibrate) {
                const pattern = isDownbeat ? [10, 5, 10] : [5];
                navigator.vibrate(pattern);
            }
        });
    }
    
    initElements() {
        // Controls
        this.timeSignatureEl = document.getElementById('timeSignature');
        this.subdivisionEl = document.getElementById('subdivision');
        this.clickSoundEl = document.getElementById('clickSound');
        this.accentToggleEl = document.getElementById('accentToggle');
        this.soundToggleEl = document.getElementById('soundToggle');
        this.hapticsToggleEl = document.getElementById('hapticsToggle');
        this.accentFrequencyEl = document.getElementById('accentFrequency');
        this.beatFrequencyEl = document.getElementById('beatFrequency');
        
        // BPM Controls
        this.bpmValueEl = document.getElementById('bpmValue');
        this.bpmSliderEl = document.getElementById('bpmSlider');
        this.incrementBPMEl = document.getElementById('incrementBPM');
        this.decrementBPMEl = document.getElementById('decrementBPM');
        
        // Action Buttons
        this.startStopEl = document.getElementById('startStop');
        this.startStopTextEl = document.getElementById('startStopText');
        this.playIconEl = document.getElementById('playIcon');
        this.stopIconEl = document.getElementById('stopIcon');
        this.tapTempoEl = document.getElementById('tapTempo');
        
        // Visual
        this.pulseCircleEl = document.getElementById('pulseCircle');
    }
    
    attachEventListeners() {
        // BPM Controls
        this.incrementBPMEl.addEventListener('click', () => this.incrementBPM());
        this.decrementBPMEl.addEventListener('click', () => this.decrementBPM());
        this.bpmSliderEl.addEventListener('input', (e) => {
            this.setBPM(parseInt(e.target.value));
        });
        
        // Action Buttons
        this.startStopEl.addEventListener('click', () => this.togglePlayback());
        this.tapTempoEl.addEventListener('click', () => this.tapTempo());
        
        // Settings
        this.timeSignatureEl.addEventListener('change', (e) => {
            this.engine.timeSignature = parseInt(e.target.value);
            this.saveSettings();
        });
        
        this.subdivisionEl.addEventListener('change', (e) => {
            this.engine.subdivision = parseFloat(e.target.value);
            this.updateEngineSettings();
            this.saveSettings();
        });
        
        this.clickSoundEl.addEventListener('change', (e) => {
            this.engine.clickSoundType = e.target.value;
            this.updateFrequenciesForSoundType();
            this.updateEngineSettings();
            this.saveSettings();
        });
        
        this.accentToggleEl.addEventListener('change', (e) => {
            this.engine.accentOnDownbeat = e.target.checked;
            this.updateEngineSettings();
            this.saveSettings();
        });
        
        this.soundToggleEl.addEventListener('change', (e) => {
            this.engine.soundEnabled = e.target.checked;
            this.saveSettings();
        });
        
        this.hapticsToggleEl.addEventListener('change', (e) => {
            this.saveSettings();
        });
        
        this.accentFrequencyEl.addEventListener('change', (e) => {
            this.engine.accentFrequency = parseFloat(e.target.value);
            this.saveSettings();
        });
        
        this.beatFrequencyEl.addEventListener('change', (e) => {
            this.engine.beatFrequency = parseFloat(e.target.value);
            this.saveSettings();
        });
        
        // Visual beat timer
        this.startVisualBeat();
    }
    
    incrementBPM() {
        this.setBPM(Math.min(300, this.bpm + 1));
    }
    
    decrementBPM() {
        this.setBPM(Math.max(30, this.bpm - 1));
    }
    
    setBPM(newBPM) {
        this.bpm = Math.max(30, Math.min(300, newBPM));
        this.bpmValueEl.textContent = this.bpm;
        this.bpmSliderEl.value = this.bpm;
        
        if (this.isPlaying) {
            this.engine.updateBPM(this.bpm);
        }
        
        this.saveSettings();
    }
    
    togglePlayback() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.start();
        }
    }
    
    start() {
        this.engine.updateSettings({
            bpm: this.bpm,
            timeSignature: parseInt(this.timeSignatureEl.value),
            subdivision: parseFloat(this.subdivisionEl.value),
            accentOnDownbeat: this.accentToggleEl.checked,
            soundEnabled: this.soundToggleEl.checked,
            clickSoundType: this.clickSoundEl.value,
            accentFrequency: parseFloat(this.accentFrequencyEl.value),
            beatFrequency: parseFloat(this.beatFrequencyEl.value)
        });
        
        this.engine.start();
        this.isPlaying = true;
        
        // Update UI
        this.startStopEl.classList.add('playing');
        this.startStopTextEl.textContent = 'Stop';
        this.playIconEl.style.display = 'none';
        this.stopIconEl.style.display = 'block';
    }
    
    stop() {
        this.engine.stop();
        this.isPlaying = false;
        this.stopVisualBeat();
        
        // Update UI
        this.startStopEl.classList.remove('playing');
        this.startStopTextEl.textContent = 'Start';
        this.playIconEl.style.display = 'block';
        this.stopIconEl.style.display = 'none';
        this.pulseCircleEl.classList.remove('pulse', 'downbeat');
    }
    
    tapTempo() {
        const now = Date.now();
        this.tapTempoTaps.push(now);
        
        // Keep only last 10 taps
        if (this.tapTempoTaps.length > 10) {
            this.tapTempoTaps.shift();
        }
        
        // Calculate BPM from taps
        if (this.tapTempoTaps.length >= 2) {
            const intervals = [];
            for (let i = 1; i < this.tapTempoTaps.length; i++) {
                intervals.push(this.tapTempoTaps[i] - this.tapTempoTaps[i - 1]);
            }
            
            // Remove outliers
            const sorted = [...intervals].sort((a, b) => a - b);
            const median = sorted[Math.floor(sorted.length / 2)];
            const filtered = intervals.filter(interval => 
                interval >= median * 0.5 && interval <= median * 2.0
            );
            
            if (filtered.length > 0) {
                const averageInterval = filtered.reduce((a, b) => a + b, 0) / filtered.length;
                const bpm = Math.round(60000 / averageInterval);
                this.setBPM(Math.max(30, Math.min(300, bpm)));
            }
        }
    }
    
    updateEngineSettings() {
        if (this.isPlaying) {
            this.engine.updateSettings({
                bpm: this.bpm,
                timeSignature: parseInt(this.timeSignatureEl.value),
                subdivision: parseFloat(this.subdivisionEl.value),
                accentOnDownbeat: this.accentToggleEl.checked,
                soundEnabled: this.soundToggleEl.checked,
                clickSoundType: this.clickSoundEl.value,
                accentFrequency: parseFloat(this.accentFrequencyEl.value),
                beatFrequency: parseFloat(this.beatFrequencyEl.value)
            });
        }
    }
    
    updateFrequenciesForSoundType() {
        const defaults = {
            classic: { accent: 1000, beat: 600 },
            rimShot: { accent: 1200, beat: 900 },
            woodblock: { accent: 800, beat: 500 },
            stick: { accent: 1500, beat: 1000 },
            electronic: { accent: 1800, beat: 1200 },
            bell: { accent: 700, beat: 400 }
        };
        
        const soundType = this.clickSoundEl.value;
        if (defaults[soundType]) {
            this.engine.accentFrequency = defaults[soundType].accent;
            this.engine.beatFrequency = defaults[soundType].beat;
            this.accentFrequencyEl.value = defaults[soundType].accent;
            this.beatFrequencyEl.value = defaults[soundType].beat;
        }
    }
    
    startVisualBeat() {
        // Visual beats are handled via engine callbacks in setupVisualBeatSync
        // No separate timer needed
    }
    
    stopVisualBeat() {
        // Visual beats are handled via engine callbacks
        // Just clear any pending animations
        this.pulseCircleEl.classList.remove('pulse', 'downbeat');
    }
    
    saveSettings() {
        const settings = {
            bpm: this.bpm,
            timeSignature: parseInt(this.timeSignatureEl.value),
            subdivision: parseFloat(this.subdivisionEl.value),
            accentOnDownbeat: this.accentToggleEl.checked,
            soundEnabled: this.soundToggleEl.checked,
            hapticsEnabled: this.hapticsToggleEl.checked,
            clickSoundType: this.clickSoundEl.value,
            accentFrequency: parseFloat(this.accentFrequencyEl.value),
            beatFrequency: parseFloat(this.beatFrequencyEl.value)
        };
        localStorage.setItem('metronomeSettings', JSON.stringify(settings));
    }
    
    loadSettings() {
        const saved = localStorage.getItem('metronomeSettings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                this.bpm = settings.bpm || 120;
                this.timeSignatureEl.value = settings.timeSignature || 4;
                this.subdivisionEl.value = settings.subdivision || 0.25;
                this.accentToggleEl.checked = settings.accentOnDownbeat || false;
                this.soundToggleEl.checked = settings.soundEnabled !== false;
                this.hapticsToggleEl.checked = settings.hapticsEnabled || false;
                this.clickSoundEl.value = settings.clickSoundType || 'classic';
                this.accentFrequencyEl.value = settings.accentFrequency || 1000;
                this.beatFrequencyEl.value = settings.beatFrequency || 600;
                
                this.bpmValueEl.textContent = this.bpm;
                this.bpmSliderEl.value = this.bpm;
                
                this.updateEngineSettings();
            } catch (e) {
                console.error('Failed to load settings:', e);
            }
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MetronomeApp();
});

