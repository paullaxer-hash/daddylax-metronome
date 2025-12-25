// Metronome Engine using Web Audio API
class MetronomeEngine {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.bpm = 120;
        this.timeSignature = 4;
        this.subdivision = 0.25; // quarter note
        this.accentOnDownbeat = false;
        this.soundEnabled = true;
        this.clickSoundType = 'classic';
        this.accentFrequency = 1000;
        this.beatFrequency = 600;
        
        this.beatNumber = 0;
        this.nextBeatTime = 0;
        this.scheduleAheadTime = 0.1; // How far ahead to schedule
        this.lookahead = 25.0; // How frequently to call scheduling function (ms)
        this.scheduleInterval = null;
        this.beatCallbacks = []; // For visual sync
        
        this.initAudioContext();
    }
    
    onBeat(callback) {
        this.beatCallbacks.push(callback);
    }
    
    emitBeat(beatNumber, isDownbeat) {
        this.beatCallbacks.forEach(cb => cb(beatNumber, isDownbeat));
    }
    
    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.error('Web Audio API not supported:', e);
        }
    }
    
    start() {
        if (this.isPlaying) return;
        if (!this.audioContext) this.initAudioContext();
        
        // Resume audio context if suspended (required by some browsers)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        this.isPlaying = true;
        this.beatNumber = 0;
        
        // Calculate beat interval
        const beatsPerSecond = (this.bpm / 60.0) * (1.0 / this.subdivision);
        this.beatInterval = 1.0 / beatsPerSecond;
        
        // Get current time and schedule immediate click
        const currentTime = this.audioContext.currentTime;
        const immediateClickTime = currentTime + 0.001; // 1ms delay for safety
        
        // Play immediate first click (beat 1)
        const isFirstDownbeat = this.accentOnDownbeat;
        this.playClick(immediateClickTime, isFirstDownbeat);
        
        // CRITICAL: Set beatNumber to 2 since we just played beat 1
        // This ensures the next scheduled beat is beat 2 (not another beat 1)
        this.beatNumber = 2;
        this.nextBeatTime = immediateClickTime + this.beatInterval;
        
        // Emit event for visual sync
        this.emitBeat(1, isFirstDownbeat);
        
        // Start scheduling loop
        this.schedule();
        this.scheduleInterval = setInterval(() => this.schedule(), this.lookahead);
    }
    
    stop() {
        if (!this.isPlaying) return;
        
        this.isPlaying = false;
        if (this.scheduleInterval) {
            clearInterval(this.scheduleInterval);
            this.scheduleInterval = null;
        }
        this.beatNumber = 0;
    }
    
    schedule() {
        if (!this.isPlaying) return;
        
        const currentTime = this.audioContext.currentTime;
        
        // Schedule beats ahead
        while (this.nextBeatTime < currentTime + this.scheduleAheadTime) {
            const beatsPerBar = this.timeSignature * (1.0 / this.subdivision);
            const beatIndexInBar = ((this.beatNumber - 1) % beatsPerBar) + 1;
            const isDownbeat = (beatIndexInBar === 1) && this.accentOnDownbeat;
            
            this.playClick(this.nextBeatTime, isDownbeat);
            
            // Emit event for visual sync at the exact beat time
            const delay = Math.max(0, (this.nextBeatTime - currentTime) * 1000);
            setTimeout(() => {
                this.emitBeat(this.beatNumber, isDownbeat);
            }, delay);
            
            this.nextBeatTime += this.beatInterval;
            this.beatNumber++;
        }
    }
    
    playClick(time, isDownbeat) {
        if (!this.soundEnabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const frequency = isDownbeat ? this.accentFrequency : this.beatFrequency;
        const duration = isDownbeat ? 0.05 : 0.04;
        
        // Generate click sound based on type
        switch (this.clickSoundType) {
            case 'classic':
                this.createClassicClick(oscillator, gainNode, frequency, duration, isDownbeat);
                break;
            case 'rimShot':
                this.createRimShotClick(oscillator, gainNode, frequency, duration, isDownbeat);
                break;
            case 'woodblock':
                this.createWoodblockClick(oscillator, gainNode, frequency, duration, isDownbeat);
                break;
            case 'stick':
                this.createStickClick(oscillator, gainNode, frequency, duration, isDownbeat);
                break;
            case 'electronic':
                this.createElectronicClick(oscillator, gainNode, frequency, duration, isDownbeat);
                break;
            case 'bell':
                this.createBellClick(oscillator, gainNode, frequency, duration, isDownbeat);
                break;
            default:
                this.createClassicClick(oscillator, gainNode, frequency, duration, isDownbeat);
        }
        
        oscillator.start(time);
        oscillator.stop(time + duration);
    }
    
    createClassicClick(oscillator, gainNode, frequency, duration, isDownbeat) {
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.6 : 0.45;
        const attackTime = 0.001;
        const decayTime = isDownbeat ? 0.015 : 0.012;
        const sustainLevel = 0.1;
        const releaseTime = 0.015;
        
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(amplitude, now + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, now + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, now + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);
    }
    
    createRimShotClick(oscillator, gainNode, frequency, duration, isDownbeat) {
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.65 : 0.5;
        const attackTime = 0.0005;
        const decayTime = isDownbeat ? 0.008 : 0.006;
        const sustainLevel = 0.05;
        const releaseTime = 0.01;
        
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(amplitude, now + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, now + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, now + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);
    }
    
    createWoodblockClick(oscillator, gainNode, frequency, duration, isDownbeat) {
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.55 : 0.4;
        const attackTime = 0.002;
        const decayTime = isDownbeat ? 0.025 : 0.02;
        const sustainLevel = 0.15;
        const releaseTime = 0.025;
        
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(amplitude, now + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, now + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, now + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);
    }
    
    createStickClick(oscillator, gainNode, frequency, duration, isDownbeat) {
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.5 : 0.4;
        const attackTime = 0.0003;
        const decayTime = isDownbeat ? 0.01 : 0.008;
        const sustainLevel = 0.0;
        const releaseTime = 0.005;
        
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(amplitude, now + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, now + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, now + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);
    }
    
    createElectronicClick(oscillator, gainNode, frequency, duration, isDownbeat) {
        oscillator.type = 'square';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.6 : 0.45;
        const attackTime = 0.001;
        const decayTime = isDownbeat ? 0.015 : 0.012;
        const sustainLevel = 0.05;
        const releaseTime = 0.01;
        
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(amplitude, now + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, now + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, now + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);
    }
    
    createBellClick(oscillator, gainNode, frequency, duration, isDownbeat) {
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        const amplitude = isDownbeat ? 0.5 : 0.35;
        const attackTime = 0.003;
        const decayTime = isDownbeat ? 0.03 : 0.025;
        const sustainLevel = 0.2;
        const releaseTime = 0.03;
        
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(amplitude, now + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(amplitude * sustainLevel, now + attackTime + decayTime);
        gainNode.gain.setValueAtTime(amplitude * sustainLevel, now + duration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, now + duration);
    }
    
    updateBPM(newBPM) {
        this.bpm = newBPM;
        if (this.isPlaying) {
            // Recalculate beat interval
            const beatsPerSecond = (this.bpm / 60.0) * (1.0 / this.subdivision);
            this.beatInterval = 1.0 / beatsPerSecond;
            // Don't reset beatNumber - preserve measure position
        }
    }
    
    updateSettings(settings) {
        const wasPlaying = this.isPlaying;
        if (wasPlaying) {
            this.stop();
        }
        
        this.bpm = settings.bpm || this.bpm;
        this.timeSignature = settings.timeSignature || this.timeSignature;
        this.subdivision = settings.subdivision || this.subdivision;
        this.accentOnDownbeat = settings.accentOnDownbeat !== undefined ? settings.accentOnDownbeat : this.accentOnDownbeat;
        this.soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : this.soundEnabled;
        this.clickSoundType = settings.clickSoundType || this.clickSoundType;
        this.accentFrequency = settings.accentFrequency || this.accentFrequency;
        this.beatFrequency = settings.beatFrequency || this.beatFrequency;
        
        if (wasPlaying) {
            this.start();
        }
    }
}

